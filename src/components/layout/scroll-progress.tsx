"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Reading-progress bar along the top edge of the viewport, in the action colour. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gold"
    />
  );
}
