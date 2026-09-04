# Grilling: Contact form specifics

Type: grilling
Status: open

## Question

Pin down the contact form. Known so far: tiny Cloudflare Worker with Turnstile spam protection, storing to KV/D1 or sending email. Decide: where submissions land (KV/D1 retention vs. direct email via a provider like Resend — is a paid key acceptable?), notification approach (email notify vs. checking a dashboard), rate limiting, and what fields the form has. Load `grilling` and `domain-modeling` skills.