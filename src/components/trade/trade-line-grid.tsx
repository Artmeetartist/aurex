import Link from "next/link";
import { Photo } from "@/components/media/photo";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { StatusTag } from "@/components/ui/eyebrow";
import { ArrowUpRight } from "@/components/ui/icons";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { photos, type Photo as PhotoData } from "@/content/media";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { href, tradeHref, tradeIds, type TradeSlugId } from "@/lib/routes";
import { GreenLoop, tradeIcons } from "./trade-icons";

const cardArt: Record<TradeSlugId, { photo: PhotoData; tint: string }> = {
  food: { photo: photos.foodProduce, tint: "#d79a2b" },
  medical: { photo: photos.medical, tint: "#5fb8c9" },
  electronics: { photo: photos.electronics, tint: "#2f6fb5" },
  larp: { photo: photos.larp, tint: "#8c4a2f" },
};

/**
 * The four trade lines plus AUREX Green as clickable cards. `exclude` hides
 * the current line on a trade-line page ("other trade lines").
 */
export function TradeLineGrid({
  locale,
  content,
  exclude,
  tone = "light",
  className,
}: {
  locale: Locale;
  content: SiteContent;
  exclude?: TradeSlugId;
  tone?: "light" | "dark";
  className?: string;
}) {
  const ids = tradeIds.filter((id) => id !== exclude);
  const status = content.common.status.strategic;
  const explore = content.home.green.explore;
  const light = tone === "light";

  return (
    <RevealGroup
      as="ul"
      stagger={0.08}
      className={cn("grid gap-4 md:grid-cols-2 lg:gap-5", ids.length === 4 ? "lg:grid-cols-6" : "lg:grid-cols-4", className)}
    >
      {ids.map((id, i) => {
        const Icon = tradeIcons[id];
        const trade = content.trades[id];
        const full = ids.length === 4;
        return (
          <RevealItem as="li" key={id} className={cn(full ? (i < 2 ? "lg:col-span-3" : "lg:col-span-2") : "lg:col-span-1")}>
            <InteractiveCard
              href={tradeHref(locale, id)}
              tone={light ? "light" : "dark"}
              tilt={3}
              className={cn("flex h-full flex-col", light ? "elevate-light" : "elevate")}
            >
              <div className="relative h-48 overflow-hidden md:h-56">
                <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover/card:scale-[1.06]">
                  <Photo photo={cardArt[id].photo} sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw" />
                </div>
                <div aria-hidden className="absolute inset-0 mix-blend-soft-light" style={{ backgroundColor: cardArt[id].tint, opacity: 0.5 }} />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-4 md:inset-x-7">
                  <span className="glass inline-flex h-12 w-12 items-center justify-center rounded-full text-gold">
                    <Icon size={26} />
                  </span>
                  <StatusTag>{status}</StatusTag>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <p className={cn("t-eyebrow", light ? "text-stone" : "text-mist")}>{String(i + 1).padStart(2, "0")}</p>
                <h3
                  className={cn(
                    "mt-3 text-[clamp(1.5rem,2vw,2rem)] font-light leading-[1.06] tracking-[-0.03em] [text-wrap:balance]",
                    light ? "text-ink" : "text-ivory",
                  )}
                >
                  {trade.name}
                </h3>
                <p className={cn("mt-3 max-w-md text-[0.9375rem] leading-relaxed", light ? "text-stone" : "text-mist")}>
                  {trade.title}
                </p>
                <div className="mt-auto flex items-end justify-between gap-4 pt-7">
                  <ul className="flex flex-wrap gap-2">
                    {trade.categories.slice(0, 3).map((c) => (
                      <li
                        key={c.title}
                        className={cn(
                          "rounded-full border px-3 py-1 text-[0.75rem] leading-tight",
                          light ? "border-ink/12 text-ink/70" : "border-white/12 text-ivory/70",
                        )}
                      >
                        {c.title}
                      </li>
                    ))}
                  </ul>
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center gap-2 text-[0.8125rem] font-medium transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/card:translate-x-1",
                      light ? "text-ink" : "text-ivory",
                    )}
                  >
                    <span className="sr-only md:not-sr-only">{explore}</span>
                    <span
                      className={cn(
                        "inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 ease-[var(--ease-out-expo)] group-hover/card:rotate-45",
                        light
                          ? "border-ink/15 group-hover/card:border-ink group-hover/card:bg-ink group-hover/card:text-ivory"
                          : "border-white/20 group-hover/card:border-gold group-hover/card:bg-gold group-hover/card:text-ink",
                      )}
                    >
                      <ArrowUpRight size={14} />
                    </span>
                  </span>
                </div>
              </div>
            </InteractiveCard>
          </RevealItem>
        );
      })}

      <RevealItem as="li" className={cn(ids.length === 4 ? "md:col-span-2 lg:col-span-2" : "lg:col-span-1")}>
        <Link
          href={href(locale, "sustainability")}
          className="elevate group/green relative flex h-full min-h-[21rem] flex-col overflow-hidden rounded-[1.5rem] bg-forest-900 p-7 text-cream transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 md:p-9"
        >
          <span aria-hidden className="absolute inset-0 opacity-35 transition-opacity duration-700 group-hover/green:opacity-50">
            <Photo photo={photos.sustainability} sizes="(min-width: 1024px) 30vw, 100vw" />
          </span>
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/80 to-forest-900/40" />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-70 transition-opacity duration-700 group-hover/green:opacity-100 [background:radial-gradient(closest-side,rgb(0_153_153/0.35),transparent_70%)]"
          />
          <span className="relative text-brass">
            <GreenLoop size={44} />
          </span>
          <p className="t-eyebrow relative mt-10 text-brass-soft">{content.home.green.eyebrow}</p>
          <h3 className="relative mt-3 text-[clamp(1.625rem,2.2vw,2.125rem)] font-light leading-[1.06] tracking-[-0.03em] [text-wrap:balance]">
            {content.home.green.title}
          </h3>
          <p className="relative mt-3 max-w-md text-[0.9375rem] leading-relaxed text-cream/75">{content.home.trade.greenLabel}</p>
          <span className="relative mt-auto inline-flex items-center gap-2 pt-8 text-[0.8125rem] font-medium">
            {content.home.green.primaryCta}
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover/green:rotate-45 group-hover/green:border-brass group-hover/green:bg-brass group-hover/green:text-forest-950">
              <ArrowUpRight size={14} />
            </span>
          </span>
        </Link>
      </RevealItem>
    </RevealGroup>
  );
}
