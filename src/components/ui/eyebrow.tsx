import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Running-head label: an optional section number set as data, then a quiet
 * text label. `tone="dark"` is for paper surfaces.
 */
export function Eyebrow({
  index,
  children,
  tone = "light",
  className,
}: {
  index?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p className={cn("flex items-baseline gap-3", tone === "light" ? "text-ivory/70" : "text-ink/65", className)}>
      {index && <span className={cn("t-meta", tone === "light" ? "text-mist-dim" : "text-gold-ink")}>{index}</span>}
      <span className="t-eyebrow">{children}</span>
    </p>
  );
}

/** Small status note (e.g. "Strategic focus"): a dot and a label, no pill. */
export function StatusTag({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[0.75rem] font-medium leading-none",
        tone === "light" ? "text-ivory/75" : "text-ink/65",
        className,
      )}
    >
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", tone === "light" ? "bg-gold" : "bg-gold-ink")} />
      {children}
    </span>
  );
}
