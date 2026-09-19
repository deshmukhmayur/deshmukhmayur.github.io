# Grilling: Legacy site audit — Pinterest verification + redirects

Type: grilling
Status: resolved

## Question

What carries over from the existing site (audit facts: `index.html` has `p:domain_verify` meta `21160b62908f43a0808ffa4e07cc215f`, OG/Twitter meta, `@deshmukhmayur_` Twitter handle, no deep URLs — the old site is a single page):

- Keep or drop the Pinterest domain-verification meta tag? (Only matters if the domain should stay attributed on Pinterest — does Mayur still post there?)
- Old copy: anything from the current page worth keeping, or does it all die with the rebuild?
- Redirects: old site has no deep URLs, so no `_redirects` needed; only the GitHub Pages → Cloudflare domain move needs DNS care (already covered by spec §1 www-redirect decision).

Graduated from map fog (was "What happens to existing-site content (Pinterest verification meta, old copy)"). Load `grilling` + `domain-modeling` skills.

## Answer

Audited legacy `index.html` (facts found there: Pinterest verify meta, OG/Twitter meta, six-icon social row, JSON-LD Person `sameAs`, GA gtag `UA-70443889-2`, "renovating" under-construction copy).

- **Pinterest `p:domain_verify` meta: drop.** Mayur will instead verify deshmukhmayur.com on Pinterest via a DNS TXT record later — a Cloudflare DNS task at deploy time, not a site `<head>` concern.
- **Old copy: dies entirely.** The playful sign-off tone ("I promise I'll try my best to respond") may optionally inform the contact form's voice (feeds ticket 20's contact-pane copy).
- **Displayed social links:** keep GitHub, LinkedIn, Instagram, YouTube; replace the ArtStation link with the site's own `/art/` section; drop ArtStation and Twitter from displayed link rows.
- **Google Analytics gtag (`UA-70443889-2`): removed entirely.** Cloudflare Web Analytics (ticket 08) replaces it; the old UA property is not kept alive.
- **JSON-LD `Person` `sameAs`: identity, not navigation — includes all profiles even ones not displayed:** GitHub, LinkedIn, Instagram, YouTube (`https://youtube.com/@deshmukhmayur` — new handle URL, replaces the legacy channel-ID link), ArtStation (`artstation.com/deshmukhmayur`), Twitter/X (`@deshmukhmayur_`).

No redirects needed (single legacy page; domain move already covered by spec §1).
