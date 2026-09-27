import { AnchorOnLoad } from "@/components/inquiry/anchor-on-load";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/page/cta-band";
import { PageHero } from "@/components/page/page-hero";
import { ConnectionSequence } from "@/components/sections/businesses/connection-sequence";
import { DivisionIndex } from "@/components/sections/businesses/division-index";
import { DivisionRow } from "@/components/sections/businesses/division-row";
import { SectorGrid } from "@/components/sections/businesses/sector-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { divisions } from "@/content/facts";
import { loadPage, metadataFor } from "@/lib/page";
import { contactHref, href } from "@/lib/routes";

export const generateMetadata = metadataFor("businesses");

export default async function BusinessesPage({ params }: PageProps<"/[locale]/businesses">) {
  const { locale, content } = await loadPage(params);
  const { businesses, nav, common } = content;
  const chapters = content.home.motion.chapters;
  const modeOf = (d: (typeof divisions)[number]) =>
    chapters.find((c) => c.division === d.id)?.mode ?? content.home.hero.modes[d.mode];

  return (
    <>
      <PageHero
        hero={businesses.hero}
        image="/media/stills/still-land"
        breadcrumb={{ home: common.breadcrumbHome, homeHref: href(locale, "home"), current: nav.labels.businesses }}
      >
        <DivisionIndex
          label={businesses.core.eyebrow}
          items={divisions.map((d) => ({ id: d.id, name: content.divisions[d.id].short }))}
        />
      </PageHero>
      {divisions.map((d) => (
        <AnchorOnLoad key={d.id} id={d.id} />
      ))}

      {/* Core business areas */}
      <section className="surface-ivory section-y">
        <div className="container-x">
          <SectionHeading index="01" eyebrow={businesses.core.eyebrow} title={businesses.core.title} accent={businesses.core.accent} tone="dark" />

          <div className="mt-20 space-y-24 md:mt-28 md:space-y-36 lg:space-y-40">
            {divisions.map((d, i) => {
              const division = content.divisions[d.id];
              return (
                <DivisionRow
                  key={d.id}
                  id={d.id}
                  index={i}
                  total={divisions.length}
                  mode={modeOf(d)}
                  name={division.name}
                  summary={division.summary}
                  scope={division.scope}
                  scopeLabel={businesses.scopeLabel}
                  image={d.image}
                  reverse={i % 2 === 1}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* How it connects */}
      <section className="surface-ink-deep section-y relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/3 left-[-15%] h-[56rem] w-[56rem] rounded-full opacity-70 [background:radial-gradient(closest-side,color-mix(in_oklab,var(--color-teal,var(--color-gold))_16%,transparent),transparent_70%)]"
        />
        <div className="container-x relative">
          <SectionHeading
            index="02"
            eyebrow={businesses.connection.eyebrow}
            title={businesses.connection.title}
            accent={businesses.connection.accent}
            intro={businesses.connection.intro}
          />
          <div className="mt-16 md:mt-24">
            <ConnectionSequence
              steps={businesses.connection.steps.map((step, i) => {
                const d = divisions[i];
                return d ? { ...step, link: { label: content.divisions[d.id].short, href: `#${d.id}` } } : step;
              })}
            />
          </div>
        </div>
      </section>

      {/* Sectors of strategic interest */}
      <section className="surface-ivory section-y">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <SectionHeading
              index="03"
              eyebrow={businesses.verticals.eyebrow}
              title={businesses.verticals.title}
              accent={businesses.verticals.accent}
              intro={businesses.verticals.intro}
              tone="dark"
              size="md"
              className="lg:col-span-7"
            />
            <Reveal delay={0.2} className="lg:col-span-4 lg:col-start-9">
              <p className="border-l border-gold-ink/60 pl-6 text-[0.9375rem] leading-relaxed text-ink/80">
                {businesses.verticals.note}
              </p>
            </Reveal>
          </div>

          <div className="mt-16 md:mt-20">
            <SectorGrid content={content} />
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow={businesses.cta.eyebrow}
        title={businesses.cta.title}
        accent={businesses.cta.accent}
        intro={businesses.cta.intro}
        primary={{ label: businesses.cta.primary, href: contactHref(locale, "partnership") }}
      />
    </>
  );
}
