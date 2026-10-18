# Fonts

Self-hosted typefaces (ADR 0006 / 0008). Two faces total:

- `space-mono-*.woff2` — terminal chrome, 400/700 (latin subset, ~16 KB each)
- `Libron-*.woff2` — editorial prose, 400/400i/700/700i (~29–33 KB each after subsetting; full files were ~85–89 KB)

All files are preloaded in `src/components/BaseHead.astro` with `font-display: block`
(see `src/styles/tokens.css`) so prose never paints in a fallback face and never snaps.

## Subsetting Libron

The Libron WOFF2 files are subset in place to keep the preloaded critical path small
(~345 KB → ~124 KB for all four styles). Subsetting is one-off and manually re-run —
the site is en-only and the prose is curated, so there is no build-time pipeline.

```sh
bun scripts/subset-fonts.mjs
```

**Extending the subset:** the codepoint ranges live in `DEFAULT_RANGES` in
`scripts/subset-fonts.mjs`. To extend, either add a `U+XXXX-YYYY` block there and
re-run, or pass extra ranges on the command line:

```sh
bun scripts/subset-fonts.mjs U+0400-04FF   # e.g. add Cyrillic
```

Re-running is idempotent — it re-subsets whatever is in `public/fonts/` with the
union of default + passed ranges, so a superset is produced as long as the current
files still contain the glyphs you want (a previously-subset file cannot grow back
glyphs it already lost; if you ever need to re-widen from scratch, start from fresh
full-font files).

**What is kept:** kerning, ligatures, oldstyle figures. Hinting is dropped (WOFF2
browsers do not use it) and all other layout features are stripped.

**Verification after subsetting:** the first time this was run, all prose glyphs in
the site's editorial sample text (em/en dash, curly quotes, ellipsis, accented
letters, digits, common punctuation) were checked against the font's cmap and all
were present. If you extend content with unusual characters, spot-check with:

```sh
python3 -c "from fontTools.ttLib import TTFont; print(ord('é') in TTFont('public/fonts/Libron-Regular.woff2').getBestCmap())"
```

(Requires `pip install fonttools brotli`.)
