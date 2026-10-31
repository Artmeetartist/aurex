"use client";

import { useLenis } from "lenis/react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { GreenScene, useViewportPresence, useWebGL } from "@/components/three/lazy";
import { ButtonLink } from "@/components/ui/button";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { contactHref, href } from "@/lib/routes";
import { STAGE_COUNT, STAGE_PILLAR, TRAVEL, progressForStage, stageAt } from "./stages";
import { useRange } from "./use-range";

/** Scroll position (0–1 of the pinned track) where the stage captions take over from the title. */
const INTRO_END = 0.09;
/** Scroll position where the closing copy takes over. */
const OUTRO = 0.865;

type Phase = "intro" | "travel" | "outro";

function Arrow({ className }: { className?: string }) {
  return (
    <svg width="22" height="8" viewBox="0 0 22 8" fill="none" aria-hidden className={className}>
      <path d="M0 4h20.5M17.5 1l3 3-3 3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** One stage caption; only the current one is visible. */
function Caption({ state, children }: { state: "active" | "past" | "future"; children: ReactNode }) {
  return (
    <div
      aria-hidden={state !== "active"}
      className={cn(
        "absolute inset-x-0 bottom-0 transition-[opacity,transform,filter] duration-[900ms] ease-[var(--ease-out-expo)]",
        state === "active" && "translate-y-0 opacity-100 blur-0",
        state === "past" && "-translate-y-6 opacity-0 blur-[2px]",
        state === "future" && "translate-y-6 opacity-0 blur-[2px]",
      )}
    >
      {children}
    </div>
  );
}

/**
 * The pinned cinematic stage: a real-time maquette of the sustainable commerce
 * ecosystem that the camera travels across as the reader scrolls. The title
 * opens the track and scrolls away over the pinned maquette; each stage then
 * gets its own caption, and the closing copy ends the track at the port.
 */
export function GreenStage({ locale, content }: { locale: Locale; content: SiteContent }) {
  const copy = content.home.green;
  const stages = copy.stages.slice(0, STAGE_COUNT);
  const reduced = !!useReducedMotion();
  const webgl = useWebGL();

  const track = useRef<HTMLDivElement>(null);
  const { mounted, visible } = useViewportPresence(track, "60% 0px");
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const travel = useRange(scrollYProgress, [TRAVEL.start, TRAVEL.end], [0, 1]);

  const [stage, setStage] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setStage(stageAt((p - TRAVEL.start) / (TRAVEL.end - TRAVEL.start)));
    setPhase(p < INTRO_END ? "intro" : p < OUTRO ? "travel" : "outro");
  });

  const lenis = useLenis();
  const goTo = (target: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = top + target * (el.offsetHeight - window.innerHeight);
    if (lenis) lenis.scrollTo(y, { duration: reduced ? 0 : 1.6 });
    else window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
  };
  const goToStage = (i: number) => goTo(TRAVEL.start + progressForStage(i) * (TRAVEL.end - TRAVEL.start));
  // Keyboard users tabbing into the closing actions are brought to the point where they are shown.
  const revealOutro = () => {
    if (phase !== "outro") goTo(0.93);
  };

  const pillarName = (i: number) => content.greenPillars[STAGE_PILLAR[i]].name;

  return (
    <div ref={track} className="relative h-[400vh] md:h-[460vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-forest-950">
        {/* Poster behind the canvas while WebGL loads. Without WebGL, the rendered
            stills of each stage take over and follow the scroll instead. */}
        {(webgl ? [0] : Array.from({ length: STAGE_COUNT }, (_, i) => i)).map((i) => (
          <div
            key={i}
            aria-hidden
            className={cn(
              "absolute inset-0 bg-cover bg-[position:60%_50%] transition-opacity duration-1000",
              webgl || i === stage ? "opacity-90" : "opacity-0",
            )}
            style={{ backgroundImage: `url(/media/green/stage-${i}.webp)` }}
          />
        ))}
        {mounted && (
          <GreenScene progress={travel} active={visible} className="pointer-events-none absolute inset-0" />
        )}

        {/* Legibility scrims. */}
        <div
          aria-hidden
          className={cn(
            "scrim-down pointer-events-none absolute inset-x-0 top-0 h-[46%] transition-opacity duration-1000",
            phase === "intro" ? "opacity-100" : "opacity-45",
          )}
        />
        <div aria-hidden className="scrim-up pointer-events-none absolute inset-x-0 bottom-0 h-[42%]" />
        <div
          aria-hidden
          className={cn(
            "scrim-right pointer-events-none absolute inset-y-0 left-0 hidden w-[55%] transition-opacity duration-1000 md:block",
            phase === "intro" ? "opacity-100" : "opacity-40",
          )}
        />
        <div
          aria-hidden
          className={cn(
            "scrim-right pointer-events-none absolute inset-0 transition-opacity duration-1000",
            phase === "outro" ? "opacity-100" : "opacity-0",
          )}
        />

        <div className="container-x relative flex h-full flex-col justify-end pb-6 pt-[calc(var(--header-h)+1.75rem)] md:pb-10">
          {/* Stage caption / closing copy */}
          <div className="relative">
            <div
              className={cn(
                "relative h-[5.5rem] transition-opacity duration-700 md:h-[6rem]",
                phase === "travel" ? "opacity-100" : "opacity-0",
              )}
            >
              {stages.map((name, i) => (
                <Caption key={name} state={i === stage ? "active" : i < stage ? "past" : "future"}>
                  <p className="t-display-sm text-cream">{name}</p>
                  <p className="t-small mt-2 text-cream/80">{pillarName(i)}</p>
                </Caption>
              ))}
            </div>

            {/* Closing copy: body and actions, revealed once the camera reaches the port. */}
            <div
              onFocusCapture={revealOutro}
              className={cn(
                "absolute inset-x-0 bottom-0 max-w-[40rem] transition-[opacity,transform] duration-1000 ease-[var(--ease-out-expo)] focus-within:translate-y-0 focus-within:opacity-100",
                phase === "outro" ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0",
              )}
            >
              {copy.body.map((p, i) => (
                <p
                  key={i}
                  className={cn(
                    "text-cream/90",
                    i === 0 ? "t-lead" : "t-body mt-4 max-w-[34rem] [@media(max-height:560px)]:hidden",
                  )}
                >
                  {p}
                </p>
              ))}
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={href(locale, "sustainability")} size="lg">
                  {copy.primaryCta}
                </ButtonLink>
                <ButtonLink href={contactHref(locale, "partnership")} size="lg" variant="outline-light">
                  {copy.secondaryCta}
                </ButtonLink>
              </div>
            </div>
          </div>

          {/* Stage ticker (desktop) */}
          <ol aria-label={copy.stagesLabel} className="sr-only lg:hidden">
            {stages.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ol>
          <div className="relative mt-8 hidden lg:block">
            <ol aria-label={copy.stagesLabel} className="flex items-center justify-between gap-2">
              {stages.map((name, i) => {
                const current = i === stage && phase !== "intro";
                return (
                  <li key={name} className="flex min-w-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => goToStage(i)}
                      aria-current={current ? "step" : undefined}
                      className={cn(
                        "group/stage flex min-h-11 items-center gap-2.5 whitespace-nowrap rounded-full px-1 text-[0.875rem] transition-colors duration-500",
                        current ? "text-cream" : "text-cream/70 hover:text-cream",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "h-1.5 w-1.5 shrink-0 rounded-full transition-[transform,background-color] duration-500",
                          current ? "scale-125 bg-gold" : i < stage ? "bg-brass/80" : "bg-cream/30 group-hover/stage:bg-cream/70",
                        )}
                      />
                      {name}
                    </button>
                    {i < stages.length - 1 && <Arrow className="shrink-0 text-cream/30" />}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Compact stage indicator (mobile / tablet): the caption above names the stage. */}
          <div className="relative mt-6 flex items-center gap-1.5 lg:hidden" aria-hidden>
            {stages.map((name, i) => (
              <span
                key={name}
                className={cn(
                  "h-[3px] rounded-full transition-[width,background-color] duration-500",
                  i === stage ? "w-5 bg-gold" : i < stage ? "w-2.5 bg-brass/70" : "w-2.5 bg-cream/25",
                )}
              />
            ))}
          </div>

          <div aria-hidden className="relative mt-4 h-0.5 bg-cream/15 md:mt-5">
            <motion.div style={{ scaleX: travel }} className="h-full origin-left bg-gold" />
          </div>
        </div>
      </div>

      {/* Title: opens the track and scrolls away over the pinned maquette. */}
      <div className="container-x absolute inset-x-0 top-0 pt-[calc(var(--header-h)+2.75rem)] md:pt-[calc(var(--header-h)+4rem)]">
        <h2 id="green-title" className="t-display-lg max-w-[14ch] text-cream">
          {copy.title}
        </h2>
        <p className="t-lead mt-6 max-w-[34rem] text-cream/90 md:mt-8">{copy.subtitle}</p>
      </div>
    </div>
  );
}
