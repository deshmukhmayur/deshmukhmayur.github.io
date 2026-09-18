# 27: Contact form + Worker

**What to build:** Visitors can send a message. One shared terminal-form component (name, email, message, hidden honeypot) with inline terminal output — `$ send ok` on success, `$ send: error` variant on failure, no redirect; used by the homepage contact pane and `/contact/` alike. Backend: a tiny standalone Worker (separate from the static site) that stores messages in D1 and notifies via Resend free-tier (sender = recipient, plain reply-to-email semantics). Spam protection: Cloudflare Turnstile (free keys) + one WAF rate-limit rule on the submit route. Truthfulness rule: the `$ send` command is functional, output is real.

**Blocked by:** 21 (terminal shell).

**Status:** done

- [x] `/contact/` renders the form in terminal style; homepage pane reuses the same component (`ContactForm.astro`, `variant: "session" | "pane"` — pane wiring into the homepage lands with ticket 28)
- [x] Local end-to-end send works against wrangler dev with a local D1 (message stored, Resend call made or stubbed)
- [x] Honeypot silently swallows bot submissions; Turnstile token verified server-side
- [x] Worker never hosts threads; only fields name/email/message accepted
- [ ] Live Turnstile/D1/Resend keys provisioned at deploy time (HITL, flagged for ticket 31)
