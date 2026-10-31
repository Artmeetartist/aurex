"use client";

import Image from "next/image";
import Link from "next/link";
import { MaskText, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PILLAR_STAGE, stageStill } from "@/components/sections/sustainability/shared";
import { ArrowRight } from "@/components/ui/icons";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { href } from "@/lib/routes";
import { PILLAR_ORDER } from "./stages";

/** The four AUREX Green pillars, each with the stage of the maquette that shows it. */
export function GreenPillars({ locale, content }: { locale: Locale; content: SiteContent }) {
  const heading = content.sustainability.pillars;
  const explore = content.home.green.explore;

  return (
    <div className="container-x relative pb-[clamp(4.5rem,8.5vw,7.5rem)] pt-[clamp(4.5rem,8.5vw,7.5rem)]">
      <MaskText as="h3" text={heading.title} className="t-display-lg max-w-[20ch] text-cream" />

      <RevealGroup as="ol" stagger={0.1} className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
        {PILLAR_ORDER.map((id) => {
          const pillar = content.greenPillars[id];
          const still = PILLAR_STAGE[id];
          return (
            <RevealItem as="li" key={id}>
              <Link
                href={href(locale, "sustainability", id)}
                aria-label={`${pillar.name}. ${explore}`}
                className="group/pillar flex h-full flex-col rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
              >
                <span className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-forest-900">
                  <Image
                    src={stageStill(still.stage)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
                    className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover/pillar:scale-[1.04] motion-reduce:transform-none"
                    style={{ objectPosition: still.focus }}
                  />
                </span>
                <span className="t-display-sm mt-6 block text-cream">{pillar.name}</span>
                <span className="t-body mt-3 block text-cream/85">{pillar.summary}</span>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[1rem] font-medium text-cream">
                  {explore}
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover/pillar:translate-x-1 motion-reduce:transform-none" />
                </span>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}
