import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Check } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/** What AUREX looks for in a partner: a clean, ruled list for an ink surface. */
export function SeekList({ items, className }: { items: string[]; className?: string }) {
  return (
    <RevealGroup as="ul" className={cn("border-t border-white/10", className)}>
      {items.map((item) => (
        <RevealItem
          as="li"
          key={item}
          className="group flex items-start gap-5 border-b border-white/10 py-6 md:gap-7 md:py-8"
        >
          <span
            aria-hidden
            className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/35 text-gold transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink md:mt-1"
          >
            <Check size={13} />
          </span>
          <p className="text-[clamp(1.1875rem,1.7vw,1.5rem)] font-light leading-[1.35] tracking-[-0.015em] text-ivory [text-wrap:pretty]">
            {item}
          </p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
