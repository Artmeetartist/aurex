"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

/**
 * Lands deep links such as /contact?type=investment#inquiry on the section.
 * The smooth-scroll provider resets to the top when a page mounts, which
 * would otherwise undo the browser's hash scroll. Lenis honours the target's
 * scroll-margin-top, so the section clears the fixed header.
 */
export function AnchorOnLoad({ id }: { id: string }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || window.location.hash !== `#${id}`) return;
    const el = document.getElementById(id);
    if (!el) return;

    let cancelled = false;
    // Two frames: after the provider's reset and the first layout pass.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (!cancelled) lenis.scrollTo(el, { immediate: true, force: true });
      }),
    );
    return () => {
      cancelled = true;
    };
  }, [id, lenis]);

  return null;
}
