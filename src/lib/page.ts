import "server-only";
import { notFound } from "next/navigation";
import { getContent } from "@/content/repository";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "./seo";
import type { RouteKey } from "./routes";

/** Resolves and validates the locale param and loads its content. */
export async function loadPage(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { locale: locale as Locale, content: await getContent(locale) };
}

/** Shared generateMetadata implementation for a route. */
export function metadataFor(route: RouteKey) {
  return async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params;
    if (!isLocale(locale)) return {};
    return pageMetadata(locale, route, await getContent(locale));
  };
}
