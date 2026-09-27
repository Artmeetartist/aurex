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
  // Green Logistics — a container moving along a route, under a global arc.
  logistics: (
    <>
      <path d="M13 18h22v11H13Z" />
      <path d="M18.5 18v11M24 18v11M29.5 18v11" />
      <circle cx="7.5" cy="35" r="2.5" />
      <circle cx="40.5" cy="35" r="2.5" />
      <path d="M10 35h28" />
      <path d="M9 12.5C15 5.5 33 5.5 39 12.5" strokeDasharray="2 2.5" />
      <path d="m35.6 11.7 3.4.8.3-3.4" />
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
