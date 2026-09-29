"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useEffect,
  useState,
  useSyncExternalStore,
  type ComponentType,
  type ReactNode,
  type RefObject,
} from "react";

/**
 * WebGL scenes are client-only and code-split out of the initial bundle.
 * Each is guarded: it renders nothing when WebGL is unavailable (managed
 * browsers, old GPUs, remote desktops) or when the renderer fails, so the
 * section's poster stays in place instead of the page crashing.
 */

let webglSupport: boolean | undefined;

function detectWebGL() {
  if (webglSupport !== undefined) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ?? canvas.getContext("webgl")) as WebGLRenderingContext | null;
    webglSupport = Boolean(gl);
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

const subscribe = () => () => {};

/** True once on the client when a WebGL context can be created. */
export function useWebGL() {
  return useSyncExternalStore(subscribe, detectWebGL, () => false);
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") console.warn("[3d] Scene disabled:", error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function guarded<P extends object>(Scene: ComponentType<P>) {
  function GuardedScene(props: P) {
    const supported = useWebGL();
    if (!supported) return null;
    return (
      <SceneBoundary>
        <Scene {...props} />
      </SceneBoundary>
    );
  }
  return GuardedScene;
}

export const GlobeScene = guarded(dynamic(() => import("./globe-scene"), { ssr: false }));
export const EmblemScene = guarded(dynamic(() => import("./emblem-scene"), { ssr: false }));
export const GreenScene = guarded(dynamic(() => import("./green-scene"), { ssr: false }));

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
