# Prototype: Art gallery grid + detail page

Type: prototype
Status: resolved

## Question

Prototype the art gallery (unified masonry grid with tag filters, chronological, tiles link straight to detail) and the artwork detail page (title/date/collection/tags/medium/tools/description, main image + process shots, up to 3 related works) consistent with the terminal/TUI homepage direction (variant F: full-bleed dark terminal, JetBrains Mono, light/dark toggle). Use `frontend-design` skill. Answer: how the terminal aesthetic extends to image-heavy masonry without fighting the art, and how the detail page balances image presence with metadata.

## Comments

- Prototype built: `prototype/art-gallery-prototype.html` on branch `prototype/homepage-look` (commit 0c97ea0). Gallery variants — A Windowed masonry (terminal-window tiles + caption bars), B Unframed masonry (hover metadata overlay), C Contact sheet (file-tree sidebar + `ls`-style rows). Detail variants — A Neofetch metadata (side block + windowed main image + process thumbs), B Console output (`$ identify` metadata block, full-width image), C Gallery wall (large image + caption bar + filmstrip process shots). Switch pages via the bottom bar or `?page=gallery|detail&variant=a|b|c`. Placeholder gradients stand in for real artwork. Awaiting human reaction to pick winners.

## Answer

**Gallery: A (Windowed masonry)**, with two changes from the prototype: the fake macOS window dots in each tile's title bar are replaced by the **date** (dim, e.g. `fox-girl.png … 2026-08-14`), and the caption row reads **collection · medium · #tags** (collection in cyan when the artwork has one, omitted when it doesn't; medium amber; tags right-aligned in pink). Tiles keep: filename title bar, image, masonry via CSS columns, chronological; `$ ls art --tag` filter row with `--tag=` chips.

**Many tags**: the caption flex-wraps — collection + date keep the first line, a long tag run flows onto a second line (verified with a 5-tag stress-test tile, `matsuri-night.png`). No truncation; masonry unaffected.

**Detail: B (Console output)**, unchanged: full-width image, then a `$ identify <file>` terminal-output block carrying date/collection/tags/medium/tools and description, process-shots pane (`process/` heading, 4-up thumbnails), related-works row (same collection, fallback tags, hide if empty).

Both share the homepage terminal chrome (JetBrains Mono, breadcrumb `~/art $ home / art / <slug>`, dark default + light toggle). The terminal aesthetic survives image-heavy content by keeping type to frame/caption roles and letting art fill unframed space — metadata is command-output, not cards. Prototype: `prototype/art-gallery-prototype.html` on branch `prototype/homepage-look` (final commits; winners = gallery A with dimension titlebars, detail B).
