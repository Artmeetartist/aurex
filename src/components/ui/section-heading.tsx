import type { ReactNode } from "react";
import { MaskText, Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";

/**
 * Standard section opener: indexed eyebrow, masked display title, optional intro.
 * `tone="dark"` is for ivory surfaces.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
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
  accent?: string[];
  intro?: string;
  tone?: "light" | "dark";
  size?: "xl" | "lg" | "md";
  as?: "h1" | "h2" | "h3";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("max-w-4xl", className)}>
      <Reveal y={12}>
        <Eyebrow index={index} tone={tone}>
          {eyebrow}
        </Eyebrow>
      </Reveal>
      <MaskText
        as={as}
        text={title}
        accent={accent}
        tone={tone}
        className={cn(
          "mt-7",
          size === "xl" ? "t-display-xl" : size === "lg" ? "t-display-lg" : "t-display-md",
          tone === "light" ? "text-ivory" : "text-ink",
        )}
      />
      {intro && (
        <Reveal delay={0.15}>
          <p className={cn("t-lead mt-7 max-w-2xl", tone === "light" ? "text-mist" : "text-stone")}>{intro}</p>
        </Reveal>
      )}
      {children}
    </div>
  );
}
