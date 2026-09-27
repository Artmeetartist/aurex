import type { SVGProps } from "react";
import type { GreenPillarId } from "@/content/types";

type Props = SVGProps<SVGSVGElement> & { size?: number };

/**
 * Minimal line icons for the four AUREX Green pillars — drawn on a 48-unit grid
 * with 1.25px strokes so they sit with the site's hairline typography.
 */
const paths: Record<GreenPillarId, React.ReactNode> = {
  // Green Materials — a compressed block of material on a circular loop.
  materials: (
    <>
      <path d="M24 13.5 33.5 18.5 24 23.5 14.5 18.5Z" />
      <path d="M14.5 18.5v9L24 32.5l9.5-5v-9M24 23.5v9M14.5 23 24 28l9.5-5" />
      <path d="M40.5 27.5A17 17 0 0 1 12.2 37" />
      <path d="M7.5 20.5A17 17 0 0 1 35.8 11" />
      <path d="m12.6 33.2-.4 3.8 3.8.4M35.4 14.8l.4-3.8-3.8-.4" />
    </>
  ),
  // Clean Energy — a photovoltaic module on its mount.
  energy: (
    <>
      <path d="M8.5 31.5h26l5-13h-26Z" />
      <path d="M17.2 31.5l5-13M25.8 31.5l5-13M11 25h26.5" />
      <path d="M24 31.5V39M18 39h12" />
      <circle cx="38.5" cy="9.5" r="3" />
    </>
  ),
  // Sustainable Commerce — a sealed carton, the unit of everyday trade.
  commerce: (
    <>
      <path d="M24 8.5 38 15.5 24 22.5 10 15.5Z" />
      <path d="M10 15.5v16L24 38.5l14-7v-16M24 22.5v16" />
      <path d="m17 12 14 7v5.5" />
      <path d="M13.5 29.5l4 2" />
    </>
  ),
  // Green Logistics — a route between two nodes carrying a container.
  logistics: (
    <>
      <circle cx="9.5" cy="12" r="2.5" />
      <circle cx="38.5" cy="36" r="2.5" />
      <path d="M12 12h12.5a6 6 0 0 1 6 6v0" strokeDasharray="2 2.5" />
      <path d="M30.5 30v0a6 6 0 0 0 6 6h-.5" strokeDasharray="2 2.5" />
      <path d="M22 19.5h17v10.5H22Z" />
      <path d="M26 19.5V30M30.5 19.5V30M35 19.5V30" />
    </>
  ),
};

export function PillarIcon({ id, size = 48, ...props }: Props & { id: GreenPillarId }) {
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
      {paths[id]}
    </svg>
  );
}
