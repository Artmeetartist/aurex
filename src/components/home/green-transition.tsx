import type { SiteContent } from "@/content/types";
import type { Locale } from "@/i18n/config";

// Interface stub — implemented by the AUREX Green build step.
export function GreenTransition({ locale, content }: { locale: Locale; content: SiteContent }) {
  void locale;
  void content;
  return null;
}
