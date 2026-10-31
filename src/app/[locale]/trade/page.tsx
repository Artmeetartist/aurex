import Image from "next/image";
import Link from "next/link";
import { AnchorOnLoad } from "@/components/inquiry/anchor-on-load";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/page/cta-band";
import { PageHero } from "@/components/page/page-hero";
import { ConnectionSequence } from "@/components/sections/trade/connection-sequence";
import { DivisionIndex } from "@/components/sections/trade/division-index";
import { DivisionRow } from "@/components/sections/trade/division-row";
import { FlowFilm } from "@/components/trade/flow-film";
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

      {/* Trade lines, each with its own page */}
      <section id="lines" className="surface-ivory section-y scroll-mt-24">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <SectionHeading
              title={tradeHub.lines.title}
              intro={tradeHub.lines.intro}
              tone="dark"
              size="md"
              className="lg:col-span-7"
            />
            <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9">
              <p className="text-[1rem] leading-relaxed text-ink/80">{tradeHub.lines.note}</p>
            </Reveal>
          </div>
          <TradeIndex locale={locale} content={content} green={false} className="mt-14 md:mt-20" />
        </div>
      </section>

      {/* How AUREX trades: the four disciplines */}
      <section className="surface-ink section-y">
        <div className="container-x">
          <SectionHeading title={tradeHub.core.title} />
          <div className="mt-16 space-y-20 md:mt-24 md:space-y-28 lg:space-y-32">
            {divisions.map((d, i) => {
              const division = content.divisions[d.id];
              return (
                <DivisionRow
                  key={d.id}
                  id={d.id}
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

      {/* The AUREX model, with footage of goods on the move */}
      <section className="surface-ink-deep section-y">
        <div className="container-x">
          <SectionHeading title={tradeHub.connection.title} intro={tradeHub.connection.intro} size="md" />
          <FlowFilm
            labels={{ play: content.home.hero.play, pause: content.home.hero.pause }}
            className="mt-12 aspect-[4/3] sm:aspect-[16/9] md:mt-16 lg:aspect-[21/9]"
          />
          <div className="mt-14 md:mt-20">
            <ConnectionSequence steps={tradeHub.connection.steps} />
          </div>
        </div>
      </section>

      {/* AUREX Green, previewed by a still of its own scene */}
      <section className="section-y bg-forest-950 text-cream">
        <div className="container-x">
          <Link
            href={href(locale, "sustainability")}
            className="group grid overflow-hidden rounded-xl bg-forest-900 transition-colors duration-700 hover:bg-forest-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass lg:grid-cols-12"
          >
            <div className="flex flex-col p-6 md:p-14 lg:col-span-6">
              <h2 className="t-display-md max-w-[22ch] text-cream">{tradeHub.green.title}</h2>
              <p className="t-lead mt-6 max-w-xl text-cream/85">{tradeHub.green.text}</p>
              <span className="mt-10 inline-flex items-center gap-3 self-start text-[1rem] font-medium lg:mt-auto lg:pt-12">
                {tradeHub.green.link}
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-forest-700 transition-[background-color,color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:bg-brass group-hover:text-forest-950">
                  <ArrowUpRight size={16} />
                </span>
              </span>
            </div>
            <div className="relative min-h-[18rem] overflow-hidden md:min-h-[24rem] lg:col-span-6 lg:min-h-[30rem]">
              <Image
                src="/media/green/stage-6.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-[1.03] motion-reduce:transform-none"
              />
            </div>
          </Link>
        </div>
      </section>

      <CtaBand
        title={tradeHub.cta.title}
        intro={tradeHub.cta.intro}
        primary={{ label: tradeHub.cta.primary, href: contactHref(locale, "partnership") }}
      />
    </>
  );
}
