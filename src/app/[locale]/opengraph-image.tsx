import { ImageResponse } from "next/og";
import { getContent } from "@/content/repository";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

/**
 * Localized Open Graph image (1200×630), used by every page of the locale.
 *
 * Uses the default ImageResponse font only (no network fetches), so the image
 * renders offline at build time. Colours mirror the tokens in globals.css.
 */

export const alt = "AUREX";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const INK_DEEP = "#020c0c";
const IVORY = "#F7FAF9";
const MIST = "#A9C9C6";
const MIST_DIM = "#86ABA8";
const ACCENT = "#8DC63F";

/** The AUREX mark (see src/components/brand/logo.tsx), drawn on the 40-unit logo grid. */
function Mark({ width, stroke = IVORY, accent = ACCENT, weight = 2.6 }: { width: number; stroke?: string; accent?: string; weight?: number }) {
  return (
    <svg width={width} height={width} viewBox="0 0 40 40" fill="none">
      <path d="M6.5 34 L20 6 L33.5 34" stroke={stroke} strokeWidth={weight} strokeLinejoin="miter" strokeLinecap="square" />
      <path d="M11.4 24.2 H38.5" stroke={accent} strokeWidth={weight} strokeLinecap="square" />
    </svg>
  );
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { meta, home } = await getContent(isLocale(locale) ? locale : defaultLocale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px 64px",
          backgroundColor: INK_DEEP,
          backgroundImage: [
            "radial-gradient(circle at 88% 118%, rgba(0, 153, 153, 0.42), rgba(0, 153, 153, 0) 58%)",
            "radial-gradient(circle at 8% -20%, rgba(0, 153, 153, 0.18), rgba(0, 153, 153, 0) 50%)",
          ].join(", "),
          color: IVORY,
        }}
      >
        {/* Oversized, near-invisible mark as a watermark on the right. */}
        <div style={{ position: "absolute", right: -120, top: 40, display: "flex", opacity: 0.06 }}>
          <Mark width={640} stroke={IVORY} accent={IVORY} />
        </div>

        {/* Lockup */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Mark width={56} />
          <div style={{ marginLeft: 22, fontSize: 30, letterSpacing: 11, lineHeight: 1 }}>{meta.siteName}</div>
        </div>

        {/* Master line + supporting line */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, lineHeight: 1, letterSpacing: -4.5, maxWidth: 900 }}>{meta.tagline}</div>
          <div style={{ marginTop: 30, fontSize: 36, lineHeight: 1.25, letterSpacing: -0.5, color: MIST }}>{meta.signature}</div>
        </div>

        {/* Descriptor rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: 28,
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            fontSize: 17,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: MIST_DIM,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: ACCENT, marginRight: 16 }} />
          {home.hero.eyebrow}
        </div>
      </div>
    ),
    { ...size },
  );
}
