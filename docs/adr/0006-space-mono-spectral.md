# Two-voice typography: Space Mono + Spectral

Status: accepted

The site's type system is exactly two OFL-licensed faces: **Space Mono** carries every terminal-chrome role (breadcrumbs, tile titlebars, filter chips, `$ identify` metadata, timestamps, footer) and **Spectral** carries editorial prose (Studies and Soliloquy bodies). Chosen via rendered comparison prototypes (`prototype/fonts-prototype.html`, `prototype/fonts-duel.html`): Space Mono beat JetBrains Mono (the prototypes' stand-in), Geist, Kode, and Martian on character and small-size legibility, and an all-Space-Mono system was preferred over a JetBrains-working/Space-accent hybrid to keep the site at two fonts. Considered: a three-font hybrid (JetBrains for dense data rows, Space for voice lines) — rejected as unnecessary for now; a third face can be added later if dense UI text proves hard to read.

Locked during the pre-implementation freeze: Space Mono ships 400/700, Spectral ships 400/400-italic/700 (unrequested weights stay out), both `font-display: swap`. The chrome/prose split governs listings too: `ls`-row titles and summaries are Space Mono (they are terminal furniture, not prose); Spectral appears in a listing only where actual content prose is shown inline — a Soliloquy micro entry's one-liner body in the date rail, or content captions inside tiles.
