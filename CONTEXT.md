# Context

Glossary for the personal site's content domains. No implementation details here — see `.scratch/personal-site/` for the effort map and spec, and `docs/adr/` for architecture decisions.

## Terms

- **Soliloquy** — a casual writing entry, may be micro (short, no title; date-ordinal URL unless an optional `slug` is given). Dated by datetime (multiple per day allowed, time-of-day ordering). Images only via markdown body (no thumbnail field). One of the two writing content types.
- **Studies** — a substantive write-up: case study, finding, or experiment. Dated by plain date. Has a `summary`, `featured` flag, and `projects[]` — a many-to-many link to Project slugs (one Study can relate to several Projects; one Project to several Studies). Project detail pages show Studies whose `projects[]` contains their slug.
- **Art** — a publish-ready visual work (anime-style illustration, sketch/doodle, or car sketch). Taxonomy: optional collection + subject tags; medium is a structured field.
- **Print** — a publish-ready finished 3D print (gallery entry = one finished print). Failures appear only as attempts inside a Print's log, never as standalone entries.
- **Maker log** — dated, chronological markdown sections within a single Print's body documenting the build, including failed attempts.
- **Model links** — external URLs ({ platform, url }) to where a Print's model lives (Printables/Thingiverse/MakerWorld). Present even for self-designed prints once uploaded.
- **Writing tags** — open (freeform) tag vocabulary shared across Soliloquy and Studies, unlike Art's closed subject tags. Used as a secondary filter row per listing.
- **Project entry** — a programming project (employer/professional, open-source, or personal; section formerly called "Work") with a stable `slug` that Studies' `projects[]` references. Carries an overview body only; long-form case-study narrative lives in a Study linked via `projects[]`, never duplicated into the entry. Screenshots are optional (0–4, alt required when present) — a project is complete without any, and neither the listing nor the detail page depends on them.
- **Kinds** — closed multi-select classifying a Project entry: `work` (employer), `open-source`, `personal`. An employer project contributing upstream to OSS carries both `work` and `open-source`. Drives the Projects listing's filter row. The kind value `work` persists even though the section is named Projects.
- **Terminal chrome** — Space Mono page furniture (prompts, captions, titlebars, filters, status lines). Always lowercase, terse, limited punctuation set. May be decorative; see also Editorial prose. Voice rules live in ADR 0007.
- **Editorial prose** — Spectral body text (Studies, Soliloquy, about, descriptions). Normal capitalization, casual first-person (Mayur), never corporate. May address the visitor as "you"; may end sentences with "!" — both forbidden in chrome.
- **Command** — a `$`-prefixed terminal line. Real commands do the thing (`$ send` submits the form, `$ curl -O resume.pdf` downloads); all others are decorative, never clickable, never imply the visitor can run their own. Verbs must be real POSIX commands or established shell-culture commands (e.g. `git show` → `show` opens a detail page).
- **Functional output vs flavor** — command output that is functional (counts, dates, paths, stats) must be real data; flavor fields (uptime, os, host) may be fictional but plausible.
