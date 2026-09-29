import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { inquiryFor, inquiryLabel } from "@/components/sections/partnerships/model-cards";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { partnerModels } from "@/content/facts";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { contactHref, href } from "@/lib/routes";

/** 07 — Strategic partnerships: the four partner models. */
export function Partnerships({ locale, content }: { locale: Locale; content: SiteContent }) {
  const copy = content.home.partnerships;

  return (
    <section className="surface-ink section-y relative overflow-hidden">
      <div className="container-x relative">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            index="08"
            eyebrow={copy.eyebrow}
            title={copy.title}
            intro={copy.intro}
            size="md"
          />
          <Reveal delay={0.2} className="shrink-0">
            <ButtonLink href={href(locale, "partnerships")} variant="outline-light">
              {copy.cta}
            </ButtonLink>
          </Reveal>
        </div>

        <RevealGroup as="ul" stagger={0.06} className="mt-16 grid border-t border-white/15 md:mt-20 md:grid-cols-2">
          {partnerModels.map((id, i) => {
            const model = content.partnerModels[id];
            const type = inquiryFor(id);
            return (
              <RevealItem
                as="li"
                key={id}
                y={12}
                className="border-b border-white/15 md:odd:border-r md:[&:nth-child(odd)]:pr-10 md:[&:nth-child(even)]:pl-10"
              >
                <Link
                  href={contactHref(locale, type)}
                  className="group/m grid h-full gap-6 py-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold sm:grid-cols-[3rem_1fr] md:py-12"
                >
                  <span className="t-meta pt-2 text-mist-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex flex-col">
                    <span className="font-serif text-[clamp(1.625rem,2.4vw,2.125rem)] leading-[1.1] tracking-[-0.015em] text-ivory [font-variation-settings:'opsz'_48]">
                      {model.name}
                    </span>
                    <span className="mt-4 max-w-md text-[1rem] leading-relaxed text-mist">{model.summary}</span>
                    <span className="mt-6 text-[0.875rem] leading-relaxed text-ivory/60">{model.examples.join(" · ")}</span>
                    <span className="mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ivory">
                      <span className="underline decoration-white/30 underline-offset-[0.3em] transition-[text-decoration-color] duration-300 group-hover/m:decoration-ivory">
                        {inquiryLabel(content, type)}
                      </span>
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover/m:translate-x-1 motion-reduce:transform-none" />
                    </span>
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
