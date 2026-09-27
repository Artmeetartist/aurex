"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { MaskText, Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { SiteContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { mailDetails, mailSet, type MailDetailKey } from "./mail-assets";

type Showcase = NonNullable<SiteContent["trades"]["larp"]["showcase"]>;

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * "In focus" product stage: the mail set rises out of perspective on a lit
 * plinth; numbered hotspots and a thumbnail rail select a close-up detail.
 */
export function MailShowcase({ showcase, id }: { showcase: Showcase; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState<MailDetailKey>(showcase.details[0]?.key ?? "weave");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.45], [14, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const glow = useTransform(scrollYProgress, [0.1, 0.5], [0.2, 1]);

  const current = showcase.details.find((d) => d.key === active) ?? showcase.details[0];
  const index = showcase.details.findIndex((d) => d.key === active);

  return (
    <section ref={ref} id={id} className="surface-ink-deep section-y relative scroll-mt-20 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-1/4 h-[48rem] w-[48rem] rounded-full [background:radial-gradient(closest-side,rgb(140_74_47/0.22),transparent_70%)]"
      />
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Stage */}
        <div className="lg:col-span-7 [perspective:1600px]">
          <motion.figure
            style={reduce ? undefined : { rotateX, scale }}
            className="elevate relative origin-bottom overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(120%_80%_at_50%_0%,#1b2b29_0%,#081a1a_55%,#020c0c_100%)]"
          >
            <motion.span
              aria-hidden
              style={reduce ? undefined : { opacity: glow }}
              className="pointer-events-none absolute left-1/2 top-[-20%] h-[80%] w-[90%] -translate-x-1/2 rounded-full [background:radial-gradient(closest-side,rgb(226_207_152/0.22),transparent_70%)]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-[8%] bottom-[6%] h-[14%] rounded-[50%] bg-black/60 blur-2xl"
            />
            <motion.div style={reduce ? undefined : { y }} className="relative mx-auto w-[92%] pb-[4%] pt-[6%]">
              <div className="relative" style={{ aspectRatio: `${mailSet.width} / ${mailSet.height}` }}>
                <Image
                  src={mailSet.src}
                  alt={showcase.setCaption}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-contain drop-shadow-[0_30px_40px_rgb(0_0_0/0.55)]"
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
                      className="group/spot absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-1 rounded-full border motion-safe:animate-[aurex-pulse-ring_2.8s_ease-out_infinite]",
                          on ? "border-brass-soft/70" : "border-ivory/40",
                        )}
                        style={{ animationDelay: `${i * 0.35}s` }}
                      />
                      <span
                        aria-hidden
                        className={cn(
                          "relative flex h-7 w-7 items-center justify-center rounded-full text-[0.6875rem] font-medium tabular-nums backdrop-blur-md transition-all duration-500 ease-[var(--ease-out-expo)]",
                          on
                            ? "scale-110 bg-brass-soft text-ink-950 shadow-[0_0_0_6px_rgb(226_207_152/0.18)]"
                            : "bg-ink-950/60 text-ivory ring-1 ring-ivory/40 group-hover/spot:bg-ink-950/80 group-hover/spot:ring-brass-soft",
                        )}
                      >
                        {i + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
            <figcaption className="relative border-t border-white/10 px-6 py-4 text-[0.8125rem] leading-relaxed text-mist md:px-8">
              {showcase.setCaption}
            </figcaption>
          </motion.figure>
        </div>

        {/* Copy + detail */}
        <div className="flex flex-col lg:col-span-5 lg:pl-4">
          <Reveal y={12}>
            <Eyebrow>{showcase.eyebrow}</Eyebrow>
          </Reveal>
          <MaskText as="h2" text={showcase.title} accent={showcase.accent} className="t-display-md mt-7 text-ivory" />
          <Reveal delay={0.1}>
            <p className="mt-6 text-[1rem] leading-relaxed text-mist">{showcase.text}</p>
          </Reveal>

          <div id="mail-detail" aria-live="polite" className="mt-10 grid grid-cols-[7.5rem_1fr] items-center gap-6 md:grid-cols-[9rem_1fr]">
            <div className="relative aspect-square overflow-hidden rounded-[1.25rem] border border-white/10 bg-ink-850">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={current.key}
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
            <div>
              <p className="t-eyebrow text-brass-soft tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(showcase.details.length).padStart(2, "0")}
              </p>
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <h3 className="mt-2 text-[1.5rem] font-light leading-tight tracking-[-0.02em] text-ivory">{current.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-mist">{current.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <ul className="mt-10 grid grid-cols-5 gap-2.5 border-t border-white/10 pt-8 lg:mt-auto">
            {showcase.details.map((d) => {
              const on = d.key === active;
              return (
                <li key={d.key}>
                  <button
                    type="button"
                    onClick={() => setActive(d.key)}
                    aria-pressed={on}
                    aria-controls="mail-detail"
                    className={cn(
                      "group/thumb relative block aspect-square w-full overflow-hidden rounded-[0.875rem] border transition-[border-color,transform] duration-500 ease-[var(--ease-out-expo)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                      on ? "border-brass-soft" : "border-white/10 hover:-translate-y-0.5 hover:border-white/30",
                    )}
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
