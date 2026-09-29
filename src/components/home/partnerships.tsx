import { Reveal } from "@/components/motion/reveal";
import { ModelCards } from "@/components/sections/partnerships/model-cards";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { href } from "@/lib/routes";

/** 07 — Strategic partnerships: the four partner models. */
export function Partnerships({ locale, content }: { locale: Locale; content: SiteContent }) {
  const copy = content.home.partnerships;

  return (
    <section className="surface-ink section-y relative overflow-hidden">
      <div className="container-x relative">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            index="08"
            eyebrow={copy.eyebrow}
            title={copy.title}
            intro={copy.intro}
            size="md"
          />
          <Reveal delay={0.2} className="shrink-0">
            <ButtonLink href={href(locale, "partnerships")} variant="outline-light">
              {copy.cta}
            </ButtonLink>
          </Reveal>
        </div>

        <ModelCards locale={locale} content={content} tone="light" className="mt-16 md:mt-20" />
      </div>
    </section>
  );
}
