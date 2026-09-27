import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { StatusTag } from "@/components/ui/eyebrow";
import { sectors } from "@/content/facts";
import type { SiteContent } from "@/content/types";

/**
 * Sectors of interest as a ruled index on a dark surface. Every sector is a
 * strategic focus, not an operating business, and is tagged accordingly.
 */
export function SectorColumns({ content }: { content: SiteContent }) {
  const status = content.common.status.strategic;

  return (
    <RevealGroup
      as="ul"
      stagger={0.07}
      className="grid gap-x-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12"
    >
      {sectors.map((s, i) => {
        const sector = content.sectors[s.id];
        return (
          <RevealItem
            as="li"
            key={s.id}
            className="group relative flex flex-col border-t border-white/10 pb-12 pt-8 md:pb-16 md:pt-9"
          >
            <span
              aria-hidden
              className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-gold/70 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
            />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="t-eyebrow tabular-nums text-gold">{String(i + 1).padStart(2, "0")}</span>
              <StatusTag>{status}</StatusTag>
            </div>
            <h3 className="mt-10 text-[clamp(1.625rem,2.2vw,2rem)] font-light leading-[1.1] tracking-[-0.026em] text-ivory [text-wrap:balance] md:mt-14">
              {sector.name}
            </h3>
            <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-mist">{sector.summary}</p>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
