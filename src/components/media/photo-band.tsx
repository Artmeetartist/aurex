"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import type { Photo as PhotoData } from "@/content/media";
import { Photo } from "./photo";

/**
 * Full-bleed photographic band with depth: the frame settles from a slight
 * perspective tilt as it enters, the photo drifts in parallax behind a
 * graded scrim, and content sits on top.
 */
export function PhotoBand({
  photo,
  tint,
  children,
  id,
}: {
  photo: PhotoData;
  tint?: string;
  children: ReactNode;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const rotateX = useTransform(scrollYProgress, [0, 0.35], [7, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.94, 1]);

  return (
    <section ref={ref} id={id} className="surface-ink-deep relative py-2 [perspective:1600px] md:py-3">
      <motion.div
        style={reduce ? undefined : { rotateX, scale }}
        className="elevate relative mx-2 min-h-[88svh] origin-bottom overflow-hidden rounded-lg md:mx-3 md:rounded-xl"
      >
        <motion.div style={reduce ? undefined : { y }} className="absolute inset-x-0 -inset-y-[12%]">
          <Photo photo={photo} />
        </motion.div>
        {tint && <div aria-hidden className="absolute inset-0 mix-blend-soft-light" style={{ backgroundColor: tint, opacity: 0.5 }} />}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/30 to-transparent" />
        <div className="container-x relative flex min-h-[88svh] flex-col justify-end py-16 md:py-24">{children}</div>
      </motion.div>
    </section>
  );
}
