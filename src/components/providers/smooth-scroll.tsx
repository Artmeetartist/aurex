"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    // Honour #anchors (e.g. /contact#inquiry); otherwise start new pages at the top.
    if (target) lenis.scrollTo(target, { immediate: true, force: true, offset: -80 });
    else lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);
  return null;
}

/**
 * Inertia scrolling. Lenis honours prefers-reduced-motion by default
 * (smoothing off, programmatic scrolls instant).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.085, smoothWheel: true, anchors: { offset: -80 }, stopInertiaOnNavigate: true }}
    >
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}
