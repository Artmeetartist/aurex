import type { ComponentType, CSSProperties } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/content/types";

type Trade = SiteContent["trades"][keyof SiteContent["trades"]];
type Labels = SiteContent["tradePage"];
type Icon = ComponentType<{ size?: number; className?: string }>;

/**
 * Focus categories as a catalogue register: one row per category, with its
 * scope and example products. Reads like a product schedule, not a card grid.
 */
export function CategoryGrid({
  index,
  trade,
  labels,
  icon: Icon,
  tint,
}: {
  index: string;
  trade: Trade;
  labels: Labels;
  icon: Icon;
  tint: string;
}) {
  return (
    <section id="categories" className="surface-ivory section-y scroll-mt-20" style={{ "--trade": tint } as CSSProperties}>
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading index={index} eyebrow={labels.categoriesEyebrow} title={labels.categoriesTitle} tone="dark" size="md" className="lg:col-span-8" />
          <Reveal className="hidden justify-self-end text-ink/25 lg:col-span-4 lg:block">
            <Icon size={72} />
          </Reveal>
        </div>


        <RevealGroup as="ol" stagger={0.05} className="mt-14 border-t border-ink/15 md:mt-20">
          {trade.categories.map((c, i) => (
            <RevealItem
              as="li"
              key={c.title}
              y={10}
              className="group grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-3 border-b border-ink/15 py-7 md:py-9 lg:grid-cols-[3rem_minmax(0,1.1fr)_minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-x-8"
            >
              <span className="t-meta pt-1.5 text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-serif text-[1.5rem] leading-[1.15] tracking-[-0.012em] text-ink [font-variation-settings:'opsz'_36] lg:text-[1.75rem]">
                {c.title}
              </h3>
              <p className="col-start-2 text-[1rem] leading-relaxed text-stone lg:col-start-auto lg:pt-1">{c.text}</p>
              <ul className="col-start-2 flex flex-wrap gap-x-4 gap-y-1.5 lg:col-start-auto lg:block lg:space-y-1.5 lg:pt-1.5">
                {c.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[0.9375rem] text-ink/80">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--trade)] opacity-80" />
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/** Reference frameworks as a register (framework · reference · scope), with the non-certification note. */
export function StandardsGrid({ index, trade, labels }: { index: string; trade: Trade; labels: Labels }) {
  return (
    <section className="surface-ivory section-y relative border-t border-ink/10">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading index={index} eyebrow={labels.standardsEyebrow} title={labels.standardsTitle} tone="dark" size="md" className="lg:col-span-7" />
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="border-l-2 border-gold-ink/60 pl-5 text-[0.9375rem] leading-relaxed text-ink/75">{labels.standardsNote}</p>
          </Reveal>
        </div>

        <RevealGroup as="dl" stagger={0.05} className="mt-14 border-t border-ink/15 md:mt-20">
          {trade.standards.map((s) => (
            <RevealItem
              key={s.title}
              y={10}
              className="grid gap-x-8 gap-y-2 border-b border-ink/15 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)] md:py-8"
            >
              <dt className="font-serif text-[1.375rem] leading-[1.2] tracking-[-0.01em] text-ink [font-variation-settings:'opsz'_36]">
                {s.title}
              </dt>
              <dd className="t-meta pt-1 text-[0.8125rem] text-gold-ink md:pt-2">{s.ref}</dd>
              <dd className="text-[1rem] leading-relaxed text-stone md:pt-1">{s.text}</dd>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/** Counterpart profiles and the partnership call to action. Ink surface. */
export function Counterparts({
  index,
  trade,
  labels,
}: {
  index: string;
  trade: Trade;
  labels: Labels;
  tint?: string;
}) {
  return (
    <section className="surface-ink section-y relative">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading index={index} eyebrow={labels.counterpartsEyebrow} title={labels.counterpartsTitle} size="md" className="lg:col-span-8" />
        </div>
        <RevealGroup as="ul" stagger={0.06} className="mt-14 grid border-t border-white/15 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {trade.counterparts.map((c, i) => (
            <RevealItem
              as="li"
              key={c.title}
              y={10}
              className="border-b border-white/15 py-8 sm:pr-8 lg:border-b-0 lg:border-r lg:py-10 lg:pl-8 lg:first:pl-0 lg:last:border-r-0"
            >
              <span className="t-meta text-mist-dim">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-serif text-[1.5rem] leading-[1.15] tracking-[-0.012em] text-ivory [font-variation-settings:'opsz'_36] lg:mt-12">
                {c.title}
              </h3>
              <p className="mt-3 text-[1rem] leading-relaxed text-mist">{c.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
