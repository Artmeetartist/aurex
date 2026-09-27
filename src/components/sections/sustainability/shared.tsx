import type { ReactNode, SVGProps } from "react";
import type { GreenPillarId } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Shared pieces of the AUREX Green (Sustainability) page. Server-safe: no
 * client hooks, so both server and client sections can import from here.
 */

export const pad = (n: number) => String(n).padStart(2, "0");

/** Still of each ecosystem stage (0–6), rendered from the GreenScene maquette. */
export const stageStill = (stage: number) => `/media/green/stage-${stage}.webp`;
/** Wide still of the port — global distribution. */
export const WIDE_STILL = "/media/green/stage-6-wide.webp";

/** The ecosystem stage that best illustrates each pillar, and where to focus the crop. */
export const PILLAR_STAGE: Record<GreenPillarId, { stage: number; focus: string }> = {
  materials: { stage: 2, focus: "38% 55%" },
  energy: { stage: 0, focus: "34% 55%" },
  commerce: { stage: 3, focus: "62% 58%" },
  logistics: { stage: 5, focus: "52% 55%" },
};

/** Container gutter, repeated for full-bleed rows that must line up with `container-x`. */
export const GUTTER = "clamp(1.25rem, 4vw, 3.5rem)";
/** Left edge of `container-x` content, measured from the viewport edge. */
export const CONTAINER_EDGE = `max(${GUTTER}, calc((100vw - 90rem) / 2 + ${GUTTER}))`;

/** Mono label with a brass rule. `tone="dark"` is for cream surfaces. */
export function GreenEyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p className={cn("t-eyebrow flex items-center gap-3", tone === "light" ? "text-brass-soft" : "text-stone", className)}>
      <span aria-hidden className={cn("h-px w-8", tone === "light" ? "bg-brass/70" : "bg-brass")} />
      <span>{children}</span>
    </p>
  );
}

/** Direction chevron for connecting lines. */
export function Chevron({ className }: { className?: string }) {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden className={className}>
      <path d="M2.5 1 6 4.5 2.5 8" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/**
 * Line icons for the Source → Trade → Distribute → Invest model, drawn on the
 * same 48-unit grid and 1.25px stroke as the pillar icons.
 */
const modelPaths: React.ReactNode[] = [
  // Source — a point of origin, located and verified.
  <>
    <path d="M24 39.5s-10.5-9.6-10.5-18a10.5 10.5 0 0 1 21 0c0 8.4-10.5 18-10.5 18Z" />
    <circle cx="24" cy="21.5" r="3.75" />
    <path d="M10 39.5h28" />
  </>,
  // Trade — two counterparts, one exchange.
  <>
    <path d="M9 18h27.5M31.5 12.5 37 18l-5.5 5.5" />
    <path d="M39 30H11.5M16.5 24.5 11 30l5.5 5.5" />
  </>,
  // Distribute — one flow branching to several markets.
  <>
    <circle cx="10.5" cy="24" r="3" />
    <path d="M13.5 24h8M21.5 24c5 0 5-11 12-11M21.5 24h12M21.5 24c5 0 5 11 12 11" />
    <circle cx="37" cy="13" r="2.5" />
    <circle cx="37" cy="24" r="2.5" />
    <circle cx="37" cy="35" r="2.5" />
  </>,
  // Invest — capital built up over time.
  <>
    <path d="M9 39.5h30" />
    <path d="M12.5 39.5v-8h6v8M21 39.5V24.5h6v15M29.5 39.5V16h6v23.5" />
    <path d="M12 20.5 21.5 12l5 4 9-8.5M31 7.5h4.5V12" />
  </>,
];

export function ModelIcon({ index, size = 48, ...props }: IconProps & { index: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {modelPaths[index % modelPaths.length]}
    </svg>
  );
}
