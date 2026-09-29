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
  heading: { eyebrow: string; title: string; accent?: string[]; intro?: string };
  footnote: string;
  index?: string;
  link?: { label: string; route: "presence" };
  as?: "h1" | "h2";
};

/** Globe with the interactive list of markets of focus. Reused on Home and Global Presence. */
export function GlobalReach({ locale, content, heading, footnote, index, link, as = "h2" }: Props) {
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
      {/* Fades the surface's top glow in from the ink of the section above, so no edge shows. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-ink-950 to-transparent" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading index={index} as={as} size="md" {...heading} />

          <ul className="mt-12 border-t border-white/10" onMouseLeave={() => setFocus(null)}>
            {markets.map((m, i) => {
              const market = content.markets[m.id];
              const active = focus === m.id;
              return (
                <li key={m.id} className="border-b border-white/10">
                  <button
                    type="button"
                    onMouseEnter={() => setFocus(m.id)}
                    onFocus={() => setFocus(m.id)}
                    onBlur={() => setFocus(null)}
                    onClick={() => setFocus(active ? null : m.id)}
                    aria-expanded={active}
                    className="group flex w-full items-start gap-5 py-5 text-left"
                  >
                    <span className={cn("t-eyebrow mt-1.5 w-6 transition-colors", active ? "text-gold" : "text-mist-dim")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="flex items-baseline justify-between gap-4">
                        <span
                          className={cn(
                            "text-[1.375rem] font-light tracking-[-0.02em] transition-colors duration-300",
                            active ? "text-ivory" : "text-ivory/75 group-hover:text-ivory",
                          )}
                        >
                          {market.name}
                        </span>
                        <span className={cn("t-eyebrow shrink-0 transition-colors", active ? "text-gold" : "text-mist-dim")}>
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
                            <span className="block pt-2 text-[0.9375rem] leading-relaxed text-mist">{market.detail}</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 max-w-md text-[0.8125rem] leading-relaxed text-mist-dim">{footnote}</p>
          {link && (
            <TextLink href={href(locale, link.route)} className="mt-8">
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
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.8125rem] text-mist">
            <span className="inline-flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-gold" aria-hidden />
              {legend.focus}
            </span>
            <span className="inline-flex items-center gap-2.5">
              <span className="h-px w-6 bg-gradient-to-r from-gold/20 via-gold to-gold/20" aria-hidden />
              {legend.corridor}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
