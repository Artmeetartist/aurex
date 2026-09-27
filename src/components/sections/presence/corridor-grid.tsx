import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { InteractiveCard } from "@/components/ui/interactive-card";
import type { TitledText } from "@/content/types";
import { cn } from "@/lib/cn";

/** Splits "Europe — Gulf" into its two ends; titles without a dash stay whole. */
function route(title: string): [string, string] | null {
  const parts = title.split(/\s+[—–]\s+/);
  return parts.length === 2 ? [parts[0], parts[1]] : null;
}

/**
 * Strategic corridors as a 2 × 2 grid of route cards for an ivory surface.
 * Each title is drawn as origin — hairline — destination; a marker travels
 * the line on hover. The full title stays available to assistive technology.
 */
export function CorridorGrid({ items, className }: { items: TitledText[]; className?: string }) {
  return (
    <RevealGroup as="ul" className={cn("grid gap-4 md:grid-cols-2 md:gap-5", className)}>
      {items.map((item, i) => {
        const ends = route(item.title);
        return (
          <RevealItem as="li" key={item.title} className="h-full">
            <InteractiveCard
              tone="light"
              tilt={3}
              className="flex h-full flex-col rounded-[1.75rem] bg-ivory-200/55 p-7 hover:bg-ivory sm:p-10 xl:p-12"
            >
              <span className="t-eyebrow tabular-nums text-gold-ink">{String(i + 1).padStart(2, "0")}</span>

              <h3 className="mt-12 text-[clamp(1.5rem,2.3vw,2.125rem)] font-light leading-[1.1] tracking-[-0.028em] text-ink md:mt-20">
                {ends ? (
                  <>
                    <span className="sr-only">{item.title}</span>
                    <span aria-hidden className="grid grid-cols-[auto_minmax(2.5rem,1fr)_auto] items-center gap-4 sm:gap-5">
                      <span className="[text-wrap:balance]">{ends[0]}</span>
                      <span className="relative h-px bg-ink/15">
                        <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gold-ink" />
                        <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-gold-ink bg-ivory" />
                        <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gold-ink/60 transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover/card:scale-x-100" />
                        <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gold-ink opacity-0 shadow-[0_0_0_4px_rgb(0_102_102/0.14)] transition-[left,opacity] duration-[1100ms] ease-[var(--ease-out-expo)] group-hover/card:left-[calc(100%-0.5rem)] group-hover/card:opacity-100" />
                      </span>
                      <span className="text-right [text-wrap:balance]">{ends[1]}</span>
                    </span>
                  </>
                ) : (
                  item.title
                )}
              </h3>

              <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-stone md:mt-8">{item.text}</p>
            </InteractiveCard>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
