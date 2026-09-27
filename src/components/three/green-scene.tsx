"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion, type MotionValue } from "motion/react";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { STAGE_COUNT, stagePosition } from "@/components/green/stages";
import {
  COLORS,
  GATE_X,
  LANE_EAST,
  LANE_WEST,
  QUAY_X,
  ROAD_START,
  WATER_Y,
  buildWorld,
  createMaterials,
  shipGeometry,
  truckGeometry,
  vanGeometry,
  zoneX,
} from "@/components/green/world";

export type GreenSceneProps = {
  /** 0–1 scroll progress; the camera travels through the seven stages in order. */
  progress?: MotionValue<number>;
  /** Fixed stage index (0–6) instead of scroll-driven travel — used for stills. */
  stage?: number;
  /** Pause the render loop when off screen. */
  active?: boolean;
  className?: string;
};

/** Haze colour shared by fog and the horizon of the sky dome. */
const HAZE = "#1b3530";
const ZENITH = "#06120f";

/** Camera framing per stage: focus offset from the zone centre and a distance factor. */
const FRAMES: { dx: number; dz: number; k: number; yaw: number }[] = [
  { dx: -1.2, dz: -2.6, k: 1.0, yaw: 0.2 },
  { dx: 0.2, dz: -3.4, k: 1.0, yaw: 0.22 },
  { dx: 0.4, dz: -3.2, k: 1.0, yaw: 0.2 },
  { dx: 0.4, dz: -2.8, k: 0.98, yaw: 0.18 },
  { dx: -0.6, dz: -2.6, k: 0.98, yaw: 0.2 },
  { dx: 0.6, dz: -3.4, k: 1.04, yaw: 0.2 },
  { dx: 4.2, dz: -5.4, k: 1.14, yaw: 0.14 },
];

/** Shared per-frame state: where the camera is looking and how wide the view is. */
type Focus = { x: number; s: number; halfWidth: number; ready: boolean };

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _v = new THREE.Vector3();
const _one = new THREE.Vector3(1, 1, 1);
const _sc = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);
const _look = new THREE.Vector3();

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function frameAt(s: number) {
  const i = Math.min(Math.floor(s), STAGE_COUNT - 1);
  const j = Math.min(i + 1, STAGE_COUNT - 1);
  const t = s - i;
  const a = FRAMES[i];
  const b = FRAMES[j];
  return { dx: lerp(a.dx, b.dx, t), dz: lerp(a.dz, b.dz, t), k: lerp(a.k, b.k, t), yaw: lerp(a.yaw, b.yaw, t) };
}

// ── Camera ───────────────────────────────────────────────────────
function Rig({
  progress,
  stage,
  reduced,
  focusRef,
}: {
  progress?: MotionValue<number>;
  stage?: number;
  reduced: boolean;
  focusRef: RefObject<Focus>;
}) {
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    if (reduced || stage !== undefined) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.current.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, stage]);

  useFrame((state, dt) => {
    const f = focusRef.current;
    const cam = state.camera as THREE.PerspectiveCamera;
    let target: number;
    if (stage !== undefined) target = Math.min(Math.max(stage, 0), STAGE_COUNT - 1);
    else target = progress ? stagePosition(progress.get()) : 0;
    if (reduced) target = Math.round(target);

    // Damped travel; snap on the first frame, for fixed stages and under reduced motion.
    const snap = !f.ready || stage !== undefined || reduced;
    f.s = snap ? target : THREE.MathUtils.damp(f.s, target, 2.2, Math.min(dt, 0.1));
    f.ready = true;

    const p = pointer.current;
    p.x = THREE.MathUtils.damp(p.x, p.tx, 2, dt);
    p.y = THREE.MathUtils.damp(p.y, p.ty, 2, dt);

    const s = f.s;
    const fr = frameAt(s);
    const aspect = state.size.width / Math.max(state.size.height, 1);
    const portrait = THREE.MathUtils.clamp((1.3 - aspect) / 0.8, 0, 1);
    const fov = lerp(26, 34, portrait);
    const tan = Math.tan(THREE.MathUtils.degToRad(fov / 2));
    const wantHalf = lerp(11, 7.4, portrait) * fr.k;
    const dist = Math.max(29 * fr.k, wantHalf / (tan * aspect));

    // Between stages the camera lifts slightly and swings — a slow crane move.
    const between = Math.sin(Math.PI * (s - Math.floor(s)));
    const yaw = fr.yaw + between * 0.05 + p.x * 0.035;
    const elev = THREE.MathUtils.degToRad(15.5 + between * 2.2 - p.y * 1.2 + portrait * 3);

    const fx = zoneX(s) + fr.dx - portrait * fr.dx * 0.6;
    f.x = fx;
    f.halfWidth = dist * tan * aspect + 3;
    const fz = fr.dz;

    cam.position.set(
      fx + Math.sin(yaw) * Math.cos(elev) * dist,
      Math.sin(elev) * dist,
      fz + Math.cos(yaw) * Math.cos(elev) * dist,
    );
    const lookY = lerp(3.4, 1.2, portrait);
    _look.set(fx, lookY, fz);
    cam.lookAt(_look);
    if (Math.abs(cam.fov - fov) > 0.01) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
  });

  return null;
}

// ── Sky ──────────────────────────────────────────────────────────
const skyVertex = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vWorld = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;
const skyFragment = /* glsl */ `
  uniform vec3 uHaze;
  uniform vec3 uZenith;
  uniform vec3 uGlow;
  varying vec3 vWorld;
  void main() {
    vec3 dir = normalize(vWorld - cameraPosition);
    float h = dir.y;
    vec3 col = mix(uHaze, uZenith, smoothstep(0.0, 0.42, h));
    // A low, warm-neutral glow over the sea to the east.
    float g = pow(max(dot(normalize(dir.xz), normalize(vec2(0.85, -0.55))), 0.0), 6.0);
    col += uGlow * g * (1.0 - smoothstep(0.0, 0.25, h)) * 0.55;
    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function Sky() {
  const uniforms = useMemo(
    () => ({
      uHaze: { value: new THREE.Color(HAZE) },
      uZenith: { value: new THREE.Color(ZENITH) },
      uGlow: { value: new THREE.Color("#5e6b52") },
    }),
    [],
  );
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    mesh.current?.position.copy(state.camera.position);
  });
  return (
    <mesh ref={mesh} renderOrder={-1} frustumCulled={false}>
      <sphereGeometry args={[450, 32, 16]} />
      <shaderMaterial vertexShader={skyVertex} fragmentShader={skyFragment} uniforms={uniforms} side={THREE.BackSide} depthWrite={false} fog={false} />
    </mesh>
  );
}

// ── Static world ─────────────────────────────────────────────────
type Models = { truck: THREE.BufferGeometry; van: THREE.BufferGeometry; ship: THREE.BufferGeometry; ship2: THREE.BufferGeometry };

function StaticWorld({ lite, models, reduced }: { lite: boolean; models: Models; reduced: boolean }) {
  const mats = useMemo(() => createMaterials(), []);
  const world = useMemo(() => buildWorld(lite, mats, models), [lite, mats, models]);
  const group = useRef<THREE.Group>(null);

  useEffect(() => () => world.dispose(), [world]);
  useEffect(
    () => () => {
      Object.values(mats).forEach((m) => m.dispose());
    },
    [mats],
  );

  useFrame((state) => {
    if (reduced) return;
    const lights = group.current?.getObjectByName("lights") as THREE.InstancedMesh | undefined;
    const mat = lights?.material as THREE.MeshBasicMaterial | undefined;
    mat?.color.setScalar(0.78 + 0.22 * Math.sin(state.clock.elapsedTime * 1.6));
  });

  return (
    <group ref={group}>
      <primitive object={world.group} />
    </group>
  );
}

// ── Ambient life ─────────────────────────────────────────────────
type Vehicle = { x: number; dir: 1 | -1; speed: number };

/** Road traffic that wraps just outside the view (or through the port gate), so it never pops in sight. */
function Traffic({ models, focusRef, reduced, lite }: { models: Models; focusRef: RefObject<Focus>; reduced: boolean; lite: boolean }) {
  const trucks = useRef<THREE.InstancedMesh>(null);
  const vans = useRef<THREE.InstancedMesh>(null);
  const mat = useMemo(() => createMaterials().vertex, []);
  const state = useRef<{ trucks: Vehicle[]; vans: Vehicle[]; init: boolean }>({
    trucks: [
      { x: 0, dir: 1, speed: 1.35 },
      { x: 0, dir: 1, speed: 1.2 },
    ],
    vans: [{ x: 0, dir: -1, speed: 1.6 }],
    init: false,
  });

  useEffect(() => () => mat.dispose(), [mat]);

  useFrame((_, rawDt) => {
    const f = focusRef.current;
    if (!f.ready || !trucks.current || !vans.current) return;
    const st = state.current;
    const dt = reduced ? 0 : Math.min(rawDt, 0.1);
    const lo = Math.max(ROAD_START, f.x - f.halfWidth);
    const hi = Math.min(GATE_X + 1.4, f.x + f.halfWidth);

    if (!st.init) {
      // Place one truck in view so every stage shows movement on the spine road.
      st.trucks[0].x = f.x - 3.5;
      st.trucks[1].x = f.x - f.halfWidth * 0.95;
      st.vans[0].x = f.x + f.halfWidth * 0.45;
      st.init = true;
    }

    const place = (mesh: THREE.InstancedMesh, list: Vehicle[], lane: (v: Vehicle) => number) => {
      list.forEach((v, i) => {
        v.x += v.dir * v.speed * dt;
        if (v.dir > 0 && v.x > hi) v.x = lo;
        if (v.dir < 0 && v.x < lo) v.x = hi;
        if (v.x < lo - 30 || v.x > hi + 30) v.x = v.dir > 0 ? lo : hi;
        _q.setFromAxisAngle(_up, v.dir > 0 ? 0 : Math.PI);
        _m.compose(_v.set(v.x, 0.05, lane(v)), _q, _one);
        mesh.setMatrixAt(i, _m);
      });
      mesh.instanceMatrix.needsUpdate = true;
    };
    place(trucks.current, st.trucks, (v) => (v.dir > 0 ? LANE_EAST : LANE_WEST));
    place(vans.current, st.vans, (v) => (v.dir > 0 ? LANE_EAST : LANE_WEST));
  });

  return (
    <>
      <instancedMesh ref={trucks} args={[models.truck, mat, lite ? 1 : 2]} castShadow receiveShadow frustumCulled={false} />
      <instancedMesh ref={vans} args={[models.van, mat, 1]} castShadow receiveShadow frustumCulled={false} />
    </>
  );
}

/** Cartons riding the packaging conveyor. */
function Conveyor({ reduced, lite }: { reduced: boolean; lite: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const count = lite ? 8 : 12;
  const geo = useMemo(() => new THREE.BoxGeometry(0.36, 0.26, 0.32), []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: COLORS.kraftLight, roughness: 0.85 }), []);
  const t = useRef(0);
  const x0 = zoneX(3) - 1.2;
  const x1 = zoneX(3) + 6.6;

  useEffect(
    () => () => {
      geo.dispose();
      mat.dispose();
    },
    [geo, mat],
  );

  useFrame((_, dt) => {
    const m = mesh.current;
    if (!m) return;
    if (!reduced) t.current += Math.min(dt, 0.1) * 0.32;
    const len = x1 - x0;
    for (let i = 0; i < count; i++) {
      const u = (t.current + (i / count) * len) % len;
      const edge = Math.min(u / 0.35, (len - u) / 0.35, 1);
      _v.set(x0 + u, 0.61 + 0.13 * edge, -3.1);
      m.setMatrixAt(i, _m.compose(_v, _q.identity(), _sc.setScalar(Math.max(edge, 0.001))));
    }
    m.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={mesh} args={[geo, mat, count]} castShadow receiveShadow frustumCulled={false} />;
}

/** A container ship slowly heading out to sea. */
function DepartingShip({ models, reduced }: { models: Models; reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useMemo(() => createMaterials().vertex, []);
  const t = useRef(0.18);
  useEffect(() => () => mat.dispose(), [mat]);

  useFrame((_, dt) => {
    const m = mesh.current;
    if (!m) return;
    if (!reduced) t.current = (t.current + Math.min(dt, 0.1) / 420) % 1;
    const u = t.current;
    // From the harbour mouth out towards the eastern horizon.
    const x = QUAY_X + 10 + u * 90;
    const z = -20 - u * 70 + Math.sin(u * 3) * 4;
    m.position.set(x, WATER_Y, z);
    m.rotation.y = Math.atan2(70, 90);
  });

  return <mesh ref={mesh} geometry={models.ship2} material={mat} castShadow receiveShadow />;
}

// ── Global route arcs ────────────────────────────────────────────
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
  uniform float uReveal;
  uniform vec3 uColor;
  varying float vT;
  void main() {
    if (vT > uReveal) discard;
    float head = fract(uTime * 0.05 + uOffset);
    float d = vT - head;
    float trail = smoothstep(-0.2, 0.0, d) * (1.0 - smoothstep(0.0, 0.008, d));
    float a = 0.22 + trail * 0.9;
    a *= smoothstep(0.0, 0.03, vT) * (1.0 - smoothstep(0.7, 1.0, vT));
    // Bright tip while the arc is drawing in.
    a += (1.0 - smoothstep(0.0, 0.02, uReveal - vT)) * step(uReveal, 0.999) * 0.8;
    gl_FragColor = vec4(uColor, a);
    #include <colorspace_fragment>
  }
`;

const ARCS: { from: [number, number, number]; to: [number, number, number]; lift: number; color: string }[] = [
  { from: [QUAY_X + 2.1, 2.6, -9.5], to: [QUAY_X + 110, 0, -95], lift: 20, color: "#8dc63f" },
  { from: [QUAY_X - 4.5, 2.2, -3.5], to: [QUAY_X + 40, 0, -200], lift: 26, color: "#5cc6c0" },
  { from: [QUAY_X - 7.5, 1.4, -1.5], to: [QUAY_X - 90, 0, -170], lift: 24, color: "#e2cf98" },
  { from: [QUAY_X + 2.1, 2.2, -15.5], to: [QUAY_X + 150, 0, -25], lift: 14, color: "#5cc6c0" },
  { from: [QUAY_X - 1.8, 5.8, -7.2], to: [QUAY_X + 10, 0, -260], lift: 34, color: "#c3e28f" },
];

function Arc({ arc, index, focusRef, reduced }: { arc: (typeof ARCS)[number]; index: number; focusRef: RefObject<Focus>; reduced: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => {
    const a = new THREE.Vector3(...arc.from);
    const b = new THREE.Vector3(...arc.to);
    const d = b.clone().sub(a);
    const c1 = a.clone().addScaledVector(d, 0.12).add(new THREE.Vector3(0, arc.lift * 1.25, 0));
    const c2 = a.clone().addScaledVector(d, 0.62).add(new THREE.Vector3(0, arc.lift * 1.05, 0));
    return new THREE.TubeGeometry(new THREE.CubicBezierCurve3(a, c1, c2, b), 160, 0.035, 5, false);
  }, [arc]);
  const node = useMemo(() => new THREE.Vector3(...arc.from), [arc]);
  const uniforms = useMemo(
    () => ({
      uTime: { value: reduced ? 3 : 0 },
      uOffset: { value: index * 0.29 },
      uReveal: { value: 0 },
      uColor: { value: new THREE.Color(arc.color) },
    }),
    [arc, index, reduced],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, dt) => {
    const u = material.current?.uniforms;
    if (!u) return;
    if (!reduced) u.uTime.value += dt;
    const s = focusRef.current.s;
    const target = THREE.MathUtils.smoothstep(s, 4.9 + index * 0.08, 5.95);
    u.uReveal.value = reduced ? (s > 5.5 ? 1 : 0) : THREE.MathUtils.damp(u.uReveal.value, target, 3, dt);
  });

  return (
    <>
      <mesh geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={material}
          vertexShader={arcVertex}
          fragmentShader={arcFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          fog={false}
        />
      </mesh>
      <mesh position={node}>
        <sphereGeometry args={[0.09, 12, 8]} />
        <meshBasicMaterial color={arc.color} toneMapped={false} />
      </mesh>
    </>
  );
}

// ── Lighting ─────────────────────────────────────────────────────
function Lighting({ focusRef, lite }: { focusRef: RefObject<Focus>; lite: boolean }) {
  const key = useRef<THREE.DirectionalLight>(null);
  useEffect(() => {
    const cam = key.current?.shadow.camera;
    if (!cam) return;
    cam.left = -26;
    cam.right = 26;
    cam.top = 20;
    cam.bottom = -20;
    cam.near = 1;
    cam.far = 90;
    cam.updateProjectionMatrix();
  }, []);
  useFrame(() => {
    const l = key.current;
    if (!l) return;
    const x = focusRef.current.x;
    l.position.set(x - 16, 24, 14);
    l.target.position.set(x, 0, -4);
    l.target.updateMatrixWorld();
  });
  const size = lite ? 1024 : 2048;
  return (
    <>
      <hemisphereLight args={["#e4efe9", "#0b1f16", 0.7]} />
      <directionalLight
        ref={key}
        color="#fff4e2"
        intensity={2.3}
        castShadow
        shadow-mapSize={[size, size]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-radius={lite ? 2 : 3.5}
      />
      <directionalLight color="#9fd8d2" intensity={0.55} position={[60, 10, -40]} />
    </>
  );
}

/** Reports once the first frames are on screen, so the canvas can fade in over its poster. */
function FirstFrame({ onReady }: { onReady: () => void }) {
  const frames = useRef(0);
  useFrame(() => {
    frames.current += 1;
    if (frames.current === 2) onReady();
  });
  return null;
}

function Invalidator({ progress, reduced }: { progress?: MotionValue<number>; reduced: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    if (!reduced || !progress) return;
    return progress.on("change", () => invalidate());
  }, [progress, reduced, invalidate]);
  return null;
}

function Scene({
  progress,
  stage,
  reduced,
  onReady,
}: {
  progress?: MotionValue<number>;
  stage?: number;
  reduced: boolean;
  onReady: () => void;
}) {
  const lite = useThree((s) => s.size.width < 768);
  const focusRef = useRef<Focus>({ x: 0, s: 0, halfWidth: 14, ready: false });
  const models = useMemo<Models>(
    () => ({ truck: truckGeometry(), van: vanGeometry(), ship: shipGeometry(7), ship2: shipGeometry(19) }),
    [],
  );
  useEffect(
    () => () => {
      Object.values(models).forEach((g) => g.dispose());
    },
    [models],
  );

  return (
    <>
      <fogExp2 attach="fog" args={[HAZE, 0.0098]} />
      <Rig progress={progress} stage={stage} reduced={reduced} focusRef={focusRef} />
      <Invalidator progress={progress} reduced={reduced} />
      <FirstFrame onReady={onReady} />
      <Sky />
      <Lighting focusRef={focusRef} lite={lite} />
      <StaticWorld lite={lite} models={models} reduced={reduced} />
      <Traffic models={models} focusRef={focusRef} reduced={reduced} lite={lite} />
      <Conveyor reduced={reduced} lite={lite} />
      <DepartingShip models={models} reduced={reduced} />
      {ARCS.map((a, i) => (
        <Arc key={i} arc={a} index={i} focusRef={focusRef} reduced={reduced} />
      ))}
      <Environment resolution={128} frames={1} environmentIntensity={0.85}>
        <color attach="background" args={["#0d1c18"]} />
        <Lightformer form="rect" intensity={2.6} color="#fbf6ea" position={[0, 6, 1]} scale={[12, 3, 1]} rotation-x={Math.PI / 2} />
        <Lightformer form="rect" intensity={1.4} color="#cfeee6" position={[-6, 2, 2]} scale={[1.2, 6, 1]} rotation-y={Math.PI / 2} />
        <Lightformer form="rect" intensity={1.1} color="#e2cf98" position={[6, 1.5, -2]} scale={[0.8, 5, 1]} rotation-y={-Math.PI / 2} />
        <Lightformer form="ring" intensity={0.9} color="#009999" position={[0, 1, -7]} scale={4} />
        <Lightformer form="rect" intensity={0.5} color="#1f3a33" position={[0, -3, 0]} scale={[14, 14, 1]} rotation-x={-Math.PI / 2} />
      </Environment>
    </>
  );
}

/**
 * AUREX Green — a real-time maquette of the sustainable commerce ecosystem:
 * solar → clean technology → recycled materials → packaging → e-mobility →
 * green logistics → global distribution, joined by one road and rail spine.
 */
export default function GreenScene({ progress, stage, active = true, className }: GreenSceneProps) {
  const reduced = !!useReducedMotion();
  const [ready, setReady] = useState(false);
  const frameloop = !active ? "never" : reduced ? "demand" : "always";

  return (
    <div className={className} aria-hidden>
      <Canvas
        style={{ opacity: ready ? 1 : 0, transition: "opacity 900ms cubic-bezier(0.16, 1, 0.3, 1)" }}
        frameloop={frameloop}
        dpr={[1, 1.75]}
        shadows={{ enabled: true, type: THREE.PCFShadowMap }}
        camera={{ fov: 26, near: 0.5, far: 900, position: [0, 8, 30] }}
        gl={{
          antialias: true,
          alpha: false,
          stencil: false,
          powerPreference: "high-performance",
          toneMapping: THREE.NeutralToneMapping,
          toneMappingExposure: 1.0,
        }}
      >
        <Scene progress={progress} stage={stage} reduced={reduced} onReady={() => setReady(true)} />
      </Canvas>
    </div>
  );
}
