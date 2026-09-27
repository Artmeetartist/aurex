import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { inquiryFor, inquiryLabel } from "@/components/sections/partnerships/model-cards";
import { ButtonLink } from "@/components/ui/button";
import { CardArrow } from "@/components/ui/card-arrow";
import { InteractiveCard } from "@/components/ui/interactive-card";
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
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-[-15%] h-[52rem] w-[52rem] rounded-full [background:radial-gradient(closest-side,rgb(200_162_74/0.07),transparent_70%)]"
      />
      <div className="container-x relative">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            index="08"
            eyebrow={copy.eyebrow}
            title={copy.title}
            accent={copy.accent}
            intro={copy.intro}
            size="md"
          />
          <Reveal delay={0.2} className="shrink-0">
            <ButtonLink href={href(locale, "partnerships")} variant="outline-light">
              {copy.cta}
            </ButtonLink>
          </Reveal>
        </div>

        <RevealGroup as="ul" className="mt-16 grid gap-4 md:mt-20 md:grid-cols-2 xl:grid-cols-4">
          {partnerModels.map((id, i) => {
            const model = content.partnerModels[id];
            const type = inquiryFor(id);
            return (
              <RevealItem as="li" key={id} className="h-full">
                <InteractiveCard
                  href={contactHref(locale, type)}
                  tone="dark"
                  className="flex h-full flex-col rounded-[1.75rem] bg-ink-850 p-7 hover:bg-ink-800 focus-visible:bg-ink-800 md:p-8"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/card:scale-x-100 group-focus-visible/card:scale-x-100 md:inset-x-8"
                  />
                  <span aria-hidden className="t-eyebrow text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="mt-10 text-[1.5rem] font-light leading-[1.15] tracking-[-0.02em] text-ivory [text-wrap:balance] md:mt-16 xl:flex xl:min-h-[2.3em] xl:items-end">
                      {model.name}
                    </h3>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-mist">{model.summary}</p>
                  </div>
                  <ul className="mt-10 space-y-2.5 border-t border-white/10 pt-6">
                    {model.examples.map((ex) => (
                      <li key={ex} className="flex items-center gap-3 text-[0.875rem] text-ivory/80">
                        <span
                          aria-hidden
                          className="h-px w-3 shrink-0 bg-gold/70 transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover/card:w-5"
                        />
                        {ex}
                      </li>
                    ))}
                  </ul>
                  <CardArrow
                    tone="dark"
                    label={inquiryLabel(content, type)}
                    className="mt-8 flex w-full justify-between gap-4 text-left group-hover/card:translate-x-0 group-focus-visible/card:translate-x-0"
                  />
                </InteractiveCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
