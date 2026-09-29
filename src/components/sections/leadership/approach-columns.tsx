import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { TitledText } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Leadership approach as editorial columns for a paper surface: number,
 * title and text. Stacked on mobile, divided by vertical hairlines from `md` up.
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
          <span aria-hidden className="t-meta text-gold-ink">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-8 font-serif text-[1.625rem] leading-[1.15] tracking-[-0.012em] text-ink [font-variation-settings:'opsz'_36] [text-wrap:balance] md:mt-12">
            {item.title}
          </h3>
          <p className="mt-4 max-w-sm text-[1rem] leading-relaxed text-stone">{item.text}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
