"use client";

import type { MotionValue } from "motion/react";

export type GreenSceneProps = {
  /** 0–1 scroll progress; the camera travels through the seven stages in order. */
  progress?: MotionValue<number>;
  /** Fixed stage index (0–6) instead of scroll-driven travel — used for stills. */
  stage?: number;
  /** Pause the render loop when off screen. */
  active?: boolean;
  className?: string;
};

// Interface stub — implemented by the AUREX Green build step.
export default function GreenScene(props: GreenSceneProps) {
  void props;
  return null;
}
