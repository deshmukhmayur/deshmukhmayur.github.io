# Task: Synthesize the spec

Type: task
Status: resolved
Blocked by: 01, 03, 04, 05, 06, 07, 11

## Question

With all decision tickets resolved, synthesize the site spec at `.scratch/personal-site/spec.md`: IA/routes, content models for art/prints/soliloquy/studies, visual direction from the homepage prototype, contact form design, analytics wiring, Cloudflare deployment plan, and content pipeline. This spec hands off to the implementation effort.

## Resolution

Spec written to `.scratch/personal-site/spec.md`. Covers stack/hosting (Workers static assets, wrangler.jsonc, GH Actions CI), visual direction (terminal/TUI system), full IA/routes, all five content models with listing/detail designs, image pipeline, contact Worker (D1 + Resend + Turnstile), Cloudflare Web Analytics wiring (incl. `/resume/` download page), content gathering/migration, and a suggested build order. Remaining open items recorded as fog on the map: about/contact/404 interior looks, SEO/OG/favicon, old-content audit, JetBrains Mono licensing.