# 21: Terminal shell — tokens, fonts, theme toggle, chrome

**What to build:** Every route on the site renders inside the shared terminal shell. All colors surface as CSS custom properties in a single tokens layer (flipped by a light/dark theme toggle, dark default), styled with CSS Modules, no global CSS beyond tokens + minimal reset. Space Mono (400/700) and Spectral (400/400-italic/700) self-hosted with `font-display: swap`. Nav and ASCII footer in place; an analytics beacon slot sits in the layout head (token wired later). Voice per ADR 0007: chrome lowercase/terse, canonical prompt strings.

**Blocked by:** None (can start immediately).

**Status:** done

- [x] A bare demo page renders inside the shell with correct tokens in both themes; toggle persists across reloads
- [x] Both typefaces self-hosted and loadable; no CDN font requests
- [x] Colors only referenced via tokens (`--ink`, `--dim`, `--cyan`, `--pink`, `--amber`, `--edge`, …); re-theming = editing tokens only
- [x] Nav, breadcrumb vocabulary, and ASCII footer present; chrome copy lives in a constants file
- [x] Beacon slot present in layout head (no token yet)

## Implementation notes

- Shell: `src/layouts/TerminalLayout.astro` (nav + breadcrumb slot area + footer, beacon `<slot name="beacon" />` in head, pre-paint theme script).
- Tokens: `src/styles/tokens.css` (single color source, dark default, `[data-theme="light"]` flip, @font-face, minimal reset).
- Chrome copy: `src/lib/constants.ts` (SITE / NAV via `PROMPTS.section` / PROMPTS / FOOTER / THEME / DEMO).
- Components: `Nav`, `Breadcrumb`, `Footer`, `ThemeToggle` — each styled with a sibling `.module.css`.
- Fonts: latin-subset woff2 in `public/fonts/` (space-mono 400/700, spectral 400/400i/700), `font-display: swap`.
- Demo page: `src/pages/index.astro`. Note: `src/pages/art/[id].astro` still renders outside the shell — it gets reworked under ticket 23.
