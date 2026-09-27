import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/page/cta-band";
import { PageHero } from "@/components/page/page-hero";
import { HoldingsRegister } from "@/components/sections/portfolio/holdings-register";
import { SectorColumns } from "@/components/sections/portfolio/sector-columns";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { holdings } from "@/content/facts";
import { loadPage, metadataFor } from "@/lib/page";
import { contactHref, href } from "@/lib/routes";

export const generateMetadata = metadataFor("portfolio");

export default async function PortfolioPage({ params }: PageProps<"/[locale]/portfolio">) {
  const { locale, content } = await loadPage(params);
  const { portfolio, nav, common } = content;

  return (
    <>
      <PageHero
        hero={portfolio.hero}
        image="/media/stills/still-connected"
        breadcrumb={{ home: common.breadcrumbHome, homeHref: href(locale, "home"), current: nav.labels.portfolio }}
      />

      {/* Investment approach */}
      <section className="surface-ink section-y">
        <div className="container-x">
          <SectionHeading
            index="01"
            eyebrow={portfolio.approach.eyebrow}
            title={portfolio.approach.title}
            accent={portfolio.approach.accent}
            intro={portfolio.approach.intro}
          />
          <RevealGroup
            as="ol"
            className="mt-16 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 md:mt-20 md:grid-cols-2 lg:grid-cols-4"
          >
            {portfolio.approach.items.map((item, i) => (
              <RevealItem as="li" key={item.title} className="bg-ink">
                <InteractiveCard
                  tone="dark"
                  tilt={0}
                  className="flex h-full flex-col rounded-none border-0 bg-ink p-8 hover:bg-ink-850 md:p-10 md:pb-14"
                >
                  <span aria-hidden className="t-eyebrow tabular-nums text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-14 md:mt-24">
                    <h3 className="text-[1.875rem] font-light leading-tight tracking-[-0.028em] text-ivory md:text-[2.125rem]">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-mist">{item.text}</p>
                  </div>
                  <span
                    aria-hidden
                    className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-gold/70 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/card:scale-x-100 md:inset-x-10"
                  />
                </InteractiveCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Investment criteria */}
      <section className="surface-ivory section-y">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="02"
                eyebrow={portfolio.criteria.eyebrow}
                title={portfolio.criteria.title}
                accent={portfolio.criteria.accent}
                intro={portfolio.criteria.intro}
                tone="dark"
                size="md"
              />
            </div>
          </div>
          <RevealGroup as="ol" className="border-t border-ink/10 lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7">
            {portfolio.criteria.items.map((item, i) => (
              <RevealItem
                as="li"
                key={item}
                className="group grid grid-cols-[2.75rem_1fr] items-baseline gap-x-4 border-b border-ink/10 py-8 sm:grid-cols-[4rem_1fr] md:py-10"
              >
                <span
                  aria-hidden
                  className="text-[1.375rem] font-light leading-none tracking-[-0.03em] tabular-nums text-ink/30 transition-colors duration-500 group-hover:text-gold-ink md:text-[1.75rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[clamp(1.1875rem,1.7vw,1.5rem)] font-light leading-[1.35] tracking-[-0.015em] text-ink [text-wrap:pretty]">
                  {item}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Sectors of interest */}
      <section className="surface-ink-deep section-y">
        <div className="container-x">
          <SectionHeading
            index="03"
            eyebrow={portfolio.sectors.eyebrow}
            title={portfolio.sectors.title}
            accent={portfolio.sectors.accent}
            intro={portfolio.sectors.intro}
          />
          <div className="mt-16 md:mt-20">
            <SectorColumns locale={locale} content={content} />
          </div>
        </div>
      </section>

      {/* Holdings register — rendered only once holdings are formalised */}
      {holdings.length > 0 && (
        <section className="surface-ivory section-y">
          <HoldingsRegister index="04" content={content} />
        </section>
      )}

      <CtaBand
        eyebrow={portfolio.cta.eyebrow}
        title={portfolio.cta.title}
        accent={portfolio.cta.accent}
        intro={portfolio.cta.intro}
        primary={{ label: portfolio.cta.primary, href: contactHref(locale, "investment") }}
      />
    </>
  );
}
