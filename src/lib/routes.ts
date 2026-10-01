import type { Locale } from "@/i18n/config";

export const routes = {
  home: "",
  about: "/about",
  trade: "/trade",
  sustainability: "/sustainability",
  portfolio: "/portfolio",
  presence: "/global-presence",
  partnerships: "/partnerships",
  contact: "/contact",
  privacy: "/privacy",
  legal: "/legal",
  terms: "/terms",
  cookies: "/cookies",
} as const;

export type RouteKey = keyof typeof routes;

export const routeKeys = Object.keys(routes) as RouteKey[];

/** Primary navigation order. */
export const navRoutes: RouteKey[] = ["about", "trade", "sustainability", "portfolio", "presence", "partnerships"];

/** Legal documents, in the order they are listed in the footer and on each legal page. */
export const legalRoutes = ["legal", "privacy", "terms", "cookies"] as const satisfies readonly RouteKey[];

export type LegalRouteKey = (typeof legalRoutes)[number];

/** Trade line pages: /trade/[slug]. */
export const tradeSlugs = {
  food: "food",
  medical: "medical",
  electronics: "electronic-components",
  larp: "larp-historical-goods",
} as const;

export type TradeSlugId = keyof typeof tradeSlugs;

export const tradeIds = Object.keys(tradeSlugs) as TradeSlugId[];

export function tradeHref(locale: Locale, id: TradeSlugId) {
  return `/${locale}${routes.trade}/${tradeSlugs[id]}`;
}

export function tradeIdFromSlug(slug: string): TradeSlugId | undefined {
  return tradeIds.find((id) => tradeSlugs[id] === slug);
}

export function href(locale: Locale, route: RouteKey, hash?: string) {
  return `/${locale}${routes[route]}${hash ? `#${hash}` : ""}`;
}

export const inquiryTypes = ["partnership", "investment", "corporate", "general"] as const;
export type InquiryType = (typeof inquiryTypes)[number];

export function contactHref(locale: Locale, type?: InquiryType) {
  return `/${locale}${routes.contact}${type ? `?type=${type}` : ""}#inquiry`;
}
