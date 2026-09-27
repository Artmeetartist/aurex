import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/button";
import { StatusTag } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectors } from "@/content/facts";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { href } from "@/lib/routes";

/**
 * 04 — Sectors of strategic interest, as an editorial index.
 * None of these is an operating business, so every row carries the
 * "strategic focus" status.
 */
export function Sectors({ locale, content }: { locale: Locale; content: SiteContent }) {
  const copy = content.home.sectors;
  const status = content.common.status.strategic;

  return (
    <section className="surface-ivory section-y relative">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            index="04"
            eyebrow={copy.eyebrow}
            title={copy.title}
            accent={copy.accent}
            intro={copy.intro}
            tone="dark"
            size="md"
            className="lg:col-span-8"
          />
          <div className="lg:col-span-4 lg:justify-self-end">
            <TextLink href={href(locale, "portfolio")} tone="dark" className="min-h-11">
              {copy.link}
            </TextLink>
          </div>
        </div>

        <RevealGroup as="ol" className="mt-16 border-t border-ink/10 md:mt-24" stagger={0.06}>
          {sectors.map((s, i) => {
            const sector = content.sectors[s.id];
            return (
              <RevealItem as="li" key={s.id} className="group relative border-b border-ink/10">
                <div className="grid grid-cols-[2.75rem_1fr] gap-x-4 gap-y-5 py-9 transition-transform duration-700 ease-[var(--ease-out-expo)] sm:grid-cols-[4.5rem_1fr] md:grid-cols-12 md:gap-x-8 md:py-12 md:group-hover:translate-x-3">
                  <span
                    aria-hidden
                    className="pt-1 text-[clamp(1.5rem,3.2vw,3rem)] font-light leading-none tracking-[-0.04em] tabular-nums text-ink/30 transition-colors duration-500 group-hover:text-gold-ink md:col-span-1 md:pt-0"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="md:col-span-5">
                    <h3 className="text-[clamp(1.625rem,2.6vw,2.5rem)] font-light leading-[1.08] tracking-[-0.03em] text-ink [text-wrap:balance]">
                      {sector.name}
                    </h3>
                    <StatusTag tone="dark" className="mt-5">
                      {status}
                    </StatusTag>
                  </div>

                  <div className="col-start-2 md:col-span-6 md:col-start-7 md:pt-1.5">
                    <p className="max-w-xl text-[1rem] leading-relaxed text-stone md:text-[1.0625rem]">{sector.summary}</p>
                    <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                      {sector.focus.map((f) => (
                        <li key={f} className="t-eyebrow inline-flex items-center gap-2.5 !tracking-[0.14em] text-stone">
                          <span aria-hidden className="h-px w-2.5 bg-ink/30" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-gold-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
