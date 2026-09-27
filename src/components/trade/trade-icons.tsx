import type { SVGProps } from "react";
import type { TradeId } from "@/content/types";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
});

/** Grain ear — food. */
function Food({ size = 40, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M24 42V12" />
      <path d="M24 14c-4-1-6-4-6-8 4 1 6 4 6 8Zm0 0c4-1 6-4 6-8-4 1-6 4-6 8Z" />
      <path d="M24 22c-4-1-6.5-4-6.5-8 4 1 6.5 4 6.5 8Zm0 0c4-1 6.5-4 6.5-8-4 1-6.5 4-6.5 8Z" />
      <path d="M24 30c-4-1-6.5-4-6.5-8 4 1 6.5 4 6.5 8Zm0 0c4-1 6.5-4 6.5-8-4 1-6.5 4-6.5 8Z" />
    </svg>
  );
}

/** Cross within a rounded frame — medical. */
function Medical({ size = 40, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="7" y="7" width="34" height="34" rx="9" />
      <path d="M20 14h8v6h6v8h-6v6h-8v-6h-6v-8h6z" />
    </svg>
  );
}

/** Integrated circuit — electronic components. */
function Electronics({ size = 40, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="13" y="13" width="22" height="22" rx="2.5" />
      <rect x="19" y="19" width="10" height="10" rx="1" />
      <path d="M18 13V7M24 13V7M30 13V7M18 41v-6M24 41v-6M30 41v-6M13 18H7M13 24H7M13 30H7M41 18h-6M41 24h-6M41 30h-6" />
    </svg>
  );
}

/** Heater shield with a helm line — LARP & historical goods. */
function Larp({ size = 40, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M24 6 10 11v11c0 9.5 6 16.5 14 20 8-3.5 14-10.5 14-20V11Z" />
      <path d="M24 6v36M10 20h28" />
    </svg>
  );
}

/** Closed loop — circular, sustainable commerce. */
export function GreenLoop({ size = 40, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M36.5 18A14 14 0 0 0 11 16.5" />
      <path d="M11.5 30A14 14 0 0 0 37 31.5" />
      <path d="m10 10 1 6.5 6.5-1M38 38l-1-6.5-6.5 1" />
    </svg>
  );
}

export const tradeIcons: Record<TradeId, (p: IconProps) => React.JSX.Element> = {
  food: Food,
  medical: Medical,
  electronics: Electronics,
  larp: Larp,
};
