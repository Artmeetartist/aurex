import { ArrowRight } from "@/components/ui/icons";

/** In-page index of the core business areas, shown in the page hero. */
export function DivisionIndex({ label, items }: { label: string; items: { id: string; name: string }[] }) {
  return (
    <nav aria-label={label}>
      <ol className="border-t border-white/15">
        {items.map((item, i) => (
          <li key={item.id} className="border-b border-white/15">
            <a
              href={`#${item.id}`}
              className="group flex min-h-12 items-center gap-4 py-2 text-[0.9375rem] text-ivory/80 transition-colors duration-300 hover:text-ivory"
            >
              <span className="t-eyebrow w-6 tabular-nums text-gold">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1">{item.name}</span>
              <ArrowRight
                size={14}
                className="rotate-90 text-ivory/45 transition-[color,translate] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0.5 group-hover:text-gold-soft"
              />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
