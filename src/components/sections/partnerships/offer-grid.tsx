import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { TitledText } from "@/content/types";
import { cn } from "@/lib/cn";

/** What AUREX brings: four columns divided by hairlines, for an ink surface. */
export function OfferGrid({ items, className }: { items: TitledText[]; className?: string }) {
  return (
    <RevealGroup as="ul" stagger={0.06} className={cn("grid border-t border-white/15 sm:grid-cols-2 xl:grid-cols-4", className)}>
      {items.map((item, i) => (
        <RevealItem
          as="li"
          key={item.title}
          y={10}
          className="border-b border-white/15 py-8 sm:pr-8 xl:border-b-0 xl:border-r xl:py-10 xl:pl-8 xl:first:pl-0 xl:last:border-r-0"
        >
          <span className="t-meta text-mist-dim">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-6 font-serif text-[1.5rem] leading-[1.15] tracking-[-0.012em] text-ivory [font-variation-settings:'opsz'_36] [text-wrap:balance] xl:mt-12">
            {item.title}
          </h3>
          <p className="mt-3 max-w-sm text-[1rem] leading-relaxed text-mist">{item.text}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
