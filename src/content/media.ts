/**
 * Photography registry.
 *
 * Free photographs from Unsplash (Unsplash License: free for commercial use,
 * no attribution required) — the same images selected in earlier AUREX drafts.
 * Each has a local fallback from the AUREX footage, shown until the photo loads
 * and kept if it cannot be reached. To self-host later, download the photo into
 * public/media/photos/ and point `src` at the local file.
 */

export type Photo = {
  /** Remote source (no query string; Next.js requests the right size). */
  src: string;
  /** Local fallback still, path without extension (webp). */
  fallback: string;
  /** Short description for alt text when the image is informative. */
  subject: string;
};

const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

export const photos = {
  foodProduce: {
    src: unsplash("photo-1490818387583-1baba5e638af"),
    fallback: "/media/stills/still-portland",
    subject: "Food products",
  },
  foodFields: {
    src: unsplash("photo-1500382017468-9049fed747ef"),
    fallback: "/media/stills/still-land",
    subject: "Agricultural fields",
  },
  medical: {
    src: unsplash("photo-1576091160399-112ba8d25d1d"),
    fallback: "/media/stills/still-air",
    subject: "Medical setting",
  },
  electronics: {
    src: unsplash("photo-1518770660439-4636190af475"),
    fallback: "/media/stills/still-portland",
    subject: "Electronic circuit board",
  },
  warehouse: {
    src: unsplash("photo-1553413077-190dd305871c"),
    fallback: "/media/stills/still-land",
    subject: "Warehouse and supply",
  },
  larp: {
    src: unsplash("photo-1509824227185-9c5a01ceba0d"),
    fallback: "/media/stills/still-coast",
    subject: "Costumes and historical goods",
  },
  containerShip: {
    src: unsplash("photo-1494412574643-ff11b0a5c1c3"),
    fallback: "/media/stills/still-sea",
    subject: "Container ship at sea",
  },
  sustainability: {
    src: unsplash("photo-1466611653911-95081537e5b7"),
    fallback: "/media/stills/still-connected",
    subject: "Renewable energy",
  },
  energy: {
    src: unsplash("photo-1473341304170-971dccb5ac1e"),
    fallback: "/media/stills/still-connected",
    subject: "Energy infrastructure",
  },
  property: {
    src: unsplash("photo-1486406146926-c627a92ad1ab"),
    fallback: "/media/stills/still-portland",
    subject: "Commercial architecture",
  },
} satisfies Record<string, Photo>;
