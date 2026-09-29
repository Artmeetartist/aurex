"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState, type PointerEvent } from "react";
import { Photo } from "@/components/media/photo";
import { ArrowRight } from "@/components/ui/icons";
import { photos, type Photo as PhotoData } from "@/content/media";
import type { SiteContent, TradeId } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { href, tradeHref, tradeIds } from "@/lib/routes";
import { mailSet } from "./larp/mail-assets";
import { GreenLoop, tradeIcons } from "./trade-icons";

type Key = TradeId | "green";

const previews: Record<Key, { photo?: PhotoData; cutout?: string }> = {
  food: { photo: photos.foodProduce },
  medical: { photo: photos.medical },
  electronics: { photo: photos.electronics },
  larp: { cutout: mailSet.src },
  green: { photo: photos.sustainability },
};

/**
 * Trade lines as an editorial index: one row per line, set like a register.
 * On fine pointers a graded preview image follows the cursor over the list;
 * on touch each row carries its own thumbnail. `exclude` drops the current
 * line (for "other trade lines"); `green` appends the AUREX Green row.
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
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Key | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 32, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 300, damping: 32, mass: 0.6 });
  const onDark = tone === "light";

  const onMove = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const rows: { key: Key; index: string; name: string; line: string; tags: string[]; href: string }[] = [
    ...tradeIds
      .filter((id) => id !== exclude)
      .map((id) => ({
        key: id as Key,
        index: String(tradeIds.indexOf(id) + 1).padStart(2, "0"),
        name: content.trades[id].name,
        line: content.trades[id].title,
        tags: content.trades[id].categories.slice(0, 3).map((c) => c.title),
        href: tradeHref(locale, id),
      })),
    ...(green
      ? [
          {
            key: "green" as Key,
            index: "—",
            name: content.home.green.eyebrow,
            line: content.home.green.title,
            tags: content.greenPillars ? Object.values(content.greenPillars).map((p) => p.name) : [],
            href: href(locale, "sustainability"),
          },
        ]
      : []),
  ];

  return (
    <div className={cn("relative", className)}>
      <ul
        onPointerMove={onMove}
        onPointerLeave={() => setActive(null)}
        className={cn("relative border-t", onDark ? "border-white/15" : "border-ink/15")}
      >
        {rows.map((row) => {
          const Icon = row.key === "green" ? GreenLoop : tradeIcons[row.key as TradeId];
          const preview = previews[row.key];
          return (
            <li key={row.key} className={cn("border-b", onDark ? "border-white/15" : "border-ink/15")}>
              <Link
                href={row.href}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(row.key)}
                onFocus={() => setActive(row.key)}
                onBlur={() => setActive(null)}
                className={cn(
                  "group/row relative grid grid-cols-[4.5rem_1fr_auto] items-center gap-x-5 py-5 transition-colors duration-300 md:grid-cols-[3rem_minmax(0,1.1fr)_minmax(0,1fr)_2rem] md:gap-x-8 md:py-8 lg:grid-cols-[3rem_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_2rem]",
                  "focus-visible:outline-2 focus-visible:outline-offset-[-2px]",
                  onDark ? "focus-visible:outline-gold" : "focus-visible:outline-gold-ink",
                )}
              >
                {/* Touch thumbnail / desktop index */}
                <span className="relative block aspect-square w-[4.5rem] overflow-hidden rounded-md bg-ink-850 md:hidden">
                  {preview.cutout ? (
                    <Image src={preview.cutout} alt="" fill sizes="72px" className="object-cover object-[50%_20%]" />
                  ) : preview.photo ? (
                    <Photo photo={preview.photo} sizes="72px" className="grayscale-[35%]" />
                  ) : null}
                </span>
                <span className={cn("t-meta hidden md:block", onDark ? "text-mist-dim" : "text-stone")}>{row.index}</span>

                <span className="min-w-0">
                  <span
                    className={cn(
                      "block font-serif text-[1.5rem] leading-[1.1] tracking-[-0.015em] [font-variation-settings:'opsz'_48] md:text-[clamp(1.75rem,2.6vw,2.5rem)]",
                      onDark ? "text-ivory" : "text-ink",
                    )}
                  >
                    {row.name}
                  </span>
                  <span className={cn("mt-1.5 block text-[0.9375rem] leading-snug md:hidden", onDark ? "text-mist" : "text-stone")}>
                    {row.line}
                  </span>
                </span>

                <span className={cn("hidden text-[1rem] leading-snug md:block", onDark ? "text-mist" : "text-stone")}>{row.line}</span>

                <span className={cn("hidden text-[0.875rem] leading-relaxed lg:block", onDark ? "text-ivory/60" : "text-ink/60")}>
                  {row.tags.join(" · ")}
                </span>

                <span className={cn("flex items-center justify-end gap-3", onDark ? "text-ivory" : "text-ink")}>
                  <Icon size={22} className="hidden opacity-40 transition-opacity duration-300 group-hover/row:opacity-80 xl:block" />
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 ease-out group-hover/row:translate-x-1 motion-reduce:transform-none"
                  />
                </span>

                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/row:scale-x-100",
                    onDark ? "bg-ivory" : "bg-ink",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Cursor-following preview (fine pointers only) */}
      {!reduce && (
        <motion.div
          aria-hidden
          style={{ x: sx, y: sy }}
          className="pointer-events-none absolute left-0 top-0 z-10 hidden [@media(hover:hover)_and_(pointer:fine)]:lg:block"
        >
          <AnimatePresence>
            {active && (
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.92, clipPath: "inset(12% 12% 12% 12%)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -left-[9rem] -top-[12rem] h-[11rem] w-[16rem] overflow-hidden rounded-lg bg-ink-850 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]"
              >
                {previews[active].cutout ? (
                  <>
                    <span className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_10%,#284242,#051616)]" />
                    <Image src={previews[active].cutout!} alt="" fill sizes="256px" className="object-cover object-[50%_18%]" />
                  </>
                ) : previews[active].photo ? (
                  <Photo photo={previews[active].photo!} sizes="256px" className="grayscale-[35%]" />
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
