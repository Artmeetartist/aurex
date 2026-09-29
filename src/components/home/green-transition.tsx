import { GreenFlow } from "@/components/green/green-flow";
import { GreenPillars } from "@/components/green/green-pillars";
import { GreenStage } from "@/components/green/green-stage";
import { GreenStatement } from "@/components/green/green-statement";
import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";

/**
 * AUREX Green on the home page: a pinned, scroll-driven maquette of the
 * sustainable commerce ecosystem, the four business pillars, the
 * Source → Trade → Distribute → Invest model and a closing statement.
 * Presented as a strategic area of development, not as operating businesses.
 */
export function GreenTransition({ locale, content }: { locale: Locale; content: SiteContent }) {
  return (
    <section id="green" aria-labelledby="green-title" className="relative bg-forest-950 text-cream">
      <GreenStage locale={locale} content={content} />
      <div className="relative">
        <GreenPillars locale={locale} content={content} />
        <GreenFlow content={content} />
      </div>
      <GreenStatement locale={locale} content={content} />
      {/* Hand the forest palette over to the ink of the next section without a seam. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
    </section>
  );
}
