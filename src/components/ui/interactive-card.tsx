import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "dark" | "light";

/**
 * Card surface with a restrained hover: the border firms up and the surface
 * shifts one step. Renders a Link when `href` is set so the whole card is
 * clickable. No tilt, no spotlight: emphasis comes from content, not effects.
 */
export function InteractiveCard({
  href,
  tone = "dark",
  className,
  children,
  ariaLabel,
}: {
  href?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const classes = cn(
    "group/card relative isolate block overflow-hidden rounded-xl border transition-[border-color,background-color] duration-300 ease-out",
    // Focus: a 2px ring that follows the radius (lime on dark, deep teal on paper).
    "focus-visible:outline-2 focus-visible:outline-offset-4",
    tone === "dark"
      ? "border-white/10 bg-ink-850/50 hover:border-white/25 hover:bg-ink-850 focus-visible:outline-gold"
      : "border-ink/12 bg-ivory hover:border-ink/30 hover:bg-white focus-visible:outline-gold-ink",
    href && "cursor-pointer",
    className,
  );

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={classes}>
        {children}
      </Link>
    );
  }
  return <div className={classes}>{children}</div>;
}
