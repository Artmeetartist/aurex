import { Hanken_Grotesk, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";

/** Text and interface: a neutral grotesk with a little more character than the usual defaults. */
export const sans = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-text",
  display: "swap",
});

/** Display: Source Serif at its display optical size. Headlines are set roman, never as accent italics. */
export const serif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

/** Data only: references, counters, coordinates, regulation numbers. */
export const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-data",
  display: "swap",
});
