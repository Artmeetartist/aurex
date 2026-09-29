import { locale as rootLocale } from "next/root-params";
import { LogoMark } from "@/components/brand/logo";
import { MaskText, Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getContent } from "@/content/repository";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { contactHref, href } from "@/lib/routes";

/** not-found receives no params; the root param getter gives the locale, English is the fallback. */
async function resolveLocale(): Promise<Locale> {
  try {
    const value = await rootLocale();
    return isLocale(value) ? value : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

export default async function NotFound() {
  const locale = await resolveLocale();
  const { notFound, nav } = await getContent(locale);

  return (
    <section className="surface-ink relative isolate flex min-h-[100svh] items-end overflow-hidden">
      {/* Decorative: soft brand glow and an oversized, near-invisible mark. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[18%] top-[4%] -z-10 w-[min(64rem,110vw)] opacity-[0.07] md:-right-[6%] md:top-1/2 md:w-[min(52rem,62vw)] md:-translate-y-1/2"
      >
        <LogoMark className="h-auto w-full text-ivory" />
      </div>

      <div className="container-x pb-20 pt-[calc(var(--header-h)+7rem)] md:pb-28">
        <Reveal y={12}>
          <Eyebrow className="text-gold">{notFound.eyebrow}</Eyebrow>
        </Reveal>

        <MaskText as="h1" text={notFound.title} delay={0.1} className="t-display-xl mt-8 max-w-[13ch] text-ivory" />

        <Reveal delay={0.35} y={16} className="mt-10 max-w-xl border-t border-white/10 pt-8">
          <p className="t-lead text-mist">{notFound.text}</p>
        </Reveal>

        <Reveal delay={0.5} y={16} className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href={href(locale, "home")} size="lg">
            {notFound.cta}
          </ButtonLink>
          <ButtonLink href={contactHref(locale)} size="lg" variant="outline-light">
            {nav.cta}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
