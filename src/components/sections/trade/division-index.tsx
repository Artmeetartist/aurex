import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

/** Index shown in the page hero: in-page anchors, or links to other pages when `href` is set. */
export function DivisionIndex({
  label,
  items,
}: {
  label: string;
  items: { id: string; name: string; href?: string }[];
}) {
  return (
    <nav aria-label={label}>
      <ol className="border-t border-white/15">
        {items.map((item, i) => (
          <li key={item.id} className="border-b border-white/15">
            <Link
              href={item.href ?? `#${item.id}`}
              className="group flex min-h-12 items-center gap-4 py-2 text-[0.9375rem] text-ivory/80 transition-colors duration-300 hover:text-ivory"
            >
              <span className="t-eyebrow w-6 tabular-nums text-gold">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">{item.name}</span>
              {item.href ? (
                <ArrowUpRight
                  size={14}
                  className="text-ivory/45 transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:text-gold"
                />
              ) : (
                <ArrowRight
                  size={14}
                  className="rotate-90 text-ivory/45 transition-[color,translate] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0.5 group-hover:text-gold-soft"
                />
              )}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
