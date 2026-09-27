/**
 * Inquiry validation, shared by the client form and the API route.
 *
 * Validation messages are content keys (see `SiteContent["inquiry"]["validation"]`),
 * never English strings: the UI translates them for the active locale.
 */

import { z } from "zod";
import type { SiteContent } from "@/content/types";
import { locales } from "@/i18n/config";
import { inquiryTypes } from "@/lib/routes";

export type ValidationKey = keyof SiteContent["inquiry"]["validation"];
/**
 * `tooLong` only occurs for tampered requests (inputs enforce `maxLength`),
 * so it has no dedicated copy and the UI falls back to the generic error.
 */
export type InquiryIssue = ValidationKey | "tooLong";

export const LIMITS = {
  name: 120,
  organisation: 160,
  role: 120,
  email: 254,
  country: 90,
  messageMin: 20,
  messageMax: 4000,
} as const;

/** Submissions completed faster than this are treated as automated. */
export const MIN_FILL_MS = 2500;

const issue = (key: InquiryIssue) => ({ error: key });

const requiredText = (max: number) =>
  z
    .string(issue("required"))
    .trim()
    .min(1, { ...issue("required"), abort: true })
    .max(max, issue("tooLong"));

/** User-facing fields, in the order they appear in the form. */
export const inquiryFieldsSchema = z.object({
  type: z.enum(inquiryTypes, issue("required")),
  name: requiredText(LIMITS.name),
  organisation: requiredText(LIMITS.organisation),
  role: z
    .string()
    .trim()
    .max(LIMITS.role, issue("tooLong"))
    .optional()
    .transform((v) => v || undefined),
  email: requiredText(LIMITS.email).pipe(z.email(issue("email"))),
  country: requiredText(LIMITS.country),
  message: z
    .string(issue("required"))
    .trim()
    .min(1, { ...issue("required"), abort: true })
    .min(LIMITS.messageMin, issue("tooShort"))
    .max(LIMITS.messageMax, issue("tooLong")),
  consent: z.literal(true, issue("consent")),
});

/** Full request body accepted by POST /api/inquiry. */
export const inquirySchema = inquiryFieldsSchema.extend({
  locale: z.enum(locales, issue("required")),
  /** Honeypot: hidden from people, so it must stay empty. */
  website: z.string().max(0).optional(),
  /** Client clock (ms) when the form was mounted. */
  startedAt: z.number().int().positive(),
  /**
   * Client clock (ms) at submit. Timing is measured on one clock (the
   * visitor's) so a skewed device clock never blocks a genuine inquiry.
   */
  submittedAt: z.number().int().positive().optional(),
});

export type InquiryField = keyof z.input<typeof inquiryFieldsSchema>;
export type InquiryFields = z.output<typeof inquiryFieldsSchema>;
export type InquiryPayload = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;
/** A validated inquiry without its anti-spam fields: what is delivered and stored. */
export type InquiryRecord = Omit<Inquiry, "website" | "startedAt" | "submittedAt">;
export type FieldErrors = Partial<Record<InquiryField, InquiryIssue>>;

export const inquiryFieldOrder = Object.keys(inquiryFieldsSchema.shape) as InquiryField[];

/** Drops the anti-spam fields so they are never delivered or stored. */
export function toRecord({ type, name, organisation, role, email, country, message, consent, locale }: Inquiry): InquiryRecord {
  return { type, name, organisation, role, email, country, message, consent, locale };
}

/** First issue per field, keyed by field name. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const i of error.issues) {
    const field = i.path[0];
    if (typeof field === "string" && field in inquiryFieldsSchema.shape && !(field in out)) {
      out[field as InquiryField] = i.message as InquiryIssue;
    }
  }
  return out;
}

/** Validates a single field; returns its issue key or undefined. */
export function validateField(field: InquiryField, value: unknown): InquiryIssue | undefined {
  const result = inquiryFieldsSchema.shape[field].safeParse(value);
  return result.success ? undefined : (result.error.issues[0]?.message as InquiryIssue);
}

/**
 * Anti-spam screen, run before validation. Returns a reason when the request
 * looks automated; the API then answers 200 without delivering anything.
 */
export function spamReason(body: Record<string, unknown>, now = Date.now()): "honeypot" | "timing" | null {
  const { website, startedAt, submittedAt } = body;
  if (typeof website === "string" && website.trim() !== "") return "honeypot";
  if (website !== undefined && typeof website !== "string") return "honeypot";

  if (typeof startedAt !== "number" || !Number.isFinite(startedAt) || startedAt <= 0) return "timing";
  const end = typeof submittedAt === "number" && Number.isFinite(submittedAt) ? submittedAt : now;
  if (end - startedAt < MIN_FILL_MS) return "timing";
  return null;
}
