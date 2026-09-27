"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { useRange } from "@/components/green/use-range";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { contactHref } from "@/lib/routes";
import { WIDE_STILL } from "./shared";

function Word({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const opacity = useRange(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className={cn("motion-reduce:!opacity-100", accent && "t-accent text-gold")}>
      {children}
    </motion.span>
  );
}

/**
 * Editorial close: the port panorama in an inset frame (a bookend to the
 * hero), drifting sideways as it scrolls, with the statement lighting word by
 * word, the partnership call to action and the positioning note.
 */
export function ClosingStatement({ locale, content }: { locale: Locale; content: SiteContent }) {
  const green = content.home.green;
  const note = content.sustainability.note;

  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pass } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const drift = useTransform(pass, (v: number) => `${5 - v * 10}%`);

  const heading = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress: read } = useScroll({ target: heading, offset: ["start 0.9", "end 0.55"] });
  const words = green.statement.split(" ");

  return (
    <section className="relative bg-forest-950 pb-[clamp(4rem,8vw,7rem)] text-cream">
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-ink-950" />

      <div className="relative px-2 md:px-3">
        <div ref={frame} className="elevate relative isolate overflow-hidden rounded-[28px] bg-forest-900 md:rounded-[36px]">
          <motion.div aria-hidden style={{ x: drift }} className="absolute inset-y-0 -inset-x-[8%] motion-reduce:!transform-none">
            <div
              className="absolute inset-0 bg-cover bg-[position:62%_45%]"
              style={{ backgroundImage: `url(${WIDE_STILL})` }}
            />
          </motion.div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/45 to-transparent" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-forest-950/80 via-forest-950/25 to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] ring-1 ring-inset ring-cream/10" />

          <div className="container-x relative flex min-h-[min(88svh,56rem)] flex-col justify-end pb-12 pt-32 md:pb-16">
            <h2 ref={heading} className="t-display-xl max-w-[14ch] text-cream [text-wrap:balance]">
              <span className="sr-only">{green.statement}</span>
              <span aria-hidden>
                {words.map((w, i) => {
                  const start = (i / words.length) * 0.85;
                  return (
                    <span key={i}>
                      <Word progress={read} range={[start, start + 0.85 / words.length]} accent={i === words.length - 1 && words.length > 2}>
                        {w}
                      </Word>
                      {i < words.length - 1 ? " " : ""}
                    </span>
                  );
                })}
              </span>
            </h2>

            <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:items-end">
              <Reveal className="lg:col-span-6">
                <p className="t-lead max-w-[36rem] text-cream/85">{green.statementText}</p>
              </Reveal>
              <Reveal delay={0.12} className="lg:col-span-6 lg:justify-self-end">
                <ButtonLink href={contactHref(locale, "partnership")} size="lg">
                  {green.statementCta}
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div className="container-x relative">
        <p className="mt-10 flex max-w-[46rem] items-start gap-3 text-[0.8125rem] leading-relaxed text-mist md:mt-12">
          <span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brass/80" />
          {note}
        </p>
      </div>
    </section>
  );
}
