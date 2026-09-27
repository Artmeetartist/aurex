"use client";

import { useInView } from "motion/react";
import { useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import type { TitledText } from "@/content/types";
import { cn } from "@/lib/cn";

const noop = () => () => {};
/** False on the server and during hydration, true once the client has taken over. */
function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

/**
 * Partnership process as an interactive stepper. Each step title is a button
 * (inside its heading) that selects the step and reveals its text; arrow keys,
 * Home and End move between steps. The first step is active by default.
 *
 * Every step's text is rendered in the DOM. Until the client hydrates (and
 * without JavaScript) all steps stay expanded, so nothing is lost for search
 * engines or no-JS readers. Vertical on small screens, horizontal from `lg`,
 * where inactive text keeps its space so the row never jumps.
 * Built for `surface-ivory` (markers mask the line with the surface colour).
 */
export function ProcessSteps({ steps, className }: { steps: TitledText[]; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const hydrated = useHydrated();
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = steps.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <ol ref={ref} className={cn("grid lg:grid-cols-4", className)}>
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        const current = i === active;
        const done = i < active;
        const expanded = !hydrated || current;
        const buttonId = `${uid}-step-${i}`;
        const panelId = `${uid}-panel-${i}`;
        const hiddenBeforeView = hydrated && !inView;

        return (
          <li
            key={step.title}
            style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
            className={cn(
              "relative pb-10 transition-[opacity,translate] duration-1000 ease-[var(--ease-out-expo)] last:pb-0 lg:pb-0 lg:pr-10 xl:pr-14",
              hiddenBeforeView ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100",
            )}
          >
            {!last && (
              <span
                aria-hidden
                className="absolute bottom-0 left-6 top-12 w-px bg-ink/10 lg:bottom-auto lg:left-12 lg:right-0 lg:top-6 lg:h-px lg:w-auto"
              >
                <span
                  className={cn(
                    "absolute inset-0 origin-top bg-gold-ink/70 transition-transform duration-700 ease-[var(--ease-out-expo)] lg:origin-left",
                    done ? "scale-100" : "scale-y-0 lg:scale-x-0 lg:scale-y-100",
                  )}
                />
              </span>
            )}

            <h3 className="text-[1.75rem] font-light leading-tight tracking-[-0.025em] md:text-[2rem]">
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                aria-current={hydrated && current ? "step" : undefined}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="group/step grid min-h-12 w-full cursor-pointer grid-cols-[3rem_1fr] items-start gap-x-6 rounded-2xl text-left sm:gap-x-8 lg:block"
              >
                <span
                  aria-hidden
                  className={cn(
                    "t-eyebrow relative flex h-12 w-12 items-center justify-center rounded-full border tabular-nums transition-[background-color,border-color,color,transform] duration-500 ease-[var(--ease-out-expo)]",
                    current
                      ? "border-gold-ink bg-gold-ink text-ivory"
                      : done
                        ? "border-gold-ink/60 bg-ivory text-gold-ink group-hover/step:scale-105"
                        : "border-ink/15 bg-ivory text-stone group-hover/step:scale-105 group-hover/step:border-gold-ink/60 group-hover/step:text-gold-ink",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "block pt-1.5 transition-colors duration-500 lg:pt-10",
                    current ? "text-ink" : "text-stone group-hover/step:text-ink",
                  )}
                >
                  {step.title}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid pl-[4.5rem] transition-[grid-template-rows,opacity,visibility] duration-500 ease-[var(--ease-out-expo)] sm:pl-20 lg:pl-0",
                expanded ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0 lg:grid-rows-[1fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-stone lg:max-w-xs">{step.text}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
