# Grilling: Work/projects section content model

Type: grilling
Status: resolved
Assignee: opencode (claimed this session)

## Question

Pin down the Work section's content model and UI. This covers programming/work/open-source projects: a listing page plus detail pages carrying screenshots, tech stack, and other metadata, with an optional case study/article per project. Decide: project entry schema (frontmatter: screenshots, tech stack, repo/demo links, role, dates, status), how the optional case study relates to Studies (same content reused, or a link-out?), listing layout (featured projects vs. full list, filtering by type: work/open-source), and detail-page layout. Load `grilling` and `domain-modeling` skills.

## Answer

**Work entry schema** (frontmatter):
- `title`, `slug` (stable kebab-case — the join key Studies' `projects[]` references; never changes once published), `summary` (one-liner for listing tiles).
- `kinds[]`: closed **multi-select** from `work` (employer/professional), `open-source`, `personal`. Employer projects that contribute to open-source upstreams check both `work` + `open-source`. The listing filter row offers only kinds that actually occur in content.
- `started` (month precision), `ended` (null = ongoing), `status: active | maintained | archived` (lifecycle), `draft: false` (publication flag — two fields, no overloading).
- `role` (optional string, mainly for employer work), `tech[]` (open list of strings, shown as a tag run — no closed vocabulary to maintain), `links[]` of `{platform, url}` (like Prints' modelLinks), `screenshots[]` (1–4 via astro:assets, required alt, consistent with art/prints), `featured` flag (homepage work+skills pane pulls 2–3).
- Body markdown = always-present overview (what/why/highlights).

**Case studies**: no new content type, no duplication. Project body carries only the overview; long-form case-study narrative = a **Study** entry cross-linked via `projects[]` (per ticket 06's many-to-many edge). Work detail shows a "Related studies" section; project body may link "read the full case study →" to the Study.

**Listing**: one `/work/` page, full list, no pagination, flat (no year grouping), sorted by `started` desc, kind filter row (`$ ls work --kind open-source`), terminal-window tiles (screenshot-led). `featured` items go to the homepage pane; the listing shows everything.

**Detail page**: console-output style per ticket 14 vocabulary — hero screenshot, `$ identify`-style metadata block (kinds, status, dates, role, tech run, links), screenshot gallery, body overview, related Studies row. Exact styling graduates to a prototype ticket.

**URLs**: `/work/` listing, `/work/<slug>/` detail.

Glossary updated: Work entry, Kinds (see `CONTEXT.md`). Listing/detail styling → ticket 17.