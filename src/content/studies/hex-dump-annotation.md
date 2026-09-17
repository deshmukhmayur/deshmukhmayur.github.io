---
title: "Hex dumps don't have to be a wall of bytes"
date: 2026-05-02
summary: "Mapping a hex blob against a C struct definition turns offsets on fingers into a field view."
tags: [rust, wasm, tools]
status: published
projects: [hexparse]
---

Hexparse started as a scratchpad for reading file formats without counting offsets on my fingers. This study covers the wasm compilation path, why the parse-as-you-paste loop matters more than pretty printing, and where struct definitions meet reality (padding, unions, and other lies).

The tool runs entirely in the browser — no upload, no server — which shaped the whole architecture: the struct definition file is the only input, and everything else is a pure function over the bytes.
