---
title: "Ledgerline"
slug: ledgerline
summary: "internal ledger reconciliation service for subscription billing"
kinds: [work]
started: 2021-06
ended: 2023-12
status: maintained
role: "backend engineer"
tech: ["node", "postgres"]
links:
  - platform: github
    url: https://github.com/deshmukhmayur
---

Ledgerline reconciled a subscription-billing ledger against payment-provider exports nightly, surfacing drift before invoices did. The drift report became the finance team's first read of every morning.

## why it exists

Billing drift is invisible until a customer notices. A nightly reconciliation with a human-readable drift report moved those discoveries from angry-inbox time to quiet-morning time.
