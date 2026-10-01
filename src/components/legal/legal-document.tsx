import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero } from "@/components/page/page-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { LegalDocument as LegalDocumentContent, SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { href, legalRoutes, type LegalRouteKey } from "@/lib/routes";

const sectionId = (i: number) => `section-${i + 1}`;
const pad = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Shared layout for the legal pages: a sticky index of sections and the
 * sibling documents beside numbered sections. Sections that name a `slot`
 * render the matching node from `slots` after their paragraphs.
 */
export function LegalDocument<Slot extends string = never>({
  locale,
  route,
  doc,
  content,
  slots,
}: {
  locale: Locale;
  route: LegalRouteKey;
  doc: LegalDocumentContent<Slot>;
  content: SiteContent;
  slots?: Record<Slot, ReactNode>;
}) {
  const { nav, common, footer } = content;

  return (
    <>
      <PageHero
        hero={doc.hero}
        breadcrumb={{ home: common.breadcrumbHome, homeHref: href(locale, "home"), current: nav.labels[route] }}
      />

      <section className="surface-ivory section-y">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow tone="dark">{doc.updated}</Eyebrow>

              {/* Section index for quick scanning on wide screens. */}
              <ol className="mt-10 hidden border-t border-ink/10 lg:block">
                {doc.sections.map((s, i) => (
                  <li key={s.title} className="border-b border-ink/10">
                    <a
                      href={`#${sectionId(i)}`}
                      className="group flex min-h-12 items-center gap-5 py-3 text-[0.9375rem] text-stone transition-colors hover:text-ink"
                    >
                      <span className="t-eyebrow w-6 text-gold-ink">{pad(i)}</span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>

              <nav aria-label={footer.legal} className="mt-10 hidden lg:block">
                <p className="t-eyebrow text-stone">{footer.legal}</p>
                <ul className="mt-3 flex flex-wrap gap-x-6">
                  {legalRoutes.map((r) => (
                    <li key={r}>
                      <Link
                        href={href(locale, r)}
                        aria-current={r === route ? "page" : undefined}
                        className={cn(
                          "inline-flex min-h-11 items-center text-[0.9375rem] transition-colors",
                          r === route ? "text-ink underline underline-offset-4" : "text-stone hover:text-ink",
                        )}
                      >
                        {nav.labels[r]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {doc.sections.map((s, i) => (
              <section
                key={s.title}
                id={sectionId(i)}
                className="grid scroll-mt-[calc(var(--header-h)+2rem)] gap-5 border-t border-ink/10 py-12 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[4.5rem_1fr] md:gap-0 md:py-14"
              >
                <span aria-hidden className="t-eyebrow pt-2 text-gold-ink md:pt-3.5">
                  {pad(i)}
                </span>
                <div className="min-w-0 max-w-[65ch]">
                  <h2 className="t-display-sm text-ink">{s.title}</h2>
                  {s.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)} className="t-body mt-5 text-ink/80">
                      {p}
                    </p>
                  ))}
                  {s.slot && slots?.[s.slot] && <div className="mt-8">{slots[s.slot]}</div>}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/** Label/value register used for the operator details on the legal notice. */
export function FactRegister({ rows, pending }: { rows: { label: string; value: ReactNode | null }[]; pending: string }) {
  return (
    <dl className="border-t border-ink/10">
      {rows.map((row) => (
        <div key={row.label} className="grid gap-1 border-b border-ink/10 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
          <dt className="t-eyebrow pt-1 text-stone">{row.label}</dt>
          <dd className={cn("text-[0.9375rem]", row.value ? "text-ink" : "text-stone italic")}>{row.value ?? pending}</dd>
        </div>
      ))}
    </dl>
  );
}
