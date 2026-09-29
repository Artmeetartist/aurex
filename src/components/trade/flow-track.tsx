"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState, type CSSProperties } from "react";
import type { TitledText } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * A trade line's journey from origin to market. A hairline fills as the
 * section scrolls through the viewport; each stage lifts out of perspective
 * and lights up in the trade's tint as the line reaches it.
 * Horizontal from `lg`, vertical below it.
 */
export function FlowTrack({ steps, tint }: { steps: TitledText[]; tint: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [reached, setReached] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(steps.length - 1, Math.floor(v * steps.length + 0.15)) - (v <= 0 ? 1 : 0);
    if (next !== reached) setReached(next);
  });

  const lit = (i: number) => reduce || i <= reached;

  return (
    <ol
      ref={ref}
      style={{ "--trade": tint } as CSSProperties}
      className="relative grid gap-12 [perspective:1400px] lg:grid-cols-4 lg:gap-8"
    >
      {/* The track: vertical below lg, horizontal from lg */}
      <span aria-hidden className="absolute bottom-6 left-[1.375rem] top-6 w-px bg-white/10 lg:hidden">
        <motion.span
          style={reduce ? undefined : { scaleY: fill }}
          className="absolute inset-0 origin-top bg-gradient-to-b from-gold to-[var(--trade)]"
        />
      </span>
      <span aria-hidden className="absolute inset-x-0 top-[1.375rem] hidden h-px bg-white/10 lg:block">
        <motion.span
          style={reduce ? undefined : { scaleX: fill }}
          className="absolute inset-0 origin-left bg-gradient-to-r from-gold to-[var(--trade)]"
        />
      </span>

      {steps.map((step, i) => (
        <li key={step.title} className="relative grid grid-cols-[2.75rem_1fr] gap-x-6 lg:block">
          <span
            aria-hidden
            className={cn(
              "t-eyebrow relative z-10 flex h-11 w-11 items-center justify-center rounded-full border bg-ink-950 tabular-nums transition-[border-color,color,box-shadow] duration-700",
              lit(i) ? "border-[var(--trade)] text-ivory shadow-[0_0_0_6px_rgb(2_12_12),0_0_28px_2px_var(--trade)]" : "border-white/15 text-mist-dim",
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div
            className={cn(
              "origin-top rounded-lg border p-6 transition-[transform,opacity,border-color,background-color] duration-[900ms] ease-[var(--ease-out-expo)] lg:mt-10 lg:p-7",
              lit(i)
                ? "border-white/12 bg-ink-850/70 opacity-100 [transform:rotateX(0deg)_translateY(0)]"
                : "border-white/5 bg-transparent opacity-40 [transform:rotateX(18deg)_translateY(14px)]",
            )}
          >
            <span aria-hidden className="block h-px w-8 bg-[var(--trade)]" />
            <h3 className="mt-5 text-[1.5rem] font-light leading-tight tracking-[-0.025em] text-ivory md:text-[1.75rem]">
              {step.title}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
