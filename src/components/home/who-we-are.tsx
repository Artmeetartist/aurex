import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ScrollText } from "@/components/motion/scroll-text";
import { TextLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ArrowRight } from "@/components/ui/icons";
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
            <Eyebrow index="01" tone="dark" className="border-t border-ink/15 pt-4">
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

        <RevealGroup as="ul" stagger={0.06} className="mt-20 grid border-t border-ink/15 md:mt-28 md:grid-cols-3">
          {who.pillars.map((p, i) => (
            <RevealItem as="li" key={p.title} y={12} className="border-b border-ink/15 md:border-b-0 md:border-r md:last:border-r-0">
              <Link
                href={pillarHref[i] ?? href(locale, "about")}
                className="group/p flex h-full flex-col py-8 transition-colors duration-300 hover:bg-ink/[0.03] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold-ink md:px-8 md:py-10 md:first:pl-0 md:hover:first:pl-0"
              >
                <span className="flex items-center justify-between">
                  <span className="t-meta text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                  <ArrowRight size={16} className="text-ink/50 transition-[transform,color] duration-300 group-hover/p:translate-x-1 group-hover/p:text-ink motion-reduce:transform-none" />
                </span>
                <h3 className="mt-10 font-serif text-[1.875rem] leading-[1.1] tracking-[-0.015em] text-ink [font-variation-settings:'opsz'_48] md:mt-16">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-sm text-[1rem] leading-relaxed text-stone">{p.text}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
