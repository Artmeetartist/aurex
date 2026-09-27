"use client";

import { useSpring } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, type ComponentProps, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "./icons";

type Variant = "gold" | "glass" | "outline-light" | "outline-dark" | "ink";
type Size = "md" | "lg";

const base =
  "group/btn relative isolate inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-full font-medium tracking-[-0.005em] transition-[color,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-ink shadow-[0_0_0_0_rgb(141_198_63/0)] hover:shadow-[0_10px_40px_-10px_rgb(141_198_63/0.55)]",
  glass: "glass-light text-ivory hover:text-ink",
  "outline-light": "border border-white/25 text-ivory hover:border-gold hover:text-ink",
  "outline-dark": "border border-ink/20 text-ink hover:border-ink hover:text-ivory",
  ink: "bg-ink text-ivory hover:shadow-[0_10px_40px_-12px_rgb(1_51_51/0.6)]",
};

/** Left-to-right fill that sweeps in on hover (a motif from the Aurex-Teal identity). */
const sweep: Record<Variant, string> = {
  gold: "bg-gold-bright",
  glass: "bg-ivory",
  "outline-light": "bg-gold",
  "outline-dark": "bg-ink",
  ink: "bg-ink-700",
};

const sizes: Record<Size, string> = {
  md: "h-11 pl-5 pr-1.5 text-[0.875rem]",
  lg: "h-14 pl-7 pr-2 text-[0.9375rem]",
};

const knob: Record<Variant, string> = {
  gold: "bg-ink text-gold",
  glass: "bg-ivory text-ink group-hover/btn:bg-ink group-hover/btn:text-ivory",
  "outline-light": "bg-white/10 text-ivory group-hover/btn:bg-ink group-hover/btn:text-gold",
  "outline-dark": "bg-ink text-ivory group-hover/btn:bg-gold group-hover/btn:text-ink",
  ink: "bg-gold text-ink",
};

function Knob({ variant, size }: { variant: Variant; size: Size }) {
  return (
    <span
      className={cn(
        "relative z-10 inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full transition-[transform,background-color,color] duration-500 ease-[var(--ease-out-expo)] group-hover/btn:rotate-45",
        size === "lg" ? "h-10 w-10" : "h-8 w-8",
        knob[variant],
      )}
    >
      <ArrowUpRight size={size === "lg" ? 16 : 14} />
    </span>
  );
}

function Sweep({ variant }: { variant: Variant }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute inset-0 -z-10 origin-left scale-x-0 rounded-[inherit] transition-transform duration-[650ms] ease-[var(--ease-out-expo)] group-hover/btn:scale-x-100 group-focus-visible/btn:scale-x-100",
        sweep[variant],
      )}
    />
  );
}

/**
 * Subtle magnetic pull towards the pointer on fine-pointer devices.
 * The element is captured from the event and moved via `translate`, so hover never re-renders.
 */
function useMagnetic<T extends HTMLElement>(strength = 0.22) {
  const el = useRef<T | null>(null);
  const x = useSpring(0, { stiffness: 260, damping: 20, mass: 0.4 });
  const y = useSpring(0, { stiffness: 260, damping: 20, mass: 0.4 });

  useEffect(() => {
    const apply = () => {
      if (el.current) el.current.style.translate = `${x.get()}px ${y.get()}px`;
    };
    const ux = x.on("change", apply);
    const uy = y.on("change", apply);
    return () => {
      ux();
      uy();
    };
  }, [x, y]);

  return {
    onPointerMove: (e: PointerEvent<T>) => {
      if (e.pointerType !== "mouse") return;
      el.current = e.currentTarget;
      const r = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * strength);
      y.set((e.clientY - (r.top + r.height / 2)) * strength * 1.4);
    },
    onPointerLeave: () => {
      x.set(0);
      y.set(0);
    },
  };
}

type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string; icon?: boolean };

export function ButtonLink({
  variant = "gold",
  size = "md",
  icon = true,
  className,
  children,
  ...props
}: Common & Omit<ComponentProps<typeof Link>, "onPointerMove" | "onPointerLeave">) {
  const { onPointerMove, onPointerLeave } = useMagnetic<HTMLAnchorElement>();
  return (
    <Link
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(base, variants[variant], sizes[size], !icon && "px-6", className)}
      {...props}
    >
      <Sweep variant={variant} />
      <span className="relative z-10">{children}</span>
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
}: Common & Omit<ComponentProps<"button">, "onPointerMove" | "onPointerLeave">) {
  const { onPointerMove, onPointerLeave } = useMagnetic<HTMLButtonElement>();
  return (
    <button
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(base, variants[variant], sizes[size], !icon && "px-6", className)}
      {...props}
    >
      <Sweep variant={variant} />
      <span className="relative z-10">{children}</span>
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
        "group/tl inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium",
        tone === "light" ? "text-ivory hover:text-gold" : "text-ink hover:text-gold-ink",
        className,
      )}
      {...props}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full bg-current opacity-25" />
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/tl:scale-x-100" />
      </span>
      <ArrowUpRight
        size={14}
        className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/tl:-translate-y-0.5 group-hover/tl:translate-x-0.5"
      />
    </Link>
  );
}
