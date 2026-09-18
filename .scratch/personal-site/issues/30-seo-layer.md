# 30: SEO layer — head, feeds, JSON-LD, OG images

**What to build:** The full metadata layer per spec §8. BaseHead owns the `<head>`: title cascade (homepage bare / detail `<title> — deshmukhmayur.com` / listings `<Section> — Mayur Deshmukh`), description cascade (per-page → per-section constants fallback → sitewide default), canonical link, theme-color, RSS discovery links, social tags (`twitter:site`, `og:site_name`, `og:type article` on details), card type `summary_large_image`. Sitemap + hand-written allow-all robots. Three RSS 2.0 feeds (`/rss.xml` sitewide Studies-led, `/studies/rss.xml`, `/soliloquy/rss.xml`) with the locked titles/descriptions and summary-only descriptions. JSON-LD: Person everywhere, Article on study details, CreativeWork on art/prints details, `sameAs` with all six identity profiles. OG images: hand-made static per-section 1200×630 PNGs; entries opt in via colocated `ogImage` frontmatter, else a satori-generated terminal card with the entry title.

**Blocked by:** 28 (homepage), 29 (interiors — all routes must exist so head/feeds cover every page).

**Status:** done

- [x] Every page emits correct title/description per the cascade; canonical present
- [x] `sitemap-index.xml` + `robots.txt` live; all pages (incl. `/resume/`) indexable
- [x] All three feeds render correct titles/descriptions, summary-only entries, footer/discovery links resolve
- [x] JSON-LD validates (Person / Article / CreativeWork); Google Rich Results Test clean on a sample page
- [x] OG fallback: an entry without `ogImage` gets a satori-generated card; sections get their static PNGs (placeholders acceptable until ticket 32)
