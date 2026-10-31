"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState, type CSSProperties } from "react";
import type { TitledText } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * A trade line's journey from origin to market. A flat rail in the trade's
 * tint fills as the section scrolls through the viewport, and each stage's
 * marker takes the tint as the rail reaches it.
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
    <ol ref={ref} style={{ "--trade": tint } as CSSProperties} className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
      {/* The rail: vertical below lg, horizontal from lg */}
      <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-[3px] overflow-hidden rounded-full bg-ivory/12 lg:hidden">
        <motion.span style={reduce ? undefined : { scaleY: fill }} className="absolute inset-0 origin-top bg-[var(--trade)]" />
      </span>
      <span aria-hidden className="absolute inset-x-0 top-[5px] hidden h-[3px] overflow-hidden rounded-full bg-ivory/12 lg:block">
        <motion.span style={reduce ? undefined : { scaleX: fill }} className="absolute inset-0 origin-left bg-[var(--trade)]" />
      </span>

      {steps.map((step, i) => (
        <li key={step.title} className="relative grid grid-cols-[0.8125rem_1fr] gap-x-6 lg:block lg:pr-4">
          <span
            aria-hidden
            className={cn(
              "relative block h-[0.8125rem] w-[0.8125rem] rounded-full transition-colors duration-700",
              lit(i) ? "bg-[var(--trade)]" : "bg-ink-700",
            )}
          />
          <div className="-mt-1.5 lg:mt-8">
            <h3 className="t-display-sm text-ivory">{step.title}</h3>
            <p className="mt-3 max-w-md text-[1rem] leading-relaxed text-ivory/85">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
