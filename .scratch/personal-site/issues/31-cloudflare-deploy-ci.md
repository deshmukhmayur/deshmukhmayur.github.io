# 31: Cloudflare deploy + CI

**What to build:** The site deploys automatically. `wrangler.jsonc` at root: static assets (`assets.directory: "./dist"`, 404-page handling, auto-trailing-slash), custom domain route on deshmukhmayur.com, **no Worker main** (pure asset requests). `_headers` in `public/`: immutable caching for `/_astro/*`, must-revalidate defaults. GitHub Actions on push to main: bun install (frozen lockfile) → build → `wrangler-action@v3` with repo secrets. Cloudflare Web Analytics beacon wired with its token (public, not secret). HITL steps captured for Mayur: dashboard provisioning (analytics site + token, contact Worker secrets from ticket 27, `CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID`), www → apex redirect rule + proxied placeholder DNS, Pinterest DNS TXT verification.

**Blocked by:** 30 (SEO layer — deploy the complete site, not a partial).

**Status:** ready-for-agent

- [ ] Push to main builds and deploys the site; deshmukhmayur.com serves the new build
- [ ] Old URLs never served stale; `_astro/*` assets immutable-cached
- [ ] 404 handler serves the 404 page on Cloudflare
- [ ] Web Analytics beacon sends real pageviews to the dashboard
- [ ] Contact Worker deployed with its secrets (from ticket 27's provision list)
- [ ] HITL checklist for Mayur written into the ticket comments as each step completes
