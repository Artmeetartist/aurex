import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { JsonLd } from "@/components/seo/json-ld";
import { getContent } from "@/content/repository";
import { isLocale, localeMeta, locales } from "@/i18n/config";
import { href, tradeHref, tradeIds } from "@/lib/routes";
import { siteUrl } from "@/lib/seo";
import { mono, sans, serif } from "../fonts";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = await getContent(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: `${meta.siteName} — ${meta.tagline}`, template: `%s — ${meta.siteName}` },
    description: meta.description,
    applicationName: meta.siteName,
    formatDetection: { telephone: false, email: false, address: false },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#051616",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = await getContent(locale);

  return (
    <html lang={localeMeta[locale].htmlLang} className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="grain">
        <a
          href="#main"
          className="t-eyebrow fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-gold px-5 py-3 text-ink transition-transform focus:translate-y-0"
        >
          {content.nav.skipToContent}
        </a>
        <MotionProvider>
          <SmoothScroll>
            <ScrollProgress />
            <SiteHeader
              locale={locale}
              nav={{
                labels: content.nav.labels,
                cta: content.nav.cta,
                menu: content.nav.menu,
                close: content.nav.close,
                language: content.nav.language,
                primaryLabel: content.nav.primaryLabel,
                trade: {
                  label: content.nav.labels.trade,
                  hubHref: href(locale, "trade"),
                  allLabel: content.tradePage.allTrade,
                  items: tradeIds.map((id) => ({
                    id,
                    name: content.trades[id].name,
                    title: content.trades[id].title,
                    href: tradeHref(locale, id),
                  })),
                  green: {
                    eyebrow: content.home.green.eyebrow,
                    title: content.home.trade.greenLabel,
                    href: href(locale, "sustainability"),
                  },
                },
              }}
            />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <SiteFooter locale={locale} content={content} />
          </SmoothScroll>
        </MotionProvider>
        <JsonLd locale={locale} meta={content.meta} />
      </body>
    </html>
  );
}
