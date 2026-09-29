"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { contactHref, href } from "@/lib/routes";

const EASE = [0.16, 1, 0.3, 1] as const;

type Mode = "sea" | "air" | "land" | "connected";
const MODES: Mode[] = ["sea", "air", "land", "connected"];

/** Chapter windows on the 9s seamless loop (seconds). */
const WINDOWS: { mode: Mode; from: number; to: number }[] = [
  { mode: "sea", from: 0, to: 1.7 },
  { mode: "air", from: 1.7, to: 5.5 },
  { mode: "land", from: 5.5, to: 7.3 },
  { mode: "connected", from: 7.3, to: 8.5 },
  { mode: "sea", from: 8.5, to: 9 },
];

function modeAt(t: number) {
  return WINDOWS.find((w) => t >= w.from && t < w.to) ?? WINDOWS[0];
}

/** Tracks the footage chapter; progress bars are written straight to the DOM to avoid re-renders. */
function useVideoMode(video: React.RefObject<HTMLVideoElement | null>, bars: React.RefObject<(HTMLSpanElement | null)[]>) {
  const [mode, setMode] = useState<Mode>("sea");
  useEffect(() => {
    let raf = 0;
    let current: Mode = "sea";
    const tick = () => {
      const v = video.current;
      if (v && v.duration) {
        const t = v.currentTime;
        const w = modeAt(t);
        // "sea" wraps the loop point: 8.5s → 9s → 0s → 1.7s
        const progress =
          w.mode === "sea" ? (t >= 8.5 ? t - 8.5 : t + 0.5) / 2.2 : (t - w.from) / (w.to - w.from);
        MODES.forEach((m, i) => {
          const el = bars.current?.[i];
          if (el) el.style.transform = `scaleX(${m === w.mode ? Math.min(1, Math.max(0, progress)) : 0})`;
        });
        if (w.mode !== current) {
          current = w.mode;
          setMode(w.mode);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [video, bars]);
  return mode;
}

export function Hero({ locale, content }: { locale: Locale; content: SiteContent }) {
  const { hero } = content.home;
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const mode = useVideoMode(video, bars);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const frameY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const frameRotate = useTransform(scrollYProgress, [0, 1], [0, 7]);
  const radius = useTransform(scrollYProgress, [0, 1], [12, 28]);
  const darken = useTransform(scrollYProgress, [0, 0.9], [0, 0.65]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (reduce) v.pause();
    else v.play().catch(() => {});
  }, [reduce]);

  const seek = (m: Mode) => {
    const v = video.current;
    const w = WINDOWS.find((win) => win.mode === m);
    if (!v || !w) return;
    v.currentTime = w.from + 0.05;
    if (v.paused) v.play().catch(() => {});
  };

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const titleWords = hero.title.split(" ");

  return (
    <section
      ref={section}
      aria-labelledby="hero-title"
      className="surface-ink relative h-[100svh] min-h-[640px] [perspective:1400px]"
    >
      <motion.div
        style={reduce ? undefined : { scale: frameScale, y: frameY, rotateX: frameRotate, borderRadius: radius }}
        className="absolute inset-2 origin-top overflow-hidden rounded-xl bg-ink-850 will-change-transform md:inset-3"
      >
        <video
          ref={video}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/hero/poster.webp"
          aria-hidden
          tabIndex={-1}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src="/media/hero/hero-854.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/media/hero/hero-1280.webm" type="video/webm" />
          <source src="/media/hero/hero-1280.mp4" type="video/mp4" />
        </video>

        {/* Legibility: a low horizon of shadow, nothing decorative */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/35 to-ink-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 via-ink-950/15 to-transparent" />
        <motion.div style={{ opacity: darken }} className="absolute inset-0 bg-ink-950" />
      </motion.div>

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-x relative z-10 flex h-full flex-col justify-end pb-32 md:pb-36"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="flex items-center gap-4 text-ivory/80"
        >
          <span aria-hidden className="h-px w-10 bg-ivory/50" />
          <span className="t-eyebrow">{hero.eyebrow}</span>
        </motion.p>

        <h1
          id="hero-title"
          className="mt-7 max-w-[17ch] font-serif text-[clamp(2.75rem,6.2vw,6.25rem)] font-normal leading-[1] tracking-[-0.026em] text-ivory [font-variation-settings:'opsz'_60] [text-wrap:balance]"
        >
          <span className="sr-only">{hero.title}</span>
          <span aria-hidden>
            {titleWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                <motion.span
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.3 + i * 0.06 }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
                {i < titleWords.length - 1 && "\u00a0"}
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.75 }}
            className="t-lead max-w-[34rem] text-ivory/85 md:col-span-6"
          >
            {hero.intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.9 }}
            className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end"
          >
            <ButtonLink href={href(locale, "about")} size="lg">
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink href={contactHref(locale, "partnership")} size="lg" variant="glass">
              {hero.secondaryCta}
            </ButtonLink>
          </motion.div>
        </div>
      </motion.div>

      {/* Footage chapters: sea → air → land → connected */}
      <motion.div
        style={reduce ? undefined : { opacity: contentOpacity }}
        className="container-x absolute inset-x-0 bottom-6 z-10 md:bottom-8"
      >
        <div className="flex items-center gap-4 border-t border-white/20 pt-3">
          <ol className="flex flex-1 items-center gap-3 sm:gap-8" aria-label={hero.scroll}>
            {MODES.map((m, i) => {
              const active = m === mode;
              return (
                <li key={m} className={cn("min-w-0 sm:max-w-44", active ? "flex-[2.2] sm:flex-1" : "flex-1")}>
                  <button
                    type="button"
                    onClick={() => seek(m)}
                    aria-current={active ? "step" : undefined}
                    className="group/mode block min-h-11 w-full py-2 text-left"
                  >
                    <span className="flex items-baseline gap-2">
                      <span className={cn("t-meta transition-colors", active ? "text-ivory" : "text-ivory/45")}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "truncate text-[0.8125rem] transition-colors duration-500",
                          active ? "text-ivory" : "hidden text-ivory/50 group-hover/mode:text-ivory sm:inline",
                        )}
                      >
                        {hero.modes[m]}
                      </span>
                    </span>
                    <span className="mt-2 block h-px w-full bg-white/15">
                      <span
                        ref={(el) => {
                          bars.current[i] = el;
                        }}
                        className="block h-px origin-left scale-x-0 bg-ivory"
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? hero.pause : hero.play}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] border border-white/20 text-ivory/80 transition-colors hover:border-white/50 hover:text-ivory"
          >
            {playing ? (
              <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
                <path d="M1 0h2.5v12H1zM6.5 0H9v12H6.5z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
                <path d="M0 0l10 6-10 6z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
