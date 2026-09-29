"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "@/components/ui/icons";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import {
  inquiryFieldOrder,
  inquiryFieldsSchema,
  LIMITS,
  toFieldErrors,
  validateField,
  type FieldErrors,
  type InquiryField,
  type InquiryIssue,
} from "@/lib/inquiry/schema";
import { href, inquiryTypes, type InquiryType } from "@/lib/routes";
import { Field, TextArea, TextInput } from "./fields";
import { tones } from "./styles";
import { TypeOptions } from "./type-options";

export type InquiryFormProps = {
  locale: Locale;
  inquiry: SiteContent["inquiry"];
  /** Preselected inquiry type; the form also reads ?type= from the URL. */
  defaultType?: InquiryType;
  /** "dark" for ink surfaces (default), "light" for ivory surfaces. */
  surface?: "dark" | "light";
  className?: string;
};

type Values = {
  type: InquiryType | "";
  name: string;
  organisation: string;
  role: string;
  email: string;
  country: string;
  message: string;
  consent: boolean;
};

type Status = "idle" | "submitting" | "success" | "error" | "unavailable";

const EASE = [0.16, 1, 0.3, 1] as const;

const isInquiryType = (value: string | null): value is InquiryType =>
  !!value && (inquiryTypes as readonly string[]).includes(value);

/** Event-time clock (kept outside components so it is never mistaken for render work). */
const now = () => Date.now();

function emptyValues(type: InquiryType | ""): Values {
  return { type, name: "", organisation: "", role: "", email: "", country: "", message: "", consent: false };
}

/**
 * Reads ?type= and hands it to the form. Isolated behind its own Suspense
 * boundary so the rest of the form still prerenders on static pages.
 */
function TypeFromUrl({ onType }: { onType: (type: InquiryType) => void }) {
  const value = useSearchParams().get("type");
  useEffect(() => {
    if (isInquiryType(value)) onType(value);
  }, [value, onType]);
  return null;
}

export function InquiryForm({ locale, inquiry, defaultType, surface = "dark", className }: InquiryFormProps) {
  const tone = tones[surface];
  const uid = useId();
  const ids = (field: string) => `${uid}-${field}`;

  const [values, setValues] = useState<Values>(() => emptyValues(defaultType ?? ""));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [announcement, setAnnouncement] = useState("");
  const [website, setWebsite] = useState("");
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  /** Field to focus once the form re-mounts after "send another". */
  const pendingFocus = useRef<InquiryField | null>(null);

  useEffect(() => {
    startedAt.current = now();
  }, []);

  // The success panel and the form mount after AnimatePresence finishes the
  // exit of the other, so focus is moved from callback refs, not effects.
  const successRef = useCallback((node: HTMLHeadingElement | null) => node?.focus(), []);
  const attachForm = useCallback((node: HTMLFormElement | null) => {
    formRef.current = node;
    if (node && pendingFocus.current) {
      node.querySelector<HTMLElement>(`[name="${pendingFocus.current}"]`)?.focus();
      pendingFocus.current = null;
    }
  }, []);

  const selectType = useCallback((type: InquiryType) => {
    setValues((v) => ({ ...v, type }));
    setErrors((e) => (e.type ? { ...e, type: undefined } : e));
  }, []);

  const errorText = (key?: InquiryIssue) => (key ? (key === "tooLong" ? inquiry.error : inquiry.validation[key]) : undefined);

  const labels: Record<InquiryField, string> = {
    type: inquiry.fields.type,
    name: inquiry.fields.name,
    organisation: inquiry.fields.organisation,
    role: inquiry.fields.role,
    email: inquiry.fields.email,
    country: inquiry.fields.country,
    message: inquiry.fields.message,
    consent: "",
  };
  const announce = (field: InquiryField, key?: InquiryIssue) =>
    setAnnouncement([labels[field], errorText(key)].filter(Boolean).join(": "));

  function update<K extends keyof Values>(field: K, value: Values[K]) {
    setValues((v) => ({ ...v, [field]: value }));
    // Once a field shows an error, re-check it as the visitor corrects it.
    if (errors[field]) setErrors((e) => ({ ...e, [field]: validateField(field, value) }));
  }

  function onBlur(field: InquiryField) {
    const value = values[field];
    // Do not flag untouched fields while someone is simply tabbing through.
    if (value === "" || value === false) return;
    const issue = validateField(field, value);
    setErrors((e) => ({ ...e, [field]: issue }));
    if (issue && issue !== errors[field]) announce(field, issue);
  }

  function focusField(field: InquiryField) {
    const el = formRef.current?.querySelector<HTMLElement>(
      field === "type" ? 'input[name="type"]:checked, input[name="type"]' : `[name="${field}"]`,
    );
    el?.focus();
  }

  function showErrors(next: FieldErrors) {
    setErrors(next);
    const first = inquiryFieldOrder.find((f) => next[f]);
    if (first) {
      announce(first, next[first]);
      focusField(first);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const parsed = inquiryFieldsSchema.safeParse(values);
    if (!parsed.success) {
      showErrors(toFieldErrors(parsed.error));
      return;
    }

    setErrors({});
    setStatus("submitting");
    setAnnouncement(inquiry.submitting);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          role: values.role || undefined,
          locale,
          website,
          startedAt: startedAt.current,
          submittedAt: now(),
        }),
      });

      if (res.ok) {
        setStatus("success");
        setAnnouncement("");
        return;
      }
      if (res.status === 400) {
        const data = (await res.json().catch(() => null)) as { fields?: FieldErrors } | null;
        if (data?.fields && Object.keys(data.fields).length) {
          setStatus("idle");
          showErrors(data.fields);
          return;
        }
      }
      const next: Status = res.status === 503 || res.status === 429 ? "unavailable" : "error";
      setStatus(next);
      setAnnouncement(next === "unavailable" ? inquiry.unavailable : inquiry.error);
    } catch {
      setStatus("error");
      setAnnouncement(inquiry.error);
    }
  }

  function reset() {
    // Keep who they are; clear what they said.
    setValues((v) => ({ ...v, message: "", consent: false }));
    setErrors({});
    setStatus("idle");
    setAnnouncement("");
    startedAt.current = now();
    pendingFocus.current = "message";
  }

  const submitting = status === "submitting";
  const failure = status === "error" ? inquiry.error : status === "unavailable" ? inquiry.unavailable : null;

  const text = (field: Exclude<InquiryField, "type" | "consent" | "message">) => ({
    id: ids(field),
    name: field,
    value: values[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => update(field, e.target.value),
    onBlur: () => onBlur(field),
    invalid: !!errors[field],
    describedBy: errors[field] ? `${ids(field)}-error` : undefined,
    tone,
  });

  return (
    <div className={cn("relative", className)}>
      <Suspense fallback={null}>
        <TypeFromUrl onType={selectType} />
      </Suspense>

      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex min-h-[26rem] flex-col items-start justify-center py-6"
          >
            <span aria-hidden className={cn("grid h-14 w-14 place-items-center rounded-full border", tone.successRing)}>
              <Check size={20} />
            </span>
            <h3
              ref={successRef}
              tabIndex={-1}
              className={cn("t-display-sm mt-10 font-light outline-none", tone.text)}
            >
              {inquiry.success.title}
            </h3>
            <p className={cn("t-lead mt-4 max-w-md", tone.muted)}>{inquiry.success.text}</p>
            <Button
              type="button"
              onClick={reset}
              variant={surface === "dark" ? "outline-light" : "outline-dark"}
              className="mt-10"
            >
              {inquiry.success.again}
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={attachForm}
            noValidate
            onSubmit={onSubmit}
            aria-label={inquiry.title}
            aria-busy={submitting}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <TypeOptions
              idPrefix={uid}
              legend={inquiry.fields.type}
              types={inquiry.types}
              value={values.type}
              onChange={selectType}
              error={errorText(errors.type)}
              tone={tone}
            />

            <div className="mt-10 grid gap-x-5 gap-y-7 md:grid-cols-2">
              <Field id={ids("name")} label={inquiry.fields.name} tone={tone} error={errorText(errors.name)}>
                <TextInput {...text("name")} autoComplete="name" maxLength={LIMITS.name} />
              </Field>
              <Field id={ids("organisation")} label={inquiry.fields.organisation} tone={tone} error={errorText(errors.organisation)}>
                <TextInput {...text("organisation")} autoComplete="organization" maxLength={LIMITS.organisation} />
              </Field>
              <Field
                id={ids("role")}
                label={inquiry.fields.role}
                optionalLabel={inquiry.fields.optional}
                tone={tone}
                error={errorText(errors.role)}
              >
                <TextInput {...text("role")} autoComplete="organization-title" maxLength={LIMITS.role} />
              </Field>
              <Field id={ids("country")} label={inquiry.fields.country} tone={tone} error={errorText(errors.country)}>
                <TextInput {...text("country")} autoComplete="country-name" maxLength={LIMITS.country} />
              </Field>
              <Field
                id={ids("email")}
                label={inquiry.fields.email}
                tone={tone}
                error={errorText(errors.email)}
                className="md:col-span-2"
              >
                <TextInput
                  {...text("email")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  maxLength={LIMITS.email}
                />
              </Field>
              <Field
                id={ids("message")}
                label={inquiry.fields.message}
                tone={tone}
                error={errorText(errors.message)}
                className="md:col-span-2"
                aside={
                  values.message.length > LIMITS.messageMax * 0.85 && (
                    <span aria-hidden className={cn("t-eyebrow mt-2 shrink-0 tabular-nums", tone.faint)}>
                      {values.message.length} / {LIMITS.messageMax}
                    </span>
                  )
                }
              >
                <TextArea
                  id={ids("message")}
                  name="message"
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  onBlur={() => onBlur("message")}
                  placeholder={inquiry.fields.messagePlaceholder}
                  rows={6}
                  maxLength={LIMITS.messageMax}
                  invalid={!!errors.message}
                  describedBy={errors.message ? `${ids("message")}-error` : undefined}
                  tone={tone}
                />
              </Field>
            </div>

            {/* Honeypot: invisible to people and assistive tech; bots tend to fill it. */}
            <div aria-hidden className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className={cn("mt-9 border-t pt-8", tone.rule)}>
              <div>
                <label htmlFor={ids("consent")} className="flex min-h-11 cursor-pointer items-start gap-4">
                  <span className="relative mt-0.5 grid h-5 w-5 shrink-0 place-items-center">
                    <input
                      id={ids("consent")}
                      name="consent"
                      type="checkbox"
                      checked={values.consent}
                      onChange={(e) => update("consent", e.target.checked)}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={errors.consent ? `${ids("consent")}-error` : undefined}
                      className={cn(
                        "peer h-5 w-5 cursor-pointer appearance-none rounded-[0.3125rem] border transition-colors duration-200",
                        tone.checkbox,
                        errors.consent && tone.controlInvalid,
                      )}
                    />
                    <Check
                      size={14}
                      className={cn(
                        "pointer-events-none absolute opacity-0 transition-opacity duration-200 peer-checked:opacity-100",
                        tone.checkboxMark,
                      )}
                    />
                  </span>
                  <span className={cn("text-[0.9375rem] leading-relaxed", tone.muted)}>
                    {inquiry.fields.consent}{" "}
                    <a href={href(locale, "privacy")} target="_blank" rel="noopener" className={cn("transition-colors", tone.link)}>
                      {inquiry.fields.privacyLink}
                    </a>
                    .
                  </span>
                </label>
                {errors.consent && (
                  <p id={`${ids("consent")}-error`} className={cn("t-small ml-9 mt-1", tone.error)}>
                    {errorText(errors.consent)}
                  </p>
                )}
              </div>

              <AnimatePresence initial={false}>
                {failure && (
                  <motion.p
                    key={status}
                    role="alert"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={cn("t-small mt-7 rounded-md border px-4 py-3.5", tone.alert)}
                  >
                    {failure}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mt-8">
                <Button
                  type="submit"
                  size="lg"
                  aria-disabled={submitting || undefined}
                  className={cn("w-full justify-between sm:w-auto", submitting && "cursor-progress opacity-70")}
                >
                  {submitting ? inquiry.submitting : inquiry.submit}
                </Button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
