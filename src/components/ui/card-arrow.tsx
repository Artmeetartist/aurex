import { cn } from "@/lib/cn";
import { ArrowUpRight } from "./icons";

/**
 * Decorative "go" affordance for a clickable InteractiveCard: a ringed arrow
 * that fills and turns when the card is hovered or focused. An optional label
 * sits beside it (hidden on small screens when `compact`). The card itself is
 * the link, so this is never interactive on its own.
 */
export function CardArrow({
  tone = "light",
  label,
  compact = false,
  className,
}: {
  /** "light" = on an ivory card, "dark" = on a deep-teal card. */
  tone?: "light" | "dark";
  label?: string;
  compact?: boolean;
  className?: string;
}) {
  const light = tone === "light";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-3 text-[0.8125rem] font-medium transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/card:translate-x-1 group-focus-visible/card:translate-x-1 motion-reduce:transform-none",
        light ? "text-ink" : "text-ivory",
        className,
      )}
    >
      {label && <span className={cn(compact && "sr-only md:not-sr-only")}>{label}</span>}
      <span
        aria-hidden
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color] duration-500 ease-[var(--ease-out-expo)] group-hover/card:rotate-45 group-focus-visible/card:rotate-45",
          light
            ? "border-ink/15 group-hover/card:border-ink group-hover/card:bg-ink group-hover/card:text-ivory group-focus-visible/card:border-ink group-focus-visible/card:bg-ink group-focus-visible/card:text-ivory"
            : "border-white/20 group-hover/card:border-gold group-hover/card:bg-gold group-hover/card:text-ink group-focus-visible/card:border-gold group-focus-visible/card:bg-gold group-focus-visible/card:text-ink",
        )}
      >
        <ArrowUpRight size={14} />
      </span>
    </span>
  );
}
