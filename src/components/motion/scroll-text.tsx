"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.3, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}
    </motion.span>
  );
}

/**
 * Editorial statement whose words light up as the reader scrolls through it.
 */
export function ScrollText({ text, className, as: Tag = "p" }: { text: string; className?: string; as?: "p" | "h2" }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={cn("[text-wrap:pretty]", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <span key={i}>
              <Word progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </span>
    </Tag>
  );
}
