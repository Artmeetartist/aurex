import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Eyebrow, StatusTag } from "@/components/ui/eyebrow";
import { offices } from "@/content/facts";
import type { SiteContent } from "@/content/types";

/**
 * Registered office and representation. Only confirmed offices live in
 * `facts.offices`; until then a compact note renders instead of placeholders.
 */
export function OfficeRegister({ content, index }: { content: SiteContent; index?: string }) {
  const copy = content.presence.offices;

  return (
    <section aria-labelledby="offices-title" className="border-t border-ink/10 bg-ivory-200 py-20 text-ink md:py-28">
      <div className="container-x grid gap-10 md:gap-12 lg:grid-cols-12 lg:items-start">
        <Reveal y={16} className="lg:col-span-5">
          <Eyebrow index={index} tone="dark">
            {copy.eyebrow}
          </Eyebrow>
          <h2
            id="offices-title"
            className="t-display-sm mt-6 max-w-[18ch] font-light tracking-[-0.025em] text-ink [text-wrap:balance]"
          >
            {copy.title}
          </h2>
        </Reveal>

        {offices.length === 0 ? (
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <div className="border-l border-gold-ink/40 pl-6 sm:pl-8 lg:mt-12">
              <p className="t-lead max-w-lg text-ink/80 [text-wrap:pretty]">{copy.empty}</p>
              <StatusTag tone="dark" className="mt-7">
                {content.common.comingSoon}
              </StatusTag>
            </div>
          </Reveal>
        ) : (
          <RevealGroup as="ul" className="border-t border-ink/10 lg:col-span-6 lg:col-start-7 lg:mt-12">
            {offices.map((office) => (
              <RevealItem
                as="li"
                key={`${office.label}-${office.city}`}
                className="grid gap-x-8 gap-y-2 border-b border-ink/10 py-7 sm:grid-cols-[minmax(0,12rem)_1fr]"
              >
                <p className="t-eyebrow pt-1.5 text-gold-ink">{office.label}</p>
                <div>
                  <h3 className="t-title font-normal text-ink">
                    {office.city}, {office.country}
                  </h3>
                  {office.address && (
                    <address className="mt-2 text-[0.9375rem] not-italic leading-relaxed text-stone">{office.address}</address>
                  )}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </div>
    </section>
  );
}
