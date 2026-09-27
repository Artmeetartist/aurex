import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/content/types";

/** 06 — Why AUREX: sticky statement beside four numbered pillars. */
export function WhyAurex({ content }: { content: SiteContent }) {
  const copy = content.home.why;
  const total = String(copy.pillars.length).padStart(2, "0");

  return (
    <section className="surface-ivory section-y relative">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              index="07"
              eyebrow={copy.eyebrow}
              title={copy.title}
              accent={copy.accent}
              tone="dark"
              size="md"
            />
            {copy.intro && (
              <Reveal delay={0.15}>
                <p className="mt-8 max-w-sm border-l border-gold-ink/40 pl-5 text-[1.0625rem] leading-relaxed text-stone">
                  {copy.intro}
                </p>
              </Reveal>
            )}
          </div>
        </div>

        <ol className="border-t border-ink/10 lg:col-span-6 lg:col-start-7">
          {copy.pillars.map((p, i) => (
            <li key={p.title} className="group relative border-b border-ink/10">
              <Reveal y={36} className="grid gap-6 py-12 sm:grid-cols-[6.5rem_1fr] sm:gap-8 md:py-16">
                <p aria-hidden className="flex items-baseline gap-2">
                  <span className="t-accent inline-block text-[clamp(3.25rem,5vw,4.5rem)] leading-[0.8] text-gold-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 motion-reduce:transform-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="t-eyebrow text-stone sm:hidden">/ {total}</span>
                </p>
                <div>
                  <h3 className="text-[clamp(1.625rem,2.4vw,2.25rem)] font-light leading-[1.1] tracking-[-0.03em] text-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-1 motion-reduce:transform-none">
                    {p.title}
                  </h3>
                  <p className="t-lead mt-5 max-w-xl text-stone">{p.text}</p>
                </div>
              </Reveal>
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-gold-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
