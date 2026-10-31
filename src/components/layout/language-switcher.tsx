"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { LOCALE_COOKIE, localeMeta, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { Globe } from "@/components/ui/icons";

export function useLocalizedPath() {
  const pathname = usePathname() ?? "/";
  const search = useSearchParams();
  return (target: Locale) => {
    const parts = pathname.split("/");
    parts[1] = target;
    const qs = search?.toString();
    return `${parts.join("/") || `/${target}`}${qs ? `?${qs}` : ""}`;
  };
}

export function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher({ locale, label, className }: { locale: Locale; label: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const localized = useLocalizedPath();
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 items-center gap-2 rounded-[4px] bg-ink-700 px-3.5 text-[0.875rem] font-medium text-ivory/90 transition-colors hover:bg-ink-600 hover:text-ivory"
      >
        <Globe size={15} className="text-ivory/60" />
        <span className="uppercase tracking-[0.08em]">{locale}</span>
      </button>
      {/* Disclosure of plain links (a listbox cannot contain links). */}
      <ul
        id={listId}
        aria-label={label}
        hidden={!open}
        className="absolute right-0 top-[calc(100%+0.5rem)] min-w-44 overflow-hidden rounded-lg bg-ink-850 p-1.5 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.7)] motion-safe:animate-[aurex-menu-in_0.3s_var(--ease-out-expo)]"
      >
        {locales.map((l) => (
          <li key={l}>
            <Link
              href={localized(l)}
              hrefLang={localeMeta[l].htmlLang}
              lang={localeMeta[l].htmlLang}
              aria-current={l === locale ? "true" : undefined}
              onClick={() => {
                rememberLocale(l);
                setOpen(false);
              }}
              className={cn(
                "flex min-h-11 items-center justify-between rounded-md px-3.5 text-[0.875rem] transition-colors",
                l === locale ? "bg-white/10 text-ivory" : "text-ivory/70 hover:bg-white/5 hover:text-ivory",
              )}
            >
              <span>{localeMeta[l].native}</span>
              <span className="text-[0.875rem] uppercase text-mist-dim">{l}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
