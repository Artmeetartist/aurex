import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { TitledText } from "@/content/types";
import { cn } from "@/lib/cn";

const NUMERALS = ["I", "II", "III", "IV", "V", "VI"];

/**
 * Leadership approach as editorial columns for an ivory surface: a serif
 * numeral, a hairline that draws on hover, title and text. Stacked on mobile,
 * divided by vertical hairlines from `md` up.
 */
export function ApproachColumns({ items, className }: { items: TitledText[]; className?: string }) {
  return (
    <RevealGroup as="ol" stagger={0.12} className={cn("grid md:grid-cols-3", className)}>
      {items.map((item, i) => (
        <RevealItem
          as="li"
          key={item.title}
          className="group border-t border-ink/10 py-10 first:border-t-0 first:pt-0 md:border-l md:border-t-0 md:px-8 md:py-2 md:first:border-l-0 md:first:pl-0 md:first:pt-2 last:pb-0 md:last:pb-2 lg:px-12 xl:px-14"
        >
          <span
            aria-hidden
            className="t-accent block text-[3.5rem] leading-[0.9] text-gold-ink md:text-[4.25rem] lg:text-[5rem]"
          >
            {NUMERALS[i] ?? String(i + 1)}
          </span>
          <span aria-hidden className="relative mt-8 block h-px w-12 bg-ink/15 md:mt-12">
            <span className="absolute inset-0 origin-left bg-gold-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-[2.5]" />
          </span>
          <h3 className="mt-8 text-[1.75rem] font-light leading-tight tracking-[-0.025em] text-ink md:text-[1.875rem] [text-wrap:balance]">
            {item.title}
          </h3>
          <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-stone">{item.text}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
