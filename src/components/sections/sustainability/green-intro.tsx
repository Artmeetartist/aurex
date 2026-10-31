import { PillarIcon } from "@/components/green/icons";
import { PILLAR_ORDER } from "@/components/green/stages";
import { MaskText, Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { SiteContent } from "@/content/types";

function ArrowDown({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
    </svg>
  );
}

/**
 * Editorial opener on a cream surface: the positioning statement beside the
 * two body paragraphs, then the four pillars on this page as jump links.
 */
export function GreenIntro({ content }: { content: SiteContent }) {
  const intro = content.sustainability.intro;
  const body = content.home.green.body;

  return (
    <section className="relative overflow-hidden bg-cream text-graphite-950">
      <div className="container-x section-y relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <MaskText as="h2" text={intro.title} className="t-display-lg text-graphite-950 lg:col-span-7" />
          <div className="lg:col-span-5 lg:pt-3">
            <Reveal>
              <p className="t-lead text-graphite-950">{body[0]}</p>
            </Reveal>
            {body.slice(1).map((p) => (
              <Reveal key={p} delay={0.1}>
                <p className="t-body mt-6 max-w-[32rem] text-graphite-950/85">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* The pillars below, each jumping to its panel. */}
        <RevealGroup
          as="ol"
          stagger={0.09}
          className="mt-16 grid gap-3 sm:grid-cols-2 md:mt-24 lg:grid-cols-4"
        >
          {PILLAR_ORDER.map((id) => (
            <RevealItem as="li" key={id}>
              <a
                href={`#${id}`}
                className="group flex min-h-11 items-center gap-5 py-3 pr-4"
              >
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-ivory-300/70 text-forest-700 transition-colors duration-500 group-hover:bg-forest-800 group-hover:text-cream">
                  <PillarIcon id={id} size={40} />
                </span>
                <span className="t-lead min-w-0 flex-1 !leading-tight text-graphite-950">
                  {content.greenPillars[id].name}
                </span>
                <ArrowDown className="shrink-0 text-graphite-950/60 transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0.5 group-hover:text-teal-dark" />
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
