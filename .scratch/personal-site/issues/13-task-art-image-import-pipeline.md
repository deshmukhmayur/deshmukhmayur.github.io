# Task: Art image import & compression pipeline

Type: task
Status: resolved

## Question

Turn the art content model (ticket 04) into a working import path: establish `src/assets/art/` layout, decide EXIF-stripping + compression settings for ~4–5 MB Clip Studio exports via `astro:assets` (sharp config / `<Image>` usage), define the filename→slug convention (`YYYY-MM-DD-slug`), and do a trial import of one real artwork end-to-end (original → entry frontmatter → responsive variants → required-alt build check) so bulk import of the existing backlog is mechanical.

## Answer

Working import path established and validated end-to-end in this repo (Astro 5.18 scaffolded at root: `astro.config.mjs`, `src/content.config.ts`, `src/pages/art/[id].astro`).

**Layout**: originals live at `src/assets/art/<YYYY-MM-DD-slug>/main.jpg` (+ `process-N.jpg` for process shots); entries at `src/content/art/<YYYY-MM-DD-slug>.md` reference them via relative paths through the `image()` schema helper. Note: in Astro 5 `image()` comes from the schema-function context (`schema: ({ image }) => ...`), not a top-level import — the old `import { image } from 'astro:content'` pattern throws at sync.

**Import script**: `scripts/import-art.mjs` makes bulk import mechanical. One command per artwork strips ALL metadata, bakes orientation, caps the long edge at 4096px, recompresses mozjpeg q82 (8.5 MB → 6.4 MB on a worst-case noise image; real art will be far smaller), writes assets, and scaffolds the entry frontmatter. `--process` handles process shots.

**EXIF decision — strip at import, not at build**: sharp strips metadata from the responsive variants it generates (verified: avif/webp/jpg variants are clean), but Astro still emits the byte-identical original into `dist/_astro/` as an unreferenced Vite side-effect of the image import. Relying on build-time stripping would ship EXIF-laden originals. The script strips at import time, so the committed original is clean and the emitted original is harmless.

**Responsive output**: `<Picture>` (not `<Image>` — single `format` only) with widths 480/960/1600, `formats={['avif','webp']}`, jpg fallback via mozjpeg. Verified: 12 variants per artwork, correct `srcset`/`sizes` markup.

**Required alt**: enforced by the Zod schema (`alt: z.string().min(1)`); build fails fast with `InvalidContentEntryDataError` when missing (tested).

**Trial import**: `src/assets/art/2026-09-04-pipeline-trial/` + `src/content/art/2026-09-04-pipeline-trial.md` is a synthetic 3200×4200 noise image with hand-injected EXIF (`TestCam`/`ClipStudioExport` markers) standing in for a real Clip Studio export — replace with a real artwork when the backlog lands. Full clean build passes; `dist` contains zero EXIF markers.

Gotchas for CI: sharp needs its platform-specific optional deps (`@img/sharp-linux-arm64` + `@img/sharp-libvips-linux-arm64`); a partial install fails with `libvips-cpp.so` missing — fix is `rm -rf node_modules/sharp node_modules/@img && npm install --include=optional`.
