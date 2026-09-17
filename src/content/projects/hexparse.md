---
title: "Hexparse"
slug: hexparse
summary: "hex-dump annotation against C struct definitions"
kinds: [open-source]
started: 2022-02
ended: 2022-11
status: archived
tech: ["rust", "wasm"]
links:
  - platform: github
    url: https://github.com/deshmukhmayur
---

Hexparse is a binary dump annotation tool: paste a hex blob, hand it a C struct definition, and get a field-mapped breakdown instead of a wall of bytes. Runs entirely in the browser via wasm.

## why it exists

Reading file formats from hex dumps by counting offsets on fingers was error-prone and joyless. Mapping the dump against the struct definition made every field visible and every offset checkable.
