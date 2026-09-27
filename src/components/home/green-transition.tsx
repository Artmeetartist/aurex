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
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[48rem] w-[80rem] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-70 [background:radial-gradient(closest-side,rgb(0_153_153/0.14),transparent_70%)]"
        />
        <GreenPillars locale={locale} content={content} />
        <GreenFlow content={content} />
      </div>
      <GreenStatement locale={locale} content={content} />
    </section>
  );
}
