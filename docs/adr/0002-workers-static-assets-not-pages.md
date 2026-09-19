# Cloudflare Workers with static assets, not Pages

Status: accepted

The site deploys to Cloudflare **Workers with static assets** rather than Cloudflare Pages, even though Pages is the better-known path. Cloudflare now recommends Workers for all new projects (Pages is legacy); static-asset requests are free and unlimited on Workers, and a pure static site needs no Worker script at all (`wrangler.jsonc` with just an `assets` block, `not_found_handling: "404-page"` — never SPA fallback for a multi-page static site). The contact-form API runs as a separate small Worker; analytics needs no self-hosting (see ADR 0003). Considered: GitHub Pages (the site's current host) — replaced because the domain and all supporting services (Workers, Turnstile, Web Analytics, D1) consolidate on one Cloudflare account.
