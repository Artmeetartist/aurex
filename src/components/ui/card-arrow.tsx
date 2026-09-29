import { cn } from "@/lib/cn";
import { ArrowRight } from "./icons";

/**
 * Decorative "go" affordance for a clickable card: an optional label and an
 * arrow that nudges forward when the card is hovered or focused. The card
 * itself is the link, so this is never interactive on its own.
 */
export function CardArrow({
  tone = "light",
  label,
  compact = false,
  className,
}: {
  /** "light" = on a paper card, "dark" = on a deep-teal card. */
  tone?: "light" | "dark";
  label?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-2 text-[0.875rem] font-medium",
        tone === "light" ? "text-ink" : "text-ivory",
        className,
      )}
    >
      {label && <span className={cn(compact && "sr-only md:not-sr-only")}>{label}</span>}
      <ArrowRight
        size={14}
        aria-hidden
        className="transition-transform duration-300 ease-out group-hover/card:translate-x-1 group-focus-visible/card:translate-x-1 motion-reduce:transform-none"
      />
    </span>
  );
}
