import { notFound } from "next/navigation";

/**
 * Catch-all for unknown paths under a locale (e.g. /en/does-not-exist).
 *
 * Without it an unmatched URL never enters the [locale] tree, so Next.js
 * serves its unbranded default 404. Calling notFound() here renders
 * [locale]/not-found.tsx inside the localized root layout instead.
 *
 * Deliberately no generateStaticParams: the [locale] layout exports
 * `dynamicParams = false`, and with a generateStaticParams (even `[]`) this
 * route would become a static route with no pre-rendered paths, so production
 * would short-circuit every request to the unbranded default 404 before this
 * page runs. Left dynamic, it only ever renders the branded 404 (status 404),
 * and there is nothing to pre-render or cache.
 */
export default function CatchAllNotFound(): never {
  notFound();
}
