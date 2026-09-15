# Prototype: Soliloquy / Studies listings + detail pages

Type: prototype
Status: resolved

## Question

Design the writing-area pages using the decided content model (ticket 06). Soliloquy = compact log/timeline (terminal journal feel; titleless micro entries show date-ordinal, time-of-day ordering); Studies = larger report-style cards with `summary` lines; per-type `$ ls` tag-filter row; visually distinct listings; detail pages for each type (Studies with `projects[]` links to Work, Soliloquy images rendered from markdown body). Extend the homepage terminal vocabulary (windowed tiles, console output) from tickets 03/14. Load `prototype` + `frontend-design` skills.

## Answer

Winner decided live with Mayur after three rounds (initial build + one reroll + two refinements):

- **Soliloquy listing = C (Date rail)** — sticky left month rail (`tail -f by month`), entries right; timestamped entries with pink `[date · time]`, micros dim one-liners, inline image thumbnails, `$ ls soliloquy --tag` filter row.
- **Studies listing = E (Unframed editorial)** — no window chrome; one featured lead study (2px rule, 24px title, italic summary, meta line) + dated 3-col ledger rows (date | title+italic summary | project/tags right) under hairline dividers.
- **Soliloquy detail = C (Printout)** — narrow perforated single-entry view (`### title`, pink timestamp, `entry #N of M`, images from body, `· · ·` EOF mark), `$ cd ../entry-NN` prev/next nav.
- **Studies detail = C (Split + fact sheet + related studies)** — unframed article left; right sidebar: `$ identify <slug>.md` command with the specs datasheet window as its output (date/status/tags/project rows), then related studies in the sidebar: `ls studies --project=<slug>` (solid cards) falling back to `ls studies --tag=` (dashed cards) when no project siblings — mirroring art's same-collection → same-tags rule.

Terminal voice stays in frames/commands/captions; rejected variants (journalctl stream, day-grouped sessions, report windows, man-page index, project folders, featured spread, entry-in-context, anchored-in-stream, console-output detail) remain in the prototype for reference.

Prototype: `prototype/writing-prototype.html` on branch `prototype/homepage-look` (commits 41dcc26..3fec1e7).
