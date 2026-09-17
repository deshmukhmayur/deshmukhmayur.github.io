# 23: Art section

**What to build:** Visitors can browse and view Art. Unified masonry gallery of windowed tiles (titlebar `filename … date`, caption `collection · medium · #tags` flex-wrap), tiles link to detail, no lightbox. `$ ls art --tag` filter over the closed starter tags. Detail page is console output: full-width image, `$ identify` metadata block, `process/` thumbs pane, related works (same collection → same tags → hide; up to 3). Schema per spec §4 (rework the scaffold's existing art collection as needed); seeded with placeholder content through the import pipeline rules.

**Blocked by:** 21 (terminal shell).

**Status:** done

- [x] `/art/` renders masonry of windowed tiles with real dates/captions; tag filter works
- [x] `/art/<YYYY-MM-DD>-<slug>/` shows image, `$ identify` block, process thumbs, related rule honored
- [x] Missing alt fails the build; images go through astro:assets `<Picture>` (avif/webp, 480/960/1600)
- [x] Tiles reuse the shared windowed-tile component from the shell vocabulary
