import type { ReactNode } from "react";
import { MaskText, Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

/**
 * Section opener: a serif heading and an optional lead. No kicker, no
 * number, no rule: the heading carries the section on its own.
 * `tone="dark"` is for paper surfaces.
 */
export function SectionHeading({
  title,
  intro,
  tone = "light",
  size = "lg",
  as = "h2",
  className,
  children,
}: {
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
      <MaskText
        as={as}
        text={title}
        className={cn(
          size === "xl" ? "t-display-xl" : size === "lg" ? "t-display-lg" : "t-display-md",
          tone === "light" ? "text-ivory" : "text-ink",
        )}
      />
      {intro && (
        <Reveal delay={0.1} y={12}>
          <p className={cn("t-lead mt-6 max-w-[40rem]", tone === "light" ? "text-ivory/85" : "text-ink/85")}>{intro}</p>
        </Reveal>
      )}
      {children}
    </div>
  );
}
