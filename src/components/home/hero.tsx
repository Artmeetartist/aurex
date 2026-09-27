"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { ArrowUpRight } from "@/components/ui/icons";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { accentMatcher } from "@/lib/text";
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
function useVideoMode(video: React.RefObject<HTMLVideoElement | null>, bars: React.RefObject<(HTMLDivElement | null)[]>) {
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
  const bars = useRef<(HTMLDivElement | null)[]>([]);
  const mode = useVideoMode(video, bars);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const frameY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const frameRotate = useTransform(scrollYProgress, [0, 1], [0, 7]);
  const radius = useTransform(scrollYProgress, [0, 1], [28, 44]);
  const darken = useTransform(scrollYProgress, [0, 0.9], [0, 0.65]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (reduce) {
      v.pause();
      setPlaying(false);
    } else {
      v.play().catch(() => setPlaying(false));
    }
  }, [reduce]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const titleWords = hero.title.split(" ");
  const isAccentWord = accentMatcher(hero.accent);

  return (
    <section
      ref={section}
      aria-labelledby="hero-title"
      className="surface-ink relative h-[100svh] min-h-[640px] [perspective:1400px]"
    >
      <motion.div
        style={{ scale: frameScale, y: frameY, rotateX: frameRotate, borderRadius: radius }}
        className="absolute inset-2 origin-top overflow-hidden bg-ink-850 will-change-transform md:inset-3"
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
        >
          <source src="/media/hero/hero-854.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/media/hero/hero-1280.webm" type="video/webm" />
          <source src="/media/hero/hero-1280.mp4" type="video/mp4" />
        </video>

        {/* Legibility layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/60 to-transparent" />
        <motion.div style={{ opacity: darken }} className="absolute inset-0 bg-ink" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-x relative z-10 flex h-full flex-col justify-end pb-28 md:pb-32"
      >
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.2 }}
              className="glass t-eyebrow inline-flex min-h-8 items-center gap-2.5 rounded-2xl px-4 sm:rounded-full py-2 !leading-[1.5] !tracking-[0.12em] text-ivory/85 sm:!tracking-[0.18em]"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
              {hero.eyebrow}
            </motion.p>

            <h1 id="hero-title" className="t-display-xl mt-7 max-w-[14ch] text-ivory">
              <span className="sr-only">{hero.title}</span>
              <span aria-hidden>
                {titleWords.map((word, i) => {
                  const isAccent = isAccentWord(word);
                  return (
                    <span key={i} className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
                      <motion.span
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 1.3, ease: EASE, delay: 0.35 + i * 0.08 }}
                        className={cn("inline-block", isAccent && "t-accent text-gold-gradient pr-[0.06em]")}
                      >
                        {word}
                      </motion.span>
                      {i < titleWords.length - 1 && " "}
                    </span>
                  );
                })}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.8 }}
              className="t-lead mt-7 max-w-[34rem] text-ivory/80"
            >
              {hero.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.95 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <ButtonLink href={href(locale, "about")} size="lg">
                {hero.primaryCta}
              </ButtonLink>
              <ButtonLink href={contactHref(locale, "partnership")} size="lg" variant="glass">
                {hero.secondaryCta}
              </ButtonLink>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE, delay: 1.1 }}
            aria-label={hero.panelTitle}
            className="glass hidden rounded-[1.75rem] p-2 lg:col-span-5 lg:block xl:col-span-4"
          >
            <div className="px-5 pb-4 pt-5">
              <p className="t-eyebrow text-gold">{hero.panelTitle}</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ivory/75">{hero.panelIntro}</p>
            </div>
            <ul className="space-y-1">
              {(["partnership", "investment", "corporate"] as const).map((type) => (
                <li key={type}>
                  <Link
                    href={contactHref(locale, type)}
                    className="group flex items-center justify-between gap-4 rounded-[1.25rem] bg-white/[0.04] px-5 py-4 transition-colors duration-300 hover:bg-white/[0.09]"
                  >
                    <span>
                      <span className="block text-[0.9375rem] font-medium text-ivory">{content.inquiry.types[type].label}</span>
                      <span className="mt-0.5 block text-[0.8125rem] text-mist">{content.inquiry.types[type].description}</span>
                    </span>
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-ivory transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                      <ArrowUpRight size={14} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </motion.div>

      {/* Mode rail — synced to the footage: sea → air → land → connected */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="container-x absolute inset-x-0 bottom-6 z-10 md:bottom-8"
      >
        <div className="flex items-center gap-4 border-t border-white/15 pt-4">
          <ol className="flex flex-1 items-center gap-4 sm:gap-8" aria-label={hero.scroll}>
            {MODES.map((m, i) => {
              const active = m === mode;
              return (
                <li key={m} className={cn("min-w-0 sm:max-w-40", active ? "flex-[2.2] sm:flex-1" : "flex-1")}>
                  <div className="flex items-baseline gap-2">
                    <span className={cn("t-eyebrow transition-colors", active ? "text-gold" : "text-ivory/40")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "truncate text-[0.8125rem] transition-colors duration-500",
                        active ? "text-ivory" : "hidden text-ivory/45 sm:inline",
                      )}
                    >
                      {hero.modes[m]}
                    </span>
                  </div>
                  <div className="mt-2.5 h-px w-full bg-white/15">
                    <div
                      ref={(el) => {
                        bars.current[i] = el;
                      }}
                      className="h-px origin-left scale-x-0 bg-gold"
                    />
                  </div>
                </li>
              );
            })}
          </ol>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? hero.pause : hero.play}
            className="glass inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ivory/80 hover:text-ivory"
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
          <div className="hidden items-center gap-3 md:flex">
            <span className="t-eyebrow text-ivory/50">{hero.scroll}</span>
            <span className="relative h-9 w-px overflow-hidden bg-white/15">
              <span className="absolute inset-0 bg-gold [animation:aurex-scroll-cue_2.4s_var(--ease-in-out-quart)_infinite]" />
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
