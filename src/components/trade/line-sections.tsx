import type { ComponentType, CSSProperties } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/content/types";

type Trade = SiteContent["trades"][keyof SiteContent["trades"]];
type Labels = SiteContent["tradePage"];
type Icon = ComponentType<{ size?: number; className?: string }>;

/** Six focus categories, each with example products. Ivory surface. */
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
    <section id="categories" className="surface-ivory section-y scroll-mt-20">
      <div className="container-x">
        <SectionHeading index={index} eyebrow={labels.categoriesEyebrow} title={labels.categoriesTitle} tone="dark" size="md" />
        <RevealGroup
          as="ul"
          stagger={0.07}
          className="mt-16 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
        >
          {trade.categories.map((c, i) => (
            <RevealItem as="li" key={c.title}>
              <InteractiveCard
                tone="light"
                tilt={4}
                className="elevate-light flex h-full min-h-[26rem] flex-col p-7 md:p-9"
              >
                <span
                  aria-hidden
                  style={{ backgroundColor: tint } as CSSProperties}
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-[0.12] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/card:scale-x-100"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 -right-10 text-ink/[0.035] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover/card:-translate-y-2 group-hover/card:rotate-[-6deg]"
                >
                  <Icon size={200} />
                </span>
                <div className="flex items-center justify-between">
                  <span className="t-eyebrow tabular-nums text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-gold-ink transition-colors duration-500 group-hover/card:border-gold-ink/40">
                    <Icon size={22} />
                  </span>
                </div>
                <h3 className="mt-12 text-[1.625rem] font-light leading-[1.1] tracking-[-0.025em] text-ink [text-wrap:balance]">
                  {c.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">{c.text}</p>
                <div className="relative mt-auto pt-10">
                  <p className="t-eyebrow !text-[0.625rem] text-stone">{labels.examplesLabel}</p>
                  <ul className="mt-3 border-t border-ink/10">
                    {c.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center justify-between gap-4 border-b border-ink/10 py-2.5 text-[0.875rem] text-ink/80"
                      >
                        {item}
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink/15 transition-colors duration-500 group-hover/card:bg-gold-ink"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </InteractiveCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/** Reference frameworks, presented as documents, with the non-certification note. */
export function StandardsGrid({ index, trade, labels }: { index: string; trade: Trade; labels: Labels }) {
  return (
    <section className="surface-ivory section-y relative overflow-hidden">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            index={index}
            eyebrow={labels.standardsEyebrow}
            title={labels.standardsTitle}
            tone="dark"
            size="md"
            className="lg:col-span-7"
          />
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <p className="flex gap-4 rounded-[1.25rem] border border-ink/10 bg-ivory-200/70 p-5 text-[0.875rem] leading-relaxed text-ink/75">
              <span
                aria-hidden
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold-ink/50 text-[0.75rem] font-medium text-gold-ink"
              >
                i
              </span>
              {labels.standardsNote}
            </p>
          </Reveal>
        </div>

        <RevealGroup as="ul" stagger={0.08} className="mt-16 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {trade.standards.map((s) => (
            <RevealItem as="li" key={s.title}>
              <article className="group relative flex h-full min-h-[17rem] flex-col overflow-hidden rounded-[1.5rem] border border-ink/10 bg-[linear-gradient(170deg,#ffffff_0%,var(--color-ivory-200)_100%)] p-7 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-gold-ink/30 hover:shadow-[0_30px_60px_-34px_rgb(1_51_51/0.4)] md:p-8">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 -top-12 select-none text-[11rem] font-extralight leading-none text-ink/[0.045] transition-colors duration-500 group-hover:text-gold-ink/10"
                >
                  §
                </span>
                <p className="relative flex items-center gap-3 text-[0.8125rem] font-medium tracking-[-0.005em] text-gold-ink">
                  <span aria-hidden className="h-px w-5 shrink-0 bg-gold-ink/50" />
                  {s.ref}
                </p>
                <h3 className="relative mt-auto pt-14 text-[1.375rem] font-light leading-tight tracking-[-0.02em] text-ink">
                  {s.title}
                </h3>
                <p className="relative mt-3 text-[0.9rem] leading-relaxed text-stone">{s.text}</p>
              </article>
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
  tint,
  ctaHref,
}: {
  index: string;
  trade: Trade;
  labels: Labels;
  tint: string;
  ctaHref: string;
}) {
  return (
    <section className="surface-ink section-y relative overflow-hidden" style={{ "--trade": tint } as CSSProperties}>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] -top-1/3 h-[50rem] w-[50rem] rounded-full opacity-[0.14] [background:radial-gradient(closest-side,var(--trade),transparent_70%)]"
      />
      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading index={index} eyebrow={labels.counterpartsEyebrow} title={labels.counterpartsTitle} size="md" className="lg:col-span-8" />
          <Reveal delay={0.15} className="lg:col-span-4 lg:justify-self-end">
            <ButtonLink href={ctaHref} variant="gold">
              {labels.counterpartsCta}
            </ButtonLink>
          </Reveal>
        </div>
        <RevealGroup as="ul" stagger={0.08} className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {trade.counterparts.map((c, i) => (
            <RevealItem as="li" key={c.title} className="group relative bg-ink-950/90 p-7 transition-colors duration-500 hover:bg-ink-850 md:p-9">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--trade)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />
              <span className="text-[2.75rem] font-extralight leading-none tracking-[-0.04em] text-ivory/15 transition-colors duration-500 group-hover:text-ivory/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-14 text-[1.375rem] font-light leading-tight tracking-[-0.02em] text-ivory">{c.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{c.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
