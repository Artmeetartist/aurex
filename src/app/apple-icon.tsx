import { ImageResponse } from "next/og";

/**
 * Apple touch icon (180×180 PNG): the AUREX mark on the ink surface.
 * Full-bleed square, because iOS applies its own rounded mask.
 * Colours mirror the design tokens in globals.css (ink, ivory, gold accent).
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const INK = "#051616";
const INK_DEEP = "#020c0c";
const TEAL_GLOW = "rgba(0, 153, 153, 0.35)";
const IVORY = "#F7FAF9";
const ACCENT = "#8DC63F";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: INK,
          backgroundImage: `radial-gradient(circle at 30% 20%, ${TEAL_GLOW}, ${INK} 60%, ${INK_DEEP} 100%)`,
        }}
      >
        {/* Same geometry as src/app/icon.svg (64-unit grid). */}
        <svg width="180" height="180" viewBox="0 0 64 64" fill="none">
          <path
            d="M12.8 50.3 L29 16.7 L45.2 50.3"
            stroke={IVORY}
            strokeWidth="4.2"
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
          <path d="M16 38 H52" stroke={ACCENT} strokeWidth="3.8" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
