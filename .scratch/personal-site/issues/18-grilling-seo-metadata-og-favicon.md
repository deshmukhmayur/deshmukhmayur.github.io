# Grilling: SEO/metadata/OG images/favicon strategy

Type: grilling
Status: resolved

## Question

Settle the SEO/metadata layer for the new site (currently index.html carries stale OG/Twitter meta with an outdated description "User Experience Designer and a Web Developer"):

- Per-page `<title>`/meta description pattern (template per section vs. hand-written per page).
- OG images: one static sitewide card vs. per-section images vs. per-page images generated at build (Astro can do this). Which for which routes?
- Favicon/branding refresh: keep current favicon.png vs. a terminal/ASCII-flavored mark fitting the visual system.
- Sitemap (`@astrojs/sitemap`) + robots.txt.

Graduated from map fog (was "SEO/metadata, OG images, favicon/branding refresh"). Note: the Pinterest `p:domain_verify` meta tag decision belongs to ticket 19, not here. Load `grilling` + `domain-modeling` skills.

## Answer

All decisions settled over three grilling rounds (RSS added by Mayur mid-ticket):

- **Titles**: templated via a `<BaseHead>` component (`title?`, `description`) — homepage omits `title`; detail pages `<title> — deshmukhmayur.com`; listings `<Section> — Mayur Deshmukh`. No hand-written per-page titles.
- **Descriptions**: optional per page → per-section fallback (one hand-written line per listing, small constants file) → new sitewide default replacing the stale "User Experience Designer and a Web Developer". Art/prints detail descriptions derive from existing `description`/`summary` frontmatter.
- **OG images**: hand-made per-section static 1200×630 PNGs (terminal-styled; ~7: home, projects, art, prints, studies, soliloquy, about). Writing entries (Studies/Soliloquy) **opt in** via colocated frontmatter `ogImage: ./og.png` (file next to the entry markdown, like art photos); entries without it fall back to a **satori-generated** terminal-style card rendering the entry title. Upgrade to per-page generation later only if wanted. Generated-card choice between `satori`/`astro-og-canvas`/`astro-takumi` is an implementation-time pick.
- **Favicon**: keep current `favicon.png` unchanged.
- **Sitemap/robots**: `@astrojs/sitemap` + hand-written allow-all `robots.txt`; everything indexable including `/resume/`.
- **Social meta**: keep `twitter:site @deshmukhmayur_` (card type may move to `summary_large_image` once section cards exist); `og:site_name` = "Mayur Deshmukh". `og:type` = `article` + `article:published_time` on detail pages.
- **RSS** (added this ticket): RSS 2.0 via `@astrojs/rss` — **three feeds**: sitewide `/rss.xml` (Studies by default for external sharing), `/studies/rss.xml`, `/soliloquy/rss.xml`. Summary/description only (no full content, no image absolute-URL headaches). Discovery `<link rel="alternate" type="application/rss+xml">` tags in `<BaseHead>`; footer already links rss (spec §3).
- **Extra SEO**: canonical `<link rel="canonical">` on every page (cheap trailing-slash insurance); `theme-color` meta for light/dark. No `meta author`.
- **JSON-LD**: syntax JSON-LD, vocabulary schema.org, validated in Google's Rich Results Test. `Person` (name, url, sameAs → GitHub/Instagram/ArtStation/LinkedIn/Twitter) on **every page**; `Article` (not `BlogPosting` — the type Google documents/validates) on Study detail pages; `CreativeWork` on art/prints detail pages.
