import { company } from "@/content/facts";
import type { SiteContent } from "@/content/types";
import { localeMeta, type Locale } from "@/i18n/config";
import { siteUrl } from "@/lib/seo";

/**
 * Organization + WebSite structured data.
 *
 * Uses confirmed information only (see src/content/facts.ts and
 * docs/SOURCE_OF_TRUTH.md). Address, phone, founders, founding date and
 * social profiles are deliberately absent until AUREX confirms them;
 * `legalName` and `email` appear automatically once they are set in facts.ts
 * / NEXT_PUBLIC_CONTACT_EMAIL.
 */
export function JsonLd({ locale, meta }: { locale: Locale; meta: SiteContent["meta"] }) {
  const organizationId = `${siteUrl}/#organization`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: meta.siteName,
        ...(company.legalName ? { legalName: company.legalName } : {}),
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/apple-icon`,
          width: 180,
          height: 180,
        },
        description: meta.description,
        slogan: meta.tagline,
        ...(company.email ? { email: company.email } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/${locale}#website`,
        url: `${siteUrl}/${locale}`,
        name: meta.siteName,
        description: meta.description,
        inLanguage: localeMeta[locale].htmlLang,
        publisher: { "@id": organizationId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so no string value can close the script element.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
