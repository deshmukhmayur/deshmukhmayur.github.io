# 26: Soliloquy section

**What to build:** Visitors can read the casual writing log. Schema per spec §4: optional title, datetime (multiple per day allowed, time-ordered), optional slug (titleless entries URL as `<YYYY-MM-DD>-<ordinal>`), open tags shared with Studies; images via markdown body only; micro entries allowed. Listing: date rail — sticky left month rail, timestamped entries (pink `[date · time]`), dim micro one-liners, inline image thumbs, `$ ls soliloquy --tag` filter. Detail: narrow perforated printout view, `· · ·` EOF mark, `$ cd ../entry-NN` prev/next. Seeded with placeholder entries including at least one multi-entry day and one micro.

**Blocked by:** 21 (terminal shell).

**Status:** done

- [x] `/soliloquy/` renders the date rail with time-ordered entries; tag filter works
- [x] Titleless entries resolve to `/soliloquy/<YYYY-MM-DD>-<ordinal>/`; titled slugs win when present
- [x] Detail renders perforated view with prev/next navigation across entries
- [x] Same-day entries order by time, not insertion
