# Prototype: Prints contact-sheet listing (+ detail page)

Type: prototype
Status: resolved

## Comments

- Prototype built: `prototype/prints-prototype.html` on branch `prototype/homepage-look` (commit d154db3). List variants — A Contact sheet grid (uniform windowed tiles: filename + duration titlebar, `printer · material · #tags` caption, `ls prints/ --material/--printer` filter row), B Print queue ledger (`lpq -a` rows: thumb, filename, printer, material·tag, hours, date), C Build plates grouped by printer (`ls prints/ --printer=<x>` sections of tiles). Detail variants — A Print job console (`$ print --info` specs block, `$ open --models` links, `photos/` thumbs, `git log --maker` dated log), B Neofetch specs side panel + vertical maker-log timeline with pink-dot failure markers, C Spec-sheet datasheet windows (specs table + models/notes) with `tail -f maker.log` transcript. All failures appear only as entries inside the successful print's log, per ticket 05. Switch pages via bottom bar or `?page=list|detail&variant=a|b|c`. Placeholder gradients stand in for photos. Awaiting human reaction to pick winners.
- Variant D added (commit 7c0fdba): B's side-by-side detail layout with C's fact-sheet windows — photo + photo-set thumbnails left; `specs` datasheet table, `models & notes` window with `↗` links, and B's dotted maker-log timeline right. Nesting bug fixed in 1d63344; left photo column made sticky in the final commit.

## Answer

**Listing: A (Contact sheet grid)** — uniform grid of terminal-window tiles (filename + duration titlebar, `printer · material · #tags` caption row), `$ ls prints/` filter row with `--material=` / `--printer=` chips.

**Detail: D (Fact sheet + timeline)** — a merge of B and C built on request: B's side-by-side layout (photo + photo-set thumbnails in a sticky left column; right column scrolls) carrying C's fact-sheet styling — `specs` datasheet window (date/printer/material/layer/infill/duration/tags table), `models & notes` window (modelLinks as `↗` links + short note), and B's maker-log timeline with dated entries and pink-dot failed attempts below. Failures live only inside the winning print's log, per ticket 05.

Prototype: `prototype/prints-prototype.html` on branch `prototype/homepage-look` (final commits; winners = list A, detail D).

## Question

Prototype the prints section listing as a **contact-sheet-like layout** (decided in ticket 05 instead of a flat chronological grid) plus a print detail page. Schema is settled (ticket 05): specs (`printer`, `material`, `durationHours`), tags, `featured` flag, `modelLinks[]`, maker-log body. Reuse the terminal-window tile / console-output vocabulary from ticket 14 where it fits; tiles should carry specs in captions. Detail page renders the maker log (dated markdown sections), photo set, and model links. Load the `prototype` skill and the `frontend-design` skill.
