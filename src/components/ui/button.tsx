import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "./icons";

type Variant = "gold" | "glass" | "outline-light" | "outline-dark" | "ink";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full font-medium tracking-[-0.005em] transition-[background-color,color,border-color,transform] duration-500 ease-[var(--ease-out-expo)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-ink hover:bg-gold-soft",
  glass: "glass-light text-ivory hover:bg-white/15",
  "outline-light": "border border-white/20 text-ivory hover:border-gold hover:text-gold-soft",
  "outline-dark": "border border-ink/20 text-ink hover:border-gold-ink hover:text-gold-ink",
  ink: "bg-ink text-ivory hover:bg-ink-700",
};

const sizes: Record<Size, string> = {
  md: "h-11 pl-5 pr-1.5 text-[0.875rem]",
  lg: "h-14 pl-7 pr-2 text-[0.9375rem]",
};

const knob: Record<Variant, string> = {
  gold: "bg-ink text-gold",
  glass: "bg-ivory text-ink",
  "outline-light": "bg-white/10 text-ivory group-hover/btn:bg-gold group-hover/btn:text-ink",
  "outline-dark": "bg-ink text-ivory group-hover/btn:bg-gold-ink",
  ink: "bg-gold text-ink",
};

function Knob({ variant, size }: { variant: Variant; size: Size }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:rotate-45",
        size === "lg" ? "h-10 w-10" : "h-8 w-8",
        knob[variant],
      )}
    >
      <ArrowUpRight size={size === "lg" ? 16 : 14} />
    </span>
  );
}

type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string; icon?: boolean };

export function ButtonLink({
  variant = "gold",
  size = "md",
  icon = true,
  className,
  children,
  ...props
}: Common & ComponentProps<typeof Link>) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], !icon && "px-6", className)} {...props}>
      <span>{children}</span>
      {icon && <Knob variant={variant} size={size} />}
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
    <button className={cn(base, variants[variant], sizes[size], !icon && "px-6", className)} {...props}>
      <span>{children}</span>
      {icon && <Knob variant={variant} size={size} />}
    </button>
  );
}

/** Understated text link with an animated underline and arrow. */
export function TextLink({
  className,
  children,
  tone = "light",
  ...props
}: ComponentProps<typeof Link> & { tone?: "light" | "dark" }) {
  return (
    <Link
      className={cn(
        "group/tl inline-flex items-center gap-2 text-[0.9375rem] font-medium",
        tone === "light" ? "text-ivory hover:text-gold-soft" : "text-ink hover:text-gold-ink",
        className,
      )}
      {...props}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-current opacity-30 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/tl:opacity-100" />
      </span>
      <ArrowUpRight size={14} className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/tl:translate-x-0.5 group-hover/tl:-translate-y-0.5" />
    </Link>
  );
}
