# Grilling: Prints section content model

Type: grilling
Status: closed

## Question

Pin down the 3D-printing section's content model and UI. Known so far: gallery of prints with specs (printer, material, settings), detail pages with a build/maker log, external links to model pages (Printables/Thingiverse/MakerWorld). Decide: schema for print entries (photos, specs, failure notes?), the maker-log format (dated entries on a detail page?), how it relates to the art section (shared gallery components?), and curation. Load `grilling` and `domain-modeling` skills.

## Resolution

**Schema** (Astro content collection `prints`):

- `title` — print name
- `date` — date finished (also URL slug date, mirroring art's `/prints/<YYYY-MM-DD>-<slug>/`)
- `printer` — structured field (e.g. Ender 3, resin printer)
- `material` — structured field (PLA/PETG/resin + color)
- `durationHours` — number, print time
- `photos[]` — via astro:assets, required `alt` (same pipeline/rules as art, ticket 13)
- `description` — prose
- `settings` — NOT structured; print settings (layer height, infill, supports) live in freeform markdown notes/body to keep the per-entry authoring burden light
- `modelLinks[]` — array of `{ platform, url }` (Printables/Thingiverse/MakerWorld); own designs get links too once uploaded — no separate ownDesign flag needed
- `tags` — subject tags (kept from round 2 answer; no collections)
- `featured` — single flag; homepage art+prints pane pulls 2–3 featured prints

**Maker log**: dated markdown sections inside the print entry body (one file per print, chronological). Failures are publish-ready-only at gallery level, but failure attempts within a successful project's log are welcome content.

**Relationship to art**: share the visual vocabulary and grid components (terminal-window tiles), separate collection and schema. Tile captions show specs (`PLA · 0.2mm · Ender 3`) instead of the art caption format.

**Listing UI**: NOT decided in this ticket — the flat-chronological assumption was replaced by a decision to prototype a **contact-sheet-like listing** (see ticket 15). Detail page layout follows ticket 14's console-output vocabulary; exact print detail treatment rides with the prototype work.
