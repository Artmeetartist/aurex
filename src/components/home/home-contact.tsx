import Image from "next/image";
import { Suspense } from "react";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { company } from "@/content/facts";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";

/** 09 — Closing contact section with the inquiry form. */
export function HomeContact({ locale, content }: { locale: Locale; content: SiteContent }) {
  const copy = content.home.contact;
  const { direct } = content.contact;

  return (
    <section id="contact" className="surface-ink section-y relative scroll-mt-[var(--header-h)] overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/media/stills/still-connected.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.16] grayscale-[35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-ink/70" />
      </div>

      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              index="09"
              eyebrow={copy.eyebrow}
              title={copy.title}
              accent={copy.accent}
              intro={copy.intro}
              size="md"
            />
            <Reveal delay={0.2} className="mt-12 max-w-md border-t border-white/10 pt-6">
              {company.email && (
                <p className="mb-5 flex flex-col gap-1">
                  <span className="t-eyebrow text-mist">{copy.direct}</span>
                  <a
                    href={`mailto:${company.email}`}
                    className="inline-flex min-h-11 items-center self-start text-[1.0625rem] text-ivory underline decoration-gold/50 underline-offset-[6px] transition-colors hover:text-gold-soft hover:decoration-gold"
                  >
                    {company.email}
                  </a>
                </p>
              )}
              <p className="text-[0.8125rem] leading-relaxed text-mist-dim">{direct.responseNote}</p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7">
          <div className="glass rounded-[1.75rem] p-5 empty:hidden sm:p-8 md:p-10">
            <Suspense fallback={null}>
              <InquiryForm locale={locale} inquiry={content.inquiry} surface="dark" />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
