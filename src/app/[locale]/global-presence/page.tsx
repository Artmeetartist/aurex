import { GlobalReach } from "@/components/home/global-reach";
import { CtaBand } from "@/components/page/cta-band";
import { PageHero } from "@/components/page/page-hero";
import { CorridorGrid } from "@/components/sections/presence/corridor-grid";
import { OfficeRegister } from "@/components/sections/presence/office-register";
import { SectionHeading } from "@/components/ui/section-heading";
import { loadPage, metadataFor } from "@/lib/page";
import { contactHref, href } from "@/lib/routes";

export const generateMetadata = metadataFor("presence");

export default async function GlobalPresencePage({ params }: PageProps<"/[locale]/global-presence">) {
  const { locale, content } = await loadPage(params);
  const { presence, nav, common } = content;
  const { footnote, ...mapHeading } = presence.map;

  return (
    <>
      <PageHero
        hero={presence.hero}
        image="/media/stills/still-air"
        breadcrumb={{ home: common.breadcrumbHome, homeHref: href(locale, "home"), current: nav.labels.presence }}
      />

      {/* Markets of focus */}
      <GlobalReach locale={locale} content={content} heading={mapHeading} footnote={footnote} index="01" />

      {/* Strategic corridors */}
      <section className="surface-ivory section-y">
        <div className="container-x">
          <SectionHeading
            index="02"
            eyebrow={presence.corridors.eyebrow}
            title={presence.corridors.title}
            accent={presence.corridors.accent}
            intro={presence.corridors.intro}
            tone="dark"
          />
          <CorridorGrid items={presence.corridors.items} className="mt-16 md:mt-20" />
        </div>
      </section>

      {/* Registered office & representation */}
      <OfficeRegister index="03" content={content} />

      <CtaBand
        eyebrow={presence.cta.eyebrow}
        title={presence.cta.title}
        accent={presence.cta.accent}
        intro={presence.cta.intro}
        primary={{ label: presence.cta.primary, href: contactHref(locale) }}
      />
    </>
  );
}
