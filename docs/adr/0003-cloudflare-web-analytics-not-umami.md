# Cloudflare Web Analytics instead of self-hosted Umami

Status: accepted

The original ask was self-hosted Umami analytics. Research found Umami has no official Cloudflare Workers/D1 hosting path — it needs Node + Postgres, meaning a VPS just to run analytics: the heaviest component in an otherwise zero-ops, Cloudflare-only architecture. We chose **Cloudflare Web Analytics** (free, one-line beacon, no cookies) over Umami and GoatCounter. Consequences: no custom events — per-section traffic comes from pageview path prefixes; resume downloads are counted by sending the button to a `/resume/` HTML download page rather than a bare PDF link (a PDF response carries no beacon). The beacon token is public-facing and wired as an env/config value.
