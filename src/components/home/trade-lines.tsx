import { MailFeature } from "@/components/trade/larp/mail-feature";
import { TradeIndex } from "@/components/trade/trade-index";
import { TextLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { href, tradeHref } from "@/lib/routes";

/** 03 — Trade lines of strategic focus, each linking to its own page. */
export function TradeLines({ locale, content }: { locale: Locale; content: SiteContent }) {
  const copy = content.home.trade;
  return (
    <section id="trade" className="surface-ivory section-y relative">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            index="03"
            eyebrow={copy.eyebrow}
            title={copy.title}
            intro={copy.intro}
            tone="dark"
            size="md"
            className="lg:col-span-8"
          />
          <div className="lg:col-span-4 lg:justify-self-end">
            <TextLink href={href(locale, "trade")} tone="dark">
              {copy.link}
            </TextLink>
          </div>
        </div>
        <TradeIndex locale={locale} content={content} className="mt-14 md:mt-20" />
        <MailFeature trade={content.trades.larp} href={`${tradeHref(locale, "larp")}#in-focus`} className="mt-16 md:mt-24" />
      </div>
    </section>
  );
}
