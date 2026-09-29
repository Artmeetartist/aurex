import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ArrowRight } from "@/components/ui/icons";
import { StatusTag } from "@/components/ui/eyebrow";
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
 * Sectors of interest as a register on a dark surface: one row per sector,
 * linking to its trade line, AUREX Green or an investment inquiry. Every
 * sector is a strategic focus, stated once above the list.
 */
export function SectorColumns({ locale, content }: { locale: Locale; content: SiteContent }) {
  const status = content.common.status.strategic;

  return (
    <div>
      <div className="flex justify-end pb-4">
        <StatusTag>{status}</StatusTag>
      </div>
      <RevealGroup as="ul" stagger={0.05} className="border-t border-white/15">
        {sectors.map((s, i) => {
          const sector = content.sectors[s.id];
          const link = sectorLink(locale, content, s.id);
          return (
            <RevealItem as="li" key={s.id} y={10} className="border-b border-white/15">
              <Link
                href={link.href}
                className="group/s grid gap-x-8 gap-y-3 py-7 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.3fr)_15rem] md:items-baseline md:py-9"
              >
                <span className="t-meta text-mist-dim">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-serif text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.1] tracking-[-0.015em] text-ivory [font-variation-settings:'opsz'_48]">
                  {sector.name}
                </h3>
                <p className="max-w-xl text-[1rem] leading-relaxed text-mist">{sector.summary}</p>
                <span className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ivory md:justify-self-end">
                  {link.label}
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover/s:translate-x-1 motion-reduce:transform-none" />
                </span>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}
