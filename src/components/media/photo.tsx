"use client";

import Image, { type ImageLoader } from "next/image";
import { useState } from "react";
import type { Photo as PhotoData } from "@/content/media";
import { cn } from "@/lib/cn";

/** Unsplash resizes on its own CDN, so remote photos skip the Next.js optimiser. */
const unsplashLoader: ImageLoader = ({ src, width, quality }) =>
  `${src}?auto=format&fit=crop&w=${width}&q=${quality ?? 72}`;

/**
 * Fills its (relatively positioned) parent with a photograph. The local
 * fallback paints immediately; the remote photo fades in over it once loaded
 * and is dropped silently if it cannot be reached.
 */
export function Photo({
  photo,
  sizes = "100vw",
  eager = false,
  decorative = true,
  className,
}: {
  photo: PhotoData;
  sizes?: string;
  eager?: boolean;
  decorative?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const priority = eager ? ({ loading: "eager", fetchPriority: "high" } as const) : {};

  return (
    <>
      <Image
        src={`${photo.fallback}.webp`}
        alt=""
        fill
        sizes={sizes}
        {...priority}
        className={cn("object-cover transition-opacity duration-700", loaded && "opacity-0", className)}
      />
      {!failed && (
        <Image
          loader={unsplashLoader}
          src={photo.src}
          alt={decorative ? "" : photo.subject}
          fill
          sizes={sizes}
          {...priority}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn("object-cover transition-opacity duration-1000", loaded ? "opacity-100" : "opacity-0", className)}
        />
      )}
    </>
  );
}
