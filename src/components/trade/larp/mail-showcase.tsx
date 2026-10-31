"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { MaskText, Reveal } from "@/components/motion/reveal";
import type { SiteContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { mailDetails, mailSet, type MailDetailKey } from "./mail-assets";

type Showcase = NonNullable<SiteContent["trades"]["larp"]["showcase"]>;

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Product stage for mail armour: the set settles out of perspective on a flat
 * ink panel; hotspots on the set and a thumbnail rail select a close-up detail.
 */
export function MailShowcase({ showcase, id }: { showcase: Showcase; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState<MailDetailKey>(showcase.details[0]?.key ?? "weave");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.45], [14, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const current = showcase.details.find((d) => d.key === active) ?? showcase.details[0];

  return (
    <section ref={ref} id={id} className="surface-ink-deep section-y relative scroll-mt-20 overflow-hidden">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Stage */}
        <div className="lg:col-span-7 [perspective:1600px]">
          <motion.figure
            style={reduce ? undefined : { rotateX, scale }}
            className="relative origin-bottom overflow-hidden rounded-xl bg-ink-850"
          >
            <motion.div style={reduce ? undefined : { y }} className="relative mx-auto w-[92%] pb-[4%] pt-[6%]">
              <div className="relative" style={{ aspectRatio: `${mailSet.width} / ${mailSet.height}` }}>
                <Image
                  src={mailSet.src}
                  alt={showcase.setCaption}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-contain"
                />
                {showcase.details.map((d, i) => {
                  const pos = mailDetails[d.key];
                  const on = d.key === active;
                  return (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => setActive(d.key)}
                      onPointerEnter={(e) => e.pointerType === "mouse" && setActive(d.key)}
                      aria-pressed={on}
                      aria-controls="mail-detail"
                      aria-label={d.title}
                      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                      className="group/spot absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-2 rounded-full bg-ivory/30 motion-safe:animate-[aurex-pulse-ring_2.8s_ease-out_infinite]"
                        style={{ animationDelay: `${i * 0.35}s` }}
                      />
                      <span
                        aria-hidden
                        className={cn(
                          "relative block h-4 w-4 rounded-full transition-[background-color,transform] duration-500 ease-[var(--ease-out-expo)]",
                          on ? "scale-125 bg-brass-soft" : "bg-ivory group-hover/spot:bg-brass-soft",
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>
            <figcaption className="px-6 pb-6 text-[0.875rem] leading-relaxed text-ivory/75 md:px-8">{showcase.setCaption}</figcaption>
          </motion.figure>
        </div>

        {/* Copy + detail */}
        <div className="flex flex-col lg:col-span-5 lg:pl-4">
          <MaskText as="h2" text={showcase.title} className="t-display-md text-ivory" />
          <Reveal delay={0.1}>
            <p className="mt-6 text-[1rem] leading-relaxed text-ivory/85">{showcase.text}</p>
          </Reveal>

          <div id="mail-detail" aria-live="polite" className="mt-10 grid grid-cols-[7.5rem_1fr] items-center gap-6 md:grid-cols-[9rem_1fr]">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-ink-850">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={current.key}
                  data-reveal
                  initial={{ opacity: 0, scale: 1.12 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image src={mailDetails[current.key].src} alt="" fill sizes="144px" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={current.key}
                data-reveal
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <h3 className="t-display-sm text-ivory">{current.title}</h3>
                <p className="mt-2 text-[1rem] leading-relaxed text-ivory/85">{current.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <ul className="mt-10 grid grid-cols-5 gap-2.5 lg:mt-auto lg:pt-10">
            {showcase.details.map((d) => {
              const on = d.key === active;
              return (
                <li key={d.key}>
                  <button
                    type="button"
                    onClick={() => setActive(d.key)}
                    aria-pressed={on}
                    aria-controls="mail-detail"
                    className="group/thumb relative block aspect-square w-full overflow-hidden rounded-md bg-ink-850 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    <Image
                      src={mailDetails[d.key].src}
                      alt=""
                      fill
                      sizes="96px"
                      className={cn(
                        "object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] group-hover/thumb:scale-110",
                        on ? "opacity-100" : "opacity-55",
                      )}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-0 bottom-0 h-[3px] bg-brass-soft transition-opacity duration-500",
                        on ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span className="sr-only">{d.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
