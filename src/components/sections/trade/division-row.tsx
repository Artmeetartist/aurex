"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  id: string;
  name: string;
  summary: string;
  scope: string[];
  scopeLabel: string;
  /** Still path without extension (webp is used). */
  image: string;
  /** Places the image on the right from `lg` up. */
  reverse?: boolean;
  /** "light" = ivory surface (default), "dark" = deep-teal surface. */
  tone?: "light" | "dark";
};

/**
 * One core business area as an editorial row: a large still that drifts with
 * scroll, beside the division's name, summary and scope.
 */
export function DivisionRow({ id, name, summary, scope, scopeLabel, image, reverse, tone = "light" }: Props) {
  const dark = tone === "dark";
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const titleId = `${id}-title`;

  return (
    <article
      ref={ref}
      id={id}
      aria-labelledby={titleId}
      className="grid scroll-mt-[calc(var(--header-h)+1.5rem)] items-center gap-10 md:gap-14 lg:grid-cols-12 lg:gap-x-10"
    >
      <motion.figure
        data-reveal
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1.2, ease: EASE }}
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-[16/10] lg:col-span-7",
          dark ? "bg-ink-850" : "bg-ivory-300",
          reverse && "lg:col-start-6 lg:row-start-1",
        )}
      >
        <motion.div style={{ y: reduce ? 0 : imageY }} className="absolute inset-x-0 -inset-y-[8%]">
          <Image
            src={`${image}.webp`}
            alt=""
            fill
            sizes="(min-width: 1440px) 820px, (min-width: 1024px) 58vw, 100vw"
            className="object-cover saturate-[0.82]"
          />
        </motion.div>
      </motion.figure>

      <Reveal
        y={24}
        delay={0.1}
        className={cn("lg:col-span-5", reverse ? "lg:col-start-1 lg:row-start-1 lg:pr-6" : "lg:col-start-8 lg:pl-6")}
      >
        <h3 id={titleId} className={cn("t-display-md [text-wrap:balance]", dark ? "text-ivory" : "text-ink")}>
          {name}
        </h3>
        <p className={cn("t-lead mt-6 max-w-xl", dark ? "text-ivory/85" : "text-ink/85")}>{summary}</p>

        <div className="mt-10 md:mt-12">
          <h4 className={cn("t-small font-medium", dark ? "text-ivory/70" : "text-ink/70")}>{scopeLabel}</h4>
          <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {scope.map((item) => (
              <li key={item} className={cn("flex items-center gap-3 text-[1rem] leading-snug", dark ? "text-ivory" : "text-ink")}>
                <span aria-hidden className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dark ? "bg-gold" : "bg-gold-ink")} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </article>
  );
}
