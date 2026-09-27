"use client";

import { Environment, Float, Lightformer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion, type MotionValue } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/** Mark geometry in the logo's 40×40 SVG space → centred 3D units. */
const S = 1 / 15;
const toV = (x: number, y: number) => new THREE.Vector2((x - 20) * S, (20 - y) * S);

function shapeFrom(points: [number, number][]) {
  const shape = new THREE.Shape();
  points.forEach(([x, y], i) => {
    const v = toV(x, y);
    if (i === 0) shape.moveTo(v.x, v.y);
    else shape.lineTo(v.x, v.y);
  });
  shape.closePath();
  return shape;
}

// Open "A": outer/inner mitred apex computed from a 2.6-unit stroke.
const LEGS: [number, number][] = [
  [5.06, 34],
  [20, 3.01],
  [34.94, 34],
  [32.06, 34],
  [20, 8.99],
  [7.94, 34],
];
const BAR: [number, number][] = [
  [10.6, 22.9],
  [39.8, 22.9],
  [39.8, 25.5],
  [10.6, 25.5],
];

const EXTRUDE: THREE.ExtrudeGeometryOptions = {
  depth: 0.16,
  bevelEnabled: true,
  bevelThickness: 0.022,
  bevelSize: 0.014,
  bevelSegments: 6,
  curveSegments: 4,
};

function Mark({ scroll, reduced }: { scroll?: MotionValue<number>; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const [legs, bar] = useMemo(() => {
    const l = new THREE.ExtrudeGeometry(shapeFrom(LEGS), EXTRUDE);
    const b = new THREE.ExtrudeGeometry(shapeFrom(BAR), { ...EXTRUDE, depth: 0.2 });
    l.translate(0, 0, -0.08);
    b.translate(0, 0, -0.06);
    return [l, b];
  }, []);

  useEffect(
    () => () => {
      legs.dispose();
      bar.dispose();
    },
    [legs, bar],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, dt) => {
    if (!group.current) return;
    const p = scroll?.get() ?? 0.5;
    const idle = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.35) * 0.18;
    const ty = -0.55 + p * 1.1 + idle + pointer.current.x * 0.25;
    const tx = 0.08 + pointer.current.y * 0.12;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, ty, 3, dt);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, tx, 3, dt);
  });

  return (
    <group ref={group}>
      <mesh geometry={legs} castShadow>
        <meshPhysicalMaterial
          color="#023b3b"
          metalness={0.85}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.4}
        />
      </mesh>
      <mesh geometry={bar}>
        <meshPhysicalMaterial color="#8dc63f" metalness={0.75} roughness={0.2} clearcoat={0.6} envMapIntensity={1.5} />
      </mesh>
    </group>
  );
}

function Orbits({ reduced }: { reduced: boolean }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (reduced) return;
    if (a.current) a.current.rotation.z += dt * 0.06;
    if (b.current) b.current.rotation.z -= dt * 0.04;
  });
  return (
    <>
      <mesh ref={a} rotation={[1.2, 0.2, 0]}>
        <torusGeometry args={[1.75, 0.0035, 8, 200]} />
        <meshBasicMaterial color="#8dc63f" transparent opacity={0.55} />
      </mesh>
      <mesh ref={b} rotation={[1.45, -0.5, 0.4]}>
        <torusGeometry args={[2.05, 0.0025, 8, 200]} />
        <meshBasicMaterial color="#33b3b3" transparent opacity={0.4} />
      </mesh>
    </>
  );
}

export default function EmblemScene({
  scroll,
  active = true,
  className,
}: {
  scroll?: MotionValue<number>;
  active?: boolean;
  className?: string;
}) {
  const reduced = !!useReducedMotion();

  return (
    <div className={className}>
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.2], fov: 30 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
      >
        <Float speed={reduced ? 0 : 1.2} rotationIntensity={0.15} floatIntensity={reduced ? 0 : 0.5}>
          <Mark scroll={scroll} reduced={reduced} />
        </Float>
        <Orbits reduced={reduced} />
        <Environment resolution={256} frames={1}>
          <color attach="background" args={["#011e1e"]} />
          <Lightformer form="rect" intensity={3.2} color="#f2fffb" position={[0, 4, 2]} scale={[8, 1.4, 1]} rotation-x={Math.PI / 2} />
          <Lightformer form="rect" intensity={2.4} color="#bfeee6" position={[-4, 0.5, 1]} scale={[1, 6, 1]} rotation-y={Math.PI / 2} />
          <Lightformer form="rect" intensity={1.6} color="#ffffff" position={[4, -0.5, 1]} scale={[0.6, 6, 1]} rotation-y={-Math.PI / 2} />
          <Lightformer form="ring" intensity={1.4} color="#009999" position={[0, 0, -6]} scale={5} />
          <Lightformer form="rect" intensity={0.8} color="#ffffff" position={[0, -3, 3]} scale={[6, 0.4, 1]} rotation-x={-Math.PI / 2} />
        </Environment>
      </Canvas>
    </div>
  );
}
