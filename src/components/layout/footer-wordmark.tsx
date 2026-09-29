"use client";

import { useRef, type PointerEvent } from "react";

/**
 * Footer signature: the AUREX wordmark in a holographic foil finish after the
 * GITEX palette — aqua, signal red, orange and amber — with diagonal light
 * streaks, film grain and a sheen that follows the pointer.
 */
export function FooterWordmark() {
  const frame = useRef(0);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--sx", `${x}%`);
      el.style.setProperty("--sy", `${y}%`);
    });
  };

  return (
    <div aria-hidden className="relative mt-24 select-none md:mt-32" onPointerMove={onPointerMove}>
      <p className="aurex-foil relative pl-[0.14em] text-center text-[18.5vw] font-medium leading-[0.82] tracking-[0.14em]">AUREX</p>
    </div>
  );
}
