"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type RefObject } from "react";

/** WebGL scenes are client-only and code-split out of the initial bundle. */
export const GlobeScene = dynamic(() => import("./globe-scene"), { ssr: false });
export const EmblemScene = dynamic(() => import("./emblem-scene"), { ssr: false });

/**
 * `mounted` flips once the element nears the viewport (and stays true);
 * `visible` tracks whether it is on screen so render loops can pause.
 */
export function useViewportPresence(ref: RefObject<Element | null>, margin = "50% 0px") {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const near = new IntersectionObserver(([e]) => e.isIntersecting && setMounted(true), { rootMargin: margin });
    const onScreen = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "10% 0px" });
    near.observe(el);
    onScreen.observe(el);
    return () => {
      near.disconnect();
      onScreen.disconnect();
    };
  }, [ref, margin]);

  return { mounted, visible };
}
