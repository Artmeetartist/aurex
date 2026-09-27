"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { TextLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { accentMatcher } from "@/lib/text";
import { href } from "@/lib/routes";

const SEQUENCES = {
  desktop: { path: "/media/sequence/d/", count: 120 },
  mobile: { path: "/media/sequence/m/", count: 80 },
};

/** Where each chapter begins on the 0–1 scroll track (matches the footage). */
const CHAPTER_STARTS = [0, 0.26, 0.64, 0.82];

function frameUrl(path: string, i: number) {
  return `${path}${String(i + 1).padStart(3, "0")}.webp`;
}

/** Loads frames coarse-to-fine so scrubbing works before the full set arrives. */
function useFrameSequence(
  active: boolean,
  frames: React.RefObject<(HTMLImageElement | null)[]>,
  onFrameLoaded: () => void,
) {
  const [seq, setSeq] = useState<(typeof SEQUENCES)["desktop"] | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setSeq(mq.matches ? SEQUENCES.mobile : SEQUENCES.desktop);
  }, []);

  useEffect(() => {
    if (!active || !seq) return;
    let cancelled = false;
    frames.current = new Array(seq.count).fill(null);
    const order: number[] = [];
    const seen = new Set<number>();
    for (const stride of [16, 8, 4, 2, 1]) {
      for (let i = 0; i < seq.count; i += stride) {
        if (!seen.has(i)) {
          seen.add(i);
          order.push(i);
        }
      }
    }
    if (!seen.has(seq.count - 1)) order.push(seq.count - 1);

    let cursor = 0;
    const CONCURRENCY = 6;
    const next = () => {
      if (cancelled || cursor >= order.length) return;
      const index = order[cursor++];
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(seq.path, index);
      img
        .decode()
        .then(() => {
          if (cancelled) return;
          frames.current[index] = img;
          onFrameLoaded();
        })
        .catch(() => {})
        .finally(next);
    };
    for (let i = 0; i < CONCURRENCY; i++) next();
    return () => {
      cancelled = true;
    };
  }, [active, seq, frames, onFrameLoaded]);
}

function Chapter({ index, current, children }: { index: number; current: number; children: React.ReactNode }) {
  const state = index === current ? "active" : index < current ? "past" : "future";
  return (
    <div
      aria-hidden={state !== "active"}
      className={cn(
        "absolute inset-x-0 bottom-0 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]",
        state === "active" && "translate-y-0 opacity-100",
        state === "past" && "-translate-y-8 opacity-0",
        state === "future" && "translate-y-8 opacity-0",
      )}
    >
      {children}
    </div>
  );
}

export function ValueInMotion({ locale, content }: { locale: Locale; content: SiteContent }) {
  const { motion: copy } = content.home;
  const isAccent = accentMatcher(copy.accent);
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [near, setNear] = useState(false);
  const [chapter, setChapter] = useState(0);
  const drawn = useRef(-1);
  const frames = useRef<(HTMLImageElement | null)[]>([]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "150% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const draw = useCallback((force = false) => {
    const c = canvas.current;
    const list = frames.current;
    if (!c || !list.length) return;
    const target = Math.round(scrollYProgress.get() * (list.length - 1));
    // Nearest loaded frame to the requested one.
    let idx = -1;
    for (let d = 0; d < list.length; d++) {
      if (list[target - d]) {
        idx = target - d;
        break;
      }
      if (list[target + d]) {
        idx = target + d;
        break;
      }
    }
    if (idx < 0 || (idx === drawn.current && !force)) return;
    const img = list[idx]!;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const { width: cw, height: ch } = c;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    drawn.current = idx;
  }, [scrollYProgress]);

  const onFrameLoaded = useCallback(() => draw(), [draw]);
  useFrameSequence(near, frames, onFrameLoaded);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(c.clientWidth * dpr);
      c.height = Math.round(c.clientHeight * dpr);
      draw(true);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    return () => ro.disconnect();
  }, [draw]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    draw();
    let c = 0;
    for (let i = 0; i < CHAPTER_STARTS.length; i++) if (p >= CHAPTER_STARTS[i] - 0.01) c = i;
    setChapter(c);
  });

  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section ref={section} aria-labelledby="motion-title" className="surface-ink relative h-[380vh] md:h-[440vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.canvas
          ref={canvas}
          style={{ scale: imageScale }}
          className="absolute inset-0 h-full w-full bg-ink-850"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/35 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/70" />

        <div className="container-x relative flex h-full flex-col pb-14 pt-[calc(var(--header-h)+2.5rem)] md:pb-20">
          <div className="max-w-3xl">
            <Eyebrow index="02">{copy.eyebrow}</Eyebrow>
            <h2 id="motion-title" className="t-display-md mt-6 max-w-[18ch] text-ivory">
              {copy.title.split(" ").map((w, i) => (
                <span key={i} className={cn(isAccent(w) && "t-accent text-gold")}>
                  {w}{" "}
                </span>
              ))}
            </h2>
          </div>

          <div className="relative mt-auto grid gap-10 md:grid-cols-12">
            <div className="relative min-h-[15rem] md:col-span-7 lg:col-span-6">
              {copy.chapters.map((c, i) => (
                <Chapter key={c.division} index={i} current={chapter}>
                  <div className="flex items-baseline gap-4">
                    <span className="t-eyebrow text-gold">
                      {String(i + 1).padStart(2, "0")} / {String(copy.chapters.length).padStart(2, "0")}
                    </span>
                    <span className="t-eyebrow text-ivory/60">{c.mode}</span>
                  </div>
                  <h3 className="t-display-sm mt-5 text-ivory">{c.title}</h3>
                  <p className="t-lead mt-4 max-w-xl text-ivory/75">{c.text}</p>
                </Chapter>
              ))}
            </div>

            <div className="flex items-end justify-between md:col-span-5 md:flex-col md:items-end lg:col-span-6">
              <ol className="hidden gap-3 md:flex md:flex-col md:items-end" aria-hidden>
                {copy.chapters.map((c, i) => (
                  <li
                    key={c.division}
                    className={cn(
                      "flex items-center gap-3 text-[0.8125rem] transition-colors duration-500",
                      chapter === i ? "text-ivory" : "text-ivory/35",
                    )}
                  >
                    {c.mode}
                    <span
                      className={cn(
                        "h-px transition-all duration-700 ease-[var(--ease-out-expo)]",
                        chapter === i ? "w-10 bg-gold" : "w-4 bg-white/30",
                      )}
                    />
                  </li>
                ))}
              </ol>
              <TextLink href={href(locale, "businesses")} className="md:mt-10">
                {copy.link}
              </TextLink>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-px bg-white/10">
            <motion.div style={{ scaleX: railScale }} className="h-px origin-left bg-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
