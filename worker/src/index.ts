/*
 * Contact Worker (ticket 27) — standalone from the static site.
 *
 * POST /api/send { name, email, message, honeypot?, turnstileToken? }
 *   - honeypot filled → 200 ok, message silently swallowed (bot)
 *   - Turnstile token verified server-side when TURNSTILE_SECRET is set
 *   - stored in D1, notification email via Resend (sender = recipient)
 *   - never hosts threads: only these three fields are accepted, no GET
 */
export interface Env {
  DB: D1Database;
  TURNSTILE_SECRET?: string;
  RESEND_API_KEY?: string;
  NOTIFY_EMAIL?: string;
}

const LIMITS = { name: 200, email: 320, message: 5000 } as const;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });

const errors: Record<number, string> = {
  400: "bad request",
  403: "verification failed",
  413: "message too long",
  429: "rate limited",
};

const err = (status: number) => json({ ok: false, error: errors[status] ?? "error" }, status);

// coercion contract: anything that isn't a string becomes ""
const asString = (v: unknown): string => (typeof v === "string" ? v : "");

async function verifyTurnstile(token: string, secret: string, ip: string | null) {
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token, ...(ip && { remoteip: ip }) }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

async function notify(env: Env, name: string, email: string, message: string) {
  // Resend free-tier: sender = recipient (Mayur's own address); the sender's
  // email is quoted in the body + reply-to for plain reply semantics.
  if (!env.RESEND_API_KEY || !env.NOTIFY_EMAIL) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.NOTIFY_EMAIL,
      to: env.NOTIFY_EMAIL,
      reply_to: email,
      subject: `contact: ${name}`,
      text: `from: ${name} <${email}>\n\n${message}`,
    }),
    // never let a notification failure fail the request
  }).catch(() => {});
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("method not allowed", { status: 405, headers: { allow: "POST" } });
    }

    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return err(400);
    }

    // only the three real fields (plus honeypot + token) are ever read;
    // anything else a client sends is discarded, so the Worker never hosts
    // threads — messages are fire-and-forget into D1 + one email.
    // limits here must match the markup maxlengths in ContactForm.astro.
    const name = asString(body.name).trim();
    const email = asString(body.email).trim();
    const message = asString(body.message).trim();
    const honeypot = asString(body.honeypot).trim();
    const turnstileToken = asString(body.turnstileToken);

    // bot: accept quietly, swallow everything
    if (honeypot) return json({ ok: true, queued: false });

    if (!name || !email || !message) return err(400);
    if (
      name.length > LIMITS.name ||
      email.length > LIMITS.email ||
      message.length > LIMITS.message ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return err(413);
    }

    if (env.TURNSTILE_SECRET) {
      const ip = request.headers.get("cf-connecting-ip");
      if (!(await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET, ip))) return err(403);
    }

    const { success } = await env.DB.prepare(
      "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
    )
      .bind(name, email, message)
      .run();
    if (!success) return err(400);

    await notify(env, name, email, message);

    return json({ ok: true, queued: true });
  },
} satisfies ExportedHandler<Env>;
