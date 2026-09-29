"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { contactHref } from "@/lib/routes";
import { useRange } from "./use-range";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useRange(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline motion-reduce:!opacity-100">
      {children}
    </motion.span>
  );
}

/** Heading whose words light up as it scrolls through the viewport; the last word takes the serif accent. */
function LitHeading({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.5"] });
  const words = text.split(" ");
  return (
    <h3 ref={ref} className={cn("[text-wrap:balance]", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => {
          const start = (i / words.length) * 0.9;
          return (
            <span key={i}>
              <Word progress={scrollYProgress} range={[start, start + 0.9 / words.length]}>
                {w}
              </Word>
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </span>
    </h3>
  );
}

/** Closing statement of the AUREX Green section. */
export function GreenStatement({ locale, content }: { locale: Locale; content: SiteContent }) {
  const copy = content.home.green;
  const box = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: box, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, (v: number) => `${-6 + 12 * v}%`);

  return (
    <div ref={box} className="relative overflow-hidden">
      {/* Port still with a slow parallax drift, heavily veiled. */}
      <motion.div
        aria-hidden
        style={{ y: drift }}
        className="absolute -inset-y-[8%] inset-x-0 opacity-45 motion-reduce:!transform-none"
      >
        <div className="absolute inset-0 bg-[url(/media/green/stage-6-wide.webp)] bg-cover bg-[position:62%_45%]" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-forest-950 via-forest-950/70 to-ink-950" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-forest-950/80 via-forest-950/30 to-transparent" />
      {/* Hand-off to the deep-teal section that follows. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink-950" />

      <div className="container-x section-y relative">
        <LitHeading text={copy.statement} className="t-display-xl max-w-[14ch] text-cream" />
        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <p className="t-lead max-w-[36rem] text-cream/80">{copy.statementText}</p>
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-6 lg:justify-self-end">
            <ButtonLink href={contactHref(locale, "partnership")} size="lg">
              {copy.statementCta}
            </ButtonLink>
          </Reveal>
        </div>
        <p className="mt-16 flex max-w-[40rem] items-start gap-3 border-t border-cream/10 pt-6 text-[0.8125rem] leading-relaxed text-mist md:mt-24">
          <span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brass/80" />
          {copy.note}
        </p>
      </div>
    </div>
  );
}
