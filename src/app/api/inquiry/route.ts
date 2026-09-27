import { deliverInquiry } from "@/lib/inquiry/deliver";
import { clientIp, createRateLimiter } from "@/lib/inquiry/rate-limit";
import { inquirySchema, spamReason, toFieldErrors, toRecord } from "@/lib/inquiry/schema";

/**
 * POST /api/inquiry — receives website inquiries.
 *
 * Responses (JSON):
 *   200 { ok: true }                        received (also returned, silently, for spam)
 *   400 { error: "validation", fields }     field → validation key (translated by the UI)
 *   400 { error: "bad_request" }            malformed body
 *   403 { error: "forbidden" }              cross-site request
 *   413 / 415                               body too large / not JSON
 *   429 { error: "rate_limited" }           see Retry-After
 *   502 { error: "delivery_failed" }        every configured channel failed
 *   503 { error: "unavailable" }            no delivery channel configured in production
 */

// 6 requests per minute per IP. In-memory, so per instance: production should
// use a shared store (e.g. Upstash Redis) so limits hold across instances.
const limiter = createRateLimiter({ limit: 6, windowMs: 60_000 });

const MAX_BODY_BYTES = 32 * 1024;

const json = (body: unknown, status = 200, headers?: HeadersInit) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

export async function POST(request: Request) {
  // Browsers mark cross-site requests; the form only ever posts same-origin.
  if (request.headers.get("sec-fetch-site") === "cross-site") return json({ error: "forbidden" }, 403);

  const limited = limiter.check(clientIp(request.headers));
  if (!limited.ok) {
    return json({ error: "rate_limited" }, 429, { "Retry-After": String(limited.retryAfter) });
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return json({ error: "unsupported_media_type" }, 415);
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return json({ error: "payload_too_large" }, 413);
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return json({ error: "payload_too_large" }, 413);
    body = JSON.parse(raw);
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return json({ error: "bad_request" }, 400);

  // Honeypot or implausibly fast: acknowledge without delivering, so bots learn nothing.
  const spam = spamReason(body as Record<string, unknown>);
  if (spam) {
    if (process.env.NODE_ENV !== "production") console.info(`[inquiry] Discarded submission (${spam}).`);
    return json({ ok: true });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) return json({ error: "validation", fields: toFieldErrors(parsed.error) }, 400);

  const result = await deliverInquiry(toRecord(parsed.data));
  switch (result.status) {
    case "delivered":
    case "logged":
      return json({ ok: true });
    case "unconfigured":
      return json({ error: "unavailable" }, 503);
    case "failed":
      return json({ error: "delivery_failed" }, 502);
  }
}
