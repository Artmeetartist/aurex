import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/content/types";

/** Why AUREX: four commitments set as a register across the full measure. */
export function WhyAurex({ content }: { content: SiteContent }) {
  const copy = content.home.why;

  return (
    <section className="surface-ivory section-y relative">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading index="07" eyebrow={copy.eyebrow} title={copy.title} tone="dark" size="md" className="lg:col-span-7" />
          {copy.intro && (
            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <p className="text-[1.0625rem] leading-relaxed text-stone">{copy.intro}</p>
            </Reveal>
          )}
        </div>

        <RevealGroup
          as="ol"
          stagger={0.06}
          className="mt-14 grid border-t border-ink/15 sm:grid-cols-2 md:mt-20 lg:grid-cols-4"
        >
          {copy.pillars.map((p, i) => (
            <RevealItem
              as="li"
              key={p.title}
              y={12}
              className="border-b border-ink/15 py-8 sm:pr-8 lg:border-b-0 lg:border-r lg:py-10 lg:pl-8 lg:first:pl-0 lg:last:border-r-0"
            >
              <p className="t-meta text-gold-ink">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-6 font-serif text-[1.5rem] leading-[1.15] tracking-[-0.012em] text-ink [font-variation-settings:'opsz'_36] lg:mt-12">
                {p.title}
              </h3>
              <p className="mt-4 text-[1rem] leading-relaxed text-stone">{p.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
