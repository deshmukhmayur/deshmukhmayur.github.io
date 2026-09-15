# Grilling: Art section content model

Type: grilling
Status: closed

## Question

Pin down the art section's content model and UI. Known so far: curated gallery grid + detail pages, Astro content collections with tags and collections, detail page shows related works from the same collection (falling back to related tags). Content includes **anime-style illustrations, sketches and doodles, and car sketches** — so the taxonomy must accommodate at least these subjects/styles (e.g. tags/collections per subject: anime, cars, doodles; and/or medium/style axes). Decide: exact collection/tag taxonomy (subject vs. style vs. medium — are car sketches a series or a subject tag?), image pipeline (source of truth, compression/responsive variants via astro:assets, aspect-ratio handling), how curation works (featured vs archive), and detail-page layout (process shots? WIP sketches? tools?). Load `grilling` and `domain-modeling` skills.

## Resolution

**Taxonomy**: two axes — optional `collection` (curated series, zero or one per artwork) + subject-only `tags` drawn from a closed starter list (anime, car, doodle, portrait, fanart, original, …; extendable deliberately). `medium` (digital | pencil | ink | mixed) is a structured field, not a tag — no tag soup.

**Curation**: only publish-ready artwork enters the content collection (no draft status needed). `featured` flag selects the homepage's 3–4 art slots; featured is purely a homepage-selection flag, gallery grid stays chronological.

**Gallery**: one unified masonry grid with tag filters (no separate anime/cars/doodles silos). Tiles link straight to the detail page — no lightbox.

**URLs**: `/art/<YYYY-MM-DD>-<slug>/` (e.g. `/art/2025-10-21-foxgirl/`) — date-prefix sorts chronologically; flat, no nested date paths.

**Detail page**: title, publishDate, collection, tags, medium, tools[], description, main image + optional process shots (multi-image gallery). Related works: up to 3 from same collection, fallback same tags; hide section if neither matches.

**Images**: originals committed to repo under `src/assets/art/`, processed by `astro:assets` (responsive variants, EXIF stripped on build). Clip Studio exports ~4–5 MB are fine (Cloudflare limit is 25 MiB per file). `alt` text is required — build fails without it.

Frontmatter schema: `title, publishDate, featured?, medium (digital|pencil|ink|mixed), tools[], collection?, tags[], description?, images{ main, process[]? }, alt` (alt required).