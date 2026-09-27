"use client";

import { useLenis } from "lenis/react";

export function BackToTop({ label }: { label: string }) {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="group inline-flex min-h-11 items-center gap-3 text-[0.8125rem] text-mist transition-colors hover:text-ivory"
    >
      {label}
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M6 10.5V1.5M1.5 6 6 1.5 10.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
        </svg>
      </span>
    </button>
  );
}
