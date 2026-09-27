import { ClosingStatement } from "@/components/sections/sustainability/closing-statement";
import { EcosystemGallery } from "@/components/sections/sustainability/ecosystem-gallery";
import { GreenHero } from "@/components/sections/sustainability/green-hero";
import { GreenIntro } from "@/components/sections/sustainability/green-intro";
import { ModelFlow } from "@/components/sections/sustainability/model-flow";
import { PillarPanels } from "@/components/sections/sustainability/pillar-panels";
import { PrinciplesList } from "@/components/sections/sustainability/principles-list";
import { loadPage, metadataFor } from "@/lib/page";

export const generateMetadata = metadataFor("sustainability");

/**
 * AUREX Green: the group's strategic trading and investment vertical for
 * sustainable products, technologies and materials. Presented as an area of
 * development within a trading and holding house — no impact figures,
 * certifications or projects are claimed.
 */
export default async function SustainabilityPage({ params }: PageProps<"/[locale]/sustainability">) {
  const { locale, content } = await loadPage(params);

  return (
    <div className="bg-forest-950">
      <GreenHero locale={locale} content={content} />
      <GreenIntro content={content} />
      <EcosystemGallery content={content} />
      <PillarPanels content={content} />
      <ModelFlow content={content} />
      <PrinciplesList content={content} />
      <ClosingStatement locale={locale} content={content} />
    </div>
  );
}
