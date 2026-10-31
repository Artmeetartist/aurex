"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { PillarIcon } from "@/components/green/icons";
import { PILLAR_ORDER } from "@/components/green/stages";
import { useRange } from "@/components/green/use-range";
import { MaskText, Reveal } from "@/components/motion/reveal";
import type { GreenPillarId, SiteContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { PILLAR_STAGE, stageStill } from "./shared";

/** Colour panel per pillar: forest → teal → graphite → forest, echoing the teal identity. */
const TONES = ["bg-forest-800", "bg-teal-dark", "bg-graphite-800", "bg-forest-700"];

function Panel({ id, index, content }: { id: GreenPillarId; index: number; content: SiteContent }) {
  const pillar = content.greenPillars[id];
  const still = PILLAR_STAGE[id];
  const stageName = content.home.green.stages[still.stage];
  const flip = index % 2 === 1;

  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const shift = useRange(scrollYProgress, [0, 1], [-5, 5]);
  const imageY = useTransform(shift, (v: number) => `${v}%`);

  return (
    <li ref={ref} id={id} className="relative grid lg:min-h-[min(84svh,46rem)] lg:grid-cols-2">
      {/* Image half */}
      <div className={cn("relative aspect-[16/11] overflow-hidden bg-forest-900 sm:aspect-[16/9] lg:aspect-auto", flip && "lg:order-2")}>
        <motion.div style={{ y: imageY }} className="absolute -inset-y-[6%] inset-x-0 motion-reduce:!transform-none">
          <Image
            src={stageStill(still.stage)}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: still.focus }}
          />
        </motion.div>
        <p className="absolute bottom-5 left-5 inline-flex h-9 items-center rounded-full bg-forest-950/85 px-4 text-[0.875rem] text-cream md:bottom-7 md:left-7">
          {stageName}
        </p>
      </div>

      {/* Colour half */}
      <div className={cn("relative", TONES[index])}>
        <div
          className={cn(
            "flex h-full flex-col justify-center px-[clamp(1.25rem,5vw,6rem)] py-16 md:py-20",
            flip ? "lg:pl-[clamp(1.25rem,4vw,3.5rem)]" : "lg:pl-[clamp(3rem,6vw,7rem)]",
          )}
        >
          <Reveal y={16}>
            <span className="grid h-16 w-16 place-items-center rounded-lg bg-cream/10 text-cream">
              <PillarIcon id={id} size={46} />
            </span>
          </Reveal>

          <MaskText as="h3" text={pillar.name} className="t-display-lg mt-10 max-w-[12ch] text-cream md:mt-12" />

          <Reveal delay={0.1}>
            <p className="t-lead mt-7 max-w-[32rem] text-cream">{pillar.summary}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="t-body mt-5 max-w-[32rem] text-cream/90">{pillar.detail}</p>
          </Reveal>

          <Reveal delay={0.26}>
            <ul className="mt-10 flex flex-wrap gap-2">
              {pillar.focus.map((f) => (
                <li key={f} className="inline-flex h-9 items-center rounded-full bg-cream/10 px-4 text-[0.875rem] text-cream">
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </li>
  );
}

/**
 * The four pillars as full-width story panels: image and colour panel
 * alternate sides down the page.
 */
export function PillarPanels({ content }: { content: SiteContent }) {
  const heading = content.sustainability.pillars;

  return (
    <section id="pillars" tabIndex={-1} className="relative bg-graphite-950 text-cream outline-none">
      <div className="container-x pb-14 pt-[clamp(4.5rem,8.5vw,7.5rem)] md:pb-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <MaskText as="h2" text={heading.title} className="t-display-lg max-w-[20ch] text-cream lg:col-span-8" />
          {heading.intro && (
            <Reveal delay={0.1} className="lg:col-span-4">
              <p className="t-lead text-cream/85">{heading.intro}</p>
            </Reveal>
          )}
        </div>
      </div>

      <ol>
        {PILLAR_ORDER.map((id, i) => (
          <Panel key={id} id={id} index={i} content={content} />
        ))}
      </ol>
    </section>
  );
}
