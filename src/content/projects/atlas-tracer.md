---
title: "Atlas Tracer"
slug: atlas-tracer
summary: "distributed tracing visualizer — a million spans, one readable flamegraph"
kinds: [work]
started: 2024-03
status: active
role: "tech lead"
tech: ["go", "clickhouse", "otel"]
links:
  - platform: github
    url: https://github.com/deshmukhmayur
screenshots:
  - src: "../../assets/projects/atlas-tracer/shot-1.png"
    alt: "Placeholder screenshot of the flamegraph view, to be replaced with the real project screenshot."
  - src: "../../assets/projects/atlas-tracer/shot-2.png"
    alt: "Placeholder screenshot of the service map, to be replaced with the real project screenshot."
featured: true
---

Atlas Tracer takes raw distributed traces from a fleet of services and reassembles them into a single, readable flamegraph — a request's whole journey, honestly rendered even under aggressive sampling.

## why it exists

Head sampling kept the boring 98% and dropped the interesting 2%. Rebuilding the path deterministically from ClickHouse keeps the trace view honest at 1% sampling rates, so on-call engineers stop guessing where a latency spike came from.
