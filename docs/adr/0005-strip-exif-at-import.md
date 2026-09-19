# Strip image EXIF at import, not at build

Status: accepted

Obvious assumption: since `astro:assets`/sharp strips metadata from the responsive variants it emits, build-time stripping suffices. It doesn't: Astro still copies the byte-identical **original** into `dist/_astro/` as an unreferenced Vite side-effect of the image import, EXIF intact. So the import script (`scripts/import-art.mjs`) strips all metadata, bakes orientation, caps the long edge at 4096px, and recompresses (mozjpeg q82) **before** the original is committed — committed originals are clean and the emitted copy is harmless. Do not "fix" this by moving stripping into the build.
