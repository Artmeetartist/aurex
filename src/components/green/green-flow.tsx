"use client";

import { motion, useScroll, type MotionValue } from "motion/react";
import { useRef } from "react";
import { MaskText } from "@/components/motion/reveal";
import type { SiteContent } from "@/content/types";
import { useRange } from "./use-range";

function Step({
  label,
  text,
  index,
  count,
  progress,
}: {
  label: string;
  text?: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const at = index / (count - 1);
  const lit = useRange(progress, [Math.max(at - 0.06, 0), at], [0, 1]);
  const labelOpacity = useRange(progress, [Math.max(at - 0.12, 0), at], [0.45, 1]);

  return (
    <li className="relative grid grid-cols-[2.25rem_1fr] gap-x-4 pb-12 last:pb-0 lg:block lg:pb-0">
      <div aria-hidden className="relative flex h-9 items-center lg:h-auto lg:justify-start">
        <span className="relative z-10 grid h-[1.125rem] w-[1.125rem] place-items-center rounded-full bg-forest-800">
          <motion.span style={{ scale: lit }} className="h-2.5 w-2.5 rounded-full bg-gold motion-reduce:!transform-none" />
        </span>
      </div>
      <motion.div style={{ opacity: labelOpacity }} className="lg:mt-9 lg:pr-8 motion-reduce:!opacity-100">
        <h4 className="t-display-sm text-cream">{label}</h4>
        {text && <p className="t-body mt-4 max-w-[18rem] text-cream/85">{text}</p>}
      </motion.div>
    </li>
  );
}

/** SOURCE → TRADE → DISTRIBUTE → INVEST: the trading-house model behind AUREX Green. */
export function GreenFlow({ content }: { content: SiteContent }) {
  const copy = content.home.green;
  const steps = content.sustainability.flow.steps;
  const track = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 0.85", "end 0.55"] });
  const fill = useRange(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="container-x relative pb-[clamp(4.5rem,8.5vw,7.5rem)]">
      <MaskText as="h3" text={copy.flowLabel} className="t-display-md text-cream" />

      <div className="relative mt-12 md:mt-16">
        {/* Track: horizontal on desktop, vertical below. */}
        <div
          aria-hidden
          className="absolute bottom-2 left-[calc(0.5625rem-1px)] top-2 w-0.5 bg-cream/15 lg:bottom-auto lg:left-[0.5625rem] lg:right-[calc(25%-0.5625rem)] lg:top-[calc(0.5625rem-1px)] lg:h-0.5 lg:w-auto"
        >
          <motion.div
            style={{ scaleX: fill }}
            className="absolute inset-0 hidden origin-left bg-brass motion-reduce:!transform-none lg:block"
          />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute inset-0 origin-top bg-brass motion-reduce:!transform-none lg:hidden"
          />
          {/* Direction chevrons between nodes. */}
          <div className="absolute inset-0 hidden lg:block">
            {[1, 2, 3].map((k) => (
              <span
                key={k}
                className="absolute top-1/2 grid h-4 w-4 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-forest-950 text-cream/60"
                style={{ left: `${((k - 0.5) / 3) * 100}%` }}
              >
                <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden>
                  <path d="M2.5 1 6 4.5 2.5 8" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
              </span>
            ))}
          </div>
        </div>

        <ol ref={track} className="relative grid lg:grid-cols-4">
          {copy.flow.map((label, i) => (
            <Step
              key={label}
              label={label}
              text={steps[i]?.text}
              index={i}
              count={copy.flow.length}
              progress={fill}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}
