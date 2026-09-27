"use client";

import { motion, useMotionValueEvent, useScroll, useTransform, type MotionStyle } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { STAGE_COUNT, STAGE_PILLAR } from "@/components/green/stages";
import { useRange } from "@/components/green/use-range";
import { MaskText, Reveal } from "@/components/motion/reveal";
import type { SiteContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { CONTAINER_EDGE, Chevron, GreenEyebrow, WIDE_STILL, pad, stageStill } from "./shared";

/**
 * The seven stages of the sustainable-commerce ecosystem as a horizontal
 * gallery joined by a directional line. On large screens it is pinned and
 * travels sideways as the page scrolls (with a slower background layer for
 * depth); on small screens and under reduced motion it is a swipeable row.
 */
export function EcosystemGallery({ content }: { content: SiteContent }) {
  const heading = content.sustainability.ecosystem;
  const stages = content.home.green.stages.slice(0, STAGE_COUNT);

  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  // Short holds at both ends so the first and last stages settle before and after the travel.
  const travel = useRange(scrollYProgress, [0.06, 0.94], [0, 1]);
  const bgX = useTransform(travel, (v: number) => `${-v * 14}%`);
  const imageX = useTransform(travel, (v: number) => `${4 - v * 8}%`);

  const [current, setCurrent] = useState(0);
  useMotionValueEvent(travel, "change", (v) => {
    setCurrent(Math.min(STAGE_COUNT - 1, Math.max(0, Math.round(v * (STAGE_COUNT - 1)))));
  });

  const rowStyle = {
    "--travel": travel,
    paddingInline: CONTAINER_EDGE,
  } as unknown as MotionStyle;

  return (
    <section className="relative bg-forest-950 text-cream">
      <div ref={track} className="relative lg:motion-safe:h-[420vh]">
        <div className="relative overflow-hidden lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:h-[100svh]">
          {/* Background layer: the port panorama, far behind, drifting slower than the gallery. */}
          <motion.div
            aria-hidden
            style={{ x: bgX }}
            className="pointer-events-none absolute inset-y-0 left-0 w-[135%] opacity-[0.22] motion-reduce:!transform-none"
          >
            <div
              className="absolute inset-0 bg-cover bg-[position:40%_60%] [filter:saturate(0.7)_blur(1px)]"
              style={{ backgroundImage: `url(${WIDE_STILL})` }}
            />
          </motion.div>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest-950 via-forest-950/60 to-forest-950" />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[50rem] w-[90rem] -translate-x-1/2 -translate-y-1/2 opacity-80 [background:radial-gradient(closest-side,rgb(0_153_153/0.12),transparent_70%)]"
          />

          <div className="relative flex flex-col py-[clamp(5.5rem,11vw,9rem)] lg:motion-safe:h-full lg:motion-safe:py-0 lg:motion-safe:pb-10 lg:motion-safe:pt-[calc(var(--header-h)+2.25rem)]">
            <div className="container-x flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <Reveal y={12}>
                  <GreenEyebrow>{heading.eyebrow}</GreenEyebrow>
                </Reveal>
                <MaskText
                  as="h2"
                  text={heading.title}
                  accent={heading.accent}
                  className="t-display-md mt-6 max-w-[14ch] text-cream lg:max-w-[20ch]"
                />
              </div>
              <p aria-hidden className="hidden items-baseline gap-2 tabular-nums lg:motion-safe:flex">
                <span className="text-[2.75rem] font-extralight leading-none tracking-[-0.04em] text-cream">{pad(current + 1)}</span>
                <span className="t-eyebrow text-cream/55">/ {pad(STAGE_COUNT)}</span>
              </p>
            </div>

            {/* The row: native horizontal scroll below lg (or with reduced motion), scroll-linked travel above. */}
            <div
              role="region"
              aria-label={heading.title}
              tabIndex={0}
              style={{ scrollPaddingInline: CONTAINER_EDGE }}
              className="mt-12 snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] focus-visible:outline-offset-[-2px] md:mt-16 lg:motion-safe:my-auto lg:motion-safe:snap-none lg:motion-safe:pt-6 lg:motion-safe:overflow-visible lg:motion-safe:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              <motion.ol
                style={rowStyle}
                className="flex w-max items-start gap-12 md:gap-20 lg:motion-safe:[transform:translate3d(calc((100vw_-_100%)*var(--travel)),0,0)] lg:motion-safe:will-change-transform xl:gap-24"
              >
                {stages.map((name, i) => {
                  const last = i === stages.length - 1;
                  const pillar = content.greenPillars[STAGE_PILLAR[i]].name;
                  return (
                    <li key={name} className="snap-start">
                      <figure className="group/stage w-[min(78vw,24rem)] md:w-[26rem] lg:w-[min(36vw,34rem,calc((100svh_-_31rem)*1.6))]">
                        <div className="relative">
                          <div className="elevate relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-forest-900">
                            <motion.div style={{ x: imageX }} className="absolute -inset-x-[6%] inset-y-0 motion-reduce:!transform-none">
                              <Image
                                src={stageStill(i)}
                                alt=""
                                fill
                                sizes="(min-width: 1024px) 36vw, (min-width: 768px) 26rem, 78vw"
                                className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover/stage:scale-[1.045]"
                              />
                            </motion.div>
                            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest-950/80 to-transparent" />
                            <span className="t-eyebrow absolute bottom-4 left-4 text-cream/85 md:bottom-5 md:left-5">{pillar}</span>
                            <span
                              aria-hidden
                              className={cn(
                                "absolute right-4 top-4 h-2 w-2 rounded-full transition-all duration-700 md:right-5 md:top-5",
                                i <= current
                                  ? "bg-gold shadow-[0_0_12px_rgb(141_198_63/0.8)]"
                                  : "bg-gold/80 lg:motion-safe:bg-cream/40",
                              )}
                            />
                          </div>

                          {/* Connector to the next stage */}
                          {!last && (
                            <span
                              aria-hidden
                              className="absolute left-full top-1/2 flex w-12 -translate-y-1/2 items-center md:w-20 xl:w-24"
                            >
                              <span className="h-px flex-1 bg-gradient-to-r from-brass/70 to-cream/25" />
                              <Chevron className="-ml-[5px] text-brass-soft" />
                            </span>
                          )}
                        </div>

                        <figcaption className="mt-5 flex items-end gap-4 md:mt-6">
                          <span
                            aria-hidden
                            className="text-[3.25rem] font-extralight leading-[0.8] tracking-[-0.05em] text-transparent tabular-nums transition-[-webkit-text-stroke-color] duration-700 [-webkit-text-stroke:1px_rgb(226_207_152/0.5)] group-hover/stage:[-webkit-text-stroke:1px_rgb(226_207_152/0.95)] md:text-[4rem]"
                          >
                            {pad(i + 1)}
                          </span>
                          <span className="pb-0.5 text-[1.375rem] font-light leading-[1.1] tracking-[-0.02em] text-cream md:text-[1.625rem]">
                            {name}
                          </span>
                        </figcaption>
                      </figure>
                    </li>
                  );
                })}
              </motion.ol>
            </div>

            {/* Rail: how far the gallery has travelled (pinned mode only). */}
            <div aria-hidden className="container-x mt-10 hidden lg:motion-safe:block">
              <div className="relative h-px bg-cream/12">
                <motion.div
                  style={{ scaleX: travel }}
                  className="absolute inset-0 origin-left bg-gradient-to-r from-brass via-gold to-teal"
                />
              </div>
              <div className="t-eyebrow mt-4 flex justify-between text-cream/55">
                <span>{stages[0]}</span>
                <span>{stages[stages.length - 1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
