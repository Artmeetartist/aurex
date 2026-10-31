"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { useRange } from "@/components/green/use-range";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { contactHref } from "@/lib/routes";
import { WIDE_STILL } from "./shared";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useRange(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="motion-reduce:!opacity-100">
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
    <section className="relative bg-forest-950 pb-[clamp(4.5rem,8.5vw,7.5rem)] text-cream">
      <div className="px-2 md:px-3">
        <div ref={frame} className="relative isolate overflow-hidden rounded-[28px] bg-forest-900 md:rounded-[36px]">
          <motion.div aria-hidden style={{ x: drift }} className="absolute inset-y-0 -inset-x-[8%] motion-reduce:!transform-none">
            <Image src={WIDE_STILL} alt="" fill sizes="116vw" className="object-cover object-[62%_45%]" />
          </motion.div>
          <div aria-hidden className="scrim-up absolute inset-0" />
          <div aria-hidden className="scrim-right absolute inset-0" />

          <div className="container-x relative flex min-h-[min(88svh,56rem)] flex-col justify-end pb-12 pt-32 md:pb-16">
            <h2 ref={heading} className="t-display-lg max-w-[24ch] text-cream [text-wrap:balance]">
              {words.map((w, i) => {
                const start = (i / words.length) * 0.85;
                return (
                  <span key={i}>
                    <Word progress={read} range={[start, start + 0.85 / words.length]}>
                      {w}
                    </Word>
                    {i < words.length - 1 ? " " : ""}
                  </span>
                );
              })}
            </h2>

            <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:items-end">
              <Reveal className="lg:col-span-6">
                <p className="t-lead max-w-[36rem] text-cream/90">{green.statementText}</p>
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

      <div className="container-x">
        <p className="t-small mt-10 max-w-[46rem] text-mist md:mt-12">{note}</p>
      </div>
    </section>
  );
}
