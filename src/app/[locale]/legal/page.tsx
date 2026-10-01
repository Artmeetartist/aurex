import { FactRegister, LegalDocument } from "@/components/legal/legal-document";
import { company } from "@/content/facts";
import { loadPage, metadataFor } from "@/lib/page";

export const generateMetadata = metadataFor("legal");

export default async function LegalNoticePage({ params }: PageProps<"/[locale]/legal">) {
  const { locale, content } = await loadPage(params);
  const { operator } = content.legal;

  // Only confirmed company facts are shown; anything not yet supplied renders the pending state.
  const register = (
    <FactRegister
      pending={operator.pending}
      rows={[
        { label: operator.legalName, value: company.legalName },
        { label: operator.registeredOffice, value: company.registeredOffice },
        { label: operator.registration, value: company.registration },
        { label: operator.hosting, value: company.hostingProvider },
        {
          label: operator.email,
          value: company.email && (
            <a href={`mailto:${company.email}`} className="underline underline-offset-4 hover:text-gold-ink">
              {company.email}
            </a>
          ),
        },
      ]}
    />
  );

  return (
    <LegalDocument locale={locale} route="legal" doc={content.legal} content={content} slots={{ operator: register }} />
  );
}
