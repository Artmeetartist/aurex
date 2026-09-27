import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { routeKeys, tradeIds, type RouteKey } from "@/lib/routes";
import { languageAlternates, localizedUrl, tradeUrl } from "@/lib/seo";
import { defaultLocale, localeMeta } from "@/i18n/config";

type Entry = MetadataRoute.Sitemap[number];

/** Crawl hints per route. The group pages change rarely; legal pages almost never. */
const hints: Record<RouteKey, { changeFrequency: Entry["changeFrequency"]; priority: number }> = {
  home: { changeFrequency: "monthly", priority: 1 },
  about: { changeFrequency: "monthly", priority: 0.8 },
  trade: { changeFrequency: "monthly", priority: 0.8 },
  sustainability: { changeFrequency: "monthly", priority: 0.8 },
  portfolio: { changeFrequency: "monthly", priority: 0.7 },
  presence: { changeFrequency: "monthly", priority: 0.7 },
  partnerships: { changeFrequency: "monthly", priority: 0.7 },
  contact: { changeFrequency: "yearly", priority: 0.6 },
  privacy: { changeFrequency: "yearly", priority: 0.2 },
};

/**
 * Every route and trade-line page in every locale, each listing its language
 * alternates (hreflang, including x-default). `lastModified` is omitted on
 * purpose: a build date is not a content date.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = routeKeys.flatMap((route) => {
    const languages = languageAlternates(route);
    return locales.map((locale) => ({
      url: localizedUrl(locale, route),
      changeFrequency: hints[route].changeFrequency,
      priority: hints[route].priority,
      alternates: { languages },
    }));
  });

  const tradeLines = tradeIds.flatMap((id) => {
    const languages: Record<string, string> = {};
    for (const l of locales) languages[localeMeta[l].htmlLang] = tradeUrl(l, id);
    languages["x-default"] = tradeUrl(defaultLocale, id);
    return locales.map((locale) => ({
      url: tradeUrl(locale, id),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages },
    }));
  });

  return [...pages, ...tradeLines];
}
