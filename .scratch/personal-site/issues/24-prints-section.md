# 24: Prints section

**What to build:** Visitors can browse and view finished 3D prints. New schema per spec §4: title, date, printer, material, durationHours, photos (alt required), description, modelLinks, tags, featured; print settings stay freeform in body; maker log = dated body sections (failures only as attempts inside a successful print's log). Listing: uniform contact-sheet grid of windowed tiles (titlebar filename + duration, caption printer · material · #tags) with `ls prints/` filter chips `--material=`/`--printer=`. Detail: sticky left photo column + photo thumbs; right side has `specs` datasheet window, `models & notes` window with `↗` links, dotted maker-log timeline (pink-dot failures). Seeded with placeholder content.

**Blocked by:** 21 (terminal shell).

**Status:** done

- [x] `/prints/` renders the contact-sheet grid; both filter chips work
- [x] `/prints/<YYYY-MM-DD>-<slug>/` renders photo column, specs window, model links, maker-log timeline
- [x] Failed attempts render as pink-dot timeline entries inside a print's log
- [x] Schema enforces alt on photos and the { platform, url } shape for model links
