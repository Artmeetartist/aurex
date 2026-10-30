"use client";

import { useLenis } from "lenis/react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { TextLink } from "@/components/ui/button";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
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

/** Coarse-to-fine load order so scrubbing works before the full set arrives. */
function loadOrder(count: number) {
  const order: number[] = [];
  const seen = new Set<number>();
  for (const stride of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < count; i += stride) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  if (!seen.has(count - 1)) order.push(count - 1);
  return order;
}

function Chapter({ index, current, children }: { index: number; current: number; children: React.ReactNode }) {
  const state = index === current ? "active" : index < current ? "past" : "future";
  return (
    <div
      aria-hidden={state !== "active"}
      className={cn(
        "col-start-1 row-start-1 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]",
        state === "active" && "translate-y-0 opacity-100",
        state === "past" && "-translate-y-6 opacity-0",
        state === "future" && "translate-y-6 opacity-0",
      )}
    >
      {children}
    </div>
  );
}

export function ValueInMotion({ locale, content }: { locale: Locale; content: SiteContent }) {
  const { motion: copy } = content.home;
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

  useEffect(() => {
    if (!near) return;
    const seq = window.matchMedia("(max-width: 767px)").matches ? SEQUENCES.mobile : SEQUENCES.desktop;
    let cancelled = false;
    const list: (HTMLImageElement | null)[] = new Array(seq.count).fill(null);
    frames.current = list;
    const order = loadOrder(seq.count);
    let cursor = 0;
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
          list[index] = img;
          draw();
        })
        .catch(() => {})
        .finally(next);
    };
    for (let i = 0; i < 6; i++) next();
    return () => {
      cancelled = true;
    };
  }, [near, draw]);

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

  const lenis = useLenis();
  const goTo = (i: number) => {
    const el = section.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const target = top + (CHAPTER_STARTS[i] + 0.03) * travel;
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section ref={section} aria-labelledby="motion-title" className="surface-ink relative h-[200vh]">
      {/* One screen of travel: the footage scrubs from sea to the connected port beside the chapter text. */}
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="container-x grid h-full grid-rows-[auto_minmax(0,1fr)_auto] gap-6 pb-6 pt-[calc(var(--header-h)+1.5rem)] md:gap-8 md:pb-10 lg:grid-cols-12 lg:grid-rows-[auto_minmax(0,1fr)] lg:gap-x-10 lg:gap-y-0 lg:pb-14 lg:pt-[calc(var(--header-h)+3rem)]">
          <h2 id="motion-title" className="t-display-md max-w-[20ch] text-ivory lg:col-span-5 lg:row-start-1 lg:max-w-none">
            {copy.title}
          </h2>

          <div className="relative overflow-hidden rounded-xl bg-ink-850 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden />
            <motion.div
              aria-hidden
              style={{ scaleX: scrollYProgress }}
              className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gold"
            />
          </div>

          <div className="lg:col-span-5 lg:row-start-2 lg:self-end">
            <div className="grid">
              {copy.chapters.map((c, i) => (
                <Chapter key={c.division} index={i} current={chapter}>
                  <h3 className="t-display-sm text-ivory">{c.title}</h3>
                  <p className="t-body mt-3 max-w-xl text-ivory/85 md:t-lead md:mt-4">{c.text}</p>
                </Chapter>
              ))}
            </div>

            <ol className="mt-8 hidden flex-wrap gap-2 md:flex">
              {copy.chapters.map((c, i) => (
                <li key={c.division}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={chapter === i ? "step" : undefined}
                    className={cn(
                      "min-h-11 rounded-[4px] px-4 text-[0.875rem] font-medium transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                      chapter === i ? "bg-ink-700 text-ivory" : "text-ivory/70 hover:bg-ink-800 hover:text-ivory",
                    )}
                  >
                    {c.mode}
                  </button>
                </li>
              ))}
            </ol>

            <TextLink href={href(locale, "trade")} className="mt-4 md:mt-6">
              {copy.link}
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
