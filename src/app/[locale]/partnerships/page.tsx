import { CtaBand } from "@/components/page/cta-band";
import { PageHero } from "@/components/page/page-hero";
import { ModelCards } from "@/components/sections/partnerships/model-cards";
import { OfferGrid } from "@/components/sections/partnerships/offer-grid";
import { ProcessSteps } from "@/components/sections/partnerships/process-steps";
import { SeekList } from "@/components/sections/partnerships/seek-list";
import { SectionHeading } from "@/components/ui/section-heading";
import { loadPage, metadataFor } from "@/lib/page";
import { contactHref, href } from "@/lib/routes";

export const generateMetadata = metadataFor("partnerships");

export default async function PartnershipsPage({ params }: PageProps<"/[locale]/partnerships">) {
  const { locale, content } = await loadPage(params);
  const { partnerships, nav, common } = content;

  return (
    <>
      <PageHero
        hero={partnerships.hero}
        breadcrumb={{ home: common.breadcrumbHome, homeHref: href(locale, "home"), current: nav.labels.partnerships }}
      />

      {/* Partnership models */}
      <section className="surface-ivory section-y">
        <div className="container-x">
          <SectionHeading
            index="01"
            eyebrow={partnerships.models.eyebrow}
            title={partnerships.models.title}
            intro={partnerships.models.intro}
            tone="dark"
          />
          <ModelCards locale={locale} content={content} className="mt-16 md:mt-20" />
        </div>
      </section>

      {/* What AUREX brings + what we look for */}
      <section className="surface-ink section-y relative overflow-hidden">
        <div className="container-x relative">
          <SectionHeading
            index="02"
            eyebrow={partnerships.offer.eyebrow}
            title={partnerships.offer.title}
            intro={partnerships.offer.intro}
          />
          <OfferGrid items={partnerships.offer.items} className="mt-16 md:mt-20" />

          <div className="mt-28 grid gap-14 border-t border-white/10 pt-16 md:mt-40 md:pt-24 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <SectionHeading
                  index="03"
                  eyebrow={partnerships.seek.eyebrow}
                  title={partnerships.seek.title}
                  intro={partnerships.seek.intro}
                  size="md"
                />
              </div>
            </div>
            <SeekList items={partnerships.seek.items} className="lg:col-span-6 lg:col-start-7" />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="surface-ivory section-y">
        <div className="container-x">
          <SectionHeading
            index="04"
            eyebrow={partnerships.process.eyebrow}
            title={partnerships.process.title}
            intro={partnerships.process.intro}
            tone="dark"
          />
          <ProcessSteps steps={partnerships.process.steps} className="mt-16 md:mt-24" />
        </div>
      </section>

      <CtaBand
        eyebrow={partnerships.cta.eyebrow}
        title={partnerships.cta.title}
        intro={partnerships.cta.intro}
        primary={{ label: partnerships.cta.primary, href: contactHref(locale, "partnership") }}
      />
    </>
  );
}
