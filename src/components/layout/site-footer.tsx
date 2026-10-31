import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { BackToTop } from "@/components/layout/back-to-top";
import { FooterWordmark } from "@/components/layout/footer-wordmark";
import { ButtonLink } from "@/components/ui/button";
import type { SiteContent } from "@/content/types";
import { localeMeta, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { contactHref, href, legalRoutes, tradeHref, tradeIds, type RouteKey } from "@/lib/routes";

export function SiteFooter({ locale, content }: { locale: Locale; content: SiteContent }) {
  const { footer, nav, meta, inquiry, trades, home } = content;
  const year = new Date().getFullYear();

  const columns: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: footer.groups.group,
      links: (["about", "portfolio", "presence", "partnerships"] as RouteKey[]).map((r) => ({
        label: nav.labels[r],
        href: href(locale, r),
      })),
    },
    {
      title: nav.labels.trade,
      links: [
        ...tradeIds.map((id) => ({ label: trades[id].name, href: tradeHref(locale, id) })),
        { label: home.green.eyebrow, href: href(locale, "sustainability") },
      ],
    },
    {
      title: footer.groups.contact,
      links: (["partnership", "investment", "corporate"] as const).map((t) => ({
        label: inquiry.types[t].label,
        href: contactHref(locale, t),
      })),
    },
  ];

  return (
    <footer className="surface-ink-deep relative overflow-hidden">
      <div className="container-x pt-24 pb-10 md:pt-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo className="text-ivory" />
            <p className="t-lead mt-8 max-w-md text-ivory/80">{footer.statement}</p>
            <ButtonLink href={contactHref(locale)} className="mt-10">
              {nav.cta}
            </ButtonLink>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[0.875rem] font-medium text-mist">{col.title}</p>
                <ul className="mt-4">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-flex min-h-11 items-center text-[1rem] text-ivory/80 transition-colors hover:text-ivory"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <FooterWordmark />

        <div className="mt-12 flex flex-col gap-6 text-[0.875rem] text-mist md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {meta.siteName}. {footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <nav aria-label={footer.legal}>
              <ul className="flex flex-wrap items-center gap-x-6">
                {legalRoutes.map((r) => (
                  <li key={r}>
                    <Link href={href(locale, r)} className="inline-flex min-h-11 items-center hover:text-ivory">
                      {nav.labels[r]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label={footer.languages} className="flex items-center gap-1">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  hrefLang={localeMeta[l].htmlLang}
                  aria-current={l === locale ? "true" : undefined}
                  className={cn(
                    "inline-flex min-h-11 min-w-11 items-center justify-center transition-colors",
                    l === locale ? "text-ivory underline underline-offset-4" : "hover:text-ivory",
                  )}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </nav>
            <p className="font-medium text-mist">{meta.signature}</p>
            <BackToTop label={content.common.backToTop} />
          </div>
        </div>
      </div>
    </footer>
  );
}
