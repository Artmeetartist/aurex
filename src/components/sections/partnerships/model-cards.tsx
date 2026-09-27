import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CardArrow } from "@/components/ui/card-arrow";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { partnerModels } from "@/content/facts";
import type { PartnerModelId, SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { contactHref, type InquiryType } from "@/lib/routes";

/** The inquiry route each partner model opens on the contact form. */
export function inquiryFor(id: PartnerModelId): InquiryType {
  return id === "capital" ? "investment" : id === "corporate" ? "corporate" : "partnership";
}

/** Each route's call to action reuses the matching "Submit a … inquiry" copy. */
export function inquiryLabel(content: SiteContent, type: InquiryType): string {
  const labels: Record<InquiryType, string> = {
    partnership: content.partnerships.cta.primary,
    investment: content.portfolio.cta.primary,
    corporate: content.leadership.cta.primary,
    general: content.nav.cta,
  };
  return labels[type];
}

/**
 * The four partnership models as large cards for an ivory surface: name,
 * summary and typical forms of cooperation. The whole card opens the contact
 * form on the matching inquiry type.
 */
export function ModelCards({ locale, content, className }: { locale: Locale; content: SiteContent; className?: string }) {
  return (
    <RevealGroup as="ul" className={cn("grid gap-4 md:grid-cols-2 md:gap-5", className)}>
      {partnerModels.map((id, i) => {
        const model = content.partnerModels[id];
        const type = inquiryFor(id);
        return (
          <RevealItem as="li" key={id} className="h-full">
            <InteractiveCard
              href={contactHref(locale, type)}
              tone="light"
              tilt={3}
              className="flex h-full flex-col rounded-[1.75rem] bg-ivory-200/55 p-7 hover:bg-ivory focus-visible:bg-ivory sm:p-10 xl:p-12"
            >
              <span
                aria-hidden
                className="absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-gold-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/card:scale-x-100 group-focus-visible/card:scale-x-100 sm:inset-x-10 xl:inset-x-12"
              />
              <span aria-hidden className="t-eyebrow tabular-nums text-gold-ink">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-12 max-w-[16ch] text-[clamp(1.75rem,2.6vw,2.5rem)] font-light leading-[1.06] tracking-[-0.03em] text-ink [text-wrap:balance] md:mt-20">
                {model.name}
              </h3>
              <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-stone md:text-base">{model.summary}</p>

              <ul className="mt-10 border-t border-ink/10">
                {model.examples.map((example) => (
                  <li
                    key={example}
                    className="flex items-center gap-4 border-b border-ink/10 py-3.5 text-[0.9375rem] text-ink/85"
                  >
                    <span
                      aria-hidden
                      className="h-px w-4 shrink-0 bg-gold-ink/70 transition-[width] duration-500 ease-[var(--ease-out-expo)] group-hover/card:w-6"
                    />
                    {example}
                  </li>
                ))}
              </ul>

              <CardArrow
                label={inquiryLabel(content, type)}
                className="mt-auto flex w-full justify-between gap-4 pt-9 text-left text-[0.9375rem] group-hover/card:translate-x-0 group-focus-visible/card:translate-x-0"
              />
            </InteractiveCard>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
