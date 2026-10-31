import { MaskText, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { SiteContent } from "@/content/types";

/** "Credibility before claims": the four working principles as a list on cream. */
export function PrinciplesList({ content }: { content: SiteContent }) {
  const principles = content.sustainability.principles;

  return (
    <section className="relative bg-cream text-graphite-950">
      <div className="container-x section-y grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-32">
            <MaskText as="h2" text={principles.title} className="t-display-lg text-graphite-950" />
            {principles.intro && (
              <Reveal delay={0.12}>
                <p className="t-lead mt-7 max-w-md text-graphite-950/85">{principles.intro}</p>
              </Reveal>
            )}
          </div>
        </div>

        <RevealGroup as="ol" className="grid gap-12 md:gap-14 lg:col-span-6">
          {principles.items.map((item) => (
            <RevealItem as="li" key={item.title}>
              <h3 className="t-display-sm text-graphite-950">{item.title}</h3>
              <p className="t-body mt-3 max-w-[30rem] text-graphite-950/85">{item.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
