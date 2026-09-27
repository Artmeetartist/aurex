import "server-only";
import type { Locale } from "@/i18n/config";
import type { SiteContent } from "./types";

/**
 * Content repository.
 *
 * Today content ships as typed locale modules. To move to a CMS, implement
 * `ContentSource` against the CMS API (see docs/CMS.md) and swap `source`.
 */
export interface ContentSource {
  getSiteContent(locale: Locale): Promise<SiteContent>;
}

const localModules: Record<Locale, () => Promise<{ default: SiteContent }>> = {
  en: () => import("./locales/en"),
  pl: () => import("./locales/pl"),
  nl: () => import("./locales/nl"),
  fr: () => import("./locales/fr"),
};

const localSource: ContentSource = {
  async getSiteContent(locale) {
    return (await localModules[locale]()).default;
  },
};

const source: ContentSource = localSource;

export function getContent(locale: Locale) {
  return source.getSiteContent(locale);
}
