import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ScrollText } from "@/components/motion/scroll-text";
import { TextLink } from "@/components/ui/button";
import { CardArrow } from "@/components/ui/card-arrow";
import { Eyebrow } from "@/components/ui/eyebrow";
import { InteractiveCard } from "@/components/ui/interactive-card";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { href } from "@/lib/routes";

export function WhoWeAre({ locale, content }: { locale: Locale; content: SiteContent }) {
  const { who } = content.home;
  // Pillars in content order: Trading, Holdings, Investment.
  const pillarHref = [href(locale, "trade"), href(locale, "portfolio"), href(locale, "portfolio")];
  return (
    <section aria-labelledby="who-title" className="surface-ivory section-y relative">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow index="01" tone="dark">
              {who.eyebrow}
            </Eyebrow>
          </div>
          <div className="lg:col-span-9">
            <h2 id="who-title" className="sr-only">
              {who.eyebrow}
            </h2>
            <ScrollText text={who.statement} className="t-display-md text-ink" />
            <div className="mt-12">
              <TextLink href={href(locale, "about")} tone="dark">
                {who.link}
              </TextLink>
            </div>
          </div>
        </div>

        <RevealGroup as="ul" className="mt-24 grid gap-px overflow-hidden rounded-[1.75rem] border border-ink/10 bg-ink/10 md:grid-cols-3">
          {who.pillars.map((p, i) => (
            <RevealItem as="li" key={p.title} className="bg-ivory">
              <InteractiveCard
                href={pillarHref[i] ?? href(locale, "about")}
                tone="light"
                tilt={0}
                className="flex h-full flex-col rounded-none border-0 bg-ivory p-8 hover:bg-ivory-200 hover:shadow-none focus-visible:bg-ivory-200 focus-visible:outline-offset-[-6px] md:p-10"
              >
                <span className="flex items-start justify-between gap-6">
                  <span aria-hidden className="t-eyebrow pt-2 text-gold-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <CardArrow />
                </span>
                <h3 className="mt-12 text-[1.75rem] font-light tracking-[-0.025em] text-ink md:mt-20">{p.title}</h3>
                <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-stone">{p.text}</p>
                <span
                  aria-hidden
                  className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-gold-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/card:scale-x-100 group-focus-visible/card:scale-x-100 md:inset-x-10"
                />
              </InteractiveCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
