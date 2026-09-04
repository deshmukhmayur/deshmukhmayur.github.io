# Map: Personal site rebuild (portfolio + playground)

Label: wayfinder:map

## Destination

A fully rebuilt personal website for Mayur Deshmukh at deshmukhmayur.com, hosted on Cloudflare as a static site, replacing the existing GitHub Pages page. The site is a personal playground that showcases portfolio/work, anime-style art, 3D printing, a Soliloquy/Studies writing area, and an about page with resume download — supported by a contact form and self-hosted Umami analytics. Done = a spec + working deployed site (spec synthesized from this map, then implemented).

## Notes

- Repo currently holds a small static page (index.html + css/ + img/), full replacement planned. Domain deshmukhmayur.com.
- Decisions already settled during charting (standing for all tickets):
  - **Stack: Astro** (user knows both Astro and Eleventy; Astro wins on component model, image optimization, content collections).
  - **Hosting: Cloudflare Workers with static assets** (not Pages), plus Workers for form/analytics; deshmukhmayur.com on Cloudflare.
  - **Persona: "personal playground"**, not employer-first; portfolio is a section, not the whole page.
  - **Work section**: programming/work/open-source projects, detail pages with screenshots/tech stack/metadata, optional case study per project (see ticket 11).
  - **Writing umbrella**: two content types — casual entries = **Soliloquy**, substantive write-ups (case studies, findings, experiments) = **Studies**, visually distinct listings.
  - **Art section**: curated gallery grid + detail pages; content collections with tags/collections; detail page shows related artworks from same collection, falling back to related tags. Content spans anime-style illustrations, sketches/doodles, and car sketches — taxonomy must accommodate all three (ticket 04).
  - **Prints section**: gallery with print specs (printer, material, settings), detail pages including a build/maker log, external links to model pages (Printables/Thingiverse/MakerWorld).
  - **About/resume**: simple about page with a download-resume button (no structured-data resume rendering for now).
  - **Contact form**: tiny Cloudflare Worker with Turnstile spam protection; simple storage (KV/D1) or email send.
  - **Analytics**: self-hosted where practical; Umami preferred but research showed no official Cloudflare path — final tool choice is a grilling ticket (see Decisions so far).
  - **Visual direction instincts**: minimal, light palette, light/dark theme toggle, illustrations/icons used playfully where they feel good, occasional playfulness. To be prototyped before commit.
- Skills: use `frontend-design` in prototype tickets; `research` skill for research tickets.
- Content gathering is part of this effort; structure first, then content.

## Decisions so far

- [Prototype: Homepage look and feel](issues/03-prototype-homepage-look.md): Winner = terminal/TUI variant F — full-bleed dark terminal, neofetch-style about header (own illustration + whoami + now→employer line), panes (work+skills, art+prints, studies+soliloquy) with social links top-right inside their relevant pane, soliloquy-of-the-day line, ASCII-cat footer, light/dark toggle. Prototype: `prototype/homepage-prototype.html` on branch `prototype/homepage-look`.
- [Research: Cloudflare static hosting](issues/01-research-cloudflare-hosting.md): Workers static assets works with a minimal `wrangler.jsonc` (no adapter); free-tier static requests unlimited; 20k files/version, 25 MiB/file limits; use `404-page` not SPA fallback; custom domain via `routes` + separate www redirect; CI via `wrangler-action@v3` or Workers Builds.
- [Research: Umami on Cloudflare](issues/02-research-umami-on-cloudflare.md): No official Umami Workers/D1 path — it's Node/Postgres; better fits are Cloudflare Web Analytics (free, trivial) or GoatCounter (free non-commercial, easy self-host); analytics tool choice moved to a grilling ticket.

## Not yet specified

- SEO/metadata, OG images, favicon/branding refresh.
- Image pipeline details (compression, bulk import of existing art) — graduates after art content-model ticket.
- CI/deploy pipeline (GitHub Actions → Cloudflare) details.
- What happens to existing-site content (Pinterest verification meta, old copy).
- Interior pages (work detail, art gallery, prints, soliloquy/studies listings) — homepage direction is now set; these graduate into prototype/grilling tickets.
- Typeface licensing/self-hosting for JetBrains Mono (and any display faces for interior pages).

## Out of scope

- None yet.