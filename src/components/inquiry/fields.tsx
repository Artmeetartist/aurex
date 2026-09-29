"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Tone } from "./styles";

const controlBase =
  "block w-full rounded-md border px-4 text-[1rem] leading-snug outline-none transition-[border-color,box-shadow,background-color] duration-300 focus:ring-[3px] focus-visible:outline-none";

type FieldShell = {
  id: string;
  label: string;
  tone: Tone;
  error?: string;
  optionalLabel?: string;
  className?: string;
  children: ReactNode;
  aside?: ReactNode;
};

/** Label above, control, then an inline error wired up via aria-describedby. */
export function Field({ id, label, tone, error, optionalLabel, className, children, aside }: FieldShell) {
  return (
    <div className={className}>
      <div className="mb-2.5 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className={cn("text-[0.875rem] font-medium tracking-[-0.005em]", tone.label)}>
          {label}
        </label>
        {optionalLabel && <span className={cn("t-eyebrow !text-[0.625rem]", tone.faint)}>{optionalLabel}</span>}
      </div>
      {children}
      <div className="flex items-start justify-between gap-4">
        <p id={`${id}-error`} className={cn("t-small min-h-0", error && "mt-2", tone.error)}>
          {error}
        </p>
        {aside}
      </div>
    </div>
  );
}

type ControlProps = { tone: Tone; invalid?: boolean; describedBy?: string };

export function TextInput({ tone, invalid, describedBy, className, ...props }: ControlProps & ComponentProps<"input">) {
  return (
    <input
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={cn(controlBase, "h-14", tone.control, invalid && tone.controlInvalid, className)}
      {...props}
    />
  );
}

export function TextArea({ tone, invalid, describedBy, className, ...props }: ControlProps & ComponentProps<"textarea">) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={cn(controlBase, "min-h-[11rem] resize-y py-4 leading-relaxed", tone.control, invalid && tone.controlInvalid, className)}
      {...props}
    />
  );
}
