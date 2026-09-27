"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import type { SiteContent } from "@/content/types";
import { cn } from "@/lib/cn";

const pad = (n: number) => String(n).padStart(2, "0");

function Step({
  label,
  text,
  index,
  count,
  progress,
  reduced,
}: {
  label: string;
  text?: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const at = index / (count - 1);
  const lit = useTransform(progress, [Math.max(at - 0.06, 0), at], [0, 1]);
  const labelOpacity = useTransform(progress, [Math.max(at - 0.12, 0), at], [0.45, 1]);

  return (
    <li className="relative grid grid-cols-[2.25rem_1fr] gap-x-4 pb-12 last:pb-0 lg:block lg:pb-0">
      <div aria-hidden className="relative flex h-9 items-center lg:h-auto lg:justify-start">
        <span className="relative z-10 grid h-[1.125rem] w-[1.125rem] place-items-center rounded-full border border-cream/25 bg-forest-950">
          <motion.span style={{ scale: reduced ? 1 : lit, opacity: reduced ? 1 : lit }} className="absolute -inset-[5px] rounded-full border border-gold/50" />
          <motion.span style={{ scale: reduced ? 1 : lit }} className="h-2 w-2 rounded-full bg-gold" />
        </span>
      </div>
      <motion.div style={{ opacity: reduced ? 1 : labelOpacity }} className="lg:mt-9 lg:pr-8">
        <p className="t-eyebrow tabular-nums text-brass-soft">{pad(index + 1)}</p>
        <p className="mt-3 text-[clamp(2rem,3.6vw,3.25rem)] font-light leading-none tracking-[-0.035em] text-cream">{label}</p>
        {text && <p className="mt-4 max-w-[17rem] text-[0.9375rem] leading-relaxed text-cream/70">{text}</p>}
      </motion.div>
    </li>
  );
}

/** SOURCE → TRADE → DISTRIBUTE → INVEST: the trading-house model behind AUREX Green. */
export function GreenFlow({ content }: { content: SiteContent }) {
  const copy = content.home.green;
  const steps = content.sustainability.flow.steps;
  const reduced = !!useReducedMotion();
  const track = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 0.85", "end 0.55"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="container-x relative pb-[clamp(5rem,10vw,9rem)]">
      <div className="border-t border-cream/10 pt-14 md:pt-20">
        <Reveal y={12}>
          <p className="t-eyebrow flex items-center gap-3 text-brass-soft">
            <span aria-hidden className="h-px w-8 bg-brass/70" />
            {copy.flowLabel}
          </p>
        </Reveal>

        <div className="relative mt-12 md:mt-16">
          {/* Rail: horizontal on desktop, vertical below. */}
          <div aria-hidden className="absolute left-[0.5625rem] top-2 bottom-2 w-px bg-cream/12 lg:right-[calc(25%-0.5625rem)] lg:top-[0.5625rem] lg:bottom-auto lg:h-px lg:w-auto">
            <motion.div
              style={reduced ? undefined : { scaleX: fill }}
              className={cn("absolute inset-0 hidden origin-left bg-gradient-to-r from-brass via-gold to-teal lg:block")}
            />
            <motion.div
              style={reduced ? undefined : { scaleY: fill }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-brass via-gold to-teal lg:hidden"
            />
            {/* Direction chevrons between nodes. */}
            <div className="absolute inset-0 hidden lg:block">
              {[1, 2, 3].map((k) => (
                <svg
                  key={k}
                  width="9"
                  height="9"
                  viewBox="0 0 9 9"
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-cream/40"
                  style={{ left: `${((k - 0.5) / 3) * 100}%` }}
                >
                  <path d="M2.5 1 6 4.5 2.5 8" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
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
                progress={scrollYProgress}
                reduced={reduced}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
