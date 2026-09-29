import type { ReactNode } from "react";
import { MaskText, Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";

/**
 * Section opener: a hairline running head (number + label) above a serif
 * statement and an optional lead. `tone="dark"` is for paper surfaces.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  tone = "light",
  size = "lg",
  as = "h2",
  className,
  children,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
  size?: "xl" | "lg" | "md";
  as?: "h1" | "h2" | "h3";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("max-w-4xl", className)}>
      <Reveal y={0} className={cn("border-t pt-4", tone === "light" ? "border-white/15" : "border-ink/15")}>
        <Eyebrow index={index} tone={tone}>
          {eyebrow}
        </Eyebrow>
      </Reveal>
      <MaskText
        as={as}
        text={title}
        className={cn(
          "mt-8 md:mt-10",
          size === "xl" ? "t-display-xl" : size === "lg" ? "t-display-lg" : "t-display-md",
          tone === "light" ? "text-ivory" : "text-ink",
        )}
      />
      {intro && (
        <Reveal delay={0.1} y={12}>
          <p className={cn("t-lead mt-6 max-w-[40rem]", tone === "light" ? "text-mist" : "text-stone")}>{intro}</p>
        </Reveal>
      )}
      {children}
    </div>
  );
}
