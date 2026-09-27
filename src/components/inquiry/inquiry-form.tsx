"use client";

import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";
import type { InquiryType } from "@/lib/routes";

export type InquiryFormProps = {
  locale: Locale;
  inquiry: SiteContent["inquiry"];
  /** Preselected inquiry type; the form also reads ?type= from the URL. */
  defaultType?: InquiryType;
  /** "dark" for ink surfaces (default), "light" for ivory surfaces. */
  surface?: "dark" | "light";
  className?: string;
};

// Interface stub — implemented by the inquiry build step.
export function InquiryForm(props: InquiryFormProps) {
  void props;
  return null;
}
