# Research: Self-hosted Umami analytics on Cloudflare

Type: research
Status: resolved

## Question

How do you self-host Umami on Cloudflare (Workers + D1)? Cover the official/community deployment path, whether it is maintained, setup steps (account, D1 schema, tracking script), free-tier fit, and alternatives (GoatCounter, Plausible, Fathom, Cloudflare Web Analytics) with a quick comparison for this use case. Record findings as an Answer below.

## Answer

### TL;DR

There is **no official Umami-on-Cloudflare (Workers + D1) deployment path**. Umami officially requires Node.js (18.18+) and PostgreSQL — it is a full Next.js app backed by Prisma, which does not run on Workers or D1. Community Workers ports exist but are small, unofficial, and personal projects. For a small personal site on the Cloudflare free tier, the practical choices are Cloudflare Web Analytics (free, zero-config) or GoatCounter (free for non-commercial), with a classic Umami self-host (Docker + Postgres, or Vercel/Netlify + managed Postgres) if you want a full dashboard.

### 1. Official / community-supported Umami-on-Cloudflare path

- The official install docs specify: "A server with Node.js version 18.18+ and a PostgreSQL database version v12.14+" (https://github.com/umami-software/umami, https://umami.is/docs/install). There is no Workers/D1 support in the official codebase (it uses Prisma + a Node runtime).
- The official hosting guides list no Cloudflare guide at all — only bunny.net, CapRover, DigitalOcean, Fly.io, Heroku, Vercel, Netlify, Railway, Supabase, etc. (https://umami.is/docs/guides/hosting). Vercel and Netlify are mentioned as app hosts with free tiers, but you still need Postgres elsewhere.
- Cloudflare's D1 community-projects page lists no Umami integration (https://developers.cloudflare.com/d1/reference/community-projects/).
- Community Workers attempts on GitHub are unofficial and tiny: e.g. `afoim/cf-umami` ("Cloudflare Worker visit counter", ~9 stars), `xingkaixin/umami` ("Personal Umami edition on Cloudflare Workers and D1, using vinext and Drizzle", 0 stars), plus several Umami *proxy* Workers (anti-adblock) that still require a real Umami server (https://github.com/search?q=umami+cloudflare+worker&type=repositories). None are maintained by the Umami team; "maintained in 2026" is effectively no — treat them as experiments, not a supported path.
- Umami itself is very much maintained (v3, active repo, 38.6k stars, 6,753 commits as of Sept 2026).

### 2. What a real self-hosted Umami setup looks like (if you want it anyway)

1. Create a Cloudflare account (free plan is fine) — needed only if you front the tracker with a Worker proxy; the app itself cannot run on Workers.
2. Deploy the app: Docker (`docker.umami.is/umami-software/umami:latest`) with Postgres, or push the repo to Vercel/Netlify (`npm run build`, publish dir `.next`).
3. Database schema: created automatically on first `pnpm build` / container start; default login `admin` / `umami` (https://github.com/umami-software/umami). There is no D1 schema — D1 only accepts SQLite-style access from Workers bindings, and Umami doesn't use it.
4. Tracking script: add `<script async src="https://your-umami-host/script.js" data-website-id="..."></script>` to your site (https://umami.is/docs/collect-data).
5. Optional Cloudflare-specific bit: enable Cloudflare headers so real visitor IPs pass through (https://umami.is/docs/enable-cloudflare-headers), and optionally proxy `/script.js` + `/api/send` through a Worker to dodge ad blockers.

Free-tier fit for a small personal site: marginal. A Workers+D1 host won't run it; a free Vercel/Netlify app + free-tier Postgres (Neon/Supabase) can work but is two moving parts to maintain, and free Postgres tiers can pause/idle.

### 3. Alternatives comparison (small personal site on Cloudflare)

| Option | Hosting model | Free tier | Effort | Notes |
|---|---|---|---|---|
| **Cloudflare Web Analytics** | SaaS by Cloudflare | Free, unlimited (https://developers.cloudflare.com/web-analytics/) | One `<script>` or dashboard toggle | Pageviews/visitors/referrers/countries only; no events, no self-host, data stays with Cloudflare |
| **GoatCounter** | SaaS or self-host (Go binary + SQLite) | Free for non-commercial sites (https://www.goatcounter.com/) | Very low | Single ~2MB binary + SQLite makes it the easiest true self-host; AGPL; simple dashboard, no funnels |
| **Umami** | Self-host (Node + Postgres) or paid Cloud | Free self-hosted | High on Cloudflare (needs VPS or app host + Postgres) | Richest free/self-host feature set (events, funnels, UTM); requires ongoing maintenance |
| **Plausible** | SaaS, or self-host Community Edition (Elixir + Postgres) | No free SaaS tier; CE self-host is free but heavy (https://plausible.io/pricing) | Low (SaaS) / Medium-High (self-host) | SaaS starts ~$9/mo; nice dashboard, EU-hosted |
| **Fathom** | Paid SaaS only | No free tier; from ~$14/mo (https://usefathom.com/pricing) | Very low (SaaS) | Their "open source" repo (Fathom Lite) is a frozen lead-gen demo, not a maintained self-host option |

### Recommendation for this use case

For a personal site already on Cloudflare: start with **Cloudflare Web Analytics** (free, one-line setup). If you want ownership of the data and slightly richer stats without running a database, self-host **GoatCounter** (SQLite, trivial to run anywhere, free for non-commercial use). Only pick Umami if you want custom events/funnels and are willing to run Node + Postgres (e.g., Docker on a small VPS, or Vercel + Neon).

### Sources

- https://umami.is/docs — Umami v3 docs (self-host or cloud; deployment guides index)
- https://umami.is/docs/guides/hosting — official hosting guide (no Cloudflare; Vercel/Netlify free tiers + managed Postgres)
- https://github.com/umami-software/umami — official repo: Node 18.18+ / PostgreSQL 12.14+ requirement, Docker install, auto schema creation
- https://umami.is/docs/collect-data — tracking script installation
- https://umami.is/docs/enable-cloudflare-headers — Cloudflare-specific configuration
- https://developers.cloudflare.com/d1/ — D1 overview (serverless SQLite for Workers)
- https://developers.cloudflare.com/d1/reference/community-projects/ — no Umami integration listed
- https://github.com/search?q=umami+cloudflare+worker&type=repositories — community Workers ports/proxies (unofficial, low adoption)
- https://developers.cloudflare.com/web-analytics/ — Cloudflare Web Analytics (free, all plans)
- https://www.goatcounter.com/ — GoatCounter (free for non-commercial)
- https://plausible.io/pricing — Plausible pricing
- https://usefathom.com/pricing — Fathom pricing