import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ScrollText } from "@/components/motion/scroll-text";
import { CtaBand } from "@/components/page/cta-band";
import { PageHero } from "@/components/page/page-hero";
import { ApproachColumns } from "@/components/sections/leadership/approach-columns";
import { LeaderProfiles } from "@/components/sections/leadership/leader-profiles";
import { CardArrow } from "@/components/ui/card-arrow";
import { Eyebrow } from "@/components/ui/eyebrow";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { divisions, leaders } from "@/content/facts";
import { loadPage, metadataFor } from "@/lib/page";
import { contactHref, href } from "@/lib/routes";

export const generateMetadata = metadataFor("about");

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale, content } = await loadPage(params);
  const { about, leadership, nav, common } = content;

  return (
    <>
      <PageHero
        hero={about.hero}
        image="/media/stills/still-portland"
        breadcrumb={{ home: common.breadcrumbHome, homeHref: href(locale, "home"), current: nav.labels.about }}
      />

      {/* Name + story */}
      <section className="surface-ivory section-y">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Eyebrow index="01" tone="dark">
                {about.hero.eyebrow}
              </Eyebrow>
            </div>
            <ScrollText text={about.statement} className="t-display-md text-ink lg:col-span-9" />
          </div>

          <div className="mt-28 grid gap-14 border-t border-ink/10 pt-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <SectionHeading eyebrow={about.story.eyebrow} title={about.story.title} accent={about.story.accent} tone="dark" size="md" />
              </div>
            </div>
            <RevealGroup className="space-y-8 lg:col-span-6 lg:col-start-7">
              {about.story.paragraphs.map((p) => (
                <RevealItem key={p.slice(0, 24)}>
                  <p className="t-lead text-stone">{p}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="surface-ink section-y">
        <div className="container-x">
          <SectionHeading index="02" eyebrow={about.principles.eyebrow} title={about.principles.title} accent={about.principles.accent} />
          <RevealGroup as="ul" className="mt-20 grid gap-4 md:grid-cols-2 md:gap-5">
            {about.principles.items.map((item, i) => (
              <RevealItem as="li" key={item.title} className="h-full">
                <InteractiveCard tone="dark" tilt={3} className="flex h-full flex-col p-8 md:p-12">
                  <span aria-hidden className="t-eyebrow text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-14 text-[1.75rem] font-light leading-tight tracking-[-0.025em] text-ivory md:text-[2rem]">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-mist">{item.text}</p>
                  <span aria-hidden className="mt-auto block pt-8">
                    <span className="block h-px w-10 bg-gold/60 transition-[width] duration-700 ease-[var(--ease-out-expo)] group-hover/card:w-full" />
                  </span>
                </InteractiveCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Group structure */}
      <section className="surface-ivory section-y">
        <div className="container-x">
          <SectionHeading
            index="03"
            eyebrow={about.structure.eyebrow}
            title={about.structure.title}
            accent={about.structure.accent}
            intro={about.structure.intro}
            tone="dark"
          />

          <div className="mt-20">
            <Reveal className="mx-auto max-w-md rounded-[1.5rem] bg-ink p-8 text-center text-ivory">
              <p className="t-eyebrow text-gold">{about.structure.groupLabel}</p>
              <p className="mt-3 text-[1.0625rem] text-ivory/85">{about.structure.groupText}</p>
            </Reveal>
            <div aria-hidden className="mx-auto h-12 w-px bg-ink/20" />
            <div aria-hidden className="mx-auto hidden h-px w-3/4 bg-ink/20 md:block" />
            <RevealGroup as="ul" className="grid gap-4 md:grid-cols-4 md:gap-6">
              {divisions.map((d, i) => (
                <RevealItem as="li" key={d.id} className="relative flex flex-col">
                  <span aria-hidden className="mx-auto hidden h-10 w-px shrink-0 bg-ink/20 md:block" />
                  <InteractiveCard
                    href={href(locale, "trade", d.id)}
                    tone="light"
                    className="flex flex-1 flex-col bg-ivory-200/60 p-7 hover:bg-ivory focus-visible:bg-ivory"
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span aria-hidden className="t-eyebrow pt-2 text-gold-ink">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <CardArrow />
                    </span>
                    <h3 className="mt-6 text-[1.25rem] font-normal tracking-[-0.015em] text-ink">{content.divisions[d.id].short}</h3>
                    <p className="mt-3 text-[0.875rem] leading-relaxed text-stone">{content.divisions[d.id].summary}</p>
                  </InteractiveCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="surface-ink-deep section-y">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="04"
                eyebrow={about.governance.eyebrow}
                title={about.governance.title}
                accent={about.governance.accent}
                intro={about.governance.intro}
                size="md"
              />
            </div>
          </div>
          <RevealGroup as="ol" className="border-t border-white/10 lg:col-span-6 lg:col-start-7">
            {about.governance.items.map((item, i) => (
              <RevealItem as="li" key={item.title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-white/10 py-9">
                <span className="t-eyebrow pt-2 text-gold">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="t-title text-ivory">{item.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{item.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Leadership — approach, and profiles once confirmed */}
      <section id="leadership" className="surface-ivory section-y scroll-mt-20">
        <div className="container-x">
          <SectionHeading
            index="05"
            eyebrow={leadership.approach.eyebrow}
            title={leadership.approach.title}
            accent={leadership.approach.accent}
            intro={leadership.approach.intro}
            tone="dark"
          />
          <ApproachColumns items={leadership.approach.items} className="mt-16 md:mt-24" />
        </div>
      </section>
      {leaders.length > 0 && (
        <section className="surface-ink section-y">
          <LeaderProfiles index="06" content={content} />
        </section>
      )}

      <CtaBand
        eyebrow={about.cta.eyebrow}
        title={about.cta.title}
        accent={about.cta.accent}
        primary={{ label: about.cta.primary, href: href(locale, "trade") }}
        secondary={{ label: about.cta.secondary, href: contactHref(locale) }}
      />
    </>
  );
}
