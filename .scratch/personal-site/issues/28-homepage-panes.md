# 28: Homepage panes

**What to build:** The homepage per prototype variant F: neofetch-style about header directly on the background (own ~200px illustration, `whoami` → name, résumé link, one-line bio, `now → employer · tenure`); panes — work (wide) + skills pane beside it, art + prints row, studies + soliloquy row; social links top-right inside their relevant pane (work → github/linkedin, art → cara/instagram, prints → printables); muted "soliloquy of the day" line; ASCII cat + `© year mayur deshmukh · rss` footer. All featured slots (projects 2–3, art 3–4, prints 2–3, studies 1–2 via `featured` flags) pull real collection data. (Revision: no contact pane — /contact/ is reachable from a footer link instead.)

**Blocked by:** 22 (projects), 23 (art), 24 (prints), 25 (studies), 26 (soliloquy), 27 (contact form component).

**Status:** done

- [x] Homepage renders all panes with real content pulled from each collection's featured flags (featured first, recent entries pad slots short of the minimums)
- [x] Soliloquy-of-the-day line shows the latest entry, muted
- [x] Contact reachable from the footer (revision — no homepage pane)
- [x] Empty-collection slots degrade gracefully (placeholder content still present at this stage)
