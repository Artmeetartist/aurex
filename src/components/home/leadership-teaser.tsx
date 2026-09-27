import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/button";
import { Check } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { href } from "@/lib/routes";

/** 08 — Leadership & governance teaser. Principles only; no people are shown. */
export function LeadershipTeaser({ locale, content }: { locale: Locale; content: SiteContent }) {
  const copy = content.home.leadership;

  return (
    <section className="surface-ivory section-y relative">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            index="09"
            eyebrow={copy.eyebrow}
            title={copy.title}
            accent={copy.accent}
            tone="dark"
            size="md"
            className="lg:col-span-7"
          />
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            {copy.intro && <p className="t-lead text-stone">{copy.intro}</p>}
            <TextLink href={href(locale, "about", "leadership")} tone="dark" className="mt-6 min-h-11">
              {copy.link}
            </TextLink>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          className="mt-16 grid border-t border-ink/10 sm:grid-cols-2 md:mt-24 lg:grid-cols-4"
        >
          {copy.principles.map((principle, i) => (
            <RevealItem
              as="li"
              key={principle}
              className="group flex gap-5 border-b border-ink/10 py-8 sm:flex-col sm:gap-12 sm:py-10 sm:pr-8 sm:even:border-l sm:even:pl-8 lg:border-b-0 lg:pb-2 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-8"
            >
              <span className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-ink/35 text-gold-ink transition-[background-color,border-color,color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:border-gold-ink group-hover:bg-gold-ink group-hover:text-ivory motion-reduce:transform-none"
                >
                  <Check size={14} />
                </span>
                <span aria-hidden className="t-eyebrow hidden text-stone transition-colors duration-500 group-hover:text-gold-ink sm:inline">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <p className="pt-1.5 text-[1.25rem] font-light leading-snug tracking-[-0.015em] text-ink sm:pt-0 md:text-[1.375rem]">
                {principle}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
