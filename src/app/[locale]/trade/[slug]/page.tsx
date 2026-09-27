import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ScrollText } from "@/components/motion/scroll-text";
import { CtaBand } from "@/components/page/cta-band";
import { PageHero } from "@/components/page/page-hero";
import { ConnectionSequence } from "@/components/sections/trade/connection-sequence";
import { tradeIcons } from "@/components/trade/trade-icons";
import { TradeLineGrid } from "@/components/trade/trade-line-grid";
import { Eyebrow, StatusTag } from "@/components/ui/eyebrow";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { markets } from "@/content/facts";
import { getContent } from "@/content/repository";
import { isLocale } from "@/i18n/config";
import { loadPage } from "@/lib/page";
import { contactHref, href, tradeIdFromSlug, tradeIds, tradeSlugs, type TradeSlugId } from "@/lib/routes";
import { tradeMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return tradeIds.map((id) => ({ slug: tradeSlugs[id] }));
}

/** Framing stills from the AUREX footage, one per trade line. */
const heroImage: Record<TradeSlugId, string> = {
  food: "/media/stills/still-sea",
  medical: "/media/stills/still-air",
  electronics: "/media/stills/still-portland",
  larp: "/media/stills/still-coast",
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

  return (
    <>
      <PageHero
        hero={{ eyebrow: tradePage.eyebrow, title: trade.title, accent: trade.accent, intro: trade.intro }}
        image={heroImage[id]}
        breadcrumb={{
          home: common.breadcrumbHome,
          homeHref: href(locale, "home"),
          parent: { label: nav.labels.trade, href: href(locale, "trade") },
          current: trade.name,
        }}
      >
        <div className="glass rounded-[1.5rem] p-6">
          <div className="flex items-start justify-between gap-4">
            <span className="text-gold">
              <Icon size={48} />
            </span>
            <StatusTag>{common.status.strategic}</StatusTag>
          </div>
          <p className="mt-6 text-[1.375rem] font-light tracking-[-0.02em] text-ivory">{trade.name}</p>
          <ul className="mt-4 space-y-2">
            {trade.categories.map((c) => (
              <li key={c.title} className="flex items-center gap-3 text-[0.875rem] text-ivory/75">
                <span aria-hidden className="h-px w-3 bg-gold" />
                {c.title}
              </li>
            ))}
          </ul>
        </div>
      </PageHero>

      {/* 01 — Overview */}
      <section className="surface-ivory section-y">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow index="01" tone="dark">
              {tradePage.overview}
            </Eyebrow>
          </div>
          <ScrollText text={trade.overview} className="t-display-sm text-ink lg:col-span-9" />
        </div>
      </section>

      {/* 02 — Focus categories */}
      <section className="surface-ink section-y relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[20%] top-0 h-[50rem] w-[50rem] rounded-full [background:radial-gradient(closest-side,rgb(0_153_153/0.16),transparent_70%)]"
        />
        <div className="container-x relative">
          <SectionHeading index="02" eyebrow={tradePage.categoriesEyebrow} title={tradePage.categoriesTitle} size="md" />
          <RevealGroup as="ul" className="mt-16 grid gap-4 md:grid-cols-3 md:gap-5" stagger={0.1}>
            {trade.categories.map((c, i) => (
              <RevealItem as="li" key={c.title}>
                <InteractiveCard className="flex h-full min-h-[17rem] flex-col p-8 md:p-10">
                  <span className="t-eyebrow text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-auto pt-14 text-[1.625rem] font-light leading-tight tracking-[-0.025em] text-ivory">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{c.text}</p>
                  <span
                    aria-hidden
                    className="mt-8 block h-px w-10 bg-gold/60 transition-all duration-700 ease-[var(--ease-out-expo)] group-hover/card:w-full"
                  />
                </InteractiveCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 03 — Approach */}
      <section className="surface-ivory section-y">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading index="03" eyebrow={tradePage.approachEyebrow} title={tradePage.approachTitle} tone="dark" size="md" />
            </div>
          </div>
          <RevealGroup as="ol" className="border-t border-ink/10 lg:col-span-6 lg:col-start-7">
            {trade.approach.map((a, i) => (
              <RevealItem as="li" key={a.title} className="group grid grid-cols-[4rem_1fr] gap-4 border-b border-ink/10 py-10">
                <span className="text-[2.5rem] font-light leading-none tracking-[-0.04em] text-ink/20 transition-colors duration-500 group-hover:text-gold-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="t-title text-ink">{a.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">{a.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 04 — The AUREX model */}
      <section className="surface-ink-deep section-y">
        <div className="container-x">
          <SectionHeading
            index="04"
            eyebrow={tradeHub.connection.eyebrow}
            title={tradeHub.connection.title}
            accent={tradeHub.connection.accent}
            size="md"
          />
          <div className="mt-16 md:mt-20">
            <ConnectionSequence steps={tradeHub.connection.steps} />
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

      {/* 05 — Other trade lines */}
      <section className="surface-ivory section-y">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Eyebrow index="05" tone="dark">
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
