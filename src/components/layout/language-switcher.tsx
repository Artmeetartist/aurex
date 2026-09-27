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
        className="glass inline-flex h-11 items-center gap-2 rounded-full px-4 text-[0.8125rem] font-medium text-ivory/85 transition-colors hover:text-ivory"
      >
        <Globe size={15} className="text-gold" />
        <span className="uppercase tracking-[0.08em]">{locale}</span>
      </button>
      {/* Disclosure of plain links (a listbox cannot contain links). */}
      <ul
        id={listId}
        aria-label={label}
        className={cn(
          "glass absolute right-0 top-[calc(100%+0.5rem)] min-w-44 overflow-hidden rounded-2xl p-1.5 transition-all duration-300 ease-[var(--ease-out-expo)]",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
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
                "flex min-h-11 items-center justify-between rounded-xl px-3.5 text-[0.875rem] transition-colors",
                l === locale ? "bg-white/10 text-ivory" : "text-ivory/70 hover:bg-white/5 hover:text-ivory",
              )}
            >
              <span>{localeMeta[l].native}</span>
              <span className="t-eyebrow !text-[0.625rem] text-mist">{l}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
