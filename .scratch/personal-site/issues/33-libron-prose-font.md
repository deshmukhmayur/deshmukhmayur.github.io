# 33: Swap prose face from Spectral to Libron

**What to build:** Every editorial-prose surface on the site (Studies and Soliloquy bodies and headings, listing prose where ADR 0006 allows it) renders in Libron instead of Spectral, using self-hosted WOFF2 files (v0.31, OFL) — regular, italic, bold, bold-italic, all `font-display: swap`. Space Mono chrome roles are untouched. The `--serif` token's primary face becomes Libron with Spectral as fallback; the Google Fonts link no longer loads Spectral. No code changes are made to the prototype; it is captured on a throwaway branch as the decision's primary source.

**Blocked by:** None (can start immediately).

**Status:** done

- [ ] Libron WOFF2 files (4 styles) added to the repo's fonts and served as static assets
- [ ] `@font-face` declarations for Libron 400/400i/700/700i added to `src/styles/tokens.css`; the prose/serif token resolves to Libron with Spectral fallback
- [ ] Spectral removed from the Google Fonts request; Space Mono loading unchanged
- [ ] Studies and Soliloquy pages (and Studies listing prose per ADR 0006) render in Libron — verified in dev against the prototype's sample text
- [ ] Prototype `prototype/libron-prose-prototype.html` + `prototype/fonts/Libron-*.woff2` committed to a throwaway branch (not main), with the verdict (variant B) recorded on this ticket
- [ ] No other tokens/fonts changed; site still passes lint/build

**Update:** Spectral removed completely on follow-up — no fallback in the `--serif` token, no `@font-face`, no WOFF2 files (ADR 0008 amended).

**Resolution:** Done on `astro-revamp` — Spectral fallback removed (`b65db87`), Libron subset in place (`6701182`), currency-symbols block added (`f099091`), page-aware preloads (`83947ab`). Pushed to origin.
