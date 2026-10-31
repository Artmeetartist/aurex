import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhotoBand } from "@/components/media/photo-band";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ScrollText } from "@/components/motion/scroll-text";
import { CtaBand } from "@/components/page/cta-band";
import { PageHero } from "@/components/page/page-hero";
import { FlowFilm } from "@/components/trade/flow-film";
import { FlowTrack } from "@/components/trade/flow-track";
import { MailShowcase } from "@/components/trade/larp/mail-showcase";
import { MailVitrine } from "@/components/trade/larp/mail-vitrine";
import { MailWeave } from "@/components/trade/larp/mail-weave";
import { CategoryGrid, Counterparts, StandardsGrid } from "@/components/trade/line-sections";
import { tradeIcons } from "@/components/trade/trade-icons";
import { TradeIndex } from "@/components/trade/trade-index";
import { TextLink } from "@/components/ui/button";
import { StatusTag } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { markets } from "@/content/facts";
import { photos, type Photo } from "@/content/media";
import { getContent } from "@/content/repository";
import { isLocale } from "@/i18n/config";
import { loadPage } from "@/lib/page";
import { contactHref, href, tradeIdFromSlug, tradeIds, tradeSlugs, type TradeSlugId } from "@/lib/routes";
import { tradeMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return tradeIds.map((id) => ({ slug: tradeSlugs[id] }));
}

/**
 * Photography and atmosphere per trade line: the hero, the overview band and
 * the picture beside the categories. The LARP hero is drawn (mail weave), and
 * its tint is steel, the material of the line.
 */
const art: Record<TradeSlugId, { hero: Photo; band: Photo; detail: Photo; tint: string }> = {
  food: { hero: photos.foodFields, band: photos.containerShip, detail: photos.foodProduce, tint: "#d79a2b" },
  medical: { hero: photos.medical, band: photos.containerShip, detail: photos.warehouse, tint: "#5fb8c9" },
  electronics: { hero: photos.electronics, band: photos.warehouse, detail: photos.energy, tint: "#2f6fb5" },
  larp: { hero: photos.larp, band: photos.containerShip, detail: photos.larp, tint: "#8a9ea1" },
};

export async function generateMetadata({ params }: PageProps<"/[locale]/trade/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const id = tradeIdFromSlug(slug);
  if (!isLocale(locale) || !id) return {};
  return tradeMetadata(locale, id, await getContent(locale));
}

export default async function TradeLinePage({ params }: PageProps<"/[locale]/trade/[slug]">) {
  const { slug } = await params;
  const id = tradeIdFromSlug(slug);
  if (!id) notFound();
  const { locale, content } = await loadPage(params);
  const { trades, tradePage, nav, common } = content;
  const trade = trades[id];
  const Icon = tradeIcons[id];
  const { tint } = art[id];
  const showcase = trade.showcase;
  // The overview's first sentence is set as the statement, the rest as a lead beside it.
  const cut = trade.overview.indexOf(". ");
  const statement = cut > 0 ? trade.overview.slice(0, cut + 1) : trade.overview;
  const overviewRest = cut > 0 ? trade.overview.slice(cut + 2) : "";

  return (
    <>
      <PageHero
        hero={{ title: trade.title, accent: trade.accent, intro: trade.intro, eyebrow: tradePage.eyebrow }}
        photo={showcase ? undefined : art[id].hero}
        backdrop={showcase ? <MailWeave /> : undefined}
        tint={tint}
        breadcrumb={{
          home: common.breadcrumbHome,
          homeHref: href(locale, "home"),
          parent: { label: nav.labels.trade, href: href(locale, "trade") },
          current: trade.name,
        }}
      >
        {showcase ? (
          <MailVitrine
            name={trade.name}
            status={common.status.strategic}
            caption={showcase.setCaption}
            link={{ label: showcase.title, href: "#in-focus" }}
          />
        ) : (
          <div className="rounded-xl bg-ink-950 p-6">
            <div className="flex items-start justify-between gap-4">
              <span className="text-gold">
                <Icon size={44} />
              </span>
              <StatusTag className="text-[0.875rem]">{common.status.strategic}</StatusTag>
            </div>
            <p className="t-lead mt-5 font-medium text-ivory">{trade.name}</p>
            <ul className="mt-3 grid grid-cols-1 gap-x-6 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
              {trade.categories.map((c) => (
                <li key={c.title}>
                  <a
                    href="#categories"
                    className="flex min-h-11 items-center gap-3 text-[0.875rem] leading-snug text-ivory/85 transition-colors duration-300 hover:text-ivory"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </PageHero>

      {/* Overview, over a full-bleed photograph */}
      <PhotoBand photo={art[id].band} tint={tint}>
        <h2 className="sr-only">{tradePage.overview}</h2>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <ScrollText text={statement} className="t-display-sm max-w-[46ch] text-ivory lg:col-span-7" />
          {overviewRest && <p className="t-lead max-w-xl text-ivory/90 lg:col-span-5 lg:col-start-8">{overviewRest}</p>}
        </div>
      </PhotoBand>

      {/* In focus: product showcase where the line has one */}
      {showcase && <MailShowcase showcase={showcase} id="in-focus" />}

      {/* Focus categories with examples */}
      <CategoryGrid trade={trade} labels={tradePage} photo={art[id].detail} tint={tint} />

      {/* From origin to market */}
      <section className="surface-ink-deep section-y">
        <div className="container-x">
          <SectionHeading title={tradePage.flowTitle} size="md" />
          <FlowFilm
            labels={{ play: content.home.hero.play, pause: content.home.hero.pause }}
            className="mt-12 aspect-[4/3] sm:aspect-[16/9] md:mt-16 lg:aspect-[21/9]"
          />
          <div className="mt-14 md:mt-20">
            <FlowTrack steps={trade.flow} tint={tint} />
          </div>

          <div className="mt-20 md:mt-24">
            <h3 className="t-lead font-medium text-ivory">{tradePage.corridorsEyebrow}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {markets.map((m) => (
                <li key={m.id}>
                  <Link
                    href={href(locale, "presence")}
                    className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-ink-850 px-5 text-[1rem] text-ivory transition-colors duration-300 hover:bg-ink-700"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {content.markets[m.id].name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-xl text-[0.875rem] leading-relaxed text-ivory/70">{common.marketsFootnote}</p>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="surface-ink section-y">
        <div className="container-x">
          <SectionHeading title={tradePage.approachTitle} size="md" />
          <RevealGroup as="ul" className="mt-14 grid gap-x-16 gap-y-12 md:mt-20 md:grid-cols-2 md:gap-y-14 lg:gap-x-24">
            {trade.approach.map((a) => (
              <RevealItem as="li" key={a.title} className="max-w-xl">
                <h3 className="t-display-sm text-ivory">{a.title}</h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-ivory/85">{a.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Standards & frameworks */}
      <StandardsGrid trade={trade} labels={tradePage} />

      {/* Counterparts */}
      <Counterparts trade={trade} labels={tradePage} />

      {/* Other trade lines */}
      <section className="surface-ivory section-y">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <h2 className="t-display-md text-ink">{tradePage.otherEyebrow}</h2>
            <TextLink href={href(locale, "trade")} tone="dark">
              {tradePage.allTrade}
            </TextLink>
          </div>
          <TradeIndex locale={locale} content={content} exclude={id} className="mt-10 md:mt-14" />
        </div>
      </section>

      <CtaBand title={trade.cta.title} primary={{ label: trade.cta.primary, href: contactHref(locale, "partnership") }} />
    </>
  );
}
