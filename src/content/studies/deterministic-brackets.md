---
title: "Deterministic brackets for people who argue about byes"
date: 2026-07-19
summary: "Seeding, byes, and rematch avoidance as auditable decisions instead of spreadsheet folklore."
tags: [typescript, design]
status: published
projects: [bracketeer]
---

Every local league I played in ran its season off a hand-edited spreadsheet, and every season had the same arguments. This is the write-up behind Bracketeer's engine: seeding as a pure function, byes assigned by rule, and a rematch-avoidance pass you can replay and check.

The interesting part wasn't the graph algorithms — it was making every decision inspectable. The library emits a decision log alongside the bracket, so "why did we get the bye?" has an answer that isn't "because someone said so."
