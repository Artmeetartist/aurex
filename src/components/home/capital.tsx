"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/reveal";
import { EmblemScene, useViewportPresence } from "@/components/three/lazy";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { contactHref } from "@/lib/routes";

/** 05 — Investments & holdings: principles beside the 3D emblem. */
export function Capital({ locale, content }: { locale: Locale; content: SiteContent }) {
  const copy = content.home.capital;
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const { mounted, visible } = useViewportPresence(stage);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });

  // Glow breathes in as the emblem reaches the centre of the viewport.
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0.35, 1, 0.35]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.86, 1, 0.94]);

  return (
    <section ref={section} className="surface-ink-deep section-y relative overflow-hidden">
      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-14">
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:self-end xl:col-span-5 xl:col-start-8">
          <SectionHeading
            index="05"
            eyebrow={copy.eyebrow}
            title={copy.title}
            accent={copy.accent}
            intro={copy.intro}
            size="md"
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div ref={stage} aria-hidden className="relative mx-auto aspect-square w-[80%] max-w-[34rem] sm:w-full lg:w-[84%] xl:w-full">
            <motion.div
              style={{ opacity: glowOpacity, scale: glowScale }}
              className="pointer-events-none absolute inset-[-10%] rounded-full [background:radial-gradient(closest-side,rgb(200_162_74/0.26),rgb(200_162_74/0.08)_50%,transparent_78%)]"
            />
            <div className="pointer-events-none absolute inset-[6%] rounded-full border border-white/[0.07]" />
            {/* The emblem's orbits are wider than they are tall, so the canvas is a wide band centred on the stage. */}
            {mounted && (
              <EmblemScene
                scroll={scrollYProgress}
                active={visible}
                className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[140%] -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:self-start xl:col-span-5 xl:col-start-8">
          <RevealGroup as="ol" className="border-t border-white/10">
            {copy.principles.map((p, i) => (
              <RevealItem as="li" key={p.title} className="grid grid-cols-[2.75rem_1fr] gap-4 border-b border-white/10 py-7">
                <span className="t-eyebrow pt-2 text-gold">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="t-title font-normal text-ivory">{p.title}</h3>
                  <p className="mt-2.5 max-w-md text-[0.9375rem] leading-relaxed text-mist">{p.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <ButtonLink href={contactHref(locale, "investment")}>{copy.cta}</ButtonLink>
            <p className="max-w-[16rem] text-[0.8125rem] leading-relaxed text-mist sm:text-right">{copy.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
