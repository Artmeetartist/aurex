"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";
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

  const titleWords = hero.signature.split(" ");

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

        {/* Legibility only: neutral scrims, then a scroll-linked dim */}
        <div className="scrim-up absolute inset-0" />
        <div className="scrim-right absolute inset-0 opacity-80" />
        <motion.div style={{ opacity: darken }} className="absolute inset-0 bg-ink-950" />
      </motion.div>

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-x relative z-10 flex h-full flex-col justify-end pb-32 md:pb-36"
      >
        {/* The master line is the headline; the sentence under it says plainly what AUREX is. */}
        <h1
          id="hero-title"
          className="font-serif text-[clamp(3.5rem,8.4vw,8.5rem)] font-normal leading-[0.96] tracking-[-0.03em] text-ivory [font-variation-settings:'opsz'_60]"
        >
          {titleWords.map((word, i) => (
            <Fragment key={i}>
              <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                <motion.span
                  data-reveal
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.2 + i * 0.08 }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
              {i < titleWords.length - 1 && " "}
            </Fragment>
          ))}
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
          <p className="t-display-sm max-w-[30ch] text-ivory/90 md:col-span-7">{hero.title}</p>
          <div className="flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end">
            <ButtonLink href={href(locale, "about")} size="lg">
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink href={contactHref(locale, "partnership")} size="lg" variant="outline-light">
              {hero.secondaryCta}
            </ButtonLink>
          </div>
        </div>
      </motion.div>

      {/* Footage chapters: sea → air → land → connected */}
      <motion.div
        style={reduce ? undefined : { opacity: contentOpacity }}
        className="container-x absolute inset-x-0 bottom-6 z-10 md:bottom-8"
      >
        <div className="flex items-center gap-4">
          <ol className="flex flex-1 items-center gap-2 sm:gap-8" aria-label={hero.scroll}>
            {MODES.map((m, i) => {
              const active = m === mode;
              return (
                <li key={m} className="min-w-0 flex-1 sm:max-w-44">
                  <button
                    type="button"
                    onClick={() => seek(m)}
                    aria-current={active ? "step" : undefined}
                    className="group/mode block min-h-11 w-full py-2 text-left"
                  >
                    <span
                      className={cn(
                        "block truncate text-[0.875rem] font-medium transition-colors duration-500",
                        active ? "text-ivory" : "text-ivory/55 group-hover/mode:text-ivory",
                      )}
                    >
                      {hero.modes[m]}
                    </span>
                    <span className="mt-2 block h-0.5 w-full rounded-full bg-white/20">
                      <span
                        ref={(el) => {
                          bars.current[i] = el;
                        }}
                        className="block h-0.5 origin-left scale-x-0 rounded-full bg-gold"
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
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] bg-ink-700 text-ivory transition-colors hover:bg-ink-600"
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
