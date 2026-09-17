---
title: "Rebuilding the trace view at 1% sampling"
date: 2026-08-30
summary: "Why head sampling lies, and how Atlas Tracer reassembles the honest path from ClickHouse."
tags: [observability, backend]
featured: true
status: published
projects: [atlas-tracer]
---

Head sampling kept the boring 98% and dropped the interesting 2%. This write-up walks through the failure mode we kept hitting on call, and the deterministic rebuild that fixed it: replay spans from ClickHouse against a seeded sampler, so the trace view is reproducible instead of lucky.

The core trick is boring on purpose — same seed, same spans, same tree, every render. Once the path is deterministic, debugging a latency spike stops being an exercise in trusting a 1% coin flip.

## results

- p99 trace completeness went from ~40% to 100% for sampled-out requests we care about.
- Storage stayed flat: the replay reads existing spans, it doesn't sample harder.
