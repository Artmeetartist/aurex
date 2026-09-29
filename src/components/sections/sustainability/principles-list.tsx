import { MaskText, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { SiteContent } from "@/content/types";
import { GreenEyebrow, pad } from "./shared";

/** "Credibility before claims": the four working principles as a refined numbered list on cream. */
export function PrinciplesList({ content }: { content: SiteContent }) {
  const principles = content.sustainability.principles;

  return (
    <section className="relative bg-cream text-graphite-950">
      <div className="container-x section-y grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal y={12}>
              <GreenEyebrow tone="dark">{principles.eyebrow}</GreenEyebrow>
            </Reveal>
            <MaskText
              as="h2"
              text={principles.title}
              className="t-display-lg mt-7 max-w-[11ch] text-graphite-950"
            />
            {principles.intro && (
              <Reveal delay={0.12}>
                <p className="t-lead mt-7 max-w-md text-stone">{principles.intro}</p>
              </Reveal>
            )}
          </div>
        </div>

        <RevealGroup as="ol" className="border-t border-graphite-950/12 lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7">
          {principles.items.map((item, i) => (
            <RevealItem
              as="li"
              key={item.title}
              className="group relative grid grid-cols-[3rem_1fr] gap-x-4 border-b border-graphite-950/12 py-9 sm:grid-cols-[5rem_1fr] md:py-11"
            >
              <span
                aria-hidden
                className="text-[1.5rem] font-extralight leading-none tracking-[-0.03em] tabular-nums text-graphite-950/35 transition-colors duration-500 group-hover:text-teal-dark md:text-[2rem]"
              >
                {pad(i + 1)}
              </span>
              <div>
                <h3 className="text-[clamp(1.375rem,2vw,1.875rem)] font-light leading-[1.15] tracking-[-0.022em] text-graphite-950">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[30rem] text-[1rem] leading-relaxed text-stone">{item.text}</p>
              </div>
              <span
                aria-hidden
                className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-brass via-teal-dark to-transparent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
