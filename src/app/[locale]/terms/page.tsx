import { LegalDocument } from "@/components/legal/legal-document";
import { loadPage, metadataFor } from "@/lib/page";

export const generateMetadata = metadataFor("terms");

export default async function TermsPage({ params }: PageProps<"/[locale]/terms">) {
  const { locale, content } = await loadPage(params);
  return <LegalDocument locale={locale} route="terms" doc={content.terms} content={content} />;
}
