# 32: Content import — real content into slots

**What to build:** Placeholder content is replaced with Mayur's real content, slot by slot, per the ticket-09 checklist: curated artworks (+ featured picks), print photos/specs/model links, project write-ups/screenshots/links, about text + resume PDF, social URLs, seed Soliloquy/Studies entries, homepage illustration. All images go through the import script rules (EXIF stripped at import, size caps, compression). Homepage illustration and OG section PNGs become real. Content is gathered by Mayur; the agent slots it in and verifies every collection builds and every page renders.

**Blocked by:** 31 (deploy — the site must be live on placeholders before real content drops in).

**Status:** ready-for-agent

- [ ] All placeholder entries replaced (or deliberately kept where Mayur chooses)
- [ ] Every imported image passes through the import pipeline (no raw originals, EXIF-stripped)
- [ ] Featured flags set to Mayur's picks; homepage reflects them
- [ ] Full build green; spot-check every section in production
