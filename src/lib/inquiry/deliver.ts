import "server-only";
import { createHmac, randomUUID } from "node:crypto";
import { getContent } from "@/content/repository";
import { defaultLocale } from "@/i18n/config";
import { renderInquiryEmail } from "./email";
import type { Inquiry } from "./schema";

/**
 * Inquiry delivery.
 *
 * Adapters are enabled by environment variables and run in parallel:
 *
 *   Email (Resend)   RESEND_API_KEY, INQUIRY_TO_EMAIL (comma-separated), INQUIRY_FROM_EMAIL
 *   CRM webhook      INQUIRY_WEBHOOK_URL, optional INQUIRY_WEBHOOK_SECRET
 *
 * With no adapter configured, development logs the inquiry and succeeds,
 * while production reports "unconfigured" so the API answers 503 and an
 * inquiry is never silently dropped. Secrets are never logged.
 */

export type DeliveryResult =
  | { status: "delivered"; channels: string[] }
  | { status: "logged" }
  | { status: "unconfigured" }
  | { status: "failed" };

type Envelope = { id: string; receivedAt: Date; inquiry: Inquiry };
type Adapter = { name: string; send: (envelope: Envelope) => Promise<void> };

const TIMEOUT_MS = 10_000;

function env(name: string) {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function resendAdapter(): Adapter | null {
  const apiKey = env("RESEND_API_KEY");
  const to = env("INQUIRY_TO_EMAIL");
  const from = env("INQUIRY_FROM_EMAIL");
  if (!apiKey || !to || !from) return null;

  return {
    name: "email",
    async send({ id, receivedAt, inquiry }) {
      // Staff-facing labels use the default locale, whatever language the visitor used.
      const content = await getContent(defaultLocale);
      const { subject, html, text } = renderInquiryEmail(inquiry, content, { id, receivedAt });

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": id,
        },
        body: JSON.stringify({
          from,
          to: to.split(",").map((s) => s.trim()).filter(Boolean),
          reply_to: inquiry.email,
          subject,
          html,
          text,
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 200)}`);
    },
  };
}

function webhookAdapter(): Adapter | null {
  const url = env("INQUIRY_WEBHOOK_URL");
  if (!url) return null;
  const secret = env("INQUIRY_WEBHOOK_SECRET");

  return {
    name: "webhook",
    async send({ id, receivedAt, inquiry }) {
      const body = JSON.stringify({
        event: "inquiry.created",
        id,
        receivedAt: receivedAt.toISOString(),
        inquiry: {
          type: inquiry.type,
          name: inquiry.name,
          organisation: inquiry.organisation,
          role: inquiry.role ?? null,
          email: inquiry.email,
          country: inquiry.country,
          message: inquiry.message,
          locale: inquiry.locale,
          consent: inquiry.consent,
        },
      });

      const headers: Record<string, string> = { "Content-Type": "application/json", "X-Inquiry-Id": id };
      if (secret) {
        // Shared secret for simple header checks, plus an HMAC for receivers that verify integrity.
        headers["X-Inquiry-Secret"] = secret;
        headers["X-Inquiry-Signature"] = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
      }

      const res = await fetch(url, { method: "POST", headers, body, signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    },
  };
}

export async function deliverInquiry(inquiry: Inquiry): Promise<DeliveryResult> {
  const envelope: Envelope = { id: randomUUID(), receivedAt: new Date(), inquiry };
  const adapters = [resendAdapter(), webhookAdapter()].filter((a): a is Adapter => a !== null);

  if (!adapters.length) {
    if (process.env.NODE_ENV === "production") {
      console.error("[inquiry] No delivery adapter configured; inquiry rejected with 503.");
      return { status: "unconfigured" };
    }
    console.info("[inquiry] No delivery adapter configured (development). Payload:", JSON.stringify(envelope, null, 2));
    return { status: "logged" };
  }

  const results = await Promise.allSettled(adapters.map((a) => a.send(envelope)));
  const channels: string[] = [];
  results.forEach((r, i) => {
    if (r.status === "fulfilled") channels.push(adapters[i].name);
    else console.error(`[inquiry] ${adapters[i].name} delivery failed (${envelope.id}):`, r.reason instanceof Error ? r.reason.message : r.reason);
  });

  // One successful channel is enough for the inquiry to have been received.
  return channels.length ? { status: "delivered", channels } : { status: "failed" };
}
