import { MaskText, Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";

/**
 * Closing call to action for inner pages: one large statement and the next
 * step. Typographic, no decoration; the only colour is the action itself.
 */
export function CtaBand({
  eyebrow,
  title,
  intro,
  primary,
  secondary,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** "light" = light text on ink (default), "dark" = ink text on paper. */
  tone?: "light" | "dark";
}) {
  const light = tone === "light";
  return (
    <section className={cn("relative py-[clamp(5rem,10vw,9rem)]", light ? "bg-ink-950 text-ivory" : "surface-ivory")}>
      <div className="container-x">
        <Reveal y={0} className={cn("border-t pt-4", light ? "border-white/15" : "border-ink/15")}>
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </Reveal>
        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <MaskText as="h2" text={title} className={cn("t-display-lg max-w-[18ch]", light ? "text-ivory" : "text-ink")} />
            {intro && (
              <Reveal delay={0.1} y={12}>
                <p className={cn("t-lead mt-6 max-w-[38rem]", light ? "text-mist" : "text-stone")}>{intro}</p>
              </Reveal>
            )}
          </div>
          <Reveal delay={0.15} y={12} className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <ButtonLink href={primary.href} size="lg" variant={light ? "gold" : "ink"}>
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} size="lg" variant={light ? "outline-light" : "outline-dark"}>
                {secondary.label}
              </ButtonLink>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
