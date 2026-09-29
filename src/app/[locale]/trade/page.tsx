import Link from "next/link";
import { AnchorOnLoad } from "@/components/inquiry/anchor-on-load";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/page/cta-band";
import { PageHero } from "@/components/page/page-hero";
import { ConnectionSequence } from "@/components/sections/trade/connection-sequence";
import { DivisionIndex } from "@/components/sections/trade/division-index";
import { DivisionRow } from "@/components/sections/trade/division-row";
import { GreenLoop } from "@/components/trade/trade-icons";
import { TradeIndex } from "@/components/trade/trade-index";
import { ArrowUpRight } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { divisions } from "@/content/facts";
import { photos } from "@/content/media";
import { loadPage, metadataFor } from "@/lib/page";
import { contactHref, href, tradeHref, tradeIds } from "@/lib/routes";

export const generateMetadata = metadataFor("trade");

export default async function TradePage({ params }: PageProps<"/[locale]/trade">) {
  const { locale, content } = await loadPage(params);
  const { tradeHub, nav, common } = content;
  const chapters = content.home.motion.chapters;
  const modeOf = (d: (typeof divisions)[number]) =>
    chapters.find((c) => c.division === d.id)?.mode ?? content.home.hero.modes[d.mode];

  return (
    <>
      <PageHero
        hero={tradeHub.hero}
        photo={photos.containerShip}
        breadcrumb={{ home: common.breadcrumbHome, homeHref: href(locale, "home"), current: nav.labels.trade }}
      >
        <DivisionIndex
          label={tradeHub.lines.eyebrow}
          items={tradeIds.map((id) => ({ id: `line-${id}`, name: content.trades[id].name, href: tradeHref(locale, id) }))}
        />
      </PageHero>
      {divisions.map((d) => (
        <AnchorOnLoad key={d.id} id={d.id} />
      ))}

      {/* 01 — Trade lines, each with its own page */}
      <section id="lines" className="surface-ivory section-y scroll-mt-24">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <SectionHeading
              index="01"
              eyebrow={tradeHub.lines.eyebrow}
              title={tradeHub.lines.title}
              intro={tradeHub.lines.intro}
              tone="dark"
              size="md"
              className="lg:col-span-7"
            />
            <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9">
              <p className="border-l border-gold-ink/60 pl-6 text-[0.9375rem] leading-relaxed text-ink/80">
                {tradeHub.lines.note}
              </p>
            </Reveal>
          </div>
          <TradeIndex locale={locale} content={content} green={false} className="mt-14 md:mt-20" />
        </div>
      </section>

      {/* 02 — How AUREX trades: the four disciplines */}
      <section className="surface-ink section-y">
        <div className="container-x">
          <SectionHeading index="02" eyebrow={tradeHub.core.eyebrow} title={tradeHub.core.title} />
          <div className="mt-20 space-y-24 md:mt-28 md:space-y-36 lg:space-y-40">
            {divisions.map((d, i) => {
              const division = content.divisions[d.id];
              return (
                <DivisionRow
                  key={d.id}
                  id={d.id}
                  index={i}
                  total={divisions.length}
                  mode={modeOf(d)}
                  name={division.name}
                  summary={division.summary}
                  scope={division.scope}
                  scopeLabel={tradeHub.scopeLabel}
                  image={d.image}
                  reverse={i % 2 === 1}
                  tone="dark"
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* 03 — The AUREX model */}
      <section className="surface-ink-deep section-y relative overflow-hidden">
        <div className="container-x relative">
          <SectionHeading
            index="03"
            eyebrow={tradeHub.connection.eyebrow}
            title={tradeHub.connection.title}
            intro={tradeHub.connection.intro}
          />
          <div className="mt-16 md:mt-24">
            <ConnectionSequence steps={tradeHub.connection.steps} />
          </div>
        </div>
      </section>

      {/* 04 — AUREX Green */}
      <section className="section-y bg-forest-950 text-cream">
        <div className="container-x">
          <Link
            href={href(locale, "sustainability")}
            className="group relative grid items-end gap-10 overflow-hidden rounded-xl border border-cream/10 bg-forest-900 p-8 transition-colors duration-700 hover:border-brass/40 md:p-14 lg:grid-cols-12"
          >
            <div className="relative lg:col-span-8">
              <span className="text-brass">
                <GreenLoop size={52} />
              </span>
              <p className="t-eyebrow mt-10 text-brass-soft">{tradeHub.green.eyebrow}</p>
              <h2 className="t-display-md mt-5 max-w-[20ch] text-cream">{tradeHub.green.title}</h2>
              <p className="t-lead mt-6 max-w-2xl text-cream/75">{tradeHub.green.text}</p>
            </div>
            <span className="relative inline-flex items-center gap-3 justify-self-start text-[0.9375rem] font-medium lg:col-span-4 lg:justify-self-end">
              {tradeHub.green.link}
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:border-brass group-hover:bg-brass group-hover:text-forest-950">
                <ArrowUpRight size={16} />
              </span>
            </span>
          </Link>
        </div>
      </section>

      <CtaBand
        eyebrow={tradeHub.cta.eyebrow}
        title={tradeHub.cta.title}
        intro={tradeHub.cta.intro}
        primary={{ label: tradeHub.cta.primary, href: contactHref(locale, "partnership") }}
      />
    </>
  );
}
