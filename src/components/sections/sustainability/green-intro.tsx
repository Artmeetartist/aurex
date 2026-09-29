import { PillarIcon } from "@/components/green/icons";
import { PILLAR_ORDER } from "@/components/green/stages";
import { MaskText, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { SiteContent } from "@/content/types";
import { GreenEyebrow, pad } from "./shared";

function ArrowDown({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
    </svg>
  );
}

/**
 * Editorial opener on a cream surface: the positioning statement beside the
 * two body paragraphs, then a quiet index of the four pillars on this page.
 */
export function GreenIntro({ content }: { content: SiteContent }) {
  const intro = content.sustainability.intro;
  const body = content.home.green.body;

  return (
    <section className="relative overflow-hidden bg-cream text-graphite-950">
      <div className="container-x section-y relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal y={12}>
              <GreenEyebrow tone="dark">{intro.eyebrow}</GreenEyebrow>
            </Reveal>
            <MaskText
              as="h2"
              text={intro.title}
              className="t-display-lg mt-7 max-w-[15ch] text-graphite-950"
            />
          </div>
          <div className="lg:col-span-5 lg:pt-[4.25rem]">
            <Reveal>
              <p className="text-[clamp(1.1875rem,1.55vw,1.5rem)] font-light leading-[1.45] tracking-[-0.015em] text-graphite-950 [text-wrap:pretty]">
                {body[0]}
              </p>
            </Reveal>
            {body.slice(1).map((p) => (
              <Reveal key={p} delay={0.1}>
                <p className="t-body mt-6 max-w-[32rem] text-stone [text-wrap:pretty]">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Index of the pillars below, each jumping to its panel. */}
        <RevealGroup
          as="ol"
          stagger={0.09}
          className="mt-20 grid border-t border-graphite-950/12 sm:grid-cols-2 md:mt-28 lg:grid-cols-4"
        >
          {PILLAR_ORDER.map((id, i) => (
            <RevealItem
              as="li"
              key={id}
              className="border-b border-graphite-950/12 sm:[&:nth-child(even)>a]:pl-6 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 lg:[&:nth-child(n+2)>a]:pl-6"
            >
              <a
                href={`#${id}`}
                className="group flex min-h-11 items-center gap-5 py-6 pr-5 transition-colors duration-500 lg:py-8"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-graphite-950/10 bg-white/50 text-forest-700 transition-[color,border-color,background-color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:border-teal-dark/40 group-hover:bg-white group-hover:text-teal-dark">
                  <PillarIcon id={id} size={40} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="t-eyebrow block tabular-nums text-stone">{pad(i + 1)}</span>
                  <span className="mt-2 block text-[1.125rem] leading-tight tracking-[-0.015em] text-graphite-950">
                    {content.greenPillars[id].name}
                  </span>
                </span>
                <ArrowDown className="shrink-0 text-stone transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0.5 group-hover:text-teal-dark" />
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
