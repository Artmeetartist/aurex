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
      {/* Soft coloured bloom behind the letters */}
      <div className="pointer-events-none absolute inset-x-[6%] top-[18%] bottom-[8%] -z-0 rounded-full opacity-45 blur-[70px] [background:linear-gradient(100deg,#00c6ec_0%,#f01509_40%,#ff8a00_70%,#fecf00_100%)]" />
      <p className="aurex-foil relative text-center text-[23vw] font-semibold leading-[0.8] tracking-[-0.055em]">AUREX</p>
    </div>
  );
}
