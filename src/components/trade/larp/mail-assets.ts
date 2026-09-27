/**
 * Mail-armour imagery for LARP & Historical Goods: a transparent cut-out of
 * the illustrative set plus close-up details. Hotspot positions are percent
 * coordinates on the cut-out (1280 × 1120).
 */
export type MailDetailKey = "weave" | "buckles" | "collar" | "coif" | "mantle";

export const mailSet = { src: "/media/larp/chainmail-set.webp", width: 1280, height: 1120 } as const;

export const mailDetails: Record<MailDetailKey, { src: string; x: number; y: number }> = {
  collar: { src: "/media/larp/detail-collar.webp", x: 19.5, y: 31 },
  weave: { src: "/media/larp/detail-weave.webp", x: 50, y: 47 },
  buckles: { src: "/media/larp/detail-buckles.webp", x: 80.5, y: 33 },
  coif: { src: "/media/larp/detail-coif.webp", x: 31, y: 76 },
  mantle: { src: "/media/larp/detail-mantle.webp", x: 74, y: 83 },
};
