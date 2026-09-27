"use client";

import { motion, useScroll, type MotionValue } from "motion/react";
import { useRef } from "react";
import { MaskText, Reveal } from "@/components/motion/reveal";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { ArrowRight } from "@/components/ui/icons";
import type { GreenPillarId, SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { href } from "@/lib/routes";
import { PillarIcon } from "./icons";
import { PILLAR_ORDER } from "./stages";
import { useRange } from "./use-range";

const pad = (n: number) => String(n).padStart(2, "0");

function Pillar({
  id,
  index,
  progress,
  locale,
  content,
}: {
  id: GreenPillarId;
  index: number;
  progress: MotionValue<number>;
  locale: Locale;
  content: SiteContent;
}) {
  const pillar = content.greenPillars[id];
  const explore = content.home.green.explore;
  // Cards arrive one after another as the connecting line reaches them.
  const start = index * 0.2;
  const opacity = useRange(progress, [start, start + 0.22], [0, 1]);
  const y = useRange(progress, [start, start + 0.3], [48, 0]);
  const node = useRange(progress, [start, start + 0.08], [0, 1]);

  return (
    <li className="relative grid grid-cols-[2.25rem_1fr] gap-x-4 lg:block">
      {/* Node on the connecting line */}
      <div aria-hidden className="relative flex h-10 items-center lg:mb-6 lg:h-5">
        <span className="relative z-10 grid h-[1.125rem] w-[1.125rem] place-items-center rounded-full border border-brass/50 bg-forest-950">
          <motion.span style={{ scale: node }} className="h-2 w-2 rounded-full bg-brass motion-reduce:!transform-none" />
        </span>
      </div>

      <motion.div style={{ opacity, y }} className="h-full motion-reduce:!transform-none motion-reduce:!opacity-100">
        <InteractiveCard
          href={href(locale, "sustainability", id)}
          ariaLabel={`${pillar.name}. ${explore}`}
          tilt={4}
          className="h-full rounded-[1.25rem] border-cream/10 bg-graphite-900/55 hover:border-brass/45 hover:bg-graphite-900/80 focus-visible:border-brass"
        >
          <div className="flex h-full min-h-[18rem] flex-col p-7 md:min-h-[20rem] md:p-8">
            <div className="flex items-start justify-between">
              <span className="grid h-16 w-16 place-items-center rounded-2xl border border-cream/10 bg-forest-900/60 text-cream/85 transition-[color,border-color,background-color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover/card:-translate-y-0.5 group-hover/card:border-brass/40 group-hover/card:bg-forest-800/70 group-hover/card:text-brass-soft">
                <PillarIcon id={id} size={46} />
              </span>
              <span
                aria-hidden
                className="text-[3.5rem] font-extralight leading-[0.8] tracking-[-0.05em] text-transparent tabular-nums transition-[-webkit-text-stroke-color] duration-500 [-webkit-text-stroke:1px_rgb(226_207_152/0.4)] group-hover/card:[-webkit-text-stroke:1px_rgb(226_207_152/0.85)]"
              >
                {pad(index + 1)}
              </span>
            </div>
            <h4 className="mt-auto pt-12 text-[1.625rem] font-light leading-[1.1] tracking-[-0.025em] text-cream">{pillar.name}</h4>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-cream/70">{pillar.summary}</p>
            <span className="mt-7 inline-flex items-center gap-2.5 text-[0.875rem] font-medium text-cream transition-colors duration-500 group-hover/card:text-brass-soft">
              {explore}
              <span className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-cream/20 transition-[border-color,background-color] duration-500 group-hover/card:border-brass/60 group-hover/card:bg-brass/10">
                <ArrowRight size={12} className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/card:translate-x-0.5" />
              </span>
            </span>
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brass via-gold to-transparent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/card:scale-x-100"
          />
        </InteractiveCard>
      </motion.div>
    </li>
  );
}

/** The four AUREX Green pillars, joined by a line that draws as the reader scrolls. */
export function GreenPillars({ locale, content }: { locale: Locale; content: SiteContent }) {
  const copy = content.home.green;
  const heading = content.sustainability.pillars;
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 0.92", "end 0.72"] });
  const draw = useRange(scrollYProgress, [0, 0.85], [0, 1]);

  return (
    <div className="container-x relative pb-[clamp(5rem,10vw,9rem)] pt-[clamp(5.5rem,11vw,10rem)]">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Reveal y={12}>
            <p className="t-eyebrow flex items-center gap-3 text-brass-soft">
              <span aria-hidden className="h-px w-8 bg-brass/70" />
              {copy.pillarsEyebrow}
            </p>
          </Reveal>
          <MaskText as="h3" text={heading.title} accent={heading.accent} className="t-display-lg mt-7 max-w-[16ch] text-cream" />
        </div>
      </div>

      <div className="relative mt-14 md:mt-20">
        {/* Connecting line: horizontal on desktop, vertical on smaller screens. */}
        {/* Pixel-space SVG lines (no viewBox), so the 1px stroke stays crisp while it draws. */}
        <svg aria-hidden className="pointer-events-none absolute inset-x-0 top-[0.5625rem] hidden h-px w-full overflow-visible lg:block">
          <defs>
            <linearGradient id="green-pillar-line" x1="0" x2="100%" y1="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#c8a24a" />
              <stop offset="0.6" stopColor="#8dc63f" />
              <stop offset="1" stopColor="#009999" />
            </linearGradient>
          </defs>
          <line x1="9" y1="0.5" x2="100%" y2="0.5" stroke="rgb(244 241 232 / 0.12)" strokeWidth="1" />
          <motion.line
            x1="9"
            y1="0.5"
            x2="100%"
            y2="0.5"
            stroke="url(#green-pillar-line)"
            strokeWidth="1"
            style={{ pathLength: draw }}
            className="motion-reduce:[stroke-dasharray:none]"
          />
        </svg>
        <svg aria-hidden className="pointer-events-none absolute left-[0.5rem] top-0 h-full w-0.5 overflow-visible lg:hidden">
          <line x1="1" y1="20" x2="1" y2="100%" stroke="rgb(244 241 232 / 0.12)" strokeWidth="1" />
          <motion.line
            x1="1"
            y1="20"
            x2="1"
            y2="100%"
            stroke="#c8a24a"
            strokeWidth="1"
            style={{ pathLength: draw }}
            className="motion-reduce:[stroke-dasharray:none]"
          />
        </svg>

        <ol ref={list} className="relative grid gap-6 lg:grid-cols-4 lg:gap-5 xl:gap-6">
          {PILLAR_ORDER.map((id, i) => (
            <Pillar key={id} id={id} index={i} progress={scrollYProgress} locale={locale} content={content} />
          ))}
        </ol>
      </div>
    </div>
  );
}
