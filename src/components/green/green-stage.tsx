"use client";

import { useLenis } from "lenis/react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { GreenScene, useViewportPresence } from "@/components/three/lazy";
import { ButtonLink } from "@/components/ui/button";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { contactHref, href } from "@/lib/routes";
import { accentMatcher } from "@/lib/text";
import { STAGE_COUNT, STAGE_PILLAR, TRAVEL, progressForStage, stageAt } from "./stages";

/** Scroll position (0–1 of the pinned track) where the closing copy takes over. */
const OUTRO = 0.865;
/** The headline docks into the corner once the camera starts to travel. */
const DOCK = [0.035, 0.11] as const;

type Phase = "intro" | "travel" | "outro";

const pad = (n: number) => String(n).padStart(2, "0");

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
 * ecosystem that the camera travels across as the reader scrolls.
 */
export function GreenStage({ locale, content }: { locale: Locale; content: SiteContent }) {
  const copy = content.home.green;
  const stages = copy.stages.slice(0, STAGE_COUNT);
  const isAccent = accentMatcher(content.sustainability.hero.accent);
  const reduced = !!useReducedMotion();

  const track = useRef<HTMLDivElement>(null);
  const { mounted, visible } = useViewportPresence(track, "60% 0px");
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const travel = useTransform(scrollYProgress, [TRAVEL.start, TRAVEL.end], [0, 1]);

  const [stage, setStage] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setStage(stageAt((p - TRAVEL.start) / (TRAVEL.end - TRAVEL.start)));
    setPhase(p < DOCK[1] - 0.02 ? "intro" : p < OUTRO ? "travel" : "outro");
  });

  // Headline docks (scales down into the corner) rather than disappearing.
  const titleScale = useTransform(scrollYProgress, [DOCK[0], DOCK[1]], [1, 0.46]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.015, DOCK[1] - 0.03], [1, 0]);
  const rail = useTransform(scrollYProgress, [TRAVEL.start, TRAVEL.end], [0, 1]);

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
    <div ref={track} className="relative h-[460vh] md:h-[540vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-forest-950">
        {/* Poster behind the canvas: shown while WebGL loads, or if it is unavailable. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-[position:60%_50%] opacity-90"
          style={{ backgroundImage: "url(/media/green/stage-0.webp)" }}
        />
        {mounted && (
          <GreenScene progress={travel} active={visible} className="pointer-events-none absolute inset-0" />
        )}

        {/* Legibility scrims. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[46%] bg-gradient-to-b from-forest-950/90 via-forest-950/45 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-t from-forest-950 via-forest-950/70 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 hidden w-[55%] bg-gradient-to-r from-forest-950/55 to-transparent md:block" />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-950/40 to-transparent transition-opacity duration-1000",
            phase === "outro" ? "opacity-100" : "opacity-0",
          )}
        />

        <div className="container-x relative flex h-full flex-col pb-6 pt-[calc(var(--header-h)+1.75rem)] md:pb-10 md:pt-[calc(var(--header-h)+2.75rem)]">
          {/* Headline */}
          <div className="relative">
            <p className="t-eyebrow flex items-center gap-3 text-brass-soft">
              <span aria-hidden className="h-px w-8 bg-brass/70" />
              <span>{copy.eyebrow}</span>
              <span
                aria-hidden
                className={cn(
                  "ml-2 tabular-nums text-cream/70 transition-opacity duration-700",
                  phase === "travel" ? "opacity-100" : "opacity-0",
                )}
              >
                {pad(stage + 1)} / {pad(STAGE_COUNT)}
              </span>
            </p>
            <motion.h2
              id="green-title"
              style={{ scale: reduced ? undefined : titleScale }}
              className={cn(
                "t-display-xl mt-5 max-w-[11ch] origin-top-left text-cream [text-wrap:balance] md:mt-6",
                reduced && phase !== "intro" && "scale-[0.46]",
              )}
            >
              {copy.title.split(" ").map((w, i) => (
                <span key={i} className={cn(isAccent(w) && "t-accent text-gold")}>
                  {w}{" "}
                </span>
              ))}
            </motion.h2>
            <motion.p
              style={{ opacity: subtitleOpacity }}
              className="t-lead mt-6 max-w-[34rem] text-cream/85 md:mt-8"
            >
              {copy.subtitle}
            </motion.p>
          </div>

          {/* Stage caption / closing copy */}
          <div className="relative mt-auto">
            <div
              className={cn(
                "relative h-[8.5rem] transition-opacity duration-700 md:h-[10.5rem]",
                phase === "travel" ? "opacity-100" : "opacity-0",
              )}
            >
              {stages.map((name, i) => (
                <Caption key={name} state={i === stage ? "active" : i < stage ? "past" : "future"}>
                  <div className="flex items-end gap-5 md:gap-8">
                    <span
                      aria-hidden
                      className="text-[clamp(4.5rem,9vw,8.5rem)] font-extralight leading-[0.8] tracking-[-0.06em] text-transparent tabular-nums [-webkit-text-stroke:1px_rgb(226_207_152/0.55)]"
                    >
                      {pad(i + 1)}
                    </span>
                    <div className="pb-1">
                      <p className="t-eyebrow text-brass-soft">{pillarName(i)}</p>
                      <p className="mt-3 text-[clamp(1.75rem,3.4vw,3.25rem)] font-light leading-[1.02] tracking-[-0.03em] text-cream">
                        {name}
                      </p>
                    </div>
                  </div>
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
                <p key={i} className={cn("text-cream/85", i === 0 ? "t-lead" : "t-body mt-4 max-w-[34rem] text-cream/75")}>
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
          <ol className="sr-only lg:hidden">
            {stages.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ol>
          <div className="relative mt-8 hidden lg:block">
            <ol className="flex items-center justify-between gap-2">
              {stages.map((name, i) => {
                const current = i === stage && phase !== "intro";
                return (
                  <li key={name} className="flex min-w-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => goToStage(i)}
                      aria-current={current ? "step" : undefined}
                      className={cn(
                        "group/stage flex min-h-11 items-center gap-2.5 whitespace-nowrap rounded-full px-1 text-[0.8125rem] tracking-[-0.005em] transition-colors duration-500",
                        current ? "text-cream" : "text-cream/60 hover:text-cream",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-500",
                          current ? "scale-125 bg-gold shadow-[0_0_12px_rgb(141_198_63/0.8)]" : i < stage ? "bg-brass/80" : "bg-cream/30 group-hover/stage:bg-cream/70",
                        )}
                      />
                      <span className="t-eyebrow !tracking-[0.12em] text-[0.625rem] tabular-nums opacity-70">{pad(i + 1)}</span>
                      {name}
                    </button>
                    {i < stages.length - 1 && <Arrow className="shrink-0 text-cream/30" />}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Compact stage indicator (mobile / tablet) */}
          <div className="relative mt-6 flex items-center justify-between gap-4 lg:hidden" aria-hidden>
            <p className="flex min-w-0 items-baseline gap-3">
              <span className="t-eyebrow tabular-nums text-brass-soft">
                {pad(stage + 1)} / {pad(STAGE_COUNT)}
              </span>
              <span className="truncate text-[0.9375rem] text-cream">{stages[stage]}</span>
            </p>
            <span className="flex shrink-0 items-center gap-1.5">
              {stages.map((name, i) => (
                <span
                  key={name}
                  className={cn(
                    "h-[3px] rounded-full transition-all duration-500",
                    i === stage ? "w-5 bg-gold" : i < stage ? "w-2.5 bg-brass/70" : "w-2.5 bg-cream/25",
                  )}
                />
              ))}
            </span>
          </div>

          <div aria-hidden className="relative mt-4 h-px bg-cream/12 md:mt-5">
            <motion.div style={{ scaleX: rail }} className="h-px origin-left bg-gradient-to-r from-brass via-gold to-teal" />
          </div>
        </div>
      </div>
    </div>
  );
}
