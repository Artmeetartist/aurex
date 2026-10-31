"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { GlobeScene, useViewportPresence, useWebGL } from "@/components/three/lazy";
import { TextLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { corridors, markets } from "@/content/facts";
import type { MarketId, SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { href } from "@/lib/routes";

type Props = {
  locale: Locale;
  content: SiteContent;
  /** `eyebrow` and `accent` are accepted for older callers and not shown. */
  heading: { eyebrow?: string; title: string; accent?: string[]; intro?: string };
  footnote: string;
  /** @deprecated Section numbers are no longer shown; ignored. */
  index?: string;
  link?: { label: string; route: "presence" };
  as?: "h1" | "h2";
};

/** Globe with the interactive list of markets of focus. Reused on Home and Global Presence. */
export function GlobalReach({ locale, content, heading, footnote, link, as = "h2" }: Props) {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState<MarketId | null>(null);
  const { mounted, visible } = useViewportPresence(stage);
  const webgl = useWebGL();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });

  const globeMarkets = markets.map((m) => ({ ...m, label: content.markets[m.id].name }));
  const legend = content.home.reach.legend;

  return (
    <section ref={section} className="surface-ink-deep section-y relative overflow-hidden">
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading as={as} size="md" title={heading.title} intro={heading.intro} />

          <ul className="mt-10 rounded-xl bg-ink-850 p-2" onMouseLeave={() => setFocus(null)}>
            {markets.map((m) => {
              const market = content.markets[m.id];
              const active = focus === m.id;
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setFocus(m.id)}
                    onFocus={() => setFocus(m.id)}
                    onBlur={() => setFocus(null)}
                    onClick={() => setFocus(active ? null : m.id)}
                    aria-expanded={active}
                    className={cn(
                      "block w-full rounded-lg px-4 py-4 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold",
                      active ? "bg-ink-700" : "hover:bg-ink-800",
                    )}
                  >
                    <span className="flex items-baseline justify-between gap-4">
                      <span className={cn("t-lead transition-colors duration-300", active ? "text-ivory" : "text-ivory/85")}>
                        {market.name}
                      </span>
                      <span className={cn("t-small shrink-0 transition-colors", active ? "text-gold" : "text-mist")}>
                        {market.role}
                      </span>
                    </span>
                    <AnimatePresence initial={false}>
                      {active && (
                        <motion.span
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="block overflow-hidden"
                        >
                          <span className="t-body block max-w-md pt-2 text-ivory/85">{market.detail}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="t-small mt-6 max-w-md text-mist">{footnote}</p>
          {link && (
            <TextLink href={href(locale, link.route)} className="mt-6">
              {link.label}
            </TextLink>
          )}
        </div>

        <div className="lg:col-span-7">
          <div ref={stage} className="relative mx-auto aspect-square w-full max-w-[46rem]">
            {!webgl && (
              <Image src="/media/globe/poster.webp" alt="" fill sizes="(min-width: 1024px) 46rem, 100vw" className="object-contain" />
            )}
            {mounted && (
              <GlobeScene
                markets={globeMarkets}
                corridors={corridors}
                focus={focus}
                scroll={scrollYProgress}
                active={visible}
                className="absolute inset-0"
              />
            )}
          </div>
          <div className="t-small mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-mist">
            <span className="inline-flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-gold" aria-hidden />
              {legend.focus}
            </span>
            <span className="inline-flex items-center gap-2.5">
              <span className="h-0.5 w-6 bg-gold/70" aria-hidden />
              {legend.corridor}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
