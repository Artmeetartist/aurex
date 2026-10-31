"use client";

import { motion, useScroll, type MotionValue } from "motion/react";
import { useRef } from "react";
import { useRange } from "@/components/green/use-range";
import { MaskText, Reveal } from "@/components/motion/reveal";
import type { SiteContent, TitledText } from "@/content/types";
import { Chevron, ModelIcon } from "./shared";

function Step({ step, index, count, progress }: { step: TitledText; index: number; count: number; progress: MotionValue<number> }) {
  // The node fills as the line reaches it; its copy brightens just before.
  const at = index / (count - 1);
  const lit = useRange(progress, [Math.max(at - 0.05, 0), at], [0, 1]);
  const copy = useRange(progress, [Math.max(at - 0.14, 0), Math.max(at - 0.02, 0)], [0.4, 1]);

  return (
    <li className="relative grid grid-cols-[4.5rem_1fr] gap-x-6 pb-14 last:pb-0 md:grid-cols-[5.5rem_1fr] lg:block lg:pb-0 lg:pr-8">
      <div aria-hidden className="relative">
        <span className="relative z-10 grid h-[4.5rem] w-[4.5rem] place-items-center overflow-hidden rounded-full bg-forest-900 md:h-[5.5rem] md:w-[5.5rem]">
          <motion.span style={{ opacity: lit }} className="absolute inset-0 bg-forest-700 motion-reduce:!opacity-100" />
          <motion.span style={{ opacity: copy }} className="relative text-cream motion-reduce:!opacity-100">
            <ModelIcon index={index} size={40} className="md:h-12 md:w-12" />
          </motion.span>
        </span>
      </div>
      <motion.div style={{ opacity: copy }} className="pt-4 motion-reduce:!opacity-100 lg:mt-10 lg:pt-0">
        <h3 className="t-display-sm text-cream">{step.title}</h3>
        <p className="t-body mt-4 max-w-[18rem] text-cream/85">{step.text}</p>
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
      <div className="container-x section-y relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <MaskText as="h2" text={flow.title} className="t-display-lg text-cream lg:col-span-8" />
          {flow.intro && (
            <Reveal delay={0.12} className="lg:col-span-4">
              <p className="t-lead text-cream/85">{flow.intro}</p>
            </Reveal>
          )}
        </div>

        <div className="relative mt-16 md:mt-24">
          {/* Track through the node centres: horizontal on large screens, vertical below. */}
          <div
            aria-hidden
            className="absolute bottom-10 left-[calc(2.25rem-1px)] top-10 w-0.5 bg-cream/15 md:left-[calc(2.75rem-1px)] lg:bottom-auto lg:left-[2.75rem] lg:right-[calc(25%-2.75rem)] lg:top-[calc(2.75rem-1px)] lg:h-0.5 lg:w-auto"
          >
            <motion.div
              style={{ scaleX: fill }}
              className="absolute inset-0 hidden origin-left bg-brass motion-reduce:!transform-none lg:block"
            />
            <motion.div
              style={{ scaleY: fill }}
              className="absolute inset-0 origin-top bg-brass motion-reduce:!transform-none lg:hidden"
            />
            <div className="absolute inset-0 hidden lg:block">
              {/* Chevrons midway between nodes. */}
              {[1, 2, 3].map((k) => (
                <span
                  key={k}
                  className="absolute top-1/2 grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-forest-950 text-cream/60"
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
