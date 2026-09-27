import { useTransform, type MotionValue } from "motion/react";

/**
 * Clamped linear map of a scroll-linked value, computed on the JS side.
 *
 * Range-form `useTransform(scrollYProgress, [a, b], [c, d])` lets motion hand
 * `opacity` over to a native ScrollTimeline, which ignores `useScroll` target
 * offsets on this page and produced wrong values inside the pinned stage.
 * The function form keeps the mapping exact.
 */
export function useRange(value: MotionValue<number>, input: readonly [number, number], output: readonly [number, number]) {
  const [a, b] = input;
  const [c, d] = output;
  return useTransform(value, (v: number) => {
    const t = b === a ? (v >= b ? 1 : 0) : Math.min(Math.max((v - a) / (b - a), 0), 1);
    return c + (d - c) * t;
  });
}
