import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TextLink } from "@/components/ui/button";
import { partnerModels } from "@/content/facts";
import type { PartnerModelId, SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { contactHref, type InquiryType } from "@/lib/routes";

/** The inquiry route each partner model opens on the contact form. */
export function inquiryFor(id: PartnerModelId): InquiryType {
  return id === "capital" ? "investment" : id === "corporate" ? "corporate" : "partnership";
}

/**
 * The four partnership models as large cards for an ivory surface: name,
 * summary, typical forms of cooperation and a direct inquiry link.
 */
export function ModelCards({ locale, content, className }: { locale: Locale; content: SiteContent; className?: string }) {
  // Each route's link reuses the matching "Submit a … inquiry" call to action.
  const linkLabel: Record<InquiryType, string> = {
    partnership: content.partnerships.cta.primary,
    investment: content.portfolio.cta.primary,
    corporate: content.leadership.cta.primary,
    general: content.nav.cta,
  };

  return (
    <RevealGroup as="ul" className={cn("grid gap-4 md:grid-cols-2 md:gap-5", className)}>
      {partnerModels.map((id, i) => {
        const model = content.partnerModels[id];
        const type = inquiryFor(id);
        return (
          <RevealItem as="li" key={id} className="h-full">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/10 bg-ivory-200/55 p-7 transition-[border-color,background-color,box-shadow] duration-700 ease-[var(--ease-out-expo)] hover:border-ink/20 hover:bg-ivory hover:shadow-[0_28px_70px_-40px_rgb(1_51_51/0.35)] sm:p-10 xl:p-12">
              <span
                aria-hidden
                className="absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-gold-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 sm:inset-x-10 xl:inset-x-12"
              />
              <span className="t-eyebrow tabular-nums text-gold-ink">{String(i + 1).padStart(2, "0")}</span>

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
                    <span aria-hidden className="h-px w-4 shrink-0 bg-gold-ink/70" />
                    {example}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-9">
                <TextLink href={contactHref(locale, type)} tone="dark">
                  {linkLabel[type]}
                </TextLink>
              </div>
            </article>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
