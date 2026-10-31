"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import { WIDE_STILL } from "@/components/sections/sustainability/shared";
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

/** Heading whose words light up as it scrolls through the viewport. */
function LitHeading({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.5"] });
  const words = text.split(" ");
  return (
    <h3 ref={ref} className={cn("[text-wrap:balance]", className)}>
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
    </h3>
  );
}

/** Closing statement of the AUREX Green section: the statement beside the port, where the tour ends. */
export function GreenStatement({ locale, content }: { locale: Locale; content: SiteContent }) {
  const copy = content.home.green;
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, (v: number) => `${-6 + 12 * v}%`);

  return (
    <div className="container-x relative grid gap-12 pb-[clamp(4.5rem,8.5vw,7.5rem)] lg:grid-cols-12 lg:items-center lg:gap-10">
      <div className="lg:col-span-7">
        <LitHeading text={copy.statement} className="t-display-lg max-w-[24ch] text-cream" />
        <Reveal>
          <p className="t-lead mt-8 max-w-[34rem] text-cream/90 md:mt-10">{copy.statementText}</p>
        </Reveal>
        <Reveal delay={0.12} className="mt-10">
          <ButtonLink href={contactHref(locale, "partnership")} size="lg">
            {copy.statementCta}
          </ButtonLink>
        </Reveal>
        <p className="t-small mt-12 max-w-[34rem] text-mist md:mt-16">{copy.note}</p>
      </div>

      {/* The port still, drifting slowly as it passes. */}
      <div
        ref={frame}
        className="relative aspect-[4/3] overflow-hidden rounded-lg bg-forest-900 lg:col-span-5 lg:aspect-square"
      >
        <motion.div aria-hidden style={{ y: drift }} className="absolute -inset-y-[8%] inset-x-0 motion-reduce:!transform-none">
          <Image
            src={WIDE_STILL}
            alt=""
            fill
            sizes="(min-width: 1024px) 38vw, 92vw"
            className="object-cover object-[62%_45%]"
          />
        </motion.div>
      </div>
    </div>
  );
}
