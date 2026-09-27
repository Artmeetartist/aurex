import "server-only";

/**
 * Sliding-window rate limiter held in process memory.
 *
 * Good enough for a single long-lived server and for development. On
 * serverless or multi-instance deployments every instance keeps its own
 * window, so production should back this with a shared store (for example
 * Upstash Redis with @upstash/ratelimit) behind the same `check` signature.
 */
export function createRateLimiter({ limit, windowMs, maxKeys = 10_000 }: { limit: number; windowMs: number; maxKeys?: number }) {
  const hits = new Map<string, number[]>();

  function sweep(now: number) {
    for (const [key, stamps] of hits) {
      if (!stamps.length || now - stamps[stamps.length - 1] >= windowMs) hits.delete(key);
    }
  }

  return {
    /** Records a hit for `key`; returns whether it is allowed and, if not, when to retry. */
    check(key: string, now = Date.now()): { ok: true } | { ok: false; retryAfter: number } {
      if (hits.size > maxKeys) sweep(now);

      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      if (recent.length >= limit) {
        hits.set(key, recent);
        return { ok: false, retryAfter: Math.max(1, Math.ceil((recent[0] + windowMs - now) / 1000)) };
      }
      recent.push(now);
      hits.set(key, recent);
      return { ok: true };
    },
  };
}

/** Best-effort client IP from proxy headers. */
export function clientIp(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}
