import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

/** Closing call-to-action band used at the end of inner pages. */
export function CtaBand({
  eyebrow,
  title,
  accent,
  intro,
  primary,
  secondary,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  accent?: string[];
  intro?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  tone?: "light" | "dark";
}) {
  return (
    <section className={cn("section-y relative overflow-hidden", tone === "light" ? "surface-ink" : "surface-ivory")}>
      {tone === "light" && (
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full [background:radial-gradient(closest-side,rgb(200_162_74/0.14),transparent_70%)]"
        />
      )}
      <div className="container-x relative flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">
        <SectionHeading eyebrow={eyebrow} title={title} accent={accent} intro={intro} tone={tone} size="lg" />
        <Reveal delay={0.2} className="flex shrink-0 flex-wrap gap-3">
          <ButtonLink href={primary.href} size="lg" variant={tone === "light" ? "gold" : "ink"}>
            {primary.label}
          </ButtonLink>
          {secondary && (
            <ButtonLink href={secondary.href} size="lg" variant={tone === "light" ? "outline-light" : "outline-dark"}>
              {secondary.label}
            </ButtonLink>
          )}
        </Reveal>
      </div>
    </section>
  );
}
