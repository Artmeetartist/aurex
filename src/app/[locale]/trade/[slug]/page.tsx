import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PhotoBand } from "@/components/media/photo-band";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ScrollText } from "@/components/motion/scroll-text";
import { CtaBand } from "@/components/page/cta-band";
import { PageHero } from "@/components/page/page-hero";
import { FlowTrack } from "@/components/trade/flow-track";
import { MailShowcase } from "@/components/trade/larp/mail-showcase";
import { MailVitrine } from "@/components/trade/larp/mail-vitrine";
import { MailWeave } from "@/components/trade/larp/mail-weave";
import { CategoryGrid, Counterparts, StandardsGrid } from "@/components/trade/line-sections";
import { tradeIcons } from "@/components/trade/trade-icons";
import { TradeLineGrid } from "@/components/trade/trade-line-grid";
import { Eyebrow, StatusTag } from "@/components/ui/eyebrow";
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

/** Dedicated photography and atmosphere per trade line. */
const art: Record<TradeSlugId, { hero: Photo; band: Photo; tint: string }> = {
  food: { hero: photos.foodProduce, band: photos.foodFields, tint: "#d79a2b" },
  medical: { hero: photos.medical, band: photos.containerShip, tint: "#5fb8c9" },
  electronics: { hero: photos.electronics, band: photos.warehouse, tint: "#2f6fb5" },
  larp: { hero: photos.larp, band: photos.containerShip, tint: "#b0673f" },
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
  const { trades, tradePage, tradeHub, nav, common } = content;
  const trade = trades[id];
  const Icon = tradeIcons[id];
  const { tint } = art[id];
  const showcase = trade.showcase;

  return (
    <>
      <PageHero
        hero={{ eyebrow: tradePage.eyebrow, title: trade.title, accent: trade.accent, intro: trade.intro }}
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
            link={{ label: `${showcase.eyebrow} · ${showcase.title}`, href: "#in-focus" }}
          />
        ) : (
          <div className="glass rounded-[1.5rem] p-6">
            <div className="flex items-start justify-between gap-4">
              <span className="text-gold">
                <Icon size={48} />
              </span>
              <StatusTag>{common.status.strategic}</StatusTag>
            </div>
            <p className="mt-6 text-[1.375rem] font-light tracking-[-0.02em] text-ivory">{trade.name}</p>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
              {trade.categories.map((c) => (
                <li key={c.title}>
                  <a
                    href="#categories"
                    className="flex min-h-9 items-center gap-3 text-[0.8125rem] text-ivory/75 transition-colors duration-300 hover:text-ivory"
                  >
                    <span aria-hidden className="h-px w-3 shrink-0 bg-gold" />
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </PageHero>

      {/* 01 — Overview, over a full-bleed photograph */}
      <PhotoBand photo={art[id].band} tint={tint}>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow index="01">{tradePage.overview}</Eyebrow>
          </div>
          <ScrollText text={trade.overview} className="t-display-sm text-ivory lg:col-span-9" />
        </div>
      </PhotoBand>

      {/* In focus — product showcase where the line has one */}
      {showcase && <MailShowcase showcase={showcase} id="in-focus" />}

      {/* 02 — Focus categories with examples */}
      <CategoryGrid index="02" trade={trade} labels={tradePage} icon={Icon} tint={tint} />

      {/* 03 — From origin to market */}
      <section className="surface-ink-deep section-y relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[15%] top-0 h-[48rem] w-[48rem] rounded-full opacity-[0.16]"
          style={{ background: `radial-gradient(closest-side, ${tint}, transparent 70%)` }}
        />
        <div className="container-x relative">
          <SectionHeading index="03" eyebrow={tradePage.flowEyebrow} title={tradePage.flowTitle} size="md" />
          <div className="mt-16 md:mt-24">
            <FlowTrack steps={trade.flow} tint={tint} />
          </div>

          <div className="mt-20 border-t border-white/10 pt-10">
            <p className="t-eyebrow text-mist">{tradePage.corridorsEyebrow}</p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {markets.map((m) => (
                <li key={m.id}>
                  <Link
                    href={href(locale, "presence")}
                    className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-white/15 px-5 text-[0.875rem] text-ivory/85 transition-colors duration-300 hover:border-gold hover:text-ivory"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {content.markets[m.id].name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-xl text-[0.8125rem] leading-relaxed text-mist-dim">{common.marketsFootnote}</p>
          </div>
        </div>
      </section>

      {/* 04 — Approach */}
      <section className="surface-ink section-y">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading index="04" eyebrow={tradePage.approachEyebrow} title={tradePage.approachTitle} size="md" />
            </div>
          </div>
          <RevealGroup as="ol" className="border-t border-white/10 lg:col-span-6 lg:col-start-7">
            {trade.approach.map((a, i) => (
              <RevealItem as="li" key={a.title} className="group grid grid-cols-[4rem_1fr] gap-4 border-b border-white/10 py-10">
                <span className="text-[2.5rem] font-light leading-none tracking-[-0.04em] text-ivory/20 transition-colors duration-500 group-hover:text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="t-title text-ivory">{a.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{a.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 05 — Standards & frameworks */}
      <StandardsGrid index="05" trade={trade} labels={tradePage} />

      {/* 06 — Counterparts */}
      <Counterparts
        index="06"
        trade={trade}
        labels={tradePage}
        tint={tint}
        ctaHref={contactHref(locale, "partnership")}
      />

      {/* 07 — Other trade lines */}
      <section className="surface-ivory section-y">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Eyebrow index="07" tone="dark">
              {tradePage.otherEyebrow}
            </Eyebrow>
            <Link href={href(locale, "trade")} className="inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-ink hover:text-gold-ink">
              {tradePage.allTrade}
            </Link>
          </div>
          <TradeLineGrid locale={locale} content={content} exclude={id} className="mt-12" />
        </div>
      </section>

      <CtaBand
        eyebrow={tradeHub.cta.eyebrow}
        title={trade.cta.title}
        accent={trade.cta.accent}
        primary={{ label: trade.cta.primary, href: contactHref(locale, "partnership") }}
      />
    </>
  );
}
