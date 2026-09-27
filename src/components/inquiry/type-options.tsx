"use client";

import type { SiteContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { inquiryTypes, type InquiryType } from "@/lib/routes";
import type { Tone } from "./styles";

/**
 * Inquiry type as four selectable cards. Native radios (visually hidden) give
 * radio-group semantics, roving focus and arrow-key selection for free.
 */
export function TypeOptions({
  idPrefix,
  legend,
  types,
  value,
  onChange,
  error,
  tone,
}: {
  idPrefix: string;
  legend: string;
  types: SiteContent["inquiry"]["types"];
  value: InquiryType | "";
  onChange: (type: InquiryType) => void;
  error?: string;
  tone: Tone;
}) {
  const errorId = `${idPrefix}-type-error`;
  return (
    <fieldset
      role="radiogroup"
      aria-labelledby={`${idPrefix}-type-legend`}
      aria-describedby={error ? errorId : undefined}
      aria-invalid={error ? true : undefined}
      aria-required
    >
      <legend id={`${idPrefix}-type-legend`} className={cn("mb-3.5 text-[0.875rem] font-medium tracking-[-0.005em]", tone.label)}>{legend}</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {inquiryTypes.map((type, i) => {
          const checked = value === type;
          const id = `${idPrefix}-type-${type}`;
          return (
            <label
              key={type}
              htmlFor={id}
              className={cn(
                "relative flex min-h-[4.75rem] cursor-pointer items-start gap-4 rounded-[1.125rem] border p-4 transition-[border-color,background-color] duration-300 sm:p-5",
                "has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-gold",
                checked ? tone.optionChecked : tone.option,
                error && !checked && tone.controlInvalid,
              )}
            >
              <input
                id={id}
                type="radio"
                name="type"
                value={type}
                checked={checked}
                onChange={() => onChange(type)}
                aria-labelledby={`${id}-label`}
                aria-describedby={error ? `${id}-desc ${errorId}` : `${id}-desc`}
                className="sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "mt-[0.1875rem] grid h-[1.125rem] w-[1.125rem] shrink-0 place-items-center rounded-full border transition-colors duration-300",
                  checked ? tone.radioChecked : tone.radio,
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full transition-transform duration-300 ease-[var(--ease-out-expo)]",
                    tone.radioDot,
                    checked ? "scale-100" : "scale-0",
                  )}
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-3">
                  <span id={`${id}-label`} className={cn("text-[1.0625rem] font-medium tracking-[-0.01em]", tone.text)}>
                    {types[type].label}
                  </span>
                  <span
                    aria-hidden
                    className={cn("t-eyebrow hidden transition-colors sm:inline", checked ? tone.indexChecked : tone.index)}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <span id={`${id}-desc`} className={cn("mt-1 block text-[0.875rem] leading-snug", tone.muted)}>
                  {types[type].description}
                </span>
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p id={errorId} className={cn("t-small mt-2.5", tone.error)}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
