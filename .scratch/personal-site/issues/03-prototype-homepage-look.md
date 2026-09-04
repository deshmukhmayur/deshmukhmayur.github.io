# Prototype: Homepage look and feel

Type: prototype
Status: resolved

## Question

What should the homepage look like? Build 1–2 cheap prototype takes for the "personal playground" homepage using the `frontend-design` skill. Constraints from the user's instincts: minimal, light palette, light/dark theme toggle, playful illustrations/icons where they feel good, occasional playfulness. The homepage is a hub into: Work/portfolio, Art, Prints, Soliloquy/Studies, About — not employer-first. Human reacts to the prototypes; a direction is chosen and recorded.

## Answer

Direction chosen: **Terminal/TUI homepage, variant F** (links-in-panes). Prototype lives at `prototype/homepage-prototype.html` on this branch (`?variant=f` is the winner; `?variant=d` is the same minus pane links; A (Workshop) and B (Index) were the rejected takes).

Validated decisions from the human's iteration:

- Full-bleed dark terminal aesthetic (JetBrains Mono, charcoal bg, green/cyan/amber/pink accents), no window chrome, no prompts, no fake interactivity/cursor.
- Layout: neofetch-style about header (illustration/sketch ~200px square + whoami → name, résumé.pdf link, one-line bio, `now → employer · tenure`) sitting directly on the background; then panes: work (wide, with skills pane beside it), art + prints row, studies + soliloquy row.
- The figlet was replaced (final iteration) with a hand-drawn illustration slot left of the about text. The prototype ships with a placeholder SVG doodle; the real asset is a sketch from Mayur's own art (supplied during content gathering).
- Social links live top-right inside their relevant pane (work → github/linkedin, art → cara/instagram, prints → printables); none in a header or footer.
- Read-only skills display as fastfetch-style key/value groups inside a small pane, not a cloud.
- Bottom: muted "soliloquy of the day — <thought>" line; footer is ASCII cat + "© year mayur deshmukh · rss". No social links in footer.
- Light theme required alongside dark (toggle inverts the terminal palette).

Asset: `prototype/homepage-prototype.html` (this branch, throwaway). Winner = variant F.