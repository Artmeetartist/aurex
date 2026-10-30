import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/button";
import { Check } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { href } from "@/lib/routes";

/** Leadership & governance teaser. Principles only; no people are shown. */
export function LeadershipTeaser({ locale, content }: { locale: Locale; content: SiteContent }) {
  const copy = content.home.leadership;

  return (
    <section className="surface-ivory section-y relative">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <SectionHeading title={copy.title} tone="dark" size="md" className="lg:col-span-7" />
          <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
            {copy.intro && <p className="t-lead text-ink/85">{copy.intro}</p>}
            <TextLink href={href(locale, "about", "leadership")} tone="dark" className="mt-4">
              {copy.link}
            </TextLink>
          </Reveal>
        </div>

        <RevealGroup as="ul" className="mt-14 grid gap-x-10 gap-y-8 md:mt-20 md:grid-cols-2 md:gap-y-12">
          {copy.principles.map((principle) => (
            <RevealItem as="li" key={principle} className="flex gap-4 md:gap-5">
              <Check size={20} className="mt-[0.4em] shrink-0 text-gold-ink" />
              <p className="t-display-sm text-ink">{principle}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
