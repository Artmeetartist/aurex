export const locales = ["en", "pl", "nl", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Cookie that remembers an explicit language choice from the switcher. */
export const LOCALE_COOKIE = "AUREX_LOCALE";

export const localeMeta: Record<Locale, { label: string; native: string; htmlLang: string; ogLocale: string }> = {
  en: { label: "English", native: "English", htmlLang: "en", ogLocale: "en_GB" },
  pl: { label: "Polish", native: "Polski", htmlLang: "pl", ogLocale: "pl_PL" },
  nl: { label: "Dutch", native: "Nederlands", htmlLang: "nl", ogLocale: "nl_NL" },
  fr: { label: "French", native: "Français", htmlLang: "fr", ogLocale: "fr_FR" },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
