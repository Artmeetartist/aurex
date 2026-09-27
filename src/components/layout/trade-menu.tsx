"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { GreenLoop, tradeIcons } from "@/components/trade/trade-icons";
import { ArrowUpRight } from "@/components/ui/icons";
import type { TradeId } from "@/content/types";
import { cn } from "@/lib/cn";

export type TradeMenuData = {
  label: string;
  hubHref: string;
  allLabel: string;
  items: { id: TradeId; name: string; title: string; href: string }[];
  green: { eyebrow: string; title: string; href: string };
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      aria-hidden
      className={cn("transition-transform duration-300", open && "rotate-180")}
    >
      <path d="m2 3.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

/** Desktop "Trade" item: opens a glass panel on hover, click or keyboard. */
export function TradeMenu({ data, active }: { data: TradeMenuData; active: boolean }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLLIElement>(null);
  const closeTimer = useRef(0);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hideSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  return (
    <li
      ref={wrap}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && show()}
      onPointerLeave={(e) => e.pointerType === "mouse" && hideSoon()}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[0.8125rem] transition-colors duration-300 xl:px-4",
          active || open ? "bg-white/12 text-ivory" : "text-ivory/70 hover:text-ivory",
        )}
      >
        {data.label}
        <Chevron open={open} />
      </button>

      <div
        id={panelId}
        className={cn(
          "absolute left-1/2 top-[calc(100%+0.85rem)] w-[min(52rem,calc(100vw-3rem))] -translate-x-1/2 transition-[opacity,transform,visibility] duration-500 ease-[var(--ease-out-expo)]",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
      >
        <div className="grid grid-cols-12 gap-2 rounded-[1.75rem] border border-white/12 bg-ink-950/95 p-2.5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] backdrop-blur-xl backdrop-saturate-150">
          <ul className="col-span-8 grid grid-cols-2 gap-1.5">
            {data.items.map((item) => {
              const Icon = tradeIcons[item.id];
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex h-full gap-4 rounded-[1.25rem] p-4 transition-colors duration-300 hover:bg-white/[0.06] focus-visible:bg-white/[0.06]"
                  >
                    <span className="mt-0.5 text-gold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5">
                      <Icon size={30} />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 text-[0.9375rem] font-medium text-ivory">
                        {item.name}
                        <ArrowUpRight
                          size={12}
                          className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        />
                      </span>
                      <span className="mt-1 block text-[0.8125rem] leading-snug text-mist">{item.title}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="col-span-4 flex flex-col gap-2">
            <Link
              href={data.green.href}
              onClick={() => setOpen(false)}
              className="group relative flex flex-1 flex-col overflow-hidden rounded-[1.25rem] bg-forest-900 p-5 text-cream"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full [background:radial-gradient(closest-side,rgb(0_153_153/0.4),transparent_70%)]"
              />
              <span className="relative text-brass">
                <GreenLoop size={30} />
              </span>
              <span className="t-eyebrow relative mt-auto pt-6 text-brass-soft">{data.green.eyebrow}</span>
              <span className="relative mt-2 text-[1.0625rem] leading-snug">{data.green.title}</span>
            </Link>
            <Link
              href={data.hubHref}
              onClick={() => setOpen(false)}
              className="group inline-flex min-h-11 items-center justify-between rounded-[1.25rem] border border-white/10 px-5 text-[0.875rem] text-ivory transition-colors hover:border-gold"
            >
              {data.allLabel}
              <ArrowUpRight size={13} className="transition-transform duration-500 group-hover:rotate-45" />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
