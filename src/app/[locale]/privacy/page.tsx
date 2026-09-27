import { PageHero } from "@/components/page/page-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { loadPage, metadataFor } from "@/lib/page";
import { href } from "@/lib/routes";

export const generateMetadata = metadataFor("privacy");

const sectionId = (i: number) => `section-${i + 1}`;
const pad = (i: number) => String(i + 1).padStart(2, "0");

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale, content } = await loadPage(params);
  const { privacy, nav, common } = content;

  return (
    <>
      <PageHero
        hero={privacy.hero}
        breadcrumb={{ home: common.breadcrumbHome, homeHref: href(locale, "home"), current: nav.labels.privacy }}
      />

      <section className="surface-ivory section-y">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow tone="dark">{privacy.updated}</Eyebrow>

              {/* Section index for quick scanning on wide screens. */}
              <ol className="mt-10 hidden border-t border-ink/10 lg:block">
                {privacy.sections.map((s, i) => (
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
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {privacy.sections.map((s, i) => (
              <section
                key={s.title}
                id={sectionId(i)}
                className="grid scroll-mt-[calc(var(--header-h)+2rem)] gap-5 border-t border-ink/10 py-12 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[4.5rem_1fr] md:gap-0 md:py-14"
              >
                <span aria-hidden className="t-eyebrow pt-2 text-gold-ink md:pt-3.5">
                  {pad(i)}
                </span>
                <div className="max-w-[65ch]">
                  <h2 className="t-display-sm text-ink">
                    {s.title}
                  </h2>
                  {s.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)} className="t-body mt-5 text-ink/80">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
