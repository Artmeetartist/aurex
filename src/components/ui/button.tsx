import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRight, ArrowUpRight } from "./icons";

/**
 * Buttons: squared, filled, one accent. Lime is reserved for the primary
 * action; secondaries are a solid tone step, never an outline or glass.
 *
 * - gold          primary action (lime fill)
 * - glass         secondary over imagery (solid ink)
 * - outline-light secondary on dark surfaces (ink tone step)
 * - outline-dark  secondary on paper (paper tone step)
 * - ink           primary on paper when lime would be too loud
 */
type Variant = "gold" | "glass" | "outline-light" | "outline-dark" | "ink";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-[4px] font-medium tracking-[-0.005em] transition-[background-color,border-color,color] duration-300 ease-out disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-ink hover:bg-[#a3d45a] active:bg-[#7fb536]",
  glass: "bg-ink-950 text-ivory hover:bg-ivory hover:text-ink",
  "outline-light": "bg-ink-700 text-ivory hover:bg-ink-600",
  "outline-dark": "bg-ivory-300 text-ink hover:bg-ink hover:text-ivory",
  ink: "bg-ink text-ivory hover:bg-ink-700",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[1rem]",
  lg: "h-[3.25rem] px-6 text-[1rem]",
};

type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string; icon?: boolean };

function Arrow() {
  return (
    <ArrowRight
      size={14}
      className="-mr-0.5 shrink-0 transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5 motion-reduce:transform-none"
    />
  );
}

export function ButtonLink({
  variant = "gold",
  size = "md",
  icon = true,
  className,
  children,
  ...props
}: Common & ComponentProps<typeof Link>) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <span>{children}</span>
      {icon && <Arrow />}
    </Link>
  );
}

export function Button({
  variant = "gold",
  size = "md",
  icon = true,
  className,
  children,
  ...props
}: Common & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <span>{children}</span>
      {icon && <Arrow />}
    </button>
  );
}

/** Understated text link: underline that thickens on hover, small arrow. */
export function TextLink({
  className,
  children,
  tone = "light",
  ...props
}: ComponentProps<typeof Link> & { tone?: "light" | "dark" }) {
  return (
    <Link
      className={cn(
        "group/tl inline-flex min-h-11 items-center gap-2 text-[1rem] font-medium",
        tone === "light" ? "text-ivory" : "text-ink",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "underline decoration-1 underline-offset-[0.3em] transition-[text-decoration-color] duration-300",
          tone === "light" ? "decoration-white/35 group-hover/tl:decoration-ivory" : "decoration-ink/30 group-hover/tl:decoration-ink",
        )}
      >
        {children}
      </span>
      <ArrowUpRight
        size={13}
        className="transition-transform duration-300 ease-out group-hover/tl:-translate-y-0.5 group-hover/tl:translate-x-0.5 motion-reduce:transform-none"
      />
    </Link>
  );
}
