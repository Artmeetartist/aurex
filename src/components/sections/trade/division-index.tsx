import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

/**
 * Index shown in the page hero: in-page anchors, or links to other pages when
 * `href` is set. One solid ink panel over the photograph; rows light up a tone
 * on hover instead of being ruled.
 */
export function DivisionIndex({
  label,
  items,
}: {
  label: string;
  items: { id: string; name: string; href?: string }[];
}) {
  return (
    <nav aria-label={label}>
      <ul className="grid gap-1 rounded-lg bg-ink-950 p-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href ?? `#${item.id}`}
              className="group flex min-h-12 items-center justify-between gap-4 rounded-md px-4 py-2 text-[1rem] text-ivory transition-colors duration-300 hover:bg-ink-850 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold"
            >
              <span className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">{item.name}</span>
              {item.href ? (
                <ArrowUpRight
                  size={14}
                  className="shrink-0 text-ivory/60 transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:text-gold"
                />
              ) : (
                <ArrowRight
                  size={14}
                  className="shrink-0 rotate-90 text-ivory/60 transition-[color,translate] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0.5 group-hover:text-gold-soft"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
