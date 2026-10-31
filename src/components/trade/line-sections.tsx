import type { CSSProperties } from "react";
import { Photo } from "@/components/media/photo";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Photo as PhotoData } from "@/content/media";
import type { SiteContent } from "@/content/types";

type Trade = SiteContent["trades"][keyof SiteContent["trades"]];
type Labels = SiteContent["tradePage"];

/**
 * Focus categories as a catalogue: the heading and a photograph of the line's
 * world hold the left column (pinned from `lg`) while the categories, each with
 * its scope and example products, run down the right.
 */
export function CategoryGrid({ trade, labels, photo, tint }: { trade: Trade; labels: Labels; photo: PhotoData; tint: string }) {
  return (
    <section id="categories" className="surface-ivory section-y scroll-mt-20" style={{ "--trade": tint } as CSSProperties}>
      <div className="container-x grid gap-12 md:gap-16 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading title={labels.categoriesTitle} tone="dark" size="md" />
            <Reveal className="relative mt-10 aspect-[4/3] overflow-hidden rounded-xl bg-ivory-300 md:mt-12 lg:aspect-[4/5]">
              <Photo photo={photo} sizes="(min-width: 1024px) 38vw, 100vw" />
            </Reveal>
          </div>
        </div>

        <RevealGroup as="ul" stagger={0.05} className="grid content-start gap-y-12 md:gap-y-14 lg:col-span-7 lg:pt-2">
          {trade.categories.map((c) => (
            <RevealItem as="li" key={c.title} y={10} className="grid gap-x-8 gap-y-3 md:grid-cols-2">
              <h3 className="t-display-sm text-ink">{c.title}</h3>
              <div className="md:pt-1.5">
                <p className="text-[1rem] leading-relaxed text-ink/85">{c.text}</p>
                <ul aria-label={labels.examplesLabel} className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {c.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[1rem] text-ink">
                      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--trade)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/**
 * Reference frameworks as a real table (framework · reference · scope), with
 * the non-certification note. Stacks into one block per framework on phones.
 */
export function StandardsGrid({ trade, labels }: { trade: Trade; labels: Labels }) {
  return (
    <section className="surface-ivory section-y">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading title={labels.standardsTitle} tone="dark" size="md" className="lg:col-span-7" />
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[1rem] leading-relaxed text-ink/80">{labels.standardsNote}</p>
          </Reveal>
        </div>

        <Reveal className="mt-14 md:mt-20">
          <table aria-label={labels.standardsTitle} className="w-full border-collapse border-t border-ink/15 text-left">
            <tbody>
              {trade.standards.map((s) => (
                <tr key={s.title} className="block border-b border-ink/15 py-6 md:table-row md:py-0">
                  <th scope="row" className="t-lead block font-medium text-ink md:table-cell md:w-[32%] md:py-7 md:pr-8 md:align-top">
                    {s.title}
                  </th>
                  <td className="mt-1.5 block text-[1rem] font-medium tabular-nums text-gold-ink md:mt-0 md:table-cell md:w-[26%] md:py-7 md:pr-8 md:pt-[1.95rem] md:align-top">
                    {s.ref}
                  </td>
                  <td className="mt-3 block text-[1rem] leading-relaxed text-ink/85 md:mt-0 md:table-cell md:py-7 md:pt-[1.95rem] md:align-top">
                    {s.text}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

/** Counterpart profiles AUREX seeks to work with, as tone-step panels on ink. */
export function Counterparts({ trade, labels }: { trade: Trade; labels: Labels }) {
  return (
    <section className="surface-ink section-y">
      <div className="container-x">
        <SectionHeading title={labels.counterpartsTitle} size="md" />
        <RevealGroup as="ul" stagger={0.06} className="mt-14 grid gap-2 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {trade.counterparts.map((c) => (
            <RevealItem as="li" key={c.title} y={10} className="rounded-xl bg-ink-850 p-7 md:p-8">
              <h3 className="t-display-sm text-ivory">{c.title}</h3>
              <p className="mt-4 text-[1rem] leading-relaxed text-ivory/85">{c.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
