# Site voice: two registers, one personality

Status: accepted

The site's terminal fiction is decorative, not literal, and it obeys a small set of rules settled during the voice workshop.

**One personality, two registers.** Terminal chrome (Space Mono roles) is always lowercase, terse, command-adjacent. Editorial prose (Spectral roles: Studies, Soliloquy, about, descriptions) uses normal capitalization but stays casual and first-person — no corporate tone. **I** is always Mayur; commands are ambient things the site runs for the visitor, never attributed to them. Direct address "you" is welcome in prose asides (404, about p.s., contact response promise) but never as a command's object — fields are labeled (`message:`), not instructed ("enter your…").

**Truthfulness rule.** Anything functional (counts, dates, paths, stats) must be real data. Flavor fields (`uptime`, `os`, host lines) may be fictional but plausible.

**Voice of errors.** Success lines carry the warmth ("$ send ok — message queued. i'll try my best to respond."); errors stay dry — cause plus a short what-next clause, machine part never editorialized. Empty results use the real-ls-error convention: `ls: no matches for --tag cars`, with the reset affordance as a real command link (`ls art`).

**Fiction boundary.** Only real POSIX verbs appear (`ls`, `cat`, `identify`, `open`, `mail`, `curl`, `man`, `whoami`) plus established shell-culture commands (`show`, from `git show`, for opening detail pages), `--flag` metadata, `$`-prompt lines, `#` comment asides. `$ send` and `$ curl -O resume.pdf` actually do the thing; every other command is decorative and must not look clickable (no pointer cursor, no hover affordances). Decorative command lines are `aria-hidden`; every page must make complete sense without reading them.

**Canonical strings.** Prompts: `~/<section> $` per section, `~ $` global/homepage, `mail -s "hi from the internet" mayur` for contact, `404@deshmukhmayur.com` as the 404 host line (fictional user allowed as flavor). No other hostnames in chrome. Dates: ISO lowercase in chrome (`2026-09-16`, `2026-09-16 14:30`), natural dates in editorial bylines ("September 16, 2026"); maker-log headers stay ISO. Punctuation in chrome is limited to the established set (`· ↗ $ # ? · · ·`); no emoji; `!` appears only in Mayur's authored bodies, never in chrome. Soliloquy micro entries are exempt from sentence obligation — chat is chat.

**Copy anchor.** Sitewide fallback description (also OG fallback): "Mayur Deshmukh — designer and developer. A terminal-flavored home for projects, art, 3D prints, and writing." Per-section lines follow the template `<Section name> — <what's inside>`. RSS: titles "Mayur Deshmukh", "Mayur Deshmukh — Studies", "Mayur Deshmukh — Soliloquy"; sitewide description reuses the fallback, the other two use one-liners ("Substantive write-ups: case studies, findings, experiments." / "Casual entries, as they happen.").
