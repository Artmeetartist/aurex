"use client";

import { motion, useInView, type HTMLMotionProps } from "motion/react";
import { useRef, type ReactNode, type Ref } from "react";
import { cn } from "@/lib/cn";
import { accentMatcher } from "@/lib/text";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts content into view once. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
  ...props
}: { children: ReactNode; delay?: number; y?: number; once?: boolean } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Staggers direct children into view. Wrap each child in <RevealItem>. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol" | "dl";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  y?: number;
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
      }}
    >
      {children}
    </Comp>
  );
}

/**
 * Splits a heading into lines/words that rise from a mask.
 * Words are kept as real text for accessibility and SEO.
 */
export function MaskText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  accent,
  tone = "light",
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  /** Words (exact match, case-insensitive) rendered in the serif accent style. */
  accent?: string[];
  /** "light" = on dark surfaces (gold accent), "dark" = on ivory (accessible deep gold). */
  tone?: "light" | "dark";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const words = text.split(" ");
  const isAccent = accentMatcher(accent);

  return (
    <Tag ref={ref as Ref<HTMLHeadingElement & HTMLParagraphElement>} className={cn("[text-wrap:balance]", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => {
          return (
            <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
              <motion.span
                className={cn("inline-block", isAccent(word) && cn("t-accent", tone === "light" ? "text-gold" : "text-gold-ink"))}
                initial={{ y: "105%" }}
                animate={inView ? { y: "0%" } : undefined}
                transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.045 }}
              >
                {word}
              </motion.span>
              {i < words.length - 1 && " "}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
