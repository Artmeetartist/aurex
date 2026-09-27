"use client";

import { motion, useScroll, type MotionValue } from "motion/react";
import { useRef } from "react";
import { useRange } from "@/components/green/use-range";
import { MaskText, Reveal } from "@/components/motion/reveal";
import type { SiteContent, TitledText } from "@/content/types";
import { Chevron, GreenEyebrow, ModelIcon, pad } from "./shared";

function Step({ step, index, count, progress }: { step: TitledText; index: number; count: number; progress: MotionValue<number> }) {
  // The node lights as the line reaches it; its copy brightens just before.
  const at = index / (count - 1);
  const lit = useRange(progress, [Math.max(at - 0.05, 0), at], [0, 1]);
  const copy = useRange(progress, [Math.max(at - 0.14, 0), Math.max(at - 0.02, 0)], [0.4, 1]);
  const ring = useRange(progress, [Math.max(at - 0.05, 0), at], [0.15, 0.6]);
  const ringColor = useRange(progress, [Math.max(at - 0.05, 0), at], [0, 1]);

  return (
    <li className="relative grid grid-cols-[4.5rem_1fr] gap-x-6 pb-14 last:pb-0 md:grid-cols-[5.5rem_1fr] lg:block lg:pb-0 lg:pr-8">
      <div aria-hidden className="relative">
        <span className="relative z-10 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full bg-forest-950 md:h-[5.5rem] md:w-[5.5rem]">
          <motion.span
            style={{ opacity: ring }}
            className="absolute inset-0 rounded-full border border-cream motion-reduce:!opacity-60"
          />
          <motion.span
            style={{ opacity: ringColor, scale: lit }}
            className="absolute -inset-[7px] rounded-full border border-brass/50 motion-reduce:!transform-none motion-reduce:!opacity-100"
          />
          <motion.span style={{ opacity: copy }} className="text-cream motion-reduce:!opacity-100">
            <ModelIcon index={index} size={40} className="md:h-12 md:w-12" />
          </motion.span>
        </span>
      </div>
      <motion.div style={{ opacity: copy }} className="pt-3 motion-reduce:!opacity-100 lg:mt-10 lg:pt-0">
        <p className="t-eyebrow tabular-nums text-brass-soft">{pad(index + 1)}</p>
        <h3 className="mt-4 text-[clamp(2.25rem,3.8vw,3.5rem)] font-light leading-none tracking-[-0.035em] text-cream">{step.title}</h3>
        <p className="mt-5 max-w-[17rem] text-[0.9375rem] leading-relaxed text-cream/75">{step.text}</p>
      </motion.div>
    </li>
  );
}

/** SOURCE → TRADE → DISTRIBUTE → INVEST: the trading-house model, drawn as a line that fills with scroll. */
export function ModelFlow({ content }: { content: SiteContent }) {
  const flow = content.sustainability.flow;
  const steps = flow.steps;
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 0.8", "end 0.55"] });
  const fill = useRange(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative overflow-hidden bg-forest-950 text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[44rem] w-[84rem] -translate-x-1/2 -translate-y-1/3 rounded-full [background:radial-gradient(closest-side,rgb(0_153_153/0.16),transparent_70%)]"
      />
      <div className="container-x section-y relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal y={12}>
              <GreenEyebrow>{flow.eyebrow}</GreenEyebrow>
            </Reveal>
            <MaskText as="h2" text={flow.title} accent={flow.accent} className="t-display-lg mt-7 max-w-[13ch] text-cream" />
          </div>
          {flow.intro && (
            <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9">
              <p className="t-lead text-cream/80">{flow.intro}</p>
            </Reveal>
          )}
        </div>

        <div className="relative mt-16 md:mt-24">
          {/* Line: horizontal through the node centres on large screens, vertical below. */}
          <div
            aria-hidden
            className="absolute bottom-10 left-[2.25rem] top-10 w-px bg-cream/12 md:left-[2.75rem] lg:bottom-auto lg:left-[2.75rem] lg:right-[calc(25%-2.75rem)] lg:top-[2.75rem] lg:h-px lg:w-auto"
          >
            <motion.div
              style={{ scaleX: fill }}
              className="absolute inset-0 hidden origin-left bg-gradient-to-r from-brass via-gold to-teal motion-reduce:!transform-none lg:block"
            />
            <motion.div
              style={{ scaleY: fill }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-brass via-gold to-teal motion-reduce:!transform-none lg:hidden"
            />
            <div className="absolute inset-0 hidden lg:block">
              {/* Chevrons midway between nodes. */}
              {[1, 2, 3].map((k) => (
                <span
                  key={k}
                  className="absolute top-1/2 grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-forest-950 text-cream/55"
                  style={{ left: `${((k - 0.5) / 3) * 100}%` }}
                >
                  <Chevron />
                </span>
              ))}
            </div>
          </div>

          <ol ref={list} className="relative grid lg:grid-cols-4">
            {steps.map((step, i) => (
              <Step key={step.title} step={step} index={i} count={steps.length} progress={fill} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
