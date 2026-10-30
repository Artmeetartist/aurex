import Image from "next/image";
import { Suspense } from "react";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { company } from "@/content/facts";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";

/** Closing contact section: the invitation and a picture beside the inquiry form. */
export function HomeContact({ locale, content }: { locale: Locale; content: SiteContent }) {
  const copy = content.home.contact;
  const { direct } = content.contact;

  return (
    <section id="contact" className="surface-ink section-y relative scroll-mt-[var(--header-h)]">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <SectionHeading title={copy.title} intro={copy.intro} size="md" />
          <Reveal delay={0.2} className="mt-8 max-w-md">
            {company.email && (
              <p className="mb-5 flex flex-col gap-1">
                <span className="t-small text-mist">{copy.direct}</span>
                <a
                  href={`mailto:${company.email}`}
                  className="t-lead inline-flex min-h-11 items-center self-start text-ivory underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-ivory"
                >
                  {company.email}
                </a>
              </p>
            )}
            <p className="t-small text-mist">{direct.responseNote}</p>
          </Reveal>
          <Reveal delay={0.25} className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-xl bg-ink-850 lg:block">
            <Image
              src="/media/stills/still-air.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7">
          <div className="rounded-xl bg-ivory p-6 text-ink empty:hidden sm:p-8 md:p-10">
            <Suspense fallback={null}>
              <InquiryForm locale={locale} inquiry={content.inquiry} surface="light" />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
