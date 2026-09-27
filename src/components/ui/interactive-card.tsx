"use client";

import Link from "next/link";
import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "dark" | "light";

/**
 * Card surface with a pointer-tracking spotlight and a restrained 3D tilt.
 * Renders a Link when `href` is set so the whole card is clickable.
 * Effects are skipped for touch input and reduced motion (CSS handles the latter).
 */
export function InteractiveCard({
  href,
  tone = "dark",
  tilt = 5,
  className,
  children,
  ariaLabel,
}: {
  href?: string;
  tone?: Tone;
  tilt?: number;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const frame = useRef(0);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      el.style.setProperty("--rx", `${(0.5 - py) * tilt}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * tilt}deg`);
    });
  };

  const onPointerLeave = (e: PointerEvent<HTMLElement>) => {
    cancelAnimationFrame(frame.current);
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const classes = cn(
    "group/card relative isolate block overflow-hidden rounded-[1.5rem] border outline-none",
    "[transform:perspective(1100px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] transition-[transform,border-color,background-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] motion-reduce:[transform:none]",
    tone === "dark"
      ? "border-white/10 bg-ink-850/60 hover:border-gold/40 hover:bg-ink-850 focus-visible:border-gold"
      : "border-ink/10 bg-ivory hover:border-gold-ink/40 hover:shadow-[0_24px_60px_-30px_rgb(1_51_51/0.35)] focus-visible:border-gold-ink",
    href && "cursor-pointer",
    className,
  );

  const spotlight = (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
      style={
        {
          background:
            tone === "dark"
              ? "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgb(141 198 63 / 0.14), transparent 60%)"
              : "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgb(0 153 153 / 0.10), transparent 60%)",
        } as CSSProperties
      }
    />
  );

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={classes} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
        {spotlight}
        {children}
      </Link>
    );
  }
  return (
    <div className={classes} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      {spotlight}
      {children}
    </div>
  );
}
