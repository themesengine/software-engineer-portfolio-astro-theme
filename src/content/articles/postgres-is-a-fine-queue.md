---
title: "PostgreSQL is a fine queue (until it isn't)"
excerpt: "Before adding a message broker to a young product, consider the database you already run. Here's how I build job queues on PostgreSQL, and the signals that it's time to move on."
category: "Engineering"
publishedAt: 2026-10-14
author: "Mira Castell"
image: "../../assets/images/journal/postgres-queues.jpg"
imageAlt: "Diagram of connected nodes representing jobs moving through a queue"
featured: true
---

Most products I join have between zero and three message brokers. The ones with three usually started with one, added a second for "real-time" and a third during a migration that never finished. The ones with zero often need a queue and don't realise they already have a perfectly good one: the PostgreSQL database holding everything else.

This isn't an argument against Kafka, RabbitMQ or SQS. I've used all of them happily. It's an argument for not adding moving parts until you've earned them.

## Why the database works

A queue needs four things: a durable place to put work, a way for workers to claim a job without two of them grabbing the same one, retries, and visibility into what's stuck. PostgreSQL gives you all four.

The key is `SELECT ... FOR UPDATE SKIP LOCKED`. A worker selects the oldest available job, locks the row, and any other worker running the same query skips past it instead of waiting.

```sql
UPDATE jobs
SET status = 'running',
    attempts = attempts + 1,
    locked_at = now()
WHERE id = (
    SELECT id
    FROM jobs
    WHERE status = 'pending'
      AND run_after <= now()
    ORDER BY run_after
    FOR UPDATE SKIP LOCKED
    LIMIT 1
)
RETURNING id, kind, payload;
```

That's the whole claim step. No broker, no extra infrastructure to monitor and, crucially, the job can be inserted **in the same transaction** as the business change that caused it. If the order is saved, the "send confirmation email" job is saved. If the transaction rolls back, neither exists. That alone removes a whole class of bugs that distributed systems spend a lot of effort on.

## The details that matter

A few things separate a queue that works in a demo from one that survives production:

- **Idempotent handlers.** A worker can crash after doing the work but before marking the job complete. The job will run again, so every handler must be safe to repeat. An idempotency key stored with the side effect is usually enough.
- **Backoff.** On failure, set `run_after` to something like `now() + interval '1 minute' * 2 ^ attempts`, with a cap, so a broken dependency doesn't get hammered.
- **A dead-letter state.** After a fixed number of attempts, move the job to `failed` and alert a human. Infinite retries hide problems.
- **Stuck-job recovery.** If `locked_at` is older than your longest reasonable job, a worker probably died. A small sweeper can put those back to `pending`.
- **Cleanup.** Completed jobs pile up. Delete or archive them on a schedule, or partition the table by day.

## When to move on

PostgreSQL stops being the right queue when the queue starts hurting the database that everything else depends on. The signals I look for:

1. **Throughput.** Thousands of jobs per second create a lot of row churn and vacuum pressure. If autovacuum on the jobs table is a regular topic in your incident reviews, it's time.
2. **Fan-out.** If one event needs to reach many independent consumers, each reading at its own pace, you want a log such as Kafka, not a work queue.
3. **Cross-team boundaries.** When other teams need to consume your events without access to your database, a broker gives you a contract instead of a shared table.
4. **Retention and replay.** If you need to replay last week's events into a new service, a log is built for exactly that.

None of these is a size you can predict on day one, which is the point. Start with the queue you already operate, keep the job interface small (`enqueue(kind, payload, options)`), and swapping the implementation later is a contained piece of work rather than a rewrite.

## A note on outboxes

The same idea scales up. When I do introduce Kafka, as on the Ledgerline reconciliation project, I still write events to an `outbox` table in the same transaction as the business change, and a relay publishes them to the broker. The database remains the source of truth; the broker is how the news travels.

Boring technology isn't about refusing new tools. It's about spending your complexity budget where your product is actually different, and the job queue rarely is.
