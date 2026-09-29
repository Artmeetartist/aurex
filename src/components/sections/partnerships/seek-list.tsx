import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Check } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/** What AUREX looks for in a partner: a clean, ruled list for an ink surface. */
export function SeekList({ items, className }: { items: string[]; className?: string }) {
  return (
    <RevealGroup as="ul" className={cn("border-t border-white/15", className)}>
      {items.map((item) => (
        <RevealItem
          as="li"
          key={item}
          className="group flex items-start gap-5 border-b border-white/15 py-6 md:gap-7 md:py-8"
        >
          <span
            aria-hidden
            className="mt-1.5 inline-flex shrink-0 text-mist md:mt-2"
          >
            <Check size={16} />
          </span>
          <p className="font-serif text-[clamp(1.25rem,1.7vw,1.5rem)] leading-[1.35] tracking-[-0.01em] text-ivory [font-variation-settings:'opsz'_36] [text-wrap:pretty]">
            {item}
          </p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
