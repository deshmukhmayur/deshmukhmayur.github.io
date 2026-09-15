# Prototype: Projects listing + detail page

Type: prototype
Status: resolved
Assignee: opencode (claimed this session)

## Question

Prototype the Projects section's pages (renamed from "Work" per Mayur — the kinds vocabulary `work`/`open-source`/`personal` is unchanged), per the content model in ticket 11. Listing page (`/projects/`): full list sorted by `started` desc, kind filter row (`$ ls projects --kind open-source`), screenshot-led terminal-window tiles. Detail page (`/projects/<slug>/`): hero screenshot, `$ identify`-style metadata block (kinds, status, dates, role, tech run, links), screenshot gallery, body overview, related Studies row. Reuse the windowed-tile / console-output vocabulary from ticket 14's art gallery prototype. Load `prototype` and `frontend-design` skills.

## Answer

**Listing = variant D, reworked**: no featured hero (featured treatment lives only in the homepage pane). The listing is a pure terminal listing — the `ls projects --kind` filter row is the only command line; below it, unboxed `ls`-style rows sorted `started` desc: cyan `slug/` filename, dim one-line summary (ellipsis-truncated), right-aligned `kind · tech · status-dates`. No boxes, borders, or header row. Screenshots are **optional**: rows with screenshots pop a small windowed preview (`slug.png · 1/N`) on hover; rows without stay clean.

**Detail = variant D**: README-window content flow on the left (titlebar `slug/README.md · rendered`, intro, inline screenshots, `##`-prefixed sections) with a neofetch-style right sidebar: `$ identify slug` command line above a bare datasheet box (kinds/status/dates/role/tech/links, no titlebar), then related Studies as an unboxed single-column list view (cyan title, dim italic summary, dashed dividers). Related-studies color coding to be tuned during implementation.

**Schema change**: screenshots drop from required (1–4) to optional (0–4, required alt when present) — most projects won't have any, and neither page depends on them anymore.

Prototype: `prototype/projects-prototype.html` on branch `prototype/homepage-look` (variants D are the winners; A–C kept as primary source).
