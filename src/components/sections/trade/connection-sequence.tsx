"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "@/components/ui/icons";
import type { TitledText } from "@/content/types";
import { cn } from "@/lib/cn";

type Step = TitledText & { link?: { label: string; href: string } };

/**
 * The value chain as a numbered sequence joined by a hairline that draws in
 * once the list enters view. Horizontal from `lg`, vertical below it.
 * Built for `surface-ink-deep` (markers mask the line with the surface colour).
 */
export function ConnectionSequence({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <ol ref={ref} className="grid lg:grid-cols-4">
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        const delay = 0.15 + i * 0.28;
        return (
          <li
            key={step.title}
            className="relative grid grid-cols-[2.75rem_1fr] gap-x-6 pb-14 last:pb-0 lg:block lg:pb-0 lg:pr-10 xl:pr-12"
          >
            {!last && (
              <span
                aria-hidden
                className="absolute bottom-0 left-[1.375rem] top-11 w-px bg-white/10 lg:bottom-auto lg:left-11 lg:right-0 lg:top-[1.375rem] lg:h-px lg:w-auto"
              >
                <span
                  style={{ transitionDelay: `${delay + 0.2}s` }}
                  className={cn(
                    "absolute inset-0 origin-top bg-gold/70 transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] lg:origin-left",
                    inView ? "scale-100" : "scale-y-0 lg:scale-x-0 lg:scale-y-100",
                  )}
                />
              </span>
            )}

            <span
              aria-hidden
              style={{ transitionDelay: `${delay}s` }}
              className={cn(
                "t-eyebrow relative flex h-11 w-11 items-center justify-center rounded-full border bg-ink-950 tabular-nums transition-colors duration-700",
                inView ? "border-gold/70 text-gold" : "border-white/15 text-mist-dim",
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
              <h3 className="text-[1.75rem] font-light leading-tight tracking-[-0.025em] text-ivory md:text-[2rem]">{step.title}</h3>
              <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-mist">{step.text}</p>
              {step.link && (
                <a
                  href={step.link.href}
                  className="group/step mt-5 inline-flex min-h-11 items-center gap-2.5 text-[0.8125rem] text-mist transition-colors duration-300 hover:text-gold-soft"
                >
                  <span className="h-px w-4 bg-current opacity-50" aria-hidden />
                  {step.link.label}
                  <ArrowRight
                    size={12}
                    className="rotate-90 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/step:translate-y-0.5"
                  />
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
