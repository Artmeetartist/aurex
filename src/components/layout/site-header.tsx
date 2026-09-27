"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { Close, Menu } from "@/components/ui/icons";
import { localeMeta, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { contactHref, href, navRoutes, type RouteKey } from "@/lib/routes";
import { LanguageSwitcher, rememberLocale, useLocalizedPath } from "./language-switcher";
import { TradeMenu, type TradeMenuData } from "./trade-menu";

type HeaderLabels = {
  labels: Record<RouteKey, string>;
  cta: string;
  menu: string;
  close: string;
  language: string;
  primaryLabel: string;
  trade: TradeMenuData;
};

const EASE = [0.16, 1, 0.3, 1] as const;

function MobileLanguages({ locale, onPick }: { locale: Locale; onPick: () => void }) {
  const localized = useLocalizedPath();
  return (
    <div className="flex flex-wrap gap-2">
      {locales.map((l) => (
        <Link
          key={l}
          href={localized(l)}
          hrefLang={localeMeta[l].htmlLang}
          onClick={() => {
            rememberLocale(l);
            onPick();
          }}
          className={cn(
            "t-eyebrow inline-flex h-11 items-center rounded-full border px-4",
            l === locale ? "border-gold text-gold" : "border-white/15 text-mist",
          )}
        >
          {localeMeta[l].native}
        </Link>
      ))}
    </div>
  );
}

export function SiteHeader({ locale, nav }: { locale: Locale; nav: HeaderLabels }) {
  const pathname = usePathname() ?? "";
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 480 && y > prev + 2 && !open);
    if (y < prev - 2) setHidden(false);
  });

  // Close the mobile menu when the route changes (derived during render, no effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (route: RouteKey) => pathname === href(locale, route) || pathname.startsWith(`${href(locale, route)}/`);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "absolute inset-0 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
            scrolled && !open
              ? "border-white/[0.07] bg-ink/70 backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent",
          )}
        />
        <div className="container-x relative flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href={href(locale, "home")} aria-label="AUREX" className="relative z-10 text-ivory">
            <Logo />
          </Link>

          <nav aria-label={nav.primaryLabel} className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <ul className="glass flex h-11 items-center gap-0.5 rounded-full px-1.5">
              {navRoutes.map((route) =>
                route === "trade" ? (
                  <TradeMenu key={route} data={nav.trade} active={isActive(route)} />
                ) : (
                  <li key={route}>
                    <Link
                      href={href(locale, route)}
                      aria-current={isActive(route) ? "page" : undefined}
                      className={cn(
                        "relative after:absolute after:inset-x-0 after:-inset-y-1.5 after:content-[''] inline-flex h-8 items-center rounded-full px-3.5 text-[0.8125rem] transition-colors duration-300 xl:px-4",
                        isActive(route) ? "bg-white/12 text-ivory" : "text-ivory/70 hover:text-ivory",
                      )}
                    >
                      {nav.labels[route]}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-2.5">
            <Suspense>
              <LanguageSwitcher locale={locale} label={nav.language} className="hidden lg:block" />
            </Suspense>
            <ButtonLink href={contactHref(locale)} className="hidden sm:inline-flex">
              {nav.cta}
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? nav.close : nav.menu}
              className="glass inline-flex h-11 w-11 items-center justify-center rounded-full text-ivory lg:hidden"
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={nav.menu}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-ink-950 pt-[calc(var(--header-h)+2rem)] lg:hidden"
          >
            <nav aria-label={nav.primaryLabel} className="container-x flex-1 overflow-y-auto">
              <ul className="border-t border-white/10">
                {(["home", ...navRoutes, "contact"] as RouteKey[]).map((route, i) => (
                  <motion.li
                    key={route}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.04 }}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={route === "contact" ? contactHref(locale) : href(locale, route)}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4 text-[1.75rem] font-light tracking-[-0.02em] text-ivory"
                    >
                      {nav.labels[route]}
                      <span className="t-eyebrow text-gold">{String(i + 1).padStart(2, "0")}</span>
                    </Link>
                    {route === "trade" && (
                      <ul className="-mt-1 mb-4 grid grid-cols-1 gap-1 pl-1 sm:grid-cols-2">
                        {nav.trade.items.map((item) => (
                          <li key={item.id}>
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className="flex min-h-11 items-center gap-3 text-[1rem] text-ivory/70 hover:text-ivory"
                            >
                              <span aria-hidden className="h-px w-4 bg-gold" />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 pb-10">
                <p className="t-eyebrow mb-4 text-mist">{nav.language}</p>
                <Suspense>
                  <MobileLanguages locale={locale} onPick={() => setOpen(false)} />
                </Suspense>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
