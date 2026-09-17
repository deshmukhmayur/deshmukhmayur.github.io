# 25: Studies section + the Studies ↔ Projects join

**What to build:** Visitors can read substantive write-ups. Schema per spec §4: title, date, summary, open tags shared with Soliloquy, featured, status (draft|published), `projects[]` — many-to-many edge to project slugs, validated against the projects collection at build. Listing: unframed editorial — featured lead study + dated ledger rows (date | title + italic summary | project/tags) under hairline dividers. Detail: unframed article + right sidebar with `$ identify <slug>.md` datasheet and related studies (by project → by tag fallback). This ticket owns the join: project detail pages now query Studies whose `projects[]` contains their slug, rendered as the unboxed related list (cyan titles, dim italic summaries, dashed dividers).

**Blocked by:** 21 (terminal shell), 22 (projects section — receiving end of the join).

**Status:** done

- [x] `/studies/` shows featured lead + ledger rows under hairline dividers
- [x] `/studies/<slug>/` renders article + `#`-prefixed datasheet sidebar + related studies
- [x] Project detail pages list their related studies
- [x] Build fails when `projects[]` references an unknown project slug; `draft` entries excluded from all pages
