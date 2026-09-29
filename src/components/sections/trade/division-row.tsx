"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  id: string;
  index: number;
  total: number;
  mode: string;
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
 * One core business area as an editorial row: a framed still that opens on
 * reveal and drifts with scroll, beside the division's name, summary and scope.
 */
export function DivisionRow({ id, index, total, mode, name, summary, scope, scopeLabel, image, reverse, tone = "light" }: Props) {
  const dark = tone === "dark";
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const titleId = `${id}-title`;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={ref}
      id={id}
      aria-labelledby={titleId}
      className="grid scroll-mt-[calc(var(--header-h)+1.5rem)] items-center gap-10 md:gap-14 lg:grid-cols-12 lg:gap-x-10"
    >
      <motion.figure
        initial={reduce ? false : { clipPath: "inset(6% 6% 6% 6% round 1.5rem)", opacity: 0.4 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1.5rem)", opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1.4, ease: EASE }}
        className={cn(
          cn("relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-[16/10] lg:col-span-7", dark ? "bg-ink-850" : "bg-ivory-300"),
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
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/35 via-ink/0 to-ink/10" />
        <div aria-hidden className={cn("absolute inset-0 rounded-xl ring-1 ring-inset", dark ? "ring-white/10" : "ring-ink/10")} />
      </motion.figure>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
        className={cn("lg:col-span-5", reverse ? "lg:col-start-1 lg:row-start-1 lg:pr-6" : "lg:col-start-8 lg:pl-6")}
      >
        <p className={cn("t-eyebrow flex items-center gap-3", dark ? "text-mist" : "text-stone")}>
          <span className={cn("tabular-nums", dark ? "text-gold" : "text-gold-ink")}>
            {number} / {String(total).padStart(2, "0")}
          </span>
          <span aria-hidden className={cn("h-px w-8", dark ? "bg-gold/50" : "bg-gold-ink/50")} />
          <span>{mode}</span>
        </p>
        <h3
          id={titleId}
          className={cn(
            "mt-7 text-[clamp(2rem,3.3vw,3.125rem)] font-light leading-[1.04] tracking-[-0.032em] [text-wrap:balance]",
            dark ? "text-ivory" : "text-ink",
          )}
        >
          {name}
        </h3>
        <p className={cn("t-lead mt-6 max-w-xl", dark ? "text-mist" : "text-stone")}>{summary}</p>

        <div className="mt-10 md:mt-12">
          <p className={cn("t-eyebrow", dark ? "text-mist" : "text-stone")}>{scopeLabel}</p>
          <ul className={cn("mt-4 grid border-t sm:grid-cols-2 sm:gap-x-8", dark ? "border-white/10" : "border-ink/10")}>
            {scope.map((item) => (
              <li
                key={item}
                className={cn(
                  "flex min-h-12 items-center gap-3 border-b py-3 text-[0.9375rem] leading-snug",
                  dark ? "border-white/10 text-ivory" : "border-ink/10 text-ink",
                )}
              >
                <span aria-hidden className={cn("h-px w-3 shrink-0", dark ? "bg-gold" : "bg-gold-ink")} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </article>
  );
}
