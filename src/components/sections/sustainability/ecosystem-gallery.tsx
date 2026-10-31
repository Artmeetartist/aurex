"use client";

import { motion, useScroll, useTransform, type MotionStyle } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { STAGE_COUNT, STAGE_PILLAR } from "@/components/green/stages";
import { useRange } from "@/components/green/use-range";
import { MaskText } from "@/components/motion/reveal";
import type { SiteContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { CONTAINER_EDGE, Chevron, stageStill } from "./shared";

/**
 * The seven stages of the sustainable-commerce ecosystem. On large screens the
 * row of stills is pinned under its heading and travels sideways as the page
 * scrolls; on smaller screens and under reduced motion it is a grid.
 */
export function EcosystemGallery({ content }: { content: SiteContent }) {
  const heading = content.sustainability.ecosystem;
  const stages = content.home.green.stages.slice(0, STAGE_COUNT);

  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  // Short holds at both ends so the first and last stages settle before and after the travel.
  const travel = useRange(scrollYProgress, [0.06, 0.94], [0, 1]);
  const imageX = useTransform(travel, (v: number) => `${4 - v * 8}%`);

  const rowStyle = {
    "--travel": travel,
    paddingInline: CONTAINER_EDGE,
  } as unknown as MotionStyle;

  return (
    <section className="relative bg-forest-950 text-cream">
      <div className="container-x pt-[clamp(4.5rem,8.5vw,7.5rem)]">
        <MaskText as="h2" text={heading.title} className="t-display-md max-w-[24ch] text-cream" />
      </div>

      <div ref={track} className="relative lg:motion-safe:h-[400vh]">
        <div className="relative pb-[clamp(4.5rem,8.5vw,7.5rem)] pt-12 md:pt-16 lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:flex lg:motion-safe:h-[100svh] lg:motion-safe:flex-col lg:motion-safe:justify-center lg:motion-safe:overflow-hidden lg:motion-safe:pb-0 lg:motion-safe:pt-[var(--header-h)]">
          {/* A grid below lg (or with reduced motion); a scroll-linked row above. */}
          <motion.ol
            aria-label={content.home.green.stagesLabel}
            style={rowStyle}
            className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-12 lg:motion-safe:flex lg:motion-safe:w-max lg:motion-safe:items-start lg:motion-safe:gap-24 lg:motion-safe:[transform:translate3d(calc((100vw_-_100%)*var(--travel)),0,0)] lg:motion-safe:will-change-transform"
          >
            {stages.map((name, i) => {
              const last = i === stages.length - 1;
              return (
                <li key={name} className={cn(last && "col-span-2 md:col-span-3")}>
                  <figure className="group/stage w-full lg:motion-safe:w-[min(40vw,38rem,calc((100svh_-_19rem)*4/3))]">
                    <div className="relative">
                      <div
                        className={cn(
                          "relative overflow-hidden rounded-lg bg-forest-900 aspect-[4/3]",
                          last ? "max-lg:aspect-[16/9] md:max-lg:aspect-[21/9] motion-reduce:aspect-[21/9]" : "max-md:aspect-[4/5]",
                        )}
                      >
                        <motion.div style={{ x: imageX }} className="absolute -inset-x-[6%] inset-y-0 motion-reduce:!transform-none">
                          <Image
                            src={stageStill(i)}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 40vw, (min-width: 768px) 33vw, 50vw"
                            className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover/stage:scale-[1.045]"
                          />
                        </motion.div>
                      </div>

                      {/* Direction to the next stage (scroll-linked row only). */}
                      {!last && (
                        <span
                          aria-hidden
                          className="absolute left-full top-1/2 hidden w-24 -translate-y-1/2 justify-center text-brass-soft lg:motion-safe:flex"
                        >
                          <Chevron className="h-3 w-3" />
                        </span>
                      )}
                    </div>

                    <figcaption className="mt-4 md:mt-5">
                      <span className="t-display-sm block text-cream">{name}</span>
                      <span className="t-small mt-1 block text-cream/75">{content.greenPillars[STAGE_PILLAR[i]].name}</span>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </motion.ol>

          {/* How far the row has travelled (scroll-linked row only). */}
          <div aria-hidden className="container-x mt-12 hidden lg:motion-safe:block">
            <div className="relative h-0.5 bg-cream/15">
              <motion.div style={{ scaleX: travel }} className="absolute inset-0 origin-left bg-gold" />
            </div>
            <div className="t-small mt-4 flex justify-between text-cream/75">
              <span>{stages[0]}</span>
              <span>{stages[stages.length - 1]}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
