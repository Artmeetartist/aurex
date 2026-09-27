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
import { GreenEyebrow, PILLAR_STAGE, pad, stageStill } from "./shared";

/** Colour panel per pillar: forest → teal → graphite → forest, echoing the teal identity. */
const TONES = ["bg-forest-800", "bg-teal-dark", "bg-graphite-800", "bg-forest-700"];
/** Node fill that matches each panel, so the spine appears to pass behind the node. */
const NODE_BG = ["bg-forest-800", "bg-teal-dark", "bg-graphite-800", "bg-forest-700"];

/** A node on the spine that lights once the drawing line reaches it. */
function SpineNode({ index }: { index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["center 0.64", "center 0.56"] });
  const lit = useRange(scrollYProgress, [0, 1], [0, 1]);
  return (
    <span
      ref={ref}
      aria-hidden
      className={cn(
        "absolute left-1/2 top-1/2 z-10 hidden h-[1.375rem] w-[1.375rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cream/35 lg:grid",
        NODE_BG[index],
      )}
    >
      <motion.span style={{ scale: lit, opacity: lit }} className="absolute -inset-[6px] rounded-full border border-brass/60 motion-reduce:!transform-none motion-reduce:!opacity-100" />
      <motion.span style={{ scale: lit }} className="h-2 w-2 rounded-full bg-brass-soft motion-reduce:!transform-none" />
    </span>
  );
}

function Panel({ id, index, content }: { id: GreenPillarId; index: number; content: SiteContent }) {
  const pillar = content.greenPillars[id];
  const still = PILLAR_STAGE[id];
  const stageName = content.home.green.stages[still.stage];
  const flip = index % 2 === 1;

  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const shift = useRange(scrollYProgress, [0, 1], [-5, 5]);
  const imageY = useTransform(shift, (v: number) => `${v}%`);
  const numeralY = useRange(scrollYProgress, [0, 1], [70, -70]);

  return (
    <li
      ref={ref}
      id={id}
      className="relative grid lg:min-h-[min(84svh,46rem)] lg:grid-cols-2"
    >
      {/* Image half */}
      <div className={cn("relative aspect-[16/11] overflow-hidden bg-forest-900 sm:aspect-[16/9] lg:aspect-auto", flip && "lg:order-2")}>
        <motion.div style={{ y: imageY }} className="absolute -inset-y-[6%] inset-x-0 motion-reduce:!transform-none">
          <Image
            src={stageStill(still.stage)}
            alt=""
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-cover"
            style={{ objectPosition: still.focus }}
          />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-950/55 via-transparent to-forest-950/10" />
        <p className="glass absolute bottom-5 left-5 inline-flex h-9 items-center gap-2.5 rounded-full !border-cream/15 !bg-forest-950/45 px-4 text-[0.8125rem] text-cream md:bottom-7 md:left-7">
          <span aria-hidden className="t-eyebrow !text-[0.625rem] tabular-nums text-brass-soft">
            {pad(still.stage + 1)}
          </span>
          {stageName}
        </p>
      </div>

      {/* Colour half */}
      <div className={cn("relative overflow-hidden", TONES[index])}>
        <motion.span
          aria-hidden
          style={{ y: numeralY }}
          className={cn(
            "pointer-events-none absolute top-[4%] select-none text-[clamp(11rem,24vw,24rem)] font-extralight leading-[0.8] tracking-[-0.07em] text-cream/[0.07] tabular-nums motion-reduce:!transform-none",
            flip ? "left-[4%]" : "right-[2%]",
          )}
        >
          {pad(index + 1)}
        </motion.span>
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -bottom-40 h-[32rem] w-[32rem] rounded-full [background:radial-gradient(closest-side,rgb(200_162_74/0.12),transparent_70%)]",
            flip ? "-left-40" : "-right-40",
          )}
        />

        <div
          className={cn(
            "relative flex h-full flex-col justify-center px-[clamp(1.25rem,5vw,6rem)] py-16 md:py-20",
            flip ? "lg:pl-[clamp(1.25rem,4vw,3.5rem)]" : "lg:pl-[clamp(3rem,6vw,7rem)]",
          )}
        >
          <Reveal y={16} className="flex items-center gap-5">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-cream/15 bg-cream/[0.04] text-cream">
              <PillarIcon id={id} size={46} />
            </span>
            <span aria-hidden className="t-eyebrow tabular-nums text-cream/85">
              {pad(index + 1)} <span className="text-cream/60">/ {pad(PILLAR_ORDER.length)}</span>
            </span>
          </Reveal>

          <MaskText as="h3" text={pillar.name} className="t-display-lg mt-10 max-w-[12ch] text-cream md:mt-12" />

          <Reveal delay={0.1}>
            <p className="mt-7 max-w-[32rem] text-[clamp(1.125rem,1.35vw,1.3125rem)] leading-[1.5] tracking-[-0.01em] text-cream [text-wrap:pretty]">
              {pillar.summary}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="t-body mt-5 max-w-[32rem] text-cream/[0.88] [text-wrap:pretty]">{pillar.detail}</p>
          </Reveal>

          <Reveal delay={0.26}>
            <ul className="mt-10 flex flex-wrap gap-2">
              {pillar.focus.map((f) => (
                <li
                  key={f}
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-cream/20 px-4 text-[0.8125rem] text-cream transition-colors duration-500 hover:border-brass-soft/70"
                >
                  <span aria-hidden className="h-1 w-1 rounded-full bg-brass-soft" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <SpineNode index={index} />
    </li>
  );
}

/**
 * The four pillars as full-width numbered story panels: image and colour panel
 * alternate sides, joined on large screens by a spine that draws with scroll.
 */
export function PillarPanels({ content }: { content: SiteContent }) {
  const heading = content.sustainability.pillars;
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 0.6", "end 0.6"] });
  const draw = useRange(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="pillars" tabIndex={-1} className="relative bg-graphite-950 text-cream outline-none">
      <div className="container-x pb-14 pt-[clamp(5.5rem,11vw,10rem)] md:pb-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal y={12}>
              <GreenEyebrow>{heading.eyebrow}</GreenEyebrow>
            </Reveal>
            <MaskText as="h2" text={heading.title} accent={heading.accent} className="t-display-lg mt-7 max-w-[16ch] text-cream" />
          </div>
          {heading.intro && (
            <Reveal delay={0.1} className="lg:col-span-4">
              <p className="t-lead text-cream/75">{heading.intro}</p>
            </Reveal>
          )}
        </div>
      </div>

      <div className="relative">
        {/* Spine joining the four pillars (large screens). */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-px -translate-x-1/2 bg-cream/15 lg:block">
          <motion.div
            style={{ scaleY: draw }}
            className="absolute inset-0 origin-top bg-gradient-to-b from-brass via-gold to-teal motion-reduce:!transform-none"
          />
        </div>
        <ol ref={list}>
          {PILLAR_ORDER.map((id, i) => (
            <Panel key={id} id={id} index={i} content={content} />
          ))}
        </ol>
      </div>
    </section>
  );
}
