# Prototype: About + contact + 404 interiors

Type: prototype
Status: resolved
Assignee: opencode (claimed this session)

## Question

Prototype the three remaining interior pages in the established terminal/TUI visual system, so implementation doesn't improvise them:

- `/about/`: about page with resume download button (links to the `/resume/` HTML download page from ticket 08, which counts the download); brief bio, maybe the homepage neofetch header treatment reprise.
- `/contact/` + homepage contact pane: terminal-form styling per ticket 07's decided UX (name/email/message + honeypot, Turnstile, inline `$ send ok`-style success/error, no redirect) — the homepage pane and `/contact/` share the component.
- `/404` (serves as 404.html): error page fitting the terminal voice (e.g. command-not-found style).

Reuse the visual vocabulary from the existing prototypes (homepage variant F, windowed tiles, console output). Load `prototype` and `frontend-design` skills.

Graduated from map fog (was "Remaining interiors: about page, contact page/pane, 404").

## Answer

Winners (chosen with Mayur over three review rounds; A–C kept as primary source): **about = D, contact = D, 404 = D.**

**About = variant D (whoami + shell history + sidebar)**: unboxed `$ whoami --verbose` dl (name/role/now/focus/this-site) above a `~/.history` window — dated rows oldest→newest (2018 python → 2020 illustration → 2021 printer → 2022 acme → 2026 "rebuilt this site as a terminal. you're inside it."), year in pink, no boxes on rows. Right column (7/4 split, sidebar sticky on desktop), top to bottom: `$ curl -O resume.pdf` button (links to `/resume/`, cmdnote explains auto-download + counted pageview), `ls content --count` stats window (soliloquies/studies/prints/drawings/printers — computed from collections at build time), `ls elsewhere/` (github/linkedin/instagram/youtube). Ends with a p.s. line linking to contact.

**Contact = variant D (minimal mail session + `man contact` rail)**: prompt `mail -s "hi from the internet" mayur` opens the session; fields are borderless dashed-underline inputs (name:/email:/message: labels in amber); honeypot ghost + dashed Turnstile slot shown in the prototype (honeypot hidden in production); `$ send` button; inline status — success `$ send ok — message queued. i'll try my best to respond.` (legacy-site tone nod), failure `$ send: error — rate limited by the waf...`. No redirect. Right rail is unboxed `man contact` (not a window): worth-writing-about copy, response-time note, `ls elsewhere/ --faster` alt channels (github issues / instagram dm / reply on a soliloquy). The homepage pane is the **same component** squeezed (~440px): stacked labels, no read-me rail, same status line.

**404 = variant D (neofetch-style)**: ASCII cat with floating `?` as the "distro logo" (slot can swap in a small illustration from Mayur's art — same pattern as the homepage doodle, ticket 09), host line `404@deshmukhmayur.com`, key/value info block (error: the real requested path — production interpolates `location.pathname`; cause; os; host; uptime; status), then `ls ~ →` directory links as navigation.

**Command-vocabulary consistency pass** (applies site-wide, no changes needed to tickets 14–17 which already conform): only real POSIX verbs — `ls`, `cat`, `identify`, `open`, `mail`, `curl`, `man`, `whoami` — plus `--flag` metadata, `$`-prompt lines, `#`-comment asides. Filters are `ls <dir> --flag` (trailing slash on `dir/` consistent with prints); submit buttons are `$ send`; the status line follows ticket 07's `$ send ok` verbatim. Rejected during this ticket: invented binaries (`site --stats`, `contact --new`), pseudo-commands (`read-me-first`, `resume`, `or skip the form`).

**Copy**: all placeholder except the decided bits (success line tone, resume filename `resume.pdf` — homepage's inline `résumé.pdf` link and this button share the one file). The `/resume/` interstitial itself stays as spec'd by ticket 08 ("download starting…" page, not redesigned here).

Prototype: `prototype/interiors-prototype.html` on branch `prototype/homepage-look` (D variants are the winners; A–C and the per-variant homepage-pane demos are the primary source). Spec §3's open-interiors fog is closed by this ticket.
