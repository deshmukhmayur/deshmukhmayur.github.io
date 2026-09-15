# Grilling: Contact form specifics

Type: grilling
Status: resolved

## Question

Pin down the contact form. Known so far: tiny Cloudflare Worker with Turnstile spam protection, storing to KV/D1 or sending email. Decide: where submissions land (KV/D1 retention vs. direct email via a provider like Resend — is a paid key acceptable?), notification approach (email notify vs. checking a dashboard), rate limiting, and what fields the form has. Load `grilling` and `domain-modeling` skills.

## Answer

All recommendations accepted:

- **Storage: D1.** Free, queryable inbox of messages; no third-party dependency; KV rejected as awkward to read/query. Turnstile keys are free on Cloudflare.
- **Notification: email via Resend free tier** (own address as sender/recipient), so nothing requires remembering to check a dashboard; D1 stays the durable record.
- **Rate limiting: Turnstile only, plus one WAF rate-limit rule** on the submit route if easy; no custom counter code.
- **Fields: name, email, message, plus a hidden honeypot** field. Nothing else.
- **Reply semantics: plain reply-to-email**; the site never hosts conversations — the form is a one-shot inbox.
- **Submit UX: terminal-flavored inline success/error state** in the contact pane (matching the ticket-03 terminal/TUI vocabulary, e.g. `$ send ok`); no page redirect.