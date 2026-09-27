"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import type { TitledText } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Partnership process as numbered steps joined by a hairline that draws in
 * once the list enters view. Vertical on small screens, horizontal from `lg`.
 * Built for `surface-ivory` (markers mask the line with the surface colour).
 */
export function ProcessSteps({ steps, className }: { steps: TitledText[]; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <ol ref={ref} className={cn("grid lg:grid-cols-4", className)}>
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        const delay = 0.1 + i * 0.26;
        return (
          <li
            key={step.title}
            className="relative grid grid-cols-[3rem_1fr] gap-x-6 pb-14 last:pb-0 sm:gap-x-8 lg:block lg:pb-0 lg:pr-10 xl:pr-14"
          >
            {!last && (
              <span
                aria-hidden
                className="absolute bottom-0 left-6 top-12 w-px bg-ink/10 lg:bottom-auto lg:left-12 lg:right-0 lg:top-6 lg:h-px lg:w-auto"
              >
                <span
                  style={{ transitionDelay: `${delay + 0.2}s` }}
                  className={cn(
                    "absolute inset-0 origin-top bg-gold-ink/60 transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] lg:origin-left",
                    inView ? "scale-100" : "scale-y-0 lg:scale-x-0 lg:scale-y-100",
                  )}
                />
              </span>
            )}

            <span
              aria-hidden
              style={{ transitionDelay: `${delay}s` }}
              className={cn(
                "t-eyebrow relative flex h-12 w-12 items-center justify-center rounded-full border bg-ivory tabular-nums transition-colors duration-700",
                inView ? "border-gold-ink/60 text-gold-ink" : "border-ink/15 text-stone",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div
              style={{ transitionDelay: `${delay + 0.1}s` }}
              className={cn(
                "pt-2.5 transition-[opacity,transform] duration-1000 ease-[var(--ease-out-expo)] lg:pt-10",
                inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
            >
              <h3 className="text-[1.75rem] font-light leading-tight tracking-[-0.025em] text-ink md:text-[2rem]">{step.title}</h3>
              <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-stone lg:max-w-xs">{step.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
