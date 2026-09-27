import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Mono label with an index and a gold rule, e.g. "01 — Who we are". */
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
    <p className={cn("t-eyebrow flex items-center gap-3", tone === "light" ? "text-mist" : "text-stone", className)}>
      {index && <span className={tone === "light" ? "text-gold" : "text-gold-ink"}>{index}</span>}
      <span aria-hidden className={cn("h-px w-8", tone === "light" ? "bg-gold/60" : "bg-gold-ink/50")} />
      <span>{children}</span>
    </p>
  );
}

/** Small status chip used for strategic / future areas. */
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
        "t-eyebrow inline-flex h-7 items-center gap-2 rounded-full border px-3 !text-[0.625rem]",
        tone === "light" ? "border-gold/35 text-gold-soft" : "border-gold-ink/35 text-gold-ink",
        className,
      )}
    >
      <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", tone === "light" ? "bg-gold" : "bg-gold-ink")} />
      {children}
    </span>
  );
}
