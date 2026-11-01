---
title: "Why I estimate in ranges, and how clients learned to like it"
excerpt: "A single number feels reassuring and is almost always wrong. Ranges with stated assumptions lead to better decisions and fewer awkward conversations."
category: "Working together"
publishedAt: 2026-09-02
author: "Mira Castell"
image: "../../assets/images/journal/estimating-in-ranges.jpg"
imageAlt: "Bar chart with a rising line representing a range of possible outcomes"
---

Early in my freelance career a client asked how long a new billing integration would take. I said six weeks. It took eleven. Nothing went catastrophically wrong: the payment provider's sandbox behaved differently from production, a tax rule turned out to vary by region and the client's finance team needed two extra reports. Each surprise was reasonable. The estimate wasn't.

Since then I've estimated almost everything as a range, and I've found clients prefer it once they see how it works.

## What a range says that a number doesn't

"Six weeks" hides two pieces of information: how confident I am, and what I'm assuming. "Five to nine weeks, most likely around six" exposes both. The width of the range is a direct measure of uncertainty, and the conversation naturally moves to *why* it's that wide.

That conversation is the valuable part. Usually the answer is a short list of unknowns:

- We haven't seen the provider's production behaviour.
- The reporting requirements aren't written down yet.
- We don't know if the legacy customer records are clean.

Each unknown is something we can reduce, often cheaply. A two-day spike against the real API might narrow the range by a fortnight. That's a trade a client can make knowingly, rather than discovering it in week seven.

## How I build the range

I break the work into pieces no bigger than a few days, then give each piece three numbers: an optimistic case, a likely case and a pessimistic case. The pessimistic case isn't "everything goes wrong". It's "the realistic bad version of this task".

Adding the likely cases gives the middle. For the ends I don't simply add all the optimistic or all the pessimistic numbers, because it's unlikely everything goes perfectly or terribly at once. A simple rule of thumb works well enough for most projects: take the likely total and add or subtract a share of the spread between optimistic and pessimistic totals. The exact formula matters far less than writing the assumptions next to it.

## Fixed price, still honest

Some clients need a fixed price for budgeting, which is fair. In those cases I quote near the top of the range and say so. If the work comes in under, we agree upfront whether the remaining time goes to polish, documentation or a smaller invoice. Either way, nobody is surprised.

For open-ended work I prefer a monthly retainer with a clear scope for each month, reviewed every fortnight. Ranges still guide the plan; they just don't become the contract.

## Updating the range

An estimate made before work starts is the least informed estimate you'll ever make. I update the range at every fortnightly demo, and I show the history so clients can see the range narrowing as unknowns are resolved. If it widens, that's a signal worth discussing straight away, not at the end.

The clients who were most sceptical at the start are often the ones who reuse the format internally afterwards. A range with assumptions isn't hedging. It's the most honest thing an engineer can say about the future, and it leads to better decisions than a confident number that everyone quietly doubts.
