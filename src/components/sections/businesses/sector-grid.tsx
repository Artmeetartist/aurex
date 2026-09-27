import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { StatusTag } from "@/components/ui/eyebrow";
import { sectors } from "@/content/facts";
import type { SiteContent } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Large-screen spans on a six-column track so every row is filled whatever
 * the number of sectors: rows of three, with any remainder absorbed by wider
 * cards (two per row) at the top.
 */
function wideCount(total: number) {
  const r = total % 3;
  return r === 0 ? 0 : r === 2 ? 2 : Math.min(4, total);
}

/**
 * Sectors of strategic interest as a card grid on ivory. None is an
 * operating business, so every card carries the "strategic focus" status.
 */
export function SectorGrid({ content }: { content: SiteContent }) {
  const status = content.common.status.strategic;

  return (
    <RevealGroup
      as="ul"
      stagger={0.07}
      className="grid gap-px overflow-hidden rounded-[1.75rem] border border-ink/10 bg-ink/10 md:grid-cols-2 lg:grid-cols-6"
    >
      {sectors.map((s, i) => {
        const sector = content.sectors[s.id];
        const wide = i < wideCount(sectors.length);
        // Two columns on tablets: an odd last card takes the full row.
        const lone = sectors.length % 2 === 1 && i === sectors.length - 1;
        return (
          <RevealItem
            as="li"
            key={s.id}
            className={cn(
              "group relative flex flex-col bg-ivory p-8 transition-colors duration-500 hover:bg-ivory-200/60 md:p-10",
              lone && "md:col-span-2",
              wide ? "lg:col-span-3 lg:min-h-[23rem]" : "lg:col-span-2 lg:min-h-[25rem]",
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="t-eyebrow tabular-nums text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
              <StatusTag tone="dark">{status}</StatusTag>
            </div>

            <h3
              className={cn(
                "mt-12 font-light leading-[1.08] tracking-[-0.028em] text-ink [text-wrap:balance] md:mt-16",
                wide ? "text-[clamp(1.75rem,2.6vw,2.5rem)]" : "text-[clamp(1.625rem,2vw,2rem)]",
              )}
            >
              {sector.name}
            </h3>
            <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-stone">{sector.summary}</p>

            <ul className="mt-auto flex flex-wrap gap-2 pt-9">
              {sector.focus.map((f) => (
                <li
                  key={f}
                  className="inline-flex min-h-8 items-center rounded-full border border-ink/15 px-3.5 py-1 text-[0.8125rem] leading-tight text-ink/75"
                >
                  {f}
                </li>
              ))}
            </ul>

            <span
              aria-hidden
              className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-gold-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 md:inset-x-10"
            />
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
