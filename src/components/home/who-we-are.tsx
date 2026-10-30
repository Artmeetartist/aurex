import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ScrollText } from "@/components/motion/scroll-text";
import { TextLink } from "@/components/ui/button";
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
        <h2 id="who-title" className="sr-only">
          {who.eyebrow}
        </h2>
        <ScrollText text={who.statement} className="t-display-sm max-w-[74rem] text-ink" />
        <TextLink href={href(locale, "about")} tone="dark" className="mt-8">
          {who.link}
        </TextLink>

        <RevealGroup
          as="ul"
          stagger={0.06}
          className="mt-14 grid overflow-hidden rounded-xl bg-ivory-200 md:mt-20 lg:grid-cols-3"
        >
          {who.pillars.map((p, i) => (
            <RevealItem as="li" key={p.title} y={12}>
              <Link
                href={pillarHref[i] ?? href(locale, "about")}
                className="group/p flex h-full flex-col p-6 transition-colors duration-300 hover:bg-ivory-300 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold-ink sm:p-8 lg:p-10"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <h3 className="t-display-sm text-ink">{p.title}</h3>
                  <ArrowRight
                    size={18}
                    className="shrink-0 text-ink/60 transition-[transform,color] duration-300 group-hover/p:translate-x-1 group-hover/p:text-ink motion-reduce:transform-none"
                  />
                </div>
                <p className="t-body mt-4 max-w-sm text-ink/85 lg:mt-10">{p.text}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
