"use client";

import { useScroll } from "motion/react";
import { useRef } from "react";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/reveal";
import { LogoMark } from "@/components/brand/logo";
import { EmblemScene, useViewportPresence, useWebGL } from "@/components/three/lazy";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { contactHref } from "@/lib/routes";

/** Investments & holdings: principles beside the 3D emblem. */
export function Capital({ locale, content }: { locale: Locale; content: SiteContent }) {
  const copy = content.home.capital;
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const { mounted, visible } = useViewportPresence(stage);
  const webgl = useWebGL();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });

  return (
    <section ref={section} className="surface-ink-deep section-y relative overflow-hidden">
      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-14">
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:self-end xl:col-span-5 xl:col-start-8">
          <SectionHeading
            title={copy.title}
            intro={copy.intro}
            size="md"
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div ref={stage} aria-hidden className="relative mx-auto aspect-square w-[80%] max-w-[34rem] sm:w-full lg:w-[84%] xl:w-full">
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
          <RevealGroup as="ul" className="grid gap-8">
            {copy.principles.map((p) => (
              <RevealItem as="li" key={p.title}>
                <h3 className="t-title text-ivory">{p.title}</h3>
                <p className="t-body mt-2 max-w-md text-ivory/85">{p.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-12">
            <ButtonLink href={contactHref(locale, "investment")}>{copy.cta}</ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
