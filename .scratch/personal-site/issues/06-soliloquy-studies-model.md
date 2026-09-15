# Grilling: Soliloquy / Studies content model

Type: grilling
Status: closed
Assignee: opencode (claimed this session)

## Question

Pin down the writing area's content model. Known so far: two content types under one umbrella — Soliloquy (casual entries) and Studies (case studies, findings, experiments) — with visually distinct listings, and Studies entries are portfolio-relevant for employers. Decide: frontmatter schema for each, whether Studies get a portfolio cross-link (appearing under Work too), listing styles, chronological vs. tag navigation, and whether Soliloquy entries can be short/micro (like a status). Load `grilling` and `domain-modeling` skills.

## Resolution

**Soliloquy** (casual entries):
- Frontmatter: `title?` (optional — micro entries allowed), `datetime` (multiple per day allowed, ordered by time-of-day), `slug?` (optional override; titleless entries default to a date+ordinal URL, e.g. `/soliloquy/2026-09-04-2/`), `tags[]` (optional, open vocabulary).
- Images supported via markdown body only; no thumbnail field for now.
- Listing: compact log/timeline feel ("terminal journal"); exact styling goes to a prototype ticket.

**Studies** (substantive write-ups):
- Frontmatter: `title`, `date`, `summary` (1–2 lines, shown on listing), `tags[]` (open vocabulary), `featured` flag (homepage studies+soliloquy pane pulls 1–2), `status: draft|published`, `projects[]`.
- `projects[]` is a **many-to-many** edge to Work: one Study relates to several Work slugs, one Work item to several Studies. Single source of truth on the Study; the Work detail page queries Studies whose `projects[]` contains its slug. Slug validation against the work collection gets enforced once the Work content model ticket lands.

**Navigation/URLs**: chronological spine for both; per-type tag-filter row (like art's `$ ls art --tag`); one shared open tag universe across both writing types. Separate URLs: `/soliloquy/<slug>/`, `/studies/<slug>/`, each with its own listing page.

Glossary updated: Soliloquy, Studies, Writing tags (see `CONTEXT.md`).
