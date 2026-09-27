"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion, type MotionValue } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { MarketId } from "@/content/types";

export type GlobeMarket = { id: MarketId; lat: number; lng: number; label: string };

type GlobeData = { regions: string[]; stride: number; points: number[] };

const ACCENT = new THREE.Color("#8dc63f");
const TEAL = new THREE.Color("#009999");
const DEG = Math.PI / 180;

/** Region indices in public/data/globe.json → markets they light up. */
const MARKET_REGIONS: Record<MarketId, [number, number]> = {
  eu: [1, 2], // EU incl. Poland
  pl: [2, 2],
  ae: [3, 4], // UAE + wider Middle East
  in: [5, 5],
  af: [6, 6],
};

/** Default framing: Europe, the Gulf, India and Africa in view. */
const HOME = { lat: 24, lng: 32 };

export function latLngToVec3(lat: number, lng: number, r = 1) {
  const phi = (90 - lat) * DEG;
  const theta = (lng + 180) * DEG;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

/** Rotation (y then x) that brings lat/lng to face a camera on +z. */
function facingRotation(lat: number, lng: number) {
  const p = latLngToVec3(lat, lng);
  return { y: -Math.atan2(p.x, p.z), x: lat * DEG };
}

// ── Shaders ──────────────────────────────────────────────────────
const dotsVertex = /* glsl */ `
  attribute float aRegion;
  attribute float aSeed;
  uniform float uTime;
  uniform float uActiveA;
  uniform float uActiveB;
  uniform float uPixelRatio;
  uniform float uMotion;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 n = normalize(normalMatrix * position);
    float facing = dot(n, normalize(-mv.xyz));
    float isFocus = step(0.5, aRegion);
    float isLit = (uActiveA < 0.0) ? 0.0 :
      max(1.0 - step(0.5, abs(aRegion - uActiveA)), 1.0 - step(0.5, abs(aRegion - uActiveB)));
    vec3 land = vec3(0.42, 0.58, 0.57);
    vec3 accent = vec3(0.553, 0.776, 0.247);
    vec3 lit = vec3(0.86, 0.96, 0.62);
    vColor = mix(mix(land, accent, isFocus), lit, isLit);
    float twinkle = 1.0 - uMotion * 0.18 * (0.5 + 0.5 * sin(uTime * 1.2 + aSeed * 6.2831));
    vAlpha = smoothstep(-0.1, 0.4, facing) * mix(0.38, 0.95, isFocus) * twinkle;
    float size = mix(2.1, 2.9, isFocus) + isLit * 1.3;
    gl_PointSize = size * uPixelRatio * (3.4 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;
const dotsFragment = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(vColor, smoothstep(0.5, 0.3, d) * vAlpha);
  }
`;

const sphereVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;
const sphereFragment = /* glsl */ `
  uniform vec3 uGold;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float rim = pow(1.0 - max(dot(vNormal, vView), 0.0), 3.0);
    vec3 base = vec3(0.004, 0.13, 0.13);
    gl_FragColor = vec4(base + uGold * rim * 0.35, 1.0);
  }
`;
const atmosphereFragment = /* glsl */ `
  uniform vec3 uGold;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    // Back faces: d → 0 at the outer silhouette, negative towards the globe's edge.
    float d = dot(vNormal, vView);
    float i = pow(smoothstep(0.0, -0.6, d), 2.2);
    gl_FragColor = vec4(uGold * i * 0.42, i * 0.42);
  }
`;

const arcVertex = /* glsl */ `
  varying float vT;
  void main() {
    vT = uv.x;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const arcFragment = /* glsl */ `
  uniform float uTime;
  uniform float uOffset;
  uniform float uEmphasis;
  uniform vec3 uColor;
  varying float vT;
  void main() {
    float head = fract(uTime * 0.16 + uOffset);
    float d = vT - head;
    float trail = smoothstep(-0.3, 0.0, d) * (1.0 - smoothstep(0.0, 0.015, d));
    float a = 0.14 + 0.18 * uEmphasis + trail * (0.75 + 0.25 * uEmphasis);
    a *= smoothstep(0.0, 0.05, vT) * (1.0 - smoothstep(0.95, 1.0, vT));
    gl_FragColor = vec4(uColor, a);
  }
`;

// ── Scene pieces ─────────────────────────────────────────────────
function Dots({ data, focus, reduced }: { data: GlobeData; focus: MarketId | null; reduced: boolean }) {
  const { gl } = useThree();
  const material = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const n = data.points.length / data.stride;
    const pos = new Float32Array(n * 3);
    const region = new Float32Array(n);
    const seed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const lat = data.points[i * 3];
      const lng = data.points[i * 3 + 1];
      const v = latLngToVec3(lat, lng, 1.004);
      pos.set([v.x, v.y, v.z], i * 3);
      region[i] = data.points[i * 3 + 2];
      seed[i] = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aRegion", new THREE.BufferAttribute(region, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return g;
  }, [data]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uActiveA: { value: -1 },
      uActiveB: { value: -1 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uMotion: { value: reduced ? 0 : 1 },
    }),
    [gl, reduced],
  );

  useEffect(() => {
    const m = material.current;
    if (!m) return;
    const [a, b] = focus ? MARKET_REGIONS[focus] : [-1, -1];
    m.uniforms.uActiveA.value = a;
    m.uniforms.uActiveB.value = b;
  }, [focus]);

  useFrame((_, dt) => {
    const m = material.current;
    if (m) m.uniforms.uTime.value += dt;
  });

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={material}
        vertexShader={dotsVertex}
        fragmentShader={dotsFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

function Arc({
  from,
  to,
  offset,
  emphasis,
  reduced,
}: {
  from: GlobeMarket;
  to: GlobeMarket;
  offset: number;
  emphasis: boolean;
  reduced: boolean;
}) {
  const geometry = useMemo(() => {
    const a = latLngToVec3(from.lat, from.lng);
    const b = latLngToVec3(to.lat, to.lng);
    const angle = a.angleTo(b);
    const lift = 0.08 + (angle / Math.PI) * 0.55;
    const pts: THREE.Vector3[] = [];
    const SEG = 64;
    for (let i = 0; i <= SEG; i++) {
      const t = i / SEG;
      const p = new THREE.Vector3().copy(a).lerp(b, t).normalize();
      p.multiplyScalar(1.004 + Math.sin(t * Math.PI) * lift);
      pts.push(p);
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 96, 0.0032, 6, false);
  }, [from, to]);

  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: reduced ? 0.35 : 0 },
      uOffset: { value: offset },
      uEmphasis: { value: 0 },
      uColor: { value: ACCENT.clone().lerp(new THREE.Color("#d8f0b0"), 0.25) },
    }),
    [offset, reduced],
  );

  useFrame((_, dt) => {
    const u = material.current?.uniforms;
    if (!u) return;
    if (!reduced) u.uTime.value += dt;
    u.uEmphasis.value = THREE.MathUtils.damp(u.uEmphasis.value, emphasis ? 1 : 0, 6, dt);
  });

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh geometry={geometry}>
      <shaderMaterial
        ref={material}
        vertexShader={arcVertex}
        fragmentShader={arcFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Marker({ market, active, reduced }: { market: GlobeMarket; active: boolean; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const position = useMemo(() => latLngToVec3(market.lat, market.lng, 1.006), [market]);
  const t = useRef((market.id.charCodeAt(0) * 0.137) % 1);

  useEffect(() => {
    group.current?.lookAt(position.clone().multiplyScalar(2));
  }, [position]);

  useFrame((_, dt) => {
    if (!ring.current) return;
    t.current = reduced ? 0.5 : (t.current + dt * 0.55) % 1;
    const s = 1 + t.current * (active ? 3.2 : 2.2);
    ring.current.scale.setScalar(s);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = (1 - t.current) * (active ? 0.9 : 0.55);
  });

  return (
    <group ref={group} position={position}>
      <mesh>
        <circleGeometry args={[active ? 0.019 : 0.014, 24]} />
        <meshBasicMaterial color={active ? "#e4f5c4" : "#99cc00"} transparent opacity={0.95} depthWrite={false} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[0.018, 0.022, 40]} />
        <meshBasicMaterial color="#8dc63f" transparent opacity={0.6} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Graticule() {
  const geometry = useMemo(() => {
    const pts: number[] = [];
    const r = 1.001;
    for (let lat = -60; lat <= 60; lat += 30) {
      for (let lng = -180; lng < 180; lng += 3) {
        const a = latLngToVec3(lat, lng, r);
        const b = latLngToVec3(lat, lng + 3, r);
        pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
    for (let lng = -180; lng < 180; lng += 30) {
      for (let lat = -90; lat < 90; lat += 3) {
        const a = latLngToVec3(lat, lng, r);
        const b = latLngToVec3(lat + 3, lng, r);
        pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);
  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#33b3b3" transparent opacity={0.09} depthWrite={false} />
    </lineSegments>
  );
}

function Globe({
  data,
  markets,
  corridors,
  focus,
  scroll,
  drag,
  reduced,
}: {
  data: GlobeData;
  markets: GlobeMarket[];
  corridors: [MarketId, MarketId][];
  focus: MarketId | null;
  scroll?: MotionValue<number>;
  drag: () => { dx: number; dy: number; active: boolean; lastInteraction: number };
  reduced: boolean;
}) {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const home = useMemo(() => facingRotation(HOME.lat, HOME.lng), []);
  const userOffset = useRef({ x: 0, y: 0 });
  const clock = useRef(0);
  const byId = useMemo(() => Object.fromEntries(markets.map((m) => [m.id, m])) as Record<MarketId, GlobeMarket>, [markets]);

  useFrame((_, dt) => {
    if (!tilt.current || !spin.current) return;
    clock.current += dt;
    const d = drag();

    if (d.active || Math.abs(d.dx) + Math.abs(d.dy) > 0) {
      userOffset.current.y += d.dx * 0.005;
      userOffset.current.x = THREE.MathUtils.clamp(userOffset.current.x + d.dy * 0.004, -0.6, 0.6);
    } else if (performance.now() - d.lastInteraction > 2600) {
      userOffset.current.x = THREE.MathUtils.damp(userOffset.current.x, 0, 1.2, dt);
      userOffset.current.y = THREE.MathUtils.damp(userOffset.current.y, 0, 1.2, dt);
    }

    let target = home;
    if (focus) target = facingRotation(byId[focus].lat, byId[focus].lng);

    const drift = reduced || focus ? 0 : Math.sin(clock.current * 0.12) * 0.42;
    const scrollTurn = scroll ? (scroll.get() - 0.5) * 0.9 : 0;

    const ty = target.y + drift + scrollTurn + userOffset.current.y;
    const tx = target.x * 0.85 + userOffset.current.x;
    spin.current.rotation.y = THREE.MathUtils.damp(spin.current.rotation.y, ty, focus ? 3.2 : 2.2, dt);
    tilt.current.rotation.x = THREE.MathUtils.damp(tilt.current.rotation.x, tx, 2.4, dt);
  });

  return (
    <group ref={tilt} rotation={[home.x, 0, 0]}>
      <group ref={spin} rotation={[0, home.y, 0]}>
        <mesh>
          <sphereGeometry args={[1, 96, 96]} />
          <shaderMaterial vertexShader={sphereVertex} fragmentShader={sphereFragment} uniforms={{ uGold: { value: TEAL } }} />
        </mesh>
        <Graticule />
        <Dots data={data} focus={focus} reduced={reduced} />
        {corridors.map(([a, b], i) => (
          <Arc
            key={`${a}-${b}`}
            from={byId[a]}
            to={byId[b]}
            offset={i * 0.37}
            emphasis={!!focus && (focus === a || focus === b || (focus === "eu" && (a === "pl" || b === "pl")))}
            reduced={reduced}
          />
        ))}
        {markets.map((m) => (
          <Marker key={m.id} market={m} active={focus === m.id} reduced={reduced} />
        ))}
      </group>
      <mesh scale={1.12}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          vertexShader={sphereVertex}
          fragmentShader={atmosphereFragment}
          uniforms={{ uGold: { value: TEAL } }}
          side={THREE.BackSide}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function GlobeScene({
  markets,
  corridors,
  focus,
  scroll,
  active = true,
  className,
}: {
  markets: GlobeMarket[];
  corridors: [MarketId, MarketId][];
  focus: MarketId | null;
  scroll?: MotionValue<number>;
  active?: boolean;
  className?: string;
}) {
  const [data, setData] = useState<GlobeData | null>(null);
  const reduced = !!useReducedMotion();
  const drag = useRef({ dx: 0, dy: 0, active: false, lastInteraction: 0 });
  const last = useRef<{ x: number; y: number } | null>(null);

  /** Returns accumulated pointer deltas and resets them (read once per frame). */
  const consumeDrag = () => {
    const d = { ...drag.current };
    drag.current.dx = 0;
    drag.current.dy = 0;
    return d;
  };

  useEffect(() => {
    let alive = true;
    fetch("/data/globe.json")
      .then((r) => r.json())
      .then((d: GlobeData) => alive && setData(d))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div
      className={className}
      style={{ touchAction: "pan-y" }}
      onPointerDown={(e) => {
        last.current = { x: e.clientX, y: e.clientY };
        drag.current.active = true;
        drag.current.lastInteraction = performance.now();
      }}
      onPointerMove={(e) => {
        if (!drag.current.active || !last.current) return;
        drag.current.dx += e.clientX - last.current.x;
        drag.current.dy += e.clientY - last.current.y;
        last.current = { x: e.clientX, y: e.clientY };
        drag.current.lastInteraction = performance.now();
      }}
      onPointerUp={() => {
        drag.current.active = false;
        last.current = null;
      }}
      onPointerLeave={() => {
        drag.current.active = false;
        last.current = null;
      }}
    >
      {data && (
        <Canvas
          frameloop={active ? "always" : "never"}
          dpr={[1, 2]}
          camera={{ position: [0, 0, 3.35], fov: 35, near: 0.1, far: 20 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ cursor: "grab" }}
        >
          <Globe data={data} markets={markets} corridors={corridors} focus={focus} scroll={scroll} drag={consumeDrag} reduced={reduced} />
        </Canvas>
      )}
    </div>
  );
}
