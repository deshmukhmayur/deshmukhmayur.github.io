# Grilling: Analytics tool choice + provisioning

Type: grilling
Status: closed

## Question

Research in 02 found Umami has **no official Cloudflare Workers + D1 path** — it needs Node/Postgres (Docker/VPS or Vercel + external Postgres), and community Workers ports are unmaintained. Decide the analytics tool for a low-traffic personal site, given the user wants lightweight, self-hosted-where-possible analytics. Candidates per research: Cloudflare Web Analytics (free, one-line, privacy-first, no self-host), GoatCounter (free for non-commercial, easy SQLite self-host, self-host on VPS possible), self-hosted Umami (VPS/Postgres — more moving parts). Then hand the user a checklist for whatever provisioning the choice requires (HITL). Record the dashboard URL/tracking setup as the Answer (never paste secrets).

See issues/02 for the full research answer.

## Answer

**Choice: Cloudflare Web Analytics** (not Umami, not GoatCounter). Rationale: no official Cloudflare hosting path for Umami; a VPS just to run analytics is the heaviest component in an otherwise Cloudflare-only, zero-ops architecture; privacy stance (no cookies, no fingerprinting) equivalent to Umami's. "Self-hosted where practical" treated as soft — self-host only if cheap AND boring to operate, which nothing here beat the free SaaS.

**Goals it satisfies:**
- Per-section traffic: pageview paths (`/art/`, `/prints/`, `/studies/`, …) show in Top pages, filterable by path prefix. No custom events supported — pageviews only.
- Resume downloads: button links to `/resume/` — a tiny HTML download page that immediately triggers the PDF download ("download starting…" copy). Counts as a pageview in Top pages. A bare `/resume.pdf` link would NOT be counted (no beacon on PDFs). The page also works as a shareable resume landing link.

**Implementation facts:**
- Beacon = manual `<script defer>` snippet with site token, added site-wide in the Astro layout head. No conflict with terminal theme, no cookie banner needed, invisible.
- Token is public-facing; wire it as an env/config value in Astro.

**Provisioning checklist (HITL, at deploy time — not now):**
1. Cloudflare dashboard → Web Analytics → add site `deshmukhmayur.com`, choose manual JS install.
2. Copy the token from the snippet into the site's env/config so the layout can emit it.
3. After first deploy, verify the dashboard shows hits.
