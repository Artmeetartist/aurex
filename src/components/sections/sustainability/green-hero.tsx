"use client";

import { useLenis } from "lenis/react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { STAGE_COUNT, progressForStage, stageAt } from "@/components/green/stages";
import { useRange } from "@/components/green/use-range";
import { MaskText } from "@/components/motion/reveal";
import { GreenScene, useViewportPresence } from "@/components/three/lazy";
import { ButtonLink } from "@/components/ui/button";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { contactHref, href } from "@/lib/routes";
import { GreenEyebrow, pad, stageStill } from "./shared";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The hero plays a slow, self-running tour of the maquette in ecosystem order.
 * One cycle (seconds): hold on solar → travel through the seven stages →
 * hold on the port → dip to forest, cut back to the start (hidden by the veil).
 */
const HOLD_START = 3.5;
const TRAVEL = 60;
const HOLD_END = 10;
const VEIL_IN = 1.4;
const VEIL_HOLD = 0.5;
const VEIL_OUT = 1.8;
const CYCLE = HOLD_START + TRAVEL + HOLD_END + VEIL_IN + VEIL_HOLD;

const smooth = (t: number) => {
  const x = Math.min(Math.max(t, 0), 1);
  return x * x * (3 - 2 * x);
};

/** Tour state at clock time `t`. `cut` is true while the veil hides the jump back to the start. */
function sample(t: number) {
  const n = Math.floor(t / CYCLE);
  const u = t - n * CYCLE;
  const travelEnd = HOLD_START + TRAVEL;
  const veilStart = travelEnd + HOLD_END;
  if (u < HOLD_START) return { progress: 0, veil: n > 0 ? 1 - smooth(u / VEIL_OUT) : 0, cut: false };
  if (u < travelEnd) return { progress: (u - HOLD_START) / TRAVEL, veil: 0, cut: false };
  if (u < veilStart) return { progress: 1, veil: 0, cut: false };
  if (u < veilStart + VEIL_IN) return { progress: 1, veil: smooth((u - veilStart) / VEIL_IN), cut: false };
  return { progress: 1, veil: 1, cut: true };
}

function PlayIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
      <path d="M1 0h2.5v12H1zM6.5 0H9v12H6.5z" fill="currentColor" />
    </svg>
  ) : (
    <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
      <path d="M0 0l10 6-10 6z" fill="currentColor" />
    </svg>
  );
}

/**
 * AUREX Green page opener: an inset cinematic frame on the real-time maquette
 * of the sustainable-commerce ecosystem, touring solar → global distribution.
 * Reduced motion shows the first stage as a still, with no tour.
 */
export function GreenHero({ locale, content }: { locale: Locale; content: SiteContent }) {
  const { sustainability, common, nav } = content;
  const hero = sustainability.hero;
  const green = content.home.green;
  const stages = green.stages.slice(0, STAGE_COUNT);

  const reduced = !!useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const { mounted, visible } = useViewportPresence(section, "20% 0px");

  // ── Scroll-away choreography (as on the other inner-page heroes) ──
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const frameScale = useRange(scrollYProgress, [0, 1], [1, 0.92]);
  const frameRadius = useRange(scrollYProgress, [0, 1], [28, 44]);
  const frameTilt = useRange(scrollYProgress, [0, 1], [0, 6]);
  const darken = useRange(scrollYProgress, [0, 0.9], [0, 0.65]);
  const contentY = useRange(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useRange(scrollYProgress, [0, 0.7], [1, 0]);

  // ── Self-running tour ──
  const progress = useMotionValue(0);
  const veil = useMotionValue(0);
  const clock = useRef(0);
  const last = useRef({ stage: 0, cut: false });
  const [stage, setStage] = useState(0);
  const [cut, setCut] = useState(false);
  const [playing, setPlaying] = useState(true);

  const apply = (t: number) => {
    const s = sample(t);
    progress.set(s.progress);
    veil.set(s.veil);
    const next = stageAt(s.progress);
    if (next !== last.current.stage) {
      last.current.stage = next;
      setStage(next);
    }
    if (s.cut !== last.current.cut) {
      last.current.cut = s.cut;
      setCut(s.cut);
    }
  };

  // Wall-clock based (motion caps its own frame delta), so slow devices keep the same pace.
  const lastTime = useRef<number | null>(null);
  useAnimationFrame((time) => {
    if (reduced || !playing || !visible || !mounted) {
      lastTime.current = null;
      return;
    }
    const delta = lastTime.current === null ? 0 : Math.min(Math.max(time - lastTime.current, 0), 250);
    lastTime.current = time;
    clock.current += delta / 1000;
    apply(clock.current);
  });

  const seek = (i: number) => {
    const cycle = Math.floor(clock.current / CYCLE) * CYCLE;
    clock.current = cycle + HOLD_START + progressForStage(i) * TRAVEL;
    apply(clock.current);
    setPlaying(true);
  };

  // "Explore AUREX Green" moves to the pillars on this page.
  const lenis = useLenis();
  const toPillars = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("pillars");
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -80, duration: reduced ? 0 : 1.6 });
    else target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    target.focus({ preventScroll: true });
    window.history.replaceState(null, "", "#pillars");
  };

  const showTour = !reduced;

  return (
    <section ref={section} className="relative overflow-hidden bg-forest-950 text-cream [perspective:1400px]">
      {/* Inset cinematic frame */}
      <motion.div
        style={{ scale: frameScale, borderRadius: frameRadius, rotateX: frameTilt }}
        className="elevate absolute inset-2 origin-top overflow-hidden bg-forest-900 will-change-transform motion-reduce:!transform-none md:inset-3"
      >
        <Image
          src={stageStill(0)}
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[58%_50%]"
        />
        {mounted && showTour && (
          <GreenScene
            progress={progress}
            stage={cut ? 0 : undefined}
            active={visible && playing}
            className="pointer-events-none absolute inset-0"
          />
        )}
        <motion.div aria-hidden style={{ opacity: veil }} className="absolute inset-0 bg-forest-950" />

        {/* Legibility scrims */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-forest-950/75 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-forest-950 via-forest-950/70 to-transparent" />
        <div aria-hidden className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-forest-950/55 via-forest-950/20 to-transparent md:from-forest-950/80 lg:w-[70%]" />
        <motion.div aria-hidden style={{ opacity: darken }} className="absolute inset-0 bg-forest-950" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x relative flex min-h-[92svh] flex-col pb-12 pt-[calc(var(--header-h)+2rem)] motion-reduce:!transform-none md:pb-16 lg:min-h-[max(92svh,44rem)]"
      >
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        >
          <ol className="t-eyebrow flex flex-wrap items-center gap-x-3 text-cream/70">
            <li>
              <Link href={href(locale, "home")} className="inline-flex min-h-11 items-center hover:text-cream">
                {common.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden className="h-px w-6 bg-brass/70" />
            <li aria-current="page" className="text-brass-soft">
              {nav.labels.sustainability}
            </li>
          </ol>
        </motion.nav>

        <div className="mt-auto grid gap-12 pt-16 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8 xl:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            >
              <GreenEyebrow>{hero.eyebrow}</GreenEyebrow>
            </motion.div>
            <MaskText as="h1" text={hero.title} delay={0.15} className="t-display-xl mt-6 max-w-[11ch] text-cream" />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              className="t-lead mt-8 max-w-[34rem] text-cream/85"
            >
              {hero.intro}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.7 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <ButtonLink href="#pillars" onClick={toPillars} size="lg">
                {green.primaryCta}
              </ButtonLink>
              <ButtonLink href={contactHref(locale, "partnership")} size="lg" variant="outline-light">
                {green.secondaryCta}
              </ButtonLink>
            </motion.div>
          </div>

          {/* Tour panel: current stage, progress through the seven stages, pause. */}
          {/* Hidden with CSS under reduced motion (no tour), so server and client markup match. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.9 }}
            className="motion-reduce:hidden md:max-w-[26rem] lg:col-span-4 lg:col-start-9 lg:max-w-none"
          >
            <div className="rounded-lg border border-cream/12 bg-forest-950/50 p-4 backdrop-blur-md md:p-5">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? green.tourPause : green.tourPlay}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/20 text-cream/85 transition-colors duration-300 hover:border-brass/70 hover:text-cream"
                >
                  <PlayIcon playing={playing} />
                </button>
                <div aria-hidden className="relative h-11 min-w-0 flex-1">
                  {stages.map((name, i) => (
                    <div
                      key={name}
                      className={cn(
                        "absolute inset-0 flex flex-col justify-center transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]",
                        i === stage ? "translate-y-0 opacity-100" : i < stage ? "-translate-y-2 opacity-0" : "translate-y-2 opacity-0",
                      )}
                    >
                      <span className="t-eyebrow tabular-nums text-brass-soft">
                        {pad(i + 1)} / {pad(STAGE_COUNT)}
                      </span>
                      <span className="mt-1.5 truncate text-[1.0625rem] leading-tight tracking-[-0.01em] text-cream">{name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress rail with a stop per stage; the stops seek the tour on wider screens. */}
              <div className="relative mt-3">
                <div aria-hidden className="absolute inset-x-[1.375rem] top-1/2 h-px -translate-y-1/2 bg-cream/15">
                  <motion.div
                    style={{ scaleX: progress }}
                    className="h-px origin-left bg-gradient-to-r from-brass via-gold to-teal"
                  />
                </div>
                <ol aria-label={green.stagesLabel} className="relative hidden justify-between md:flex">
                  {stages.map((name, i) => (
                    <li key={name} className="flex">
                      <button
                        type="button"
                        onClick={() => seek(i)}
                        aria-label={name}
                        aria-current={i === stage ? "step" : undefined}
                        className="group/stop inline-flex h-11 w-11 items-center justify-center rounded-full"
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full transition-all duration-500",
                            i === stage
                              ? "scale-150 bg-gold shadow-[0_0_10px_rgb(141_198_63/0.8)]"
                              : i < stage
                                ? "bg-brass group-hover/stop:bg-brass-soft"
                                : "bg-cream/35 group-hover/stop:bg-cream",
                          )}
                        />
                      </button>
                    </li>
                  ))}
                </ol>
                <div aria-hidden className="relative flex justify-between md:hidden">
                  {stages.map((name, i) => (
                    <span key={name} className="flex h-8 w-11 items-center justify-center">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-colors duration-500",
                          i === stage ? "bg-gold" : i < stage ? "bg-brass" : "bg-cream/35",
                        )}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
