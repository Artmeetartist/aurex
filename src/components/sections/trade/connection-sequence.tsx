"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "@/components/ui/icons";
import type { TitledText } from "@/content/types";
import { cn } from "@/lib/cn";

type Step = TitledText & { link?: { label: string; href: string } };

/**
 * The value chain as an ordered sequence: a segmented progress bar fills step
 * by step once the list enters view. Four columns from `lg`, stacked below.
 * Under reduced motion every segment is shown full (data-reveal).
 */
export function ConnectionSequence({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <ol ref={ref} className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10">
      {steps.map((step, i) => {
        const delay = 0.1 + i * 0.16;
        return (
          <li key={step.title}>
            <span aria-hidden className="relative block h-[3px] overflow-hidden rounded-full bg-ivory/15">
              <span
                data-reveal
                style={{ transitionDelay: `${delay}s` }}
                className={cn(
                  "absolute inset-0 origin-left bg-gold transition-transform duration-[1200ms] ease-[var(--ease-out-expo)]",
                  inView ? "scale-x-100" : "scale-x-0",
                )}
              />
            </span>

            <div
              data-reveal
              style={{ transitionDelay: `${delay + 0.1}s` }}
              className={cn(
                "pt-8 transition-[opacity,transform] duration-1000 ease-[var(--ease-out-expo)] lg:pt-10",
                inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
            >
              <h3 className="t-display-sm text-ivory">{step.title}</h3>
              <p className="mt-4 max-w-xs text-[1rem] leading-relaxed text-ivory/85">{step.text}</p>
              {step.link && (
                <a
                  href={step.link.href}
                  className="group/step mt-5 inline-flex min-h-11 items-center gap-2.5 text-[0.875rem] font-medium text-ivory transition-colors duration-300 hover:text-gold-soft"
                >
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
