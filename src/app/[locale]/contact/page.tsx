import { Suspense } from "react";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/page/page-hero";
import { ArrowUpRight } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { company } from "@/content/facts";
import type { SiteContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { loadPage, metadataFor } from "@/lib/page";
import { href, inquiryTypes } from "@/lib/routes";

export const generateMetadata = metadataFor("contact");

/** Direct channel: the published mailbox when confirmed, otherwise the pending note. */
function DirectContact({ direct, className }: { direct: SiteContent["contact"]["direct"]; className?: string }) {
  return (
    <div className={cn("rounded-[1.5rem] border border-ink/10 bg-ivory-200/50 p-7 md:p-8", className)}>
      <h3 className="t-eyebrow flex items-center gap-3 text-stone">
        <span aria-hidden className="h-px w-8 bg-gold-ink/50" />
        {direct.title}
      </h3>
      {company.email ? (
        <p className="mt-6">
          <span className="block text-[0.8125rem] text-stone">{direct.emailLabel}</span>
          <a
            href={`mailto:${company.email}`}
            className="group mt-1.5 inline-flex min-h-11 items-center gap-2 break-all text-[1.375rem] font-light tracking-[-0.02em] text-ink transition-colors hover:text-gold-ink"
          >
            {company.email}
            <ArrowUpRight size={14} className="shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </p>
      ) : (
        <p className="mt-6 text-[1.0625rem] font-light leading-relaxed tracking-[-0.01em] text-ink">{direct.emailPending}</p>
      )}
      <p className="t-small mt-6 border-t border-ink/10 pt-5 text-stone">{direct.responseNote}</p>
    </div>
  );
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale, content } = await loadPage(params);
  const { contact, inquiry, nav, common } = content;

  return (
    <>
      <PageHero
        hero={contact.hero}
        image="/media/stills/still-connected"
        breadcrumb={{ home: common.breadcrumbHome, homeHref: href(locale, "home"), current: nav.labels.contact }}
      />

      <section id="inquiry" className="surface-ivory section-y scroll-mt-[var(--header-h)]">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="01"
                eyebrow={contact.routes.eyebrow}
                title={contact.routes.title}
                accent={contact.routes.accent}
                intro={contact.routes.intro}
                tone="dark"
                size="md"
              />

              {/* On small screens the form's own type cards carry this information. */}
              <RevealGroup as="ol" className="mt-14 hidden border-t border-ink/10 lg:block">
                {inquiryTypes.map((type, i) => (
                  <RevealItem as="li" key={type} className="grid grid-cols-[2.75rem_1fr] border-b border-ink/10 py-6">
                    <span className="t-eyebrow pt-2 text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="text-[1.3125rem] font-light tracking-[-0.02em] text-ink">{inquiry.types[type].label}</p>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-stone">{inquiry.types[type].description}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>

              <Reveal delay={0.1} className="mt-10 hidden lg:block">
                <DirectContact direct={contact.direct} />
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal y={20}>
              <div className="rounded-[1.75rem] border border-white/10 bg-ink-850 p-6 text-ivory shadow-[0_48px_96px_-56px_rgb(17_17_17/0.55)] sm:p-9 md:p-12">
                <Suspense fallback={null}>
                  <InquiryForm locale={locale} inquiry={inquiry} surface="dark" />
                </Suspense>
              </div>
            </Reveal>

            <DirectContact direct={contact.direct} className="mt-8 lg:hidden" />
          </div>
        </div>
      </section>
    </>
  );
}
