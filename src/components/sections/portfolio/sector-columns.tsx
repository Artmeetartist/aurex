import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CardArrow } from "@/components/ui/card-arrow";
import { StatusTag } from "@/components/ui/eyebrow";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { sectors } from "@/content/facts";
import type { SectorId, SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { contactHref, href, tradeHref } from "@/lib/routes";

/** Where each sector leads: its trade-line page, AUREX Green, or an investment inquiry. */
function sectorLink(locale: Locale, content: SiteContent, id: SectorId): { href: string; label: string } {
  switch (id) {
    case "food":
    case "medical":
    case "electronics":
    case "larp":
      return { href: tradeHref(locale, id), label: content.home.green.explore };
    case "sustainability":
      return { href: href(locale, "sustainability"), label: content.home.green.primaryCta };
    case "property":
      return { href: contactHref(locale, "investment"), label: content.portfolio.cta.primary };
  }
}

/**
 * Sectors of interest as clickable cards on a dark surface. Every sector is a
 * strategic focus, not an operating business, and is tagged accordingly.
 */
export function SectorColumns({ locale, content }: { locale: Locale; content: SiteContent }) {
  const status = content.common.status.strategic;

  return (
    <RevealGroup as="ul" stagger={0.07} className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
      {sectors.map((s, i) => {
        const sector = content.sectors[s.id];
        const link = sectorLink(locale, content, s.id);
        return (
          <RevealItem as="li" key={s.id} className="h-full">
            <InteractiveCard href={link.href} tone="dark" className="flex h-full min-h-[19rem] flex-col p-7 md:p-9">
              <span
                aria-hidden
                className="absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-gold/70 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/card:scale-x-100 group-focus-visible/card:scale-x-100 md:inset-x-9"
              />
              <span className="flex flex-wrap items-center justify-between gap-4">
                <span aria-hidden className="t-eyebrow tabular-nums text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <StatusTag>{status}</StatusTag>
              </span>
              <h3 className="mt-10 text-[clamp(1.625rem,2.2vw,2rem)] font-light leading-[1.1] tracking-[-0.026em] text-ivory [text-wrap:balance] md:mt-12">
                {sector.name}
              </h3>
              <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-mist">{sector.summary}</p>
              <CardArrow
                tone="dark"
                label={link.label}
                className="mt-auto flex w-full justify-between gap-4 pt-8 text-left group-hover/card:translate-x-0 group-focus-visible/card:translate-x-0"
              />
            </InteractiveCard>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
