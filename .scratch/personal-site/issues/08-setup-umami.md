# Grilling: Analytics tool choice + provisioning

Type: grilling
Status: open
Blocked by: 02

## Question

Research in 02 found Umami has **no official Cloudflare Workers + D1 path** — it needs Node/Postgres (Docker/VPS or Vercel + external Postgres), and community Workers ports are unmaintained. Decide the analytics tool for a low-traffic personal site, given the user wants lightweight, self-hosted-where-possible analytics. Candidates per research: Cloudflare Web Analytics (free, one-line, privacy-first, no self-host), GoatCounter (free for non-commercial, easy SQLite self-host, self-host on VPS possible), self-hosted Umami (VPS/Postgres — more moving parts). Then hand the user a checklist for whatever provisioning the choice requires (HITL). Record the dashboard URL/tracking setup as the Answer (never paste secrets).

See issues/02 for the full research answer.
