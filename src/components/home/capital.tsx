"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/reveal";
import { LogoMark } from "@/components/brand/logo";
import { EmblemScene, useViewportPresence, useWebGL } from "@/components/three/lazy";
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
  const webgl = useWebGL();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });

  // Glow breathes in as the emblem reaches the centre of the viewport.
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0.35, 1, 0.35]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.86, 1, 0.94]);

  return (
    <section ref={section} className="surface-ink-deep section-y relative overflow-hidden">
      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-14">
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:self-end xl:col-span-5 xl:col-start-8">
          <SectionHeading
            index="06"
            eyebrow={copy.eyebrow}
            title={copy.title}
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
            {!webgl && (
              <LogoMark className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 text-ivory/85" />
            )}
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
              <RevealItem
                as="li"
                key={p.title}
                className="group relative grid grid-cols-[2.75rem_1fr] gap-4 border-b border-white/10 py-7"
              >
                <span className="t-eyebrow pt-2 text-gold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 motion-reduce:transform-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="t-title font-normal text-ivory transition-colors duration-500 group-hover:text-gold-soft">{p.title}</h3>
                  <p className="mt-2.5 max-w-md text-[0.9375rem] leading-relaxed text-mist">{p.text}</p>
                </div>
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-gold/70 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <ButtonLink href={contactHref(locale, "investment")}>{copy.cta}</ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
