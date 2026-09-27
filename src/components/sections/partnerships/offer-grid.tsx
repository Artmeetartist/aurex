import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { InteractiveCard } from "@/components/ui/interactive-card";
import type { TitledText } from "@/content/types";
import { cn } from "@/lib/cn";

/** What AUREX brings: a hairline-divided grid of four tiles, for an ink surface. */
export function OfferGrid({ items, className }: { items: TitledText[]; className?: string }) {
  return (
    <RevealGroup
      as="ul"
      className={cn(
        "grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-4",
        className,
      )}
    >
      {items.map((item, i) => (
        <RevealItem as="li" key={item.title} className="bg-ink">
          <InteractiveCard
            tone="dark"
            tilt={0}
            className="flex h-full flex-col rounded-none border-0 bg-ink p-8 hover:bg-ink-850 md:p-10"
          >
            <span className="t-eyebrow tabular-nums text-gold">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-14 text-[1.625rem] font-light leading-[1.15] tracking-[-0.025em] text-ivory [text-wrap:balance] md:mt-20 sm:flex sm:min-h-[2.3em] sm:items-end xl:mt-28">
              {item.title}
            </h3>
            <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-mist">{item.text}</p>
            <span
              aria-hidden
              className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-gold/70 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/card:scale-x-100 md:inset-x-10"
            />
          </InteractiveCard>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
