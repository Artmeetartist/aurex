import type { MetadataRoute } from "next";
import { getContent } from "@/content/repository";
import { defaultLocale } from "@/i18n/config";

/**
 * Web app manifest. Colours match the ink surface token in globals.css and
 * the viewport themeColor in [locale]/layout.tsx.
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { meta } = await getContent(defaultLocale);
  return {
    name: meta.siteName,
    short_name: meta.siteName,
    description: meta.description,
    lang: defaultLocale,
    start_url: "/",
    scope: "/",
    display: "browser",
    theme_color: "#051616",
    background_color: "#051616",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
