# Prose face: Libron replaces Spectral

Status: accepted (supersedes the prose half of [0006](0006-space-mono-spectral.md); Space Mono chrome role unchanged)

The two-voice type system stays two voices, but the prose voice moves from **Spectral** to **Libron** (v0.31, OFL, self-hosted WOFF2 — successor to Readerly, based on Newsreader, tuned for long-form reading). Settled via rendered prototype (`prototype/libron-prose-prototype.html`): an entire article read in each face; Libron everywhere (variant B, merged with the Space Mono chrome variant D) won — its calmer serifs and even reading texture beat Spectral at paragraph depth. A Spectral-headings/Libron-body hybrid (variant C) was considered and rejected: Libron is calm enough to carry headings too, and the site stays at two faces with a single prose voice.

Libron ships 400/400-italic/700/700-italic; no other weights are taken. It is self-hosted (not on Google Fonts) alongside Space Mono. Spectral is fully removed from the site — no fallback entry in the `--serif` token stack, no `@font-face`, no WOFF2 files shipped.

Note: Libron is a Reserved Font Name — the site ships it unmodified under its own name; no derivative builds.
