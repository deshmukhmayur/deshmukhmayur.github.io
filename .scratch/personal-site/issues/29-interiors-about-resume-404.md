# 29: Interiors — about, /resume/, 404

**What to build:** The three interior pages per the ticket-20 prototype. About: `$ whoami --verbose` dl + `~/.history` timeline + right column (`$ curl -O resume.pdf`, `ls content --count` stats with real counts, `ls elsewhere/` links). `/resume/`: download-interstitial page ("download starting…" copy) that triggers the PDF — this page doubles as the countable resume link (analytics counts it by pageview). 404: neofetch-style with ASCII-cat logo slot + `$ ls ~` nav links. Decorative commands stay `aria-hidden` and never clickable; the resume `curl` and real counts are functional (real data).

**Blocked by:** 21 (terminal shell).

**Status:** done

- [x] `/about/` renders all three columns; content stats reflect real collection counts
- [x] `/resume/` serves the interstitial and triggers the PDF download
- [x] 404 page renders and is wired as the not-found handler for the host
- [x] All chrome copy lowercase/terse per ADR 0007; canonical prompt strings used
