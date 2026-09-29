import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ArrowRight } from "@/components/ui/icons";
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
 * The four partnership models as quadrants divided by hairlines: name,
 * summary, typical forms of cooperation and the matching inquiry link.
 * `tone="dark"` for paper, `"light"` for ink.
 */
export function ModelCards({
  locale,
  content,
  tone = "dark",
  className,
}: {
  locale: Locale;
  content: SiteContent;
  tone?: "dark" | "light";
  className?: string;
}) {
  const onInk = tone === "light";
  return (
    <RevealGroup
      as="ul"
      stagger={0.06}
      className={cn("grid border-t md:grid-cols-2", onInk ? "border-white/15" : "border-ink/15", className)}
    >
      {partnerModels.map((id, i) => {
        const model = content.partnerModels[id];
        const type = inquiryFor(id);
        return (
          <RevealItem
            as="li"
            key={id}
            y={12}
            className={cn(
              "border-b md:[&:nth-child(even)]:pl-10 md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:pr-10",
              onInk ? "border-white/15" : "border-ink/15",
            )}
          >
            <Link
              href={contactHref(locale, type)}
              className={cn(
                "group/m grid h-full gap-6 py-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] sm:grid-cols-[3rem_1fr] md:py-12",
                onInk ? "focus-visible:outline-gold" : "focus-visible:outline-gold-ink",
              )}
            >
              <span className={cn("t-meta pt-2", onInk ? "text-mist-dim" : "text-gold-ink")}>{String(i + 1).padStart(2, "0")}</span>
              <span className="flex flex-col">
                <span
                  className={cn(
                    "font-serif text-[clamp(1.625rem,2.4vw,2.125rem)] leading-[1.1] tracking-[-0.015em] [font-variation-settings:'opsz'_48]",
                    onInk ? "text-ivory" : "text-ink",
                  )}
                >
                  {model.name}
                </span>
                <span className={cn("mt-4 max-w-md text-[1rem] leading-relaxed", onInk ? "text-mist" : "text-stone")}>{model.summary}</span>
                <span className={cn("mt-6 text-[0.875rem] leading-relaxed", onInk ? "text-ivory/60" : "text-ink/60")}>
                  {model.examples.join(" · ")}
                </span>
                <span className={cn("mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-medium", onInk ? "text-ivory" : "text-ink")}>
                  <span
                    className={cn(
                      "underline underline-offset-[0.3em] transition-[text-decoration-color] duration-300",
                      onInk ? "decoration-white/30 group-hover/m:decoration-ivory" : "decoration-ink/30 group-hover/m:decoration-ink",
                    )}
                  >
                    {inquiryLabel(content, type)}
                  </span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover/m:translate-x-1 motion-reduce:transform-none" />
                </span>
              </span>
            </Link>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
