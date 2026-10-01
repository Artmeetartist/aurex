import { LegalDocument } from "@/components/legal/legal-document";
import { loadPage, metadataFor } from "@/lib/page";

export const generateMetadata = metadataFor("privacy");

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale, content } = await loadPage(params);
  return <LegalDocument locale={locale} route="privacy" doc={content.privacy} content={content} />;
}
