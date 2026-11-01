---
title: "My first week on a legacy codebase"
excerpt: "The checklist I follow when I join a team with years of history in its code: what to read, who to talk to and what not to change yet."
category: "Engineering"
publishedAt: 2026-07-21
author: "Mira Castell"
image: "../../assets/images/journal/legacy-codebase.jpg"
imageAlt: "Code editor window with highlighted lines"
---

Almost every engagement starts with code someone else wrote. Sometimes it's two years old, sometimes fifteen. The temptation in week one is to form strong opinions quickly. I've learned to resist it, because the code almost always makes more sense once you know the constraints it was written under.

Here's how I spend the first five days.

## Day one: get it running

Before reading anything in depth, I try to run the system locally from the README alone. Wherever I get stuck, I write it down and fix the README in my first pull request. It's a small, uncontroversial change, it helps the next person and it shows the team how I work.

I also check that I can run the tests, and I note how long they take. A forty-minute test suite tells you a lot about how often people run it.

## Day two: follow one request

I pick the most important user journey (placing an order, booking an appointment, generating a report) and follow a single request through the code from the browser to the database and back. I draw it out on paper as I go: which services, which tables, which queues, which third parties.

That one diagram is often more useful than any existing architecture document, because it shows how the system *actually* behaves rather than how it was designed to.

## Day three: read the history

`git log` is the most underrated documentation in any codebase. I look at:

- **The files that change most often.** These are where the product is still evolving, and where bugs tend to live.
- **The largest recent commits.** Big changes often follow incidents or deadlines.
- **Old commit messages near confusing code.** "Workaround for bank X sending duplicate files" explains a lot.

I also skim the last few months of incident reports and support tickets if the team will share them. The code tells you what the system does; incidents tell you what it does badly.

## Day four: talk to people

I book thirty minutes with each engineer, plus someone from support and someone from product. I ask everyone the same three questions:

1. What do you wish you could change about the system?
2. What are you afraid to touch?
3. What's working well that I shouldn't break?

The third question matters. Teams that have lived with a codebase for years have usually built good habits around its weak spots, and an outsider can easily stamp on them.

## Day five: write it down, change nothing big

By Friday I write a short document: how the system works as I understand it, the risks I've seen and the questions I still have. I share it with the team and ask them to correct me. It's usually about 70% right, and the corrections are the most valuable part of the week.

What I don't do in week one is refactor, upgrade frameworks or propose a rewrite. There'll be time for that once I understand what the current design gets right. The first week is for earning enough trust, and enough understanding, to make the second week count.
