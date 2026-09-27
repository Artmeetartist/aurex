import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { BackToTop } from "@/components/layout/back-to-top";
import { FooterWordmark } from "@/components/layout/footer-wordmark";
import { ButtonLink } from "@/components/ui/button";
import type { SiteContent } from "@/content/types";
import { localeMeta, locales, type Locale } from "@/i18n/config";
import { contactHref, href, tradeHref, tradeIds, type RouteKey } from "@/lib/routes";

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
    <footer className="surface-ink-deep relative overflow-hidden border-t border-white/[0.06]">
      <div className="container-x pt-24 pb-10 md:pt-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo className="text-ivory" />
            <p className="t-lead mt-8 max-w-md text-mist">{footer.statement}</p>
            <ButtonLink href={contactHref(locale)} className="mt-10">
              {nav.cta}
            </ButtonLink>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="t-eyebrow text-gold">{col.title}</p>
                <ul className="mt-6 space-y-3.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[0.9375rem] text-ivory/75 transition-colors hover:text-ivory">
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

        <div className="mt-12 flex flex-col gap-6 border-t border-white/[0.08] pt-8 text-[0.8125rem] text-mist md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {meta.siteName}. {footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href={href(locale, "privacy")} className="hover:text-ivory">
              {nav.labels.privacy}
            </Link>
            <nav aria-label={footer.languages} className="flex items-center gap-4">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  hrefLang={localeMeta[l].htmlLang}
                  className={l === locale ? "text-gold" : "hover:text-ivory"}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </nav>
            <p className="t-eyebrow !text-[0.625rem] text-mist-dim">{meta.signature}</p>
            <BackToTop label={content.common.backToTop} />
          </div>
        </div>
      </div>
    </footer>
  );
}
