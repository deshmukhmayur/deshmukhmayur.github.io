# contact worker

Standalone Worker (ticket 27) for the site's contact form — separate from the
static site, which has no Worker of its own.

POST `deshmukhmayur.com/api/send` with `{ name, email, message, honeypot?, turnstileToken? }`.

- Stores messages in D1 (`contact-inbox`), notifies via Resend free-tier
  (sender = recipient, `reply_to` = the visitor's email). The Worker never
  hosts threads: only name/email/message are accepted, nothing is exposed.
- Honeypot filled → silently swallowed (200, not stored).
- Turnstile token verified server-side when `TURNSTILE_SECRET` is set; without
  the secret (local dev) verification is skipped.
- Spam at deploy also gets a WAF rate-limit rule on `/api/send` (HITL, ticket 31).

## Local end-to-end

```
cd worker
bun install
bun run db:local      # create the messages table in local D1
bun run dev           # worker on :8787
```

`astro dev` proxies `/api/send` → `localhost:8787` (see `astro.config.mjs`),
so the site's form posts straight to the local worker.

```
curl -X POST localhost:8787/api/send -H 'content-type: application/json' \
  -d '{"name":"test","email":"you@example.com","message":"hi"}'
```

## Deploy (HITL — ticket 31)

1. Provision D1 (`contact-inbox`), put the real database id in `wrangler.jsonc`.
2. `wrangler d1 execute contact-inbox --remote --file=schema.sql`
3. Secrets: `wrangler secret put TURNSTILE_SECRET / RESEND_API_KEY / NOTIFY_EMAIL`
4. Turnstile site key → `PUBLIC_TURNSTILE_SITE_KEY` at site build time.
5. WAF rate-limit rule on `/api/send` in the dashboard.
