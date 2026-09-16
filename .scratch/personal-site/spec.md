# Site spec: deshmukhmayur.com — personal playground rebuild

Synthesized from wayfinder map `.scratch/personal-site/` (tickets 01–08, 11, 13–18). This spec hands off to the implementation effort. Decisions are locked; anything marked *open* is an implementation-time choice.

## 1. Stack & hosting

- **Framework**: Astro 5, static output (`output: 'static'`), no adapter. Repo root already holds a working scaffold (ticket 13).
- **Hosting**: Cloudflare Workers with static assets (not Pages — Pages is legacy). `wrangler.jsonc` at root:
  - `assets.directory: "./dist"`, `not_found_handling: "404-page"`, `html_handling: "auto-trailing-slash"` (defaults fine). **No Worker `main`** for the static site — pure asset requests are free and unlimited.
  - `routes: [{ pattern: "deshmukhmayur.com", custom_domain: true }]`; www covered by a Cloudflare Redirect Rule (www → apex) + proxied placeholder DNS record.
  - If a Worker script is ever added (contact API), set compatibility date ≥ 2025-04-01 so navigations prefer asset serving.
- **CI**: GitHub Actions on push to `main`: checkout → build (`npm ci && npm run build`) → `cloudflare/wrangler-action@v3` with `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` repo secrets. (Workers Builds is the fallback alternative.)
- **Headers/redirects**: `_headers` in `public/` — `/_astro/*  Cache-Control: public, max-age=31556952, immutable`; defaults (must-revalidate) elsewhere. `_redirects` for any path-level redirects (e.g. old-URL mapping, see §9). Limits: 100 header rules, 2,000 static redirect rules.
- **Limits to respect**: 20k files/version, 25 MiB/file — non-issues for this site; art originals are committed pre-compressed (§4).
- **Contact Worker**: separate tiny Worker for the form API (§6); analytics is Cloudflare Web Analytics, no self-hosted analytics (§7).

## 2. Visual direction (all pages)

Terminal/TUI aesthetic, established by the homepage prototype (ticket 03) and extended per-section:

- **Full-bleed terminal**: JetBrains Mono, charcoal dark default with green/cyan/amber/pink accents; light theme required (toggle inverts the terminal palette). No window chrome on the homepage itself.
- **Terminal voice stays in frames/captions/commands**; content (art, prose) fills unframed space. Metadata appears as command output (`$ identify <file>` blocks, `ls` filter rows), not cards.
- **Shared vocabulary**: terminal-window tiles (filename titlebar + caption row), `ls --flag` filter rows, breadcrumbs `~/art $ home / art / <slug>`, ASCII footer. Reuse components across art/prints/projects listings.
- **Typefaces**: exactly two faces, both OFL (self-hosted) — **Space Mono** for all terminal chrome (breadcrumbs, titlebars, chips, metadata blocks, timestamps, footer) and **Spectral** for editorial prose (Studies/Soliloquy bodies). A third face can be added later if dense UI text needs it (ADR 0006). *Open*: italic/lato weight subsets to self-host, font-display strategy.

## 3. IA / routes

```
/                        homepage (neofetch header + panes)
/projects/               projects listing           /projects/<slug>/      detail
/art/                    art masonry gallery        /art/<YYYY-MM-DD>-<slug>/  detail
/prints/                 prints contact-sheet       /prints/<YYYY-MM-DD>-<slug>/  detail
/soliloquy/              soliloquy log              /soliloquy/<slug>/     detail (titleless → /soliloquy/<YYYY-MM-DD>-<ordinal>/)
/studies/                studies ledger             /studies/<slug>/       detail
/about/                  about + resume download button
/resume/                 download-interstitial page (counts resume downloads, §7)
/contact/                contact page (terminal-form; homepage contact pane mirrors it)
/404                     404 page (serves as 404.html)
/rss.xml                 feed (footer links rss)
```

Homepage (prototype variant F): neofetch-style about header directly on the background (own illustration ~200px square, whoami → name, résumé link, one-line bio, `now → employer · tenure`); panes — work (wide) + skills pane beside it, art + prints row, studies + soliloquy row; social links top-right **inside their relevant pane** (work → github/linkedin, art → cara/instagram, prints → printables); "soliloquy of the day" muted line; ASCII cat + `© year mayur deshmukh · rss` footer. Featured slots: projects 2–3, art 3–4, prints 2–3, studies 1–2 (via `featured` flags).

*Interiors* (ticket 20): about = `$ whoami --verbose` dl + `~/.history` timeline + right column (`$ curl -O resume.pdf`, `ls content --count` stats, `ls elsewhere/`); contact = minimal mail-session form (shared component with the homepage pane, inline `$ send ok`/`$ send: error`, no redirect) + unboxed `man contact` rail; 404 = neofetch-style with ASCII-cat logo slot + `$ ls ~` nav. Command vocabulary site-wide: real POSIX verbs only (`ls`/`cat`/`identify`/`open`/`mail`/`curl`/`man`/`whoami`), `ls <dir> --flag` filters, `$ send` buttons, `#` comments for asides. Details + prototype: `.scratch/personal-site/issues/20-prototype-interiors-about-contact-404.md` / `prototype/interiors-prototype.html`.

## 4. Content models (Astro content collections)

All image fields go through astro:assets with **required `alt`** (Zod schema `z.string().min(1)`, build fails without). Images: `<Picture>` with widths 480/960/1600, `formats={['avif','webp']}`, jpg fallback.

**Art** (`src/content/art/<YYYY-MM-DD-slug>.md`; assets `src/assets/art/<slug>/main.jpg` + `process-N.jpg`):
`title, publishDate, featured?, medium (digital|pencil|ink|mixed), tools[], collection?, tags[], description?, images { main, process[]? }, alt` (alt required).
Taxonomy: optional curated `collection` (0–1 per artwork) + closed-starter subject tags (anime, car, doodle, portrait, fanart, original; extend deliberately). Publish-ready only (no draft flag). Gallery: unified masonry of windowed tiles — titlebar `filename … date`, caption `collection · medium · #tags` (flex-wrap, no truncation), `$ ls art --tag` filter; tiles → detail, no lightbox. Detail: console-output — full-width image, `$ identify` metadata block, `process/` thumbs pane, related works (same collection → same tags → hide). Related: up to 3.

**Prints** (`/prints/<YYYY-MM-DD>-<slug>/`):
`title, date, printer, material, durationHours, photos[] (required alt), description, modelLinks[] of {platform, url}, tags[], featured?`. Print settings (layer height, infill, supports) stay freeform in body markdown. Maker log = dated markdown sections in the body; failures only as attempts inside a successful print's log. Listing: contact-sheet grid of uniform windowed tiles (titlebar filename + duration, caption `printer · material · #tags`), `$ ls prints/` filter with `--material=`/`--printer=` chips. Detail (fact sheet + timeline): sticky left photo column + photo-set thumbs; right — `specs` datasheet window, `models & notes` window (`↗` links), dotted maker-log timeline (pink-dot failures).

**Soliloquy** (`/soliloquy/<slug>/`; titleless → `<YYYY-MM-DD>-<ordinal>`):
`title?, datetime (multiple/day, time-ordered), slug?, tags[]` (open vocabulary). Images via markdown body only. Micro entries allowed. Listing: date rail — sticky left month rail, timestamped entries (pink `[date · time]`), dim micro one-liners, inline image thumbs, `$ ls soliloquy --tag` filter. Detail: printout — narrow perforated view, `· · ·` EOF mark, `$ cd ../entry-NN` prev/next.

**Studies** (`/studies/<slug>/`):
`title, date, summary (1–2 lines), tags[] (open, shared with Soliloquy), featured?, status (draft|published), projects[]`. `projects[]` = many-to-many edge to project slugs (single source of truth on the Study; project detail queries Studies whose `projects[]` contains its slug — validate slugs against the projects collection at build). Listing: unframed editorial — featured lead study + dated ledger rows (date | title + italic summary | project/tags) under hairline dividers. Detail: unframed article + right sidebar — `$ identify <slug>.md` specs datasheet (date/status/tags/projects), then related studies: by project → by tag fallback (mirrors art's rule).

**Projects** (`/projects/<slug>/`; renamed from "Work"; slug = stable join key):
`title, slug, summary, kinds[] (closed multi-select: work|open-source|personal), started (month), ended? (null = ongoing), status (active|maintained|archived), draft (separate publication flag), role?, tech[] (open list), links[] of {platform, url}, screenshots[] (optional 0–4, required alt when present), featured?, body = overview only`. Case studies are Studies cross-linked via `projects[]` — no new type, no duplication. Listing: unboxed `ls`-style rows under the `ls projects --kind` filter (cyan `slug/`, dim one-line summary, right-aligned kind · tech · status-dates); optional hover screenshot previews; no boxes. Detail: README-window content flow left + neofetch sidebar right (`$ identify` above bare datasheet box; related Studies unboxed list; color tuning at implementation).

## 5. Image import pipeline

- Originals committed to repo; `scripts/import-art.mjs` (exists, validated): strips ALL metadata/EXIF + bakes orientation, caps long edge 4096px, mozjpeg q82, scaffolds entry frontmatter; `--process` for process shots. Same rules for prints photos.
- EXIF stripped **at import**, not build (build emits the byte-identical original as an unreferenced side-effect).
- Astro 5 gotcha: `image()` comes from schema-function context (`schema: ({ image }) => ...`), not top-level import.
- CI gotcha: sharp needs platform optional deps; fix partial installs with `rm -rf node_modules/sharp node_modules/@img && npm install --include=optional`.
- The synthetic trial entry (`2026-09-04-pipeline-trial`) is replaced by real content once gathered (§9).

## 6. Contact form

- Fields: name, email, message + hidden honeypot. Nothing else.
- Backend: tiny Worker (separate from the static site) → **D1** storage (queryable inbox) + **Resend free-tier** email notification to Mayur's own address (sender = recipient). Plain reply-to-email semantics; the site never hosts threads.
- Spam: Cloudflare Turnstile (free keys) + one WAF rate-limit rule on the submit route. No custom counters.
- UX: terminal-flavored inline success/error in the contact pane (e.g. `$ send ok`), no redirect. Homepage pane and `/contact/` share the component.

## 7. Analytics

- **Cloudflare Web Analytics** (not Umami — no Workers/D1 path, and a VPS doesn't fit the zero-ops stack; not GoatCounter).
- Manual `<script defer>` beacon with site token in the Astro layout head; token wired as env/config value (public-facing, never secret).
- Per-section traffic via pageview path prefixes (no custom events).
- **Resume downloads** counted via `/resume/` — a tiny HTML page that triggers the PDF download ("download starting…" copy); doubles as a shareable resume landing link. A bare PDF link would not be counted.
- Provisioning (HITL, at deploy): add site in dashboard → copy token into config → verify dashboard after first deploy.

## 8. SEO, metadata, OG images, favicon, RSS (ticket 18)

- **BaseHead component** owns the `<head>`: props `title?`, `description?`. Title: homepage bare; detail pages `<title> — deshmukhmayur.com`; listings `<Section> — Mayur Deshmukh`. Description: per-page optional → per-section fallback (hand-written one-liners in a constants file) → new sitewide default (replaces stale "User Experience Designer and a Web Developer").
- **OG images**: hand-made per-section static 1200×630 PNGs (terminal-styled: home, projects, art, prints, studies, soliloquy, about). Studies/Soliloquy entries may opt in via colocated frontmatter `ogImage: ./og.png`; absent that, a **satori-generated** terminal card with the entry title (satori vs astro-og-canvas vs astro-takumi = implementation pick). OG image choice per route: entry opt-in → generated → section static.
- **Favicon**: keep current `favicon.png`.
- **Sitemap/robots**: `@astrojs/sitemap` + hand-written allow-all `robots.txt`; everything indexable (incl. `/resume/`).
- **Social tags**: `twitter:site @deshmukhmayur_`, `og:site_name "Mayur Deshmukh"`; `og:type article` + `article:published_time` on detail pages; card type `summary_large_image` where section/entry cards exist.
- **RSS**: `@astrojs/rss`, RSS 2.0, **three feeds** — `/rss.xml` sitewide (Studies-led, the external-share default), `/studies/rss.xml`, `/soliloquy/rss.xml`. Summary-only `<description>` (no full content). Discovery `<link rel="alternate">` in `<BaseHead>`; footer links rss.
- **Extra**: canonical `<link>` on every page; `theme-color` for light/dark.
- **JSON-LD** (JSON-LD syntax, schema.org vocab, validate in Google Rich Results Test): `Person` (name, url, sameAs) on every page; `Article` on Study details; `CreativeWork` on art/prints details.

## 9. Content gathering & migration (pending — ticket 09 open)

Content slots are defined by the models above; Mayur supplies: curated artworks (+ which are featured), print photos/specs/model links, project write-ups/screenshots/links, about text + resume PDF, social URLs, seed Soliloquy/Studies entries, homepage illustration (real art replaces the placeholder SVG doodle).
*Open fog*: what happens to existing-site content (Pinterest verification meta, old copy) — audit `index.html` during implementation (ticket 19); typeface licensing for JetBrains Mono; old-URL redirects via `_redirects`.

## 10. Build order (suggested)

1. Layout shell: terminal chrome, light/dark toggle, nav, footer, beacon slot.
2. Content collections + schemas (§4), import pipeline wired (§5).
3. Sections in dependency order: projects → art → prints → writing (models precede listings; listings reuse tile components).
4. Homepage panes pulling `featured` content.
5. About + `/resume/` + 404; contact Worker + Turnstile + D1 + Resend.
6. SEO layer (§8): BaseHead, sitemap/robots, RSS feeds, JSON-LD, OG cards.
7. `wrangler.jsonc` + CI deploy; Cloudflare Web Analytics provisioning; www redirect.
8. Content import (ticket 09 checklist) + remaining fog items.
