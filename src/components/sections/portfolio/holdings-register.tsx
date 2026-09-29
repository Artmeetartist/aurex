import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/button";
import { StatusTag } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { holdings } from "@/content/facts";
import type { SiteContent } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Public register of portfolio holdings, for an ivory surface. Only holdings
 * that are formalised and cleared for disclosure live in `facts.holdings`;
 * until then the register renders a neutral empty state, never placeholder rows.
 */
export function HoldingsRegister({ content, index }: { content: SiteContent; index?: string }) {
  const copy = content.portfolio.holdings;
  const empty = holdings.length === 0;
  // Published only once holdings are formalised and cleared — no placeholder state.
  if (empty) return null;

  return (
    <div className={cn("container-x", empty && "grid gap-12 lg:grid-cols-12 lg:items-end")}>
      <SectionHeading
        index={index}
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
        tone="dark"
        size="md"
        className={cn(empty && "lg:col-span-5")}
      />

      {empty ? (
        <Reveal
          delay={0.1}
          className="rounded-xl border border-ink/10 bg-ivory-200/50 px-7 py-12 sm:px-10 md:px-14 md:py-16 lg:col-span-7"
        >
          <span aria-hidden className="block h-px w-12 bg-gold-ink" />
          <p className="mt-9 max-w-xl text-[clamp(1.375rem,2.1vw,1.875rem)] font-light leading-[1.3] tracking-[-0.022em] text-ink [text-wrap:pretty]">
            {copy.empty}
          </p>
          <StatusTag tone="dark" className="mt-10">
            {content.common.comingSoon}
          </StatusTag>
        </Reveal>
      ) : (
        <RevealGroup as="ul" className="mt-16 border-t border-ink/10 md:mt-20">
          {holdings.map((h) => (
            <RevealItem as="li" key={h.name} className="grid gap-x-8 gap-y-3 border-b border-ink/10 py-8 md:grid-cols-12 md:py-10">
              <h3 className="t-title font-normal text-ink md:col-span-4">{h.name}</h3>
              <p className="t-eyebrow text-gold-ink md:col-span-3 md:pt-2">{content.sectors[h.sector].name}</p>
              <div className="md:col-span-4">
                <p className="text-[0.9375rem] leading-relaxed text-stone">{h.summary}</p>
                {h.url && (
                  <TextLink href={h.url} tone="dark" target="_blank" rel="noopener noreferrer" className="mt-4 min-h-11">
                    {content.common.readMore}
                  </TextLink>
                )}
              </div>
              {h.since && <p className="t-eyebrow tabular-nums text-stone md:col-span-1 md:pt-2 md:text-right">{h.since}</p>}
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}
