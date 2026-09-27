import type { Metadata } from "next";
import type { SiteContent } from "@/content/types";
import { defaultLocale, localeMeta, locales, type Locale } from "@/i18n/config";
import { routes, type RouteKey } from "./routes";

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL in production; on Vercel the
 * production domain is used automatically when it is not set.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export function localizedUrl(locale: Locale, route: RouteKey) {
  return `${siteUrl}/${locale}${routes[route]}`;
}

export function languageAlternates(route: RouteKey) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeMeta[l].htmlLang] = localizedUrl(l, route);
  languages["x-default"] = localizedUrl(defaultLocale, route);
  return languages;
}

export function pageMetadata(locale: Locale, route: RouteKey, content: SiteContent): Metadata {
  const page = content.meta.pages[route];
  const url = localizedUrl(locale, route);
  const title = route === "home" ? `${content.meta.siteName} — ${page.title}` : page.title;

  return {
    title: route === "home" ? { absolute: title } : title,
    description: page.description,
    alternates: { canonical: url, languages: languageAlternates(route) },
    openGraph: {
      type: "website",
      url,
      siteName: content.meta.siteName,
      title: route === "home" ? title : `${page.title} — ${content.meta.siteName}`,
      description: page.description,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
    },
    twitter: {
      card: "summary_large_image",
      title: route === "home" ? title : `${page.title} — ${content.meta.siteName}`,
      description: page.description,
    },
  };
}
