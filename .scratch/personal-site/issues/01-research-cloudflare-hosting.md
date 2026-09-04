# Research: Cloudflare static hosting for the site

Type: research
Status: resolved

## Question

What is the current, correct way to deploy a static Astro site on Cloudflare Workers with static assets (not Pages)? Cover: wrangler config for an Astro static build, custom domain binding (deshmukhmayur.com), CI options (GitHub Actions → Cloudflare), pricing/free-tier limits, and gotchas (e.g. SPA fallback, asset limits). Record findings as an Answer below.

## Answer

Researched Sep 2026 against official Cloudflare and Astro docs. Cloudflare explicitly recommends Workers for all new projects over Pages (Pages is legacy), and Astro's own deployment guide now centers on Workers with static assets. Sources: https://docs.astro.build/en/guides/deploy/cloudflare/ , https://developers.cloudflare.com/workers/static-assets/

### 1. Wrangler configuration for a static Astro build

Astro's static output (`output: 'static'`, the default) builds to `./dist`. No adapter is needed. Create a `wrangler.jsonc` (or `wrangler.toml`) at the project root with just an `assets` block — no `main` is required for a pure static site:

```jsonc
{
  "name": "deshmukhmayur-com",
  "compatibility_date": "2026-09-04", // set to the day you deploy
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page",
    "html_handling": "auto-trailing-slash"
  }
}
```

- `not_found_handling: "404-page"` serves the nearest `404.html` with a 404 status for unmatched requests (Astro emits `404.html` if you add a `src/pages/404.astro`). This is the right choice for a static Astro site.
- `html_handling` defaults to `auto-trailing-slash`: `foo.html` is served without a trailing slash, `foo/index.html` with one. This matches Astro's directory-based build output.
- Only use `not_found_handling: "single-page-application"` if the site is a client-side SPA (returns 200 + index.html for everything). Do NOT use SPA fallback for a multi-page static Astro site — it would mask broken links with 200s.
- Deploy/preview: `npx astro build && npx wrangler deploy` (or `npx wrangler dev` to preview locally).
- If a Worker script IS present, set compatibility date ≥ `2025-04-01` so navigation requests (`Sec-Fetch-Mode: navigate`) prefer asset serving instead of invoking the Worker — avoids billable invocations for a mostly-static site.

Sources: https://developers.cloudflare.com/workers/static-assets/ , https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/ , https://docs.astro.build/en/guides/deploy/cloudflare/

### 2. Custom domain binding (deshmukhmayur.com)

Add a Custom Domain in the wrangler config; Cloudflare auto-creates the DNS record and issues the certificate. The zone (deshmukhmayur.com) must be active in the same Cloudflare account, and the hostname must not already have a CNAME record:

```jsonc
{
  "routes": [
    { "pattern": "deshmukhmayur.com", "custom_domain": true }
  ]
}
```

- Custom Domains match the hostname exactly: a Worker on the apex will NOT receive `www.deshmukhmayur.com` traffic. To cover www, either add a second custom domain or set up a Cloudflare Redirect Rule (www → apex) plus a proxied placeholder DNS record for `www` (A → `192.0.2.0` or AAAA → `100::`).
- Limit: 100 custom domains per zone (not a concern here).

Sources: https://developers.cloudflare.com/workers/configuration/routing/custom-domains/

### 3. CI: GitHub Actions → Cloudflare Workers

Two options:

a) **GitHub Actions with `cloudflare/wrangler-action`** (official Cloudflare action):
   1. Create an API token in the Cloudflare dashboard with the "Edit Cloudflare Workers" template, scoped to the account (and zone, for the custom domain).
   2. Add repo secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
   3. Workflow:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: withastro/action@v3   # or: run `npm ci && npm run build` directly
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: deploy
```

b) **Workers Builds** (Cloudflare's built-in git integration): connect the repo in the dashboard (Compute > Workers & Pages > Create > Import a repository), with build command `npx astro build` and deploy command `npx wrangler deploy`. No secrets management on your side.

Sources: https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/ , https://github.com/cloudflare/wrangler-action , https://docs.astro.build/en/guides/deploy/cloudflare/#how-to-deploy-with-cicd

### 4. Free-tier limits and gotchas

Billing (the big win over Pages/old model):
- **Requests to static assets are free and unlimited** on all plans. Only Worker script invocations count against the free plan's 100,000 requests/day (then HTTP 1027 / 429). A pure static site with no `main` never invokes a Worker, so it is effectively free.
- No storage cost for assets.

Asset limits (per Worker version):
- Files: **20,000 (free) / 100,000 (paid)** — file count >20k requires Wrangler ≥ 4.34.0. Fine for a personal site.
- Individual file size: **25 MiB** on all plans — watch large images/videos; keep media in R2/Image Resizing if bigger.
- Requires Wrangler ≥ 3.78.10.

Gotchas:
- `_headers` file (place in Astro's `public/` so it lands in `dist/`): up to **100 rules**, 2,000 chars/line. Applied only to asset responses, never to Worker-generated responses. Defaults: `Cache-Control: public, max-age=0, must-revalidate` + `ETag`; override for hashed assets with e.g. `/_astro/*  Cache-Control: public, max-age=31556952, immutable`.
- `_redirects` file (same placement): up to **2,000 static + 100 dynamic** rules, 1,000 chars/rule; supports 301/302/303/307/308, splats (`:splat`), placeholders; NO rewrites-as-404, query-param matching, or domain-level redirects. Redirects run before headers. For more, use Bulk Redirects.
- SPA fallback trap: with `not_found_handling: "single-page-application"` every unmatched path returns index.html with 200. For a static Astro site prefer `404-page`.
- If you ever add `run_worker_first` (e.g. for an API route), free-tier requests matching it return 429 once the daily limit is exceeded (no fallback to assets for positive patterns; negative `!` patterns still serve assets).
- Auto Minify (zone setting) can break Astro client-side hydration — disable it if you see hydration mismatches.

Sources: https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/ , https://developers.cloudflare.com/workers/platform/limits/#static-assets , https://developers.cloudflare.com/workers/static-assets/headers/ , https://developers.cloudflare.com/workers/static-assets/redirects/ , https://docs.astro.build/en/guides/deploy/cloudflare/#troubleshooting

### Recommended setup for this site

Static Astro build → `wrangler.jsonc` with `assets.directory = "./dist"`, `not_found_handling = "404-page"`, no Worker script; `routes: [{ pattern = "deshmukhmayur.com", custom_domain = true }]` (+ www redirect rule); GitHub Actions deploying via `cloudflare/wrangler-action@v3` on push to main. Entirely free on the Workers free plan.