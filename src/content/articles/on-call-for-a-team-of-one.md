---
title: "On-call for a team of one"
excerpt: "When you're the only engineer, every alert is yours. Here's how small teams can set up monitoring that wakes you for the right things and lets you sleep through the rest."
category: "Operations"
publishedAt: 2026-05-12
author: "Mira Castell"
image: "../../assets/images/journal/on-call-for-one.jpg"
imageAlt: "Concentric rings with scattered points representing services being monitored"
---

Many of my clients have one or two engineers when we start working together. They don't have an operations team, an on-call rotation or a dashboard wall. They have a phone that buzzes, and an engineer who has learned to dread it.

Good monitoring for a tiny team looks different from monitoring at a large company. The goal isn't coverage. It's sleep.

## Alert on symptoms, not causes

The most common mistake I see is alerting on causes: CPU above 80%, memory above 90%, a queue longer than 1,000 jobs. Those numbers are interesting, but none of them means a user is having a bad time. CPU at 85% during a nightly batch job is fine.

Instead, alert on what users experience:

- **Can people reach the site?** An external uptime check every minute from more than one region.
- **Are requests failing?** The share of 5xx responses over five minutes.
- **Is it unusably slow?** The 95th percentile response time on the pages that matter.
- **Is the important background work happening?** "No payment has been reconciled in 30 minutes during business hours" is a far better alert than "queue length is high".

Keep the cause metrics on a dashboard for when you're investigating. Don't let them wake you.

## Two levels, no more

Every alert should be one of two things:

1. **Page me.** A user-facing problem that won't fix itself. These go to your phone, day or night.
2. **Tell me tomorrow.** Something worth looking at, but not urgent. These go to a chat channel or an email digest.

If an alert fires and you decide it can wait, move it down a level the next day. If an alert fires and you can't do anything about it, delete it. A single engineer can't afford alerts that train them to ignore the phone.

## Make the first five minutes easy

When you're woken at 3am, you won't remember how anything works. For each paging alert, write a few lines in a runbook: what it means, where to look first and the safe things to try. Link the runbook from the alert itself.

The best runbooks I've seen are short and specific: "Check the provider's status page. If they're down, switch the feature flag `payments_fallback` on. Post in the customer channel using the template below."

## Have a plan for being unavailable

A team of one still takes holidays and gets ill. Agree with the business what happens when you're away: which alerts go to a backup contact, which features can be paused and which customers need to hear about it. Writing this down is uncomfortable, and it's much better than working it out on a beach.

## Review once a month

Spend an hour each month looking at every alert that fired. Was it real? Did it need a human? Was the runbook useful? Tuning alerts is ongoing work, and an hour a month is a lot less than the cost of one unnecessary night on call.

Small teams can run reliable systems. It just takes being deliberate about what deserves your attention.
