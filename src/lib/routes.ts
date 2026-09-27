import type { Locale } from "@/i18n/config";

export const routes = {
  home: "",
  about: "/about",
  businesses: "/businesses",
  portfolio: "/portfolio",
  presence: "/global-presence",
  leadership: "/leadership",
  partnerships: "/partnerships",
  contact: "/contact",
  privacy: "/privacy",
} as const;

export type RouteKey = keyof typeof routes;

export const routeKeys = Object.keys(routes) as RouteKey[];

/** Primary navigation order. */
export const navRoutes: RouteKey[] = ["about", "businesses", "portfolio", "presence", "leadership", "partnerships"];

export function href(locale: Locale, route: RouteKey, hash?: string) {
  return `/${locale}${routes[route]}${hash ? `#${hash}` : ""}`;
}

export const inquiryTypes = ["partnership", "investment", "corporate", "general"] as const;
export type InquiryType = (typeof inquiryTypes)[number];

export function contactHref(locale: Locale, type?: InquiryType) {
  return `/${locale}${routes.contact}${type ? `?type=${type}` : ""}#inquiry`;
}
