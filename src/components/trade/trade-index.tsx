import Image from "next/image";
import Link from "next/link";
import { Photo } from "@/components/media/photo";
import { ArrowRight } from "@/components/ui/icons";
import { photos, type Photo as PhotoData } from "@/content/media";
import type { SiteContent, TradeId } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { href, tradeHref, tradeIds } from "@/lib/routes";
import { mailSet } from "./larp/mail-assets";

type Key = TradeId | "green";

const previews: Record<Key, { photo?: PhotoData; cutout?: string }> = {
  food: { photo: photos.foodProduce },
  medical: { photo: photos.medical },
  electronics: { photo: photos.electronics },
  larp: { cutout: mailSet.src },
  green: { photo: photos.sustainability },
};

/**
 * Trade lines as an editorial index: one row per line, each led by its
 * picture, set apart by space rather than rules. A row takes a tone step on
 * hover. `exclude` drops the current line (for "other trade lines"); `green`
 * appends the AUREX Green row.
 */
export function TradeIndex({
  locale,
  content,
  exclude,
  green = true,
  tone = "dark",
  className,
}: {
  locale: Locale;
  content: SiteContent;
  exclude?: TradeId;
  green?: boolean;
  /** "dark" = on paper (dark text), "light" = on ink. */
  tone?: "dark" | "light";
  className?: string;
}) {
  const onDark = tone === "light";
  const { eyebrow: greenName, title: greenLine } = content.home.green;

  const rows: { key: Key; name: string; line: string; tags: string[]; href: string }[] = [
    ...tradeIds
      .filter((id) => id !== exclude)
      .map((id) => ({
        key: id as Key,
        name: content.trades[id].name,
        line: content.trades[id].title,
        tags: content.trades[id].categories.slice(0, 3).map((c) => c.title),
        href: tradeHref(locale, id),
      })),
    ...(green
      ? [
          {
            key: "green" as Key,
            name: greenName,
            line: greenLine,
            tags: content.greenPillars ? Object.values(content.greenPillars).map((p) => p.name) : [],
            href: href(locale, "sustainability"),
          },
        ]
      : []),
  ];

  return (
    <ul className={cn("-mx-3 grid gap-2", className)}>
      {rows.map((row) => {
        const preview = previews[row.key];
        return (
          <li key={row.key}>
            <Link
              href={row.href}
              className={cn(
                "group/row grid grid-cols-[5.5rem_minmax(0,1fr)_auto] items-center gap-x-5 rounded-lg px-3 py-3 transition-colors duration-300",
                "md:grid-cols-[8rem_minmax(0,1.1fr)_minmax(0,1fr)_2rem] md:gap-x-8 lg:grid-cols-[10rem_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_2rem]",
                "focus-visible:outline-2 focus-visible:outline-offset-[-2px]",
                onDark ? "hover:bg-ink-850 focus-visible:outline-gold" : "hover:bg-ivory-200 focus-visible:outline-gold-ink",
              )}
            >
              <span className={cn("relative block aspect-[4/3] overflow-hidden rounded-md", onDark ? "bg-ink-850" : "bg-ink-800")}>
                <span className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/row:scale-[1.05] motion-reduce:transform-none">
                  {preview.cutout ? (
                    <Image src={preview.cutout} alt="" fill sizes="160px" className="object-cover object-[50%_20%]" />
                  ) : preview.photo ? (
                    <Photo photo={preview.photo} sizes="160px" />
                  ) : null}
                </span>
              </span>

              <span className="min-w-0">
                <span className={cn("t-display-sm block", onDark ? "text-ivory" : "text-ink")}>{row.name}</span>
                <span className={cn("mt-1.5 block text-[1rem] leading-snug md:hidden", onDark ? "text-ivory/85" : "text-ink/85")}>
                  {row.line}
                </span>
              </span>

              <span className={cn("hidden text-[1rem] leading-snug md:block", onDark ? "text-ivory/85" : "text-ink/85")}>{row.line}</span>

              <span className={cn("hidden text-[0.875rem] leading-relaxed lg:block", onDark ? "text-ivory/70" : "text-ink/70")}>
                {row.tags.join(" · ")}
              </span>

              <span className={cn("flex items-center justify-end", onDark ? "text-ivory" : "text-ink")}>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 ease-out group-hover/row:translate-x-1 motion-reduce:transform-none"
                />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
