/**
 * AUREX Green — procedural "architectural maquette" of the sustainable
 * commerce ecosystem. Everything is generated here (no external assets) and
 * batched into a handful of InstancedMeshes, so the full panorama renders in
 * roughly twenty draw calls.
 *
 * Only imported by the lazily loaded GreenScene chunk.
 */

import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

// ── Layout ───────────────────────────────────────────────────────
export const ZONE_SPACING = 18;
export const zoneX = (i: number) => i * ZONE_SPACING;
/** Eastbound / westbound lanes of the spine road, and the rail line in front of it. */
export const ROAD_Z = 4;
export const LANE_EAST = 4.35;
export const LANE_WEST = 3.65;
export const RAIL_Z = 6.3;
/** The port stands on a quay facing open water to the north (−z); the sea also opens to the east. */
export const PORT = { x0: zoneX(6) - 8.5, x1: zoneX(6) + 10, quayZ: -10 } as const;
/** The road ends at the port gate; vehicles enter and leave through its hall at GATE_X. */
export const ROAD_END = zoneX(6) - 4.2;
export const GATE_X = ROAD_END + 0.2;
export const ROAD_START = -70;
export const WATER_Y = -0.32;

// ── Palette (sRGB) ───────────────────────────────────────────────
export const COLORS = {
  ground: "#10261a",
  fieldA: "#132c1d",
  fieldB: "#173222",
  fieldC: "#0e2317",
  fieldD: "#1a3625",
  hedge: "#0a1c13",
  pad: "#3a4245",
  padDark: "#2c3336",
  apron: "#454d50",
  asphalt: "#1b2023",
  marking: "#d9d3c2",
  ballast: "#2b2f31",
  sleeper: "#3b3f41",
  rail: "#9aa3a8",
  cream: "#ebe6d8",
  creamShade: "#d9d2c1",
  stone: "#bdb7a8",
  graphite: "#30373d",
  graphiteDark: "#1f2428",
  graphiteLight: "#4b545b",
  roof: "#3d454b",
  teal: "#127272",
  tealDeep: "#0e4a50",
  tealGrey: "#557a7b",
  pv: "#0f2f44",
  pvEdge: "#1b4a5c",
  glass: "#143c47",
  glassDark: "#15252b",
  brass: "#c8a24a",
  kraft: "#b88d5c",
  kraftLight: "#c9a070",
  kraftDark: "#9d7547",
  pallet: "#a08d6d",
  lime: "#8dc63f",
  amber: "#e2cf98",
  tyre: "#121517",
  sea: "#082322",
  ridgeNear: "#10251d",
  ridgeFar: "#142d27",
} as const;

const CONTAINER_TONES = [
  COLORS.graphite,
  COLORS.graphite,
  COLORS.cream,
  COLORS.cream,
  COLORS.creamShade,
  COLORS.teal,
  COLORS.tealDeep,
  COLORS.tealGrey,
  "#56616a",
  "#2c4a3b",
  COLORS.brass,
];

// ── Utilities ────────────────────────────────────────────────────
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const _p = new THREE.Vector3();
const _s = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();
const X_AXIS = new THREE.Vector3(1, 0, 0);

/** Right prism: a 2D profile in the (z, y) plane extruded along x, centred in a unit box. */
function prismGeometry(profile: [number, number][]) {
  const shape = new THREE.Shape(profile.map(([z, y]) => new THREE.Vector2(z, y)));
  const g = new THREE.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: false });
  // (u, v, w) → (0.5 − w, v − 0.5, u): extrusion becomes the x axis.
  g.rotateY(-Math.PI / 2);
  g.translate(0.5, -0.5, 0);
  g.computeVertexNormals();
  return g;
}

type Channel = "box" | "glass" | "metal" | "cyl" | "cylMetal" | "wedge" | "gable" | "cone" | "light";
type Instance = { m: THREE.Matrix4; c: THREE.Color };

/** Collects instances per channel; each channel becomes one InstancedMesh. */
class Builder {
  readonly items: Record<Channel, Instance[]> = {
    box: [],
    glass: [],
    metal: [],
    cyl: [],
    cylMetal: [],
    wedge: [],
    gable: [],
    cone: [],
    light: [],
  };
  readonly trucks: THREE.Matrix4[] = [];
  readonly vans: THREE.Matrix4[] = [];
  readonly ships: THREE.Matrix4[] = [];
  readonly rand: () => number;

  constructor(readonly lite: boolean) {
    this.rand = mulberry32(20260927);
  }

  pick<T>(list: readonly T[]) {
    return list[Math.floor(this.rand() * list.length)];
  }

  jitter(hex: string, amount = 0.035) {
    return new THREE.Color(hex).offsetHSL(0, 0, (this.rand() - 0.5) * amount);
  }

  private push(ch: Channel, m: THREE.Matrix4, c: THREE.ColorRepresentation) {
    this.items[ch].push({ m, c: c instanceof THREE.Color ? c : new THREE.Color(c) });
  }

  /** Box centred at (x, y, z). */
  box(ch: Channel, x: number, y: number, z: number, w: number, h: number, d: number, c: THREE.ColorRepresentation, rx = 0, ry = 0, rz = 0) {
    const m = new THREE.Matrix4().compose(_p.set(x, y, z), _q.setFromEuler(_e.set(rx, ry, rz)), _s.set(w, h, d));
    this.push(ch, m, c);
  }

  /** Box resting on `y0`. */
  block(ch: Channel, x: number, y0: number, z: number, w: number, h: number, d: number, c: THREE.ColorRepresentation, ry = 0) {
    this.box(ch, x, y0 + h / 2, z, w, h, d, c, 0, ry, 0);
  }

  /** Square-section member spanning two points. */
  beam(ch: Channel, a: [number, number, number], b: [number, number, number], t: number, c: THREE.ColorRepresentation, t2 = t) {
    _a.set(...a);
    _b.set(...b);
    const len = _a.distanceTo(_b);
    _q.setFromUnitVectors(X_AXIS, _b.clone().sub(_a).normalize());
    const m = new THREE.Matrix4().compose(_p.copy(_a).add(_b).multiplyScalar(0.5), _q, _s.set(len, t, t2));
    this.push(ch, m, c);
  }

  /** Vertical cylinder resting on `y0`. */
  cyl(ch: "cyl" | "cylMetal" | "cone", x: number, y0: number, z: number, r: number, h: number, c: THREE.ColorRepresentation) {
    const m = new THREE.Matrix4().compose(_p.set(x, y0 + h / 2, z), _q.identity(), _s.set(r * 2, h, r * 2));
    this.push(ch, m, c);
  }

  /** Prism (wedge or gable) resting on `y0`, ridge along x unless rotated. */
  prism(ch: "wedge" | "gable", x: number, y0: number, z: number, w: number, h: number, d: number, c: THREE.ColorRepresentation, ry = 0) {
    this.box(ch, x, y0 + h / 2, z, w, h, d, c, 0, ry, 0);
  }

  vehicle(kind: "truck" | "van", x: number, z: number, ry: number) {
    const m = new THREE.Matrix4().compose(_p.set(x, 0.06, z), _q.setFromEuler(_e.set(0, ry, 0)), _s.set(1, 1, 1));
    (kind === "truck" ? this.trucks : this.vans).push(m);
  }
}

// ── Zones ────────────────────────────────────────────────────────

/** Raised concrete plinth: the maquette base of each site. */
function pad(b: Builder, x0: number, x1: number, z0: number, z1: number, color: string = COLORS.pad, h = 0.07) {
  b.block("box", (x0 + x1) / 2, 0, (z0 + z1) / 2, x1 - x0, h, z1 - z0, color);
}

/** Flat-roofed volume with an optional ribbon window facing the camera (+z). */
function building(
  b: Builder,
  x: number,
  z: number,
  w: number,
  h: number,
  d: number,
  opts: { wall?: string; ribbons?: number; roof?: string; parapet?: boolean } = {},
) {
  const wall = opts.wall ?? COLORS.cream;
  b.block("box", x, 0.07, z, w, h, d, wall);
  if (opts.parapet !== false) b.block("box", x, 0.07 + h, z, w, 0.08, d, opts.roof ?? COLORS.creamShade);
  const ribbons = opts.ribbons ?? 1;
  for (let i = 0; i < ribbons; i++) {
    const y = 0.07 + (h * (i + 0.62)) / (ribbons + 0.25);
    b.box("glass", x, y, z + d / 2 + 0.012, w * 0.86, Math.min(0.26, h / (ribbons * 3.2)), 0.02, COLORS.glass);
  }
}

function solarRow(b: Builder, x0: number, z: number, count: number, tilt = 0.42, y = 0.55, w = 0.82, d = 1.05) {
  for (let i = 0; i < count; i++) {
    const x = x0 + i * (w + 0.05);
    b.box("glass", x, y, z, w, 0.035, d, COLORS.pv, tilt);
  }
  // Mounting rails and legs.
  const span = count * (w + 0.05);
  b.box("metal", x0 + span / 2 - (w + 0.05) / 2, y - 0.09, z, span, 0.03, 0.05, COLORS.rail);
  for (let i = 0; i <= count; i += 3) {
    const x = x0 - w / 2 + i * (w + 0.05);
    b.block("metal", x, 0, z - 0.18, 0.04, y - 0.1, 0.04, COLORS.rail);
    b.block("metal", x, 0, z + 0.18, 0.04, y - 0.3, 0.04, COLORS.rail);
  }
}

/** 0 — Solar energy: tilted PV arrays, inverter and storage cabinets, a small control building. */
function solar(b: Builder) {
  const X = zoneX(0);
  const rows = b.lite ? 6 : 8;
  for (let r = 0; r < rows; r++) {
    const z = 1.2 - r * 1.62;
    const count = r % 2 === 0 ? 13 : 12;
    solarRow(b, X - 8.4 + (r % 2) * 0.4, z, count);
  }
  // Further arrays towards the background suggest scale.
  const back = b.lite ? 3 : 6;
  for (let r = 0; r < back; r++) solarRow(b, X - 12 + r * 0.6, -13.5 - r * 1.62, 16);

  // Service track.
  b.block("box", X + 3.6, 0, -4.2, 1.1, 0.03, 13.5, COLORS.padDark);

  // Inverter / storage cabinets with status lights.
  pad(b, X + 4.6, X + 8.4, -7.2, 0.8);
  for (let i = 0; i < 4; i++) {
    const z = -6.2 + i * 1.7;
    b.block("box", X + 5.5, 0.07, z, 0.9, 0.95, 0.62, COLORS.cream);
    b.box("box", X + 5.5, 0.55, z + 0.315, 0.8, 0.78, 0.01, COLORS.creamShade);
    b.box("light", X + 5.82, 0.9, z + 0.33, 0.07, 0.05, 0.02, COLORS.lime);
  }
  // Transformer with brass cooling fins.
  b.block("box", X + 7.3, 0.07, -5.4, 0.9, 0.8, 0.9, COLORS.graphite);
  for (let i = 0; i < 5; i++) b.block("metal", X + 6.95 + i * 0.17, 0.12, -4.92, 0.03, 0.6, 0.12, COLORS.brass);
  // Control building.
  building(b, X + 7.3, -1.8, 1.6, 1.0, 2.4, { ribbons: 1 });
  b.box("light", X + 7.3, 1.2, -0.58, 0.08, 0.05, 0.02, COLORS.lime);
}

/** 1 — Clean technology: north-light factory, lab with brass fins, battery storage row. */
function cleanTech(b: Builder) {
  const X = zoneX(1);
  pad(b, X - 8, X + 8, -11, 2.6);

  // Factory with sawtooth roof; glazing faces the viewer.
  const fx = X - 2.4;
  const fz = -6.2;
  const fw = 9.4;
  const fh = 1.35;
  const teeth = 5;
  const td = 1.12;
  const fd = teeth * td;
  b.block("box", fx, 0.07, fz, fw, fh, fd, COLORS.cream);
  b.box("glass", fx, 0.07 + fh * 0.55, fz + fd / 2 + 0.012, fw * 0.9, 0.24, 0.02, COLORS.glass);
  for (let i = 0; i < 3; i++) b.block("box", fx - 3 + i * 3, 0.07, fz + fd / 2 + 0.01, 1.1, 0.8, 0.02, COLORS.graphite);
  for (let t = 0; t < teeth; t++) {
    const z = fz - fd / 2 + td * (t + 0.5);
    b.prism("wedge", fx, 0.07 + fh, z, fw, 0.62, td, COLORS.roof);
    b.box("glass", fx, 0.07 + fh + 0.3, z + td / 2 + 0.012, fw * 0.96, 0.44, 0.02, COLORS.glass);
  }

  // Research building: two ribbon windows and a restrained brass fin screen.
  const lx = X + 5.2;
  const lz = -6.6;
  building(b, lx, lz, 3.6, 2.0, 3.4, { ribbons: 2 });
  for (let i = 0; i < 11; i++) b.block("metal", lx - 1.6 + i * 0.32, 0.12, lz + 1.76, 0.04, 1.86, 0.1, COLORS.brass);
  b.block("box", lx - 0.8, 2.15, lz - 0.6, 0.9, 0.3, 0.8, COLORS.creamShade);
  b.block("box", lx + 0.8, 2.15, lz - 0.2, 0.6, 0.24, 0.6, COLORS.creamShade);

  // Battery energy storage containers.
  const count = b.lite ? 5 : 7;
  for (let i = 0; i < count; i++) {
    const x = X - 7 + i * 1.75;
    b.block("box", x, 0.07, 0.6, 1.55, 0.62, 0.66, COLORS.graphite);
    b.box("box", x + 0.78, 0.38, 0.6, 0.02, 0.5, 0.58, COLORS.creamShade);
    b.block("box", x - 0.3, 0.69, 0.6, 0.5, 0.14, 0.5, COLORS.graphiteLight);
    b.box("light", x + 0.55, 0.58, 0.94, 0.08, 0.04, 0.02, COLORS.lime);
  }
  b.block("box", X + 6.2, 0.07, 0.4, 1.2, 0.9, 1.2, COLORS.cream);
}

/** 2 — Recycled materials: sorting hall, silos, compressed bales stacked in blocks. */
function recycling(b: Builder) {
  const X = zoneX(2);
  pad(b, X - 8, X + 8, -11, 2.6);

  // Sorting hall with a gable roof and roller doors.
  const hx = X - 3.2;
  const hz = -6.9;
  b.block("box", hx, 0.07, hz, 7.4, 1.55, 4.4, COLORS.cream);
  b.prism("gable", hx, 1.62, hz, 7.4, 0.8, 4.4, COLORS.roof);
  b.box("glass", hx, 2.27, hz, 7.0, 0.1, 0.5, COLORS.glass);
  for (let i = 0; i < 3; i++) b.block("box", hx - 2.4 + i * 2.4, 0.07, hz + 2.21, 1.3, 1.05, 0.02, COLORS.graphite);

  // Silos with conical tops and brass bands.
  const silos = [
    [X + 3.6, -7.6, COLORS.cream],
    [X + 5.3, -7.6, COLORS.creamShade],
    [X + 7.0, -7.6, COLORS.graphiteLight],
  ] as const;
  for (const [sx, sz, c] of silos) {
    b.cyl("cyl", sx, 0.07, sz, 0.72, 3.1, c);
    b.cyl("cone", sx, 3.17, sz, 0.74, 0.5, COLORS.graphite);
    b.cyl("cylMetal", sx, 2.35, sz, 0.735, 0.06, COLORS.brass);
    b.block("box", sx, 0.07, sz + 0.55, 0.5, 0.35, 0.4, COLORS.graphite);
  }
  // Conveyor bridge feeding the silos.
  b.beam("box", [hx + 3.7, 1.3, hz + 0.5], [X + 3.4, 3.2, -7.4], 0.22, COLORS.graphite, 0.28);
  b.beam("box", [X + 3.6, 3.28, -7.6], [X + 7.0, 3.28, -7.6], 0.16, COLORS.graphite, 0.24);

  // Bales in blocks — paper, board, plastics, metals.
  const tones = ["#cfc7b4", "#a8977b", "#5f7f80", "#7c8388", "#8d9a86", "#b7ae98"];
  const blocks = b.lite ? 4 : 6;
  for (let k = 0; k < blocks; k++) {
    const bx = X - 6.6 + (k % 3) * 3.1;
    const bz = k < 3 ? -2.2 : 0.6;
    const tone = tones[k % tones.length];
    const layers = 2 + ((k + 1) % 3 === 0 ? 1 : 0) + (k === 1 ? 1 : 0);
    for (let y = 0; y < layers; y++)
      for (let i = 0; i < 4; i++)
        for (let j = 0; j < 2; j++) {
          if (y === layers - 1 && b.rand() < 0.22) continue;
          b.block("box", bx + i * 0.6, 0.07 + y * 0.43, bz + j * 0.5, 0.56, 0.41, 0.46, b.jitter(tone, 0.06));
        }
  }
  // A few loose bales being moved.
  b.block("box", X + 4.4, 0.07, -2.4, 0.56, 0.41, 0.46, "#a8977b");
  b.block("box", X + 5.2, 0.07, -1.6, 0.56, 0.41, 0.46, "#5f7f80");
  // Wheel loader, abstracted.
  b.block("box", X + 5.6, 0.12, 0.8, 0.9, 0.42, 0.5, COLORS.cream);
  b.block("box", X + 5.4, 0.54, 0.8, 0.42, 0.34, 0.44, COLORS.glassDark);
  b.block("box", X + 6.2, 0.12, 0.8, 0.12, 0.3, 0.62, COLORS.graphite);
}

/** 3 — Sustainable packaging: plant, conveyor (boxes animate separately), pallets of kraft cartons. */
function packaging(b: Builder) {
  const X = zoneX(3);
  pad(b, X - 8, X + 8, -11, 2.6);

  const px = X - 3.6;
  const pz = -6.6;
  building(b, px, pz, 7.2, 1.9, 4.6, { ribbons: 1 });
  b.block("box", px, 1.97, pz, 7.2, 0.14, 4.6, COLORS.graphite);
  for (let i = 0; i < 4; i++) b.block("glass", px - 2.4 + i * 1.6, 2.11, pz - 0.4, 0.9, 0.05, 1.8, COLORS.glassDark);
  b.block("box", px + 1.4, 0.07, pz + 2.31, 1.3, 1.0, 0.02, COLORS.graphite);

  // Conveyor frame (belt at y ≈ 0.62).
  const c0 = X - 1.4;
  const c1 = X + 6.8;
  const cz = -3.1;
  b.box("box", (c0 + c1) / 2, 0.58, cz, c1 - c0, 0.06, 0.52, COLORS.graphiteDark);
  b.box("metal", (c0 + c1) / 2, 0.64, cz - 0.28, c1 - c0, 0.07, 0.03, COLORS.rail);
  b.box("metal", (c0 + c1) / 2, 0.64, cz + 0.28, c1 - c0, 0.07, 0.03, COLORS.rail);
  for (let x = c0 + 0.3; x < c1; x += 1.2) b.block("metal", x, 0.07, cz, 0.05, 0.48, 0.44, COLORS.rail);
  // Conveyor emerges from a housing at the plant.
  b.block("box", c0 - 0.2, 0.07, cz, 0.7, 1.05, 0.9, COLORS.creamShade);

  // Pallets of kraft cartons — the one warm tone in the scene.
  const cols = b.lite ? 4 : 5;
  const kraft = [COLORS.kraft, COLORS.kraftLight, COLORS.kraftDark];
  for (let r = 0; r < 3; r++)
    for (let i = 0; i < cols; i++) {
      const x = X - 1.6 + i * 1.55;
      const z = -1.3 + r * 1.3;
      b.block("box", x, 0.07, z, 1.05, 0.12, 0.9, COLORS.pallet);
      const tiers = 1 + ((i + r) % 3);
      for (let y = 0; y < tiers; y++)
        for (let u = 0; u < 2; u++)
          for (let v = 0; v < 2; v++)
            b.block("box", x - 0.25 + u * 0.5, 0.19 + y * 0.34, z - 0.21 + v * 0.42, 0.47, 0.32, 0.4, b.jitter(b.pick(kraft), 0.04));
    }
  // Loose pallets and a forklift.
  b.block("box", X - 6.4, 0.07, -0.6, 1.05, 0.12, 0.9, COLORS.pallet);
  b.block("box", X - 6.4, 0.19, -0.6, 1.05, 0.12, 0.9, COLORS.pallet);
  b.block("box", X - 5.0, 0.12, 0.8, 0.7, 0.4, 0.5, COLORS.cream);
  b.block("box", X - 5.2, 0.52, 0.8, 0.34, 0.3, 0.44, COLORS.glassDark);
  b.block("metal", X - 4.6, 0.12, 0.8, 0.06, 0.9, 0.4, COLORS.graphite);
}

/** 4 — Electric mobility: charging canopy with PV roof, chargers with lime indicators, e-trucks and vans. */
function mobility(b: Builder) {
  const X = zoneX(4);
  pad(b, X - 8, X + 8, -11, 2.6, COLORS.padDark);

  const bays = 5;
  const bw = 2.1;
  const x0 = X - 6.2;
  const cz = -3.4;
  const depth = 3.8;
  // Canopy and its solar roof.
  b.block("box", x0 - bw / 2 + (bays * bw) / 2, 1.62, cz, bays * bw + 0.3, 0.1, depth, COLORS.cream);
  for (let i = 0; i < bays * 2; i++)
    for (let j = 0; j < 3; j++) b.box("glass", x0 - bw / 2 + 0.55 + i * 1.03, 1.78, cz - 1.2 + j * 1.2, 0.98, 0.03, 1.12, COLORS.pv, 0.1);
  for (let i = 0; i <= bays; i += 1) b.block("metal", x0 - bw / 2 + i * bw, 0.07, cz - depth / 2 + 0.35, 0.08, 1.55, 0.08, COLORS.rail);

  for (let i = 0; i < bays; i++) {
    const x = x0 + i * bw;
    // Bay markings.
    b.box("box", x - bw / 2, 0.075, cz + 0.5, 0.04, 0.01, 3.4, COLORS.marking);
    // Charger pedestal with indicator.
    b.block("box", x - bw / 2 + 0.25, 0.07, cz - depth / 2 + 0.35, 0.22, 0.85, 0.2, COLORS.graphite);
    b.box("light", x - bw / 2 + 0.25, 0.78, cz - depth / 2 + 0.46, 0.12, 0.05, 0.02, COLORS.lime);
    b.box("box", x - bw / 2 + 0.25, 0.55, cz - depth / 2 + 0.46, 0.14, 0.18, 0.01, COLORS.glassDark);
  }
  b.box("box", x0 - bw / 2 + bays * bw, 0.075, cz + 0.5, 0.04, 0.01, 3.4, COLORS.marking);
  // Parked fleet (noses towards the road).
  b.vehicle("truck", x0, cz + 0.55, -Math.PI / 2);
  b.vehicle("truck", x0 + bw, cz + 0.55, -Math.PI / 2);
  b.vehicle("van", x0 + 2 * bw, cz + 0.2, -Math.PI / 2);
  b.vehicle("truck", x0 + 3 * bw, cz + 0.55, -Math.PI / 2);
  if (!b.lite) b.vehicle("van", x0 + 4 * bw, cz + 0.2, -Math.PI / 2);

  // Depot and grid connection.
  building(b, X + 5.6, -7.2, 3.8, 1.3, 2.8, { ribbons: 1 });
  b.block("box", X + 5.6, 1.45, -7.2, 1.2, 0.2, 0.8, COLORS.creamShade);
  b.block("box", X + 6.6, 0.07, -3.8, 1.0, 0.85, 0.9, COLORS.graphite);
  for (let i = 0; i < 4; i++) b.block("metal", X + 6.25 + i * 0.22, 0.12, -3.33, 0.03, 0.62, 0.1, COLORS.brass);
  // Rear row of vans.
  for (let i = 0; i < (b.lite ? 2 : 4); i++) b.vehicle("van", X - 5.6 + i * 1.5, -8.6, Math.PI / 2);
}

/** 5 — Green logistics: warehouse with rooftop solar and loading docks, apron, container train. */
function logistics(b: Builder) {
  const X = zoneX(5);
  pad(b, X - 8.5, X + 8, -12, 2.6);
  pad(b, X - 8, X + 7.5, -3.2, 2.2, COLORS.apron, 0.08);

  const wx = X - 0.6;
  const wz = -7.6;
  const ww = 13;
  const wh = 2.1;
  const wd = 6.4;
  b.block("box", wx, 0.07, wz, ww, wh, wd, COLORS.creamShade);
  b.block("box", wx, 0.07 + wh, wz, ww, 0.06, wd, COLORS.roof);
  b.box("glass", wx, 0.07 + wh - 0.28, wz + wd / 2 + 0.012, ww * 0.94, 0.14, 0.02, COLORS.glass);
  // Rooftop solar.
  const rows = b.lite ? 4 : 5;
  const cols = b.lite ? 10 : 12;
  for (let r = 0; r < rows; r++)
    for (let i = 0; i < cols; i++)
      b.box("glass", wx - ww / 2 + 0.75 + i * 0.98, 0.07 + wh + 0.2, wz - wd / 2 + 0.85 + r * 1.2, 0.9, 0.03, 0.95, COLORS.pv, 0.22);
  // Loading docks with small canopies.
  const docks = 8;
  for (let i = 0; i < docks; i++) {
    const x = wx - ww / 2 + 1.1 + i * 1.5;
    b.block("box", x, 0.07, wz + wd / 2 + 0.01, 0.9, 1.0, 0.02, COLORS.graphite);
    b.block("box", x, 1.2, wz + wd / 2 + 0.3, 1.1, 0.05, 0.6, COLORS.cream);
    b.block("box", x, 0.07, wz + wd / 2 + 0.2, 1.0, 0.22, 0.4, COLORS.padDark);
  }
  // Trucks backed onto the docks.
  b.vehicle("truck", wx - ww / 2 + 1.1 + 1.5 * 2, wz + wd / 2 + 1.45, -Math.PI / 2);
  b.vehicle("truck", wx - ww / 2 + 1.1 + 1.5 * 5, wz + wd / 2 + 1.45, -Math.PI / 2);
  // Apron markings.
  for (let i = 0; i < 9; i++) b.box("box", X - 6.6 + i * 1.6, 0.085, 0.9, 0.04, 0.01, 1.6, COLORS.marking);

  // Container train on the rail line.
  const wagons = b.lite ? 6 : 9;
  const tx0 = X - 8;
  // Locomotive.
  b.block("box", tx0 + wagons * 2.25 + 0.4, 0.3, RAIL_Z, 2.0, 0.66, 0.5, COLORS.cream);
  b.block("box", tx0 + wagons * 2.25 + 0.4, 0.96, RAIL_Z, 1.8, 0.08, 0.46, COLORS.graphite);
  b.box("box", tx0 + wagons * 2.25 + 1.41, 0.72, RAIL_Z, 0.02, 0.22, 0.44, COLORS.glassDark);
  b.box("box", tx0 + wagons * 2.25 + 0.4, 0.42, RAIL_Z + 0.255, 2.0, 0.05, 0.01, COLORS.teal);
  for (let i = 0; i < wagons; i++) {
    const x = tx0 + i * 2.25;
    b.block("box", x, 0.22, RAIL_Z, 2.15, 0.1, 0.46, COLORS.graphiteDark);
    b.block("box", x - 0.52, 0.32, RAIL_Z, 1.0, 0.44, 0.44, b.jitter(b.pick(CONTAINER_TONES), 0.03));
    if (i % 4 !== 2) b.block("box", x + 0.52, 0.32, RAIL_Z, 1.0, 0.44, 0.44, b.jitter(b.pick(CONTAINER_TONES), 0.03));
  }
}

/** Ship-to-shore gantry crane on the north quay; its boom reaches out over the water (−z). */
function crane(b: Builder, x: number, trolley: number) {
  const land = PORT.quayZ + 3.3;
  const sea = PORT.quayZ + 0.5;
  const legH = 3.4;
  const c = COLORS.cream;
  const mid = (land + sea) / 2;
  for (const z of [land, sea])
    for (const dx of [-0.62, 0.62]) b.block("box", x + dx, 0.07, z, 0.16, legH, 0.16, c);
  for (const dx of [-0.62, 0.62]) b.box("box", x + dx, legH, mid, 0.2, 0.22, land - sea + 0.2, c);
  for (const z of [land, sea]) b.box("box", x, legH, z, 1.44, 0.22, 0.2, c);
  for (const dx of [-0.62, 0.62]) b.box("box", x + dx, 0.8, mid, 0.1, 0.1, land - sea, c);
  // Boom over the water and backreach over the yard.
  const by = legH + 0.95;
  const b0 = land + 3.2;
  const b1 = PORT.quayZ - 7.4;
  for (const dx of [-0.3, 0.3]) b.box("box", x + dx, by, (b0 + b1) / 2, 0.12, 0.24, b0 - b1, c);
  for (let z = b1 + 0.6; z < b0; z += 1.4) b.box("box", x, by, z, 0.6, 0.2, 0.08, c);
  // A-frame and stays.
  const apex: [number, number, number] = [x, legH + 3.1, mid + 0.3];
  for (const dx of [-0.4, 0.4]) {
    b.beam("box", [x + dx, legH + 0.1, land - 0.2], [x + dx * 0.5, apex[1], apex[2]], 0.12, c);
    b.beam("box", [x + dx, legH + 0.1, sea + 0.2], [x + dx * 0.5, apex[1], apex[2]], 0.12, c);
    b.beam("metal", [x + dx * 0.5, apex[1], apex[2]], [x + dx * 0.75, by + 0.1, b1 + 0.4], 0.035, COLORS.rail);
    b.beam("metal", [x + dx * 0.5, apex[1], apex[2]], [x + dx * 0.75, by + 0.1, b0 - 0.4], 0.035, COLORS.rail);
  }
  // Machinery house with a brass line, trolley, spreader carrying a container.
  b.block("box", x, by + 0.12, b0 - 1.3, 1.1, 0.6, 1.6, COLORS.graphite);
  b.box("box", x + 0.56, by + 0.45, b0 - 1.3, 0.01, 0.08, 1.3, COLORS.brass);
  const tz = PORT.quayZ - trolley;
  b.block("box", x, by + 0.12, tz, 0.9, 0.28, 0.7, COLORS.graphite);
  const hookY = 2.4;
  b.box("metal", x, (by + hookY) / 2, tz - 0.2, 0.02, by - hookY, 0.02, COLORS.rail);
  b.box("metal", x, (by + hookY) / 2, tz + 0.2, 0.02, by - hookY, 0.02, COLORS.rail);
  b.block("box", x, hookY - 0.08, tz, 0.46, 0.08, 1.05, COLORS.graphiteDark);
  b.block("box", x, hookY - 0.52, tz, 0.44, 0.44, 1.0, b.pick([COLORS.teal, COLORS.cream, COLORS.graphiteLight]));
  // Warning lights.
  b.box("light", x, by + 0.18, b1 + 0.1, 0.07, 0.07, 0.07, COLORS.amber);
  b.box("light", apex[0], apex[1] + 0.1, apex[2], 0.07, 0.07, 0.07, COLORS.amber);
}

/** 6 — Global distribution: container terminal on a quay facing open water, STS cranes, moored ship, gate. */
function port(b: Builder) {
  const { x0, x1, quayZ } = PORT;
  // Terminal apron, quay walls and crane rails.
  pad(b, x0, x1, quayZ, 3.2, COLORS.apron);
  b.block("box", (x0 + x1) / 2, WATER_Y, quayZ + 0.2, x1 - x0 + 0.4, -WATER_Y + 0.1, 0.4, COLORS.stone);
  b.box("metal", (x0 + x1) / 2, 0.11, quayZ + 0.25, x1 - x0, 0.02, 0.12, COLORS.brass);
  b.block("box", x1 - 0.2, WATER_Y, (quayZ + 40) / 2, 0.4, -WATER_Y + 0.1, 40 - quayZ, COLORS.stone);
  b.block("box", x0 - 0.2, WATER_Y, (quayZ - 120) / 2, 0.4, -WATER_Y + 0.08, 120 + quayZ, COLORS.stone);
  for (const z of [quayZ + 3.3, quayZ + 0.5]) b.box("metal", (x0 + x1) / 2, 0.08, z, x1 - x0, 0.02, 0.05, COLORS.rail);
  // Bollards along the quay edge.
  for (let x = x0 + 1; x < x1; x += 2.2) b.cyl("cylMetal", x, 0.07, quayZ + 0.3, 0.06, 0.12, COLORS.graphite);

  // Container yard: rows parallel to the quay.
  const blocks = b.lite ? 3 : 4;
  for (let k = 0; k < blocks; k++) {
    const bx = x0 + 1.4 + k * 4.2;
    for (let row = 0; row < 5; row++)
      for (let i = 0; i < 3; i++) {
        const tiers = 1 + Math.floor(b.rand() * (row === 4 ? 2 : 3));
        for (let t = 0; t < tiers; t++)
          b.block("box", bx + i * 1.08, 0.07 + t * 0.45, 1.9 - row * 0.5, 1.0, 0.44, 0.44, b.jitter(b.pick(CONTAINER_TONES), 0.03));
      }
  }
  // Rubber-tyred gantry straddling one block.
  const gx = x0 + 1.4 + 4.2 + 1.08;
  for (const dx of [-2.0, 2.0])
    for (const z of [2.5, -0.9]) b.block("box", gx + dx, 0.07, z, 0.12, 2.3, 0.12, COLORS.cream);
  for (const dx of [-2.0, 2.0]) b.box("box", gx + dx, 2.4, 0.8, 0.14, 0.16, 3.6, COLORS.cream);
  b.block("box", gx, 2.46, 0.4, 4.2, 0.22, 0.6, COLORS.graphite);

  // Cranes along the quay.
  crane(b, x0 + 3.2, 3.6);
  crane(b, x0 + 9.2, 1.8);
  crane(b, x0 + 15.2, 5.2);

  // Port gate hall where the spine road ends: road traffic enters and leaves through it.
  const hx = GATE_X + 1.25;
  b.block("box", hx, 0, ROAD_Z, 2.5, 1.2, 2.6, COLORS.cream);
  b.block("box", hx, 1.2, ROAD_Z, 2.6, 0.08, 2.7, COLORS.creamShade);
  b.box("glass", hx, 0.82, ROAD_Z + 1.31, 2.1, 0.2, 0.02, COLORS.glass);
  b.box("metal", hx, 1.1, ROAD_Z + 1.31, 2.5, 0.03, 0.02, COLORS.brass);
  for (const z of [LANE_EAST, LANE_WEST]) {
    b.box("box", GATE_X - 0.005, 0.5, z, 0.02, 1.0, 0.62, COLORS.graphiteDark);
    b.box("light", GATE_X - 0.02, 1.07, z, 0.02, 0.05, 0.14, COLORS.lime);
  }
  b.box("metal", GATE_X - 0.02, 1.16, ROAD_Z, 0.02, 0.04, 2.5, COLORS.brass);
  // Rail terminal buffer.
  b.block("box", ROAD_END - 1, 0.07, RAIL_Z, 0.3, 0.45, 0.8, COLORS.graphite);

  // Ship moored alongside the quay, bow to the east.
  b.ships.push(new THREE.Matrix4().compose(_p.set(x0 + 9.4, WATER_Y, quayZ - 2.1), _q.identity(), _s.set(1, 1, 1)));

  // Breakwater enclosing the basin, with a small light tower at its head.
  const bwz = quayZ - 16;
  b.block("box", x0 + 14, WATER_Y, bwz, 30, -WATER_Y + 0.06, 0.7, COLORS.graphiteLight);
  b.cyl("cyl", x0 + 28.6, 0.12, bwz, 0.3, 1.2, COLORS.cream);
  b.box("light", x0 + 28.6, 1.42, bwz, 0.16, 0.16, 0.16, COLORS.amber);
}

/** Road and rail threading through every zone, plus access roads. */
function spine(b: Builder) {
  const x0 = ROAD_START;
  const x1 = GATE_X + 0.5;
  const len = x1 - x0;
  b.block("box", (x0 + x1) / 2, 0, ROAD_Z, len, 0.05, 1.6, COLORS.asphalt);
  b.box("box", (x0 + x1) / 2, 0.054, ROAD_Z - 0.72, len, 0.008, 0.04, COLORS.marking);
  b.box("box", (x0 + x1) / 2, 0.054, ROAD_Z + 0.72, len, 0.008, 0.04, COLORS.marking);
  const dash = b.lite ? 2.4 : 1.4;
  for (let x = x0 + 0.5; x < x1 - 0.6; x += dash) b.box("box", x, 0.054, ROAD_Z, 0.6, 0.008, 0.05, COLORS.marking);
  // Rail: ballast, sleepers, rails.
  const r1 = ROAD_END - 1;
  b.block("box", (x0 + r1) / 2, 0, RAIL_Z, r1 - x0, 0.07, 1.1, COLORS.ballast);
  const step = b.lite ? 0.9 : 0.45;
  for (let x = x0 + 0.2; x < r1; x += step) b.block("box", x, 0.07, RAIL_Z, 0.12, 0.03, 0.78, COLORS.sleeper);
  for (const dz of [-0.24, 0.24]) b.box("metal", (x0 + r1) / 2, 0.13, RAIL_Z + dz, r1 - x0, 0.035, 0.035, COLORS.rail);
  // Access roads from each site to the spine.
  for (let i = 1; i < 6; i++) b.block("box", zoneX(i) + 5.2, 0, 2.9, 2.2, 0.05, 0.6, COLORS.asphalt);
  b.block("box", zoneX(0) + 6.5, 0, 2.2, 1.6, 0.05, 2.0, COLORS.asphalt);
  // Catenary-free rail: slim signal posts with lime aspects every so often.
  for (let x = x0 + 10; x < r1; x += 24) {
    b.block("metal", x, 0.07, RAIL_Z + 0.75, 0.05, 0.9, 0.05, COLORS.rail);
    b.box("light", x, 0.95, RAIL_Z + 0.78, 0.06, 0.06, 0.03, COLORS.lime);
  }
}

/** Fields, hedgerows and distant settlements give the model its landscape. */
function landscape(b: Builder) {
  const tones = [COLORS.fieldA, COLORS.fieldB, COLORS.fieldC, COLORS.fieldD];
  // Background field strips.
  const bands: [number, number][] = [
    [-12.5, -19],
    [-19.5, -27],
    [-27.5, -36],
    [-36.5, -46],
  ];
  const xEnd = PORT.x0 - 2;
  for (const [za, zb] of bands) {
    let x = ROAD_START - 10;
    while (x < xEnd) {
      const w = 5 + b.rand() * 9;
      const x1 = Math.min(x + w, xEnd);
      // Skip the ground occupied by the background solar arrays.
      if (!(za > -24 && x1 > -14 && x < 6)) {
        b.block("box", (x + x1) / 2, 0, (za + zb) / 2, x1 - x - 0.35, 0.02, Math.abs(zb - za) - 0.35, b.pick(tones));
        if (!b.lite && b.rand() < 0.45) b.block("box", (x + x1) / 2, 0, zb + 0.1, x1 - x, 0.16, 0.22, COLORS.hedge);
      }
      x = x1;
    }
  }
  // Foreground fields between the rail and the camera.
  let x = ROAD_START - 10;
  while (x < PORT.x1 - 0.5) {
    const w = 6 + b.rand() * 8;
    const x1 = Math.min(x + w, PORT.x1 - 0.5);
    b.block("box", (x + x1) / 2, 0, 11.5, x1 - x - 0.35, 0.02, 8, b.pick(tones));
    if (b.rand() < 0.5) b.block("box", x1, 0, 11.5, 0.2, 0.14, 8, COLORS.hedge);
    x = x1;
  }
  b.block("box", (ROAD_START + ROAD_END) / 2, 0, 7.35, ROAD_END - ROAD_START, 0.12, 0.2, COLORS.hedge);

  // Distant settlements and works: low cream and graphite volumes.
  const clusters = b.lite ? 12 : 22;
  for (let i = 0; i < clusters; i++) {
    const cx = ROAD_START + 20 + (i / clusters) * (xEnd - ROAD_START - 20) + (b.rand() - 0.5) * 6;
    const cz = -16 - b.rand() * 24;
    if (cz > -26 && cx > -14 && cx < 6) continue;
    const n = 2 + Math.floor(b.rand() * 3);
    for (let k = 0; k < n; k++) {
      const w = 1.2 + b.rand() * 3;
      const d = 1 + b.rand() * 2;
      const h = 0.4 + b.rand() * 1.0;
      const x = cx + (b.rand() - 0.5) * 5;
      const z = cz + (b.rand() - 0.5) * 3;
      const tone = b.rand() < 0.4 ? COLORS.stone : COLORS.graphiteLight;
      b.block("box", x, 0, z, w, h, d, tone);
      if (b.rand() < 0.4) b.prism("gable", x, h, z, w, 0.4, d, COLORS.roof);
    }
  }
}

// ── Merged models (vertex-coloured) ──────────────────────────────
type Part = { g: THREE.BufferGeometry; c: string };

function colored(g: THREE.BufferGeometry, color: string) {
  const geo = g.index ? g.toNonIndexed() : g;
  if (geo !== g) g.dispose();
  const c = new THREE.Color(color);
  const n = geo.attributes.position.count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) arr.set([c.r, c.g, c.b], i * 3);
  geo.setAttribute("color", new THREE.BufferAttribute(arr, 3));
  return geo;
}

function part(w: number, h: number, d: number, x: number, y: number, z: number, c: string, rz = 0): Part {
  const g = new THREE.BoxGeometry(w, h, d);
  if (rz) g.rotateZ(rz);
  g.translate(x, y, z);
  return { g, c };
}

function wheel(x: number, z: number, r: number, w: number): Part {
  const g = new THREE.CylinderGeometry(r, r, w, 14);
  g.rotateX(Math.PI / 2);
  g.translate(x, r, z);
  return { g, c: COLORS.tyre };
}

function merge(parts: Part[]) {
  const geos = parts.map((p) => colored(p.g, p.c));
  const merged = mergeGeometries(geos, false)!;
  geos.forEach((g) => g.dispose());
  merged.computeBoundingSphere();
  return merged;
}

/** Electric box truck, ~2.5 long, nose towards +x, resting on y = 0. */
export function truckGeometry() {
  const parts: Part[] = [
    part(2.45, 0.1, 0.42, -0.02, 0.22, 0, COLORS.graphiteDark),
    part(0.54, 0.64, 0.5, 0.97, 0.56, 0, COLORS.cream),
    part(0.4, 0.12, 0.48, 0.9, 0.94, 0, COLORS.creamShade),
    part(0.02, 0.26, 0.44, 1.245, 0.68, 0, COLORS.glassDark),
    part(0.24, 0.2, 0.01, 1.05, 0.7, 0.252, COLORS.glassDark),
    part(0.24, 0.2, 0.01, 1.05, 0.7, -0.252, COLORS.glassDark),
    part(0.54, 0.03, 0.505, 0.97, 0.34, 0, COLORS.lime),
    part(0.02, 0.05, 0.08, 1.245, 0.36, 0.17, COLORS.amber),
    part(0.02, 0.05, 0.08, 1.245, 0.36, -0.17, COLORS.amber),
    part(1.9, 0.82, 0.52, -0.27, 0.7, 0, COLORS.cream),
    part(1.9, 0.05, 0.525, -0.27, 0.33, 0, COLORS.teal),
    part(1.9, 0.02, 0.525, -0.27, 1.1, 0, COLORS.creamShade),
    wheel(0.92, 0.2, 0.13, 0.1),
    wheel(0.92, -0.2, 0.13, 0.1),
    wheel(-0.62, 0.2, 0.13, 0.1),
    wheel(-0.62, -0.2, 0.13, 0.1),
    wheel(-0.92, 0.2, 0.13, 0.1),
    wheel(-0.92, -0.2, 0.13, 0.1),
  ];
  return merge(parts);
}

/** Electric van, ~1.3 long. */
export function vanGeometry() {
  const parts: Part[] = [
    part(1.2, 0.5, 0.46, -0.05, 0.42, 0, COLORS.cream),
    part(0.18, 0.26, 0.44, 0.62, 0.3, 0, COLORS.cream),
    part(0.02, 0.2, 0.4, 0.56, 0.58, 0, COLORS.glassDark, -0.35),
    part(0.3, 0.16, 0.01, 0.38, 0.55, 0.232, COLORS.glassDark),
    part(0.3, 0.16, 0.01, 0.38, 0.55, -0.232, COLORS.glassDark),
    part(1.2, 0.04, 0.465, -0.05, 0.28, 0, COLORS.teal),
    part(0.02, 0.04, 0.07, 0.715, 0.34, 0.15, COLORS.amber),
    part(0.02, 0.04, 0.07, 0.715, 0.34, -0.15, COLORS.amber),
    wheel(0.42, 0.2, 0.1, 0.08),
    wheel(0.42, -0.2, 0.1, 0.08),
    wheel(-0.42, 0.2, 0.1, 0.08),
    wheel(-0.42, -0.2, 0.1, 0.08),
  ];
  return merge(parts);
}

/** Container ship, ~15.5 long, bow towards +x, waterline at y = 0. */
export function shipGeometry(seed = 7) {
  const rand = mulberry32(seed);
  const hull = new THREE.Shape([
    new THREE.Vector2(-7.6, -1.3),
    new THREE.Vector2(5.4, -1.3),
    new THREE.Vector2(7.9, 0),
    new THREE.Vector2(5.4, 1.3),
    new THREE.Vector2(-7.6, 1.3),
  ]);
  const hg = new THREE.ExtrudeGeometry(hull, { depth: 1.25, bevelEnabled: false });
  hg.rotateX(-Math.PI / 2);
  hg.translate(0, -0.5, 0);
  const parts: Part[] = [
    { g: hg, c: COLORS.graphiteDark },
    part(13, 0.05, 2.62, -1.1, 0.76, 0, COLORS.creamShade),
    part(1.3, 1.9, 2.3, -6.4, 1.7, 0, COLORS.cream),
    part(0.02, 0.18, 2.1, -5.74, 2.45, 0, COLORS.glassDark),
    part(0.6, 0.08, 3.1, -6.2, 2.68, 0, COLORS.cream),
    part(0.55, 0.75, 0.62, -7.1, 3.05, 0, COLORS.graphite),
    part(0.56, 0.1, 0.63, -7.1, 3.36, 0, COLORS.brass),
  ];
  // Deck cargo: bays along the hull, rows across, tiers peaking mid-ship.
  for (let bay = 0; bay < 10; bay++) {
    const x = -5.0 + bay * 1.04;
    const peak = 2 + Math.round(Math.sin(((bay + 0.5) / 10) * Math.PI) * 2);
    for (let row = 0; row < 5; row++) {
      const z = -0.92 + row * 0.46;
      const tiers = Math.max(1, peak - (rand() < 0.3 ? 1 : 0));
      for (let t = 0; t < tiers; t++) {
        const tone = CONTAINER_TONES[Math.floor(rand() * CONTAINER_TONES.length)];
        parts.push(part(1.0, 0.42, 0.44, x, 0.99 + t * 0.44, z, tone));
      }
    }
  }
  return merge(parts);
}

// ── Background ridges ────────────────────────────────────────────
function ridgeGeometry(lite: boolean) {
  const layers = [
    { z: -64, depth: 26, height: 3.2, color: COLORS.ridgeNear, freq: 0.045, seed: 1.3 },
    { z: -110, depth: 40, height: 7, color: COLORS.ridgeFar, freq: 0.028, seed: 4.1 },
  ];
  const parts: THREE.BufferGeometry[] = [];
  for (const L of layers) {
    const segX = lite ? 70 : 120;
    const g = new THREE.PlaneGeometry(340, L.depth, segX, 6);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i) + 40;
      const zLocal = pos.getZ(i);
      const across = 1 - Math.abs(zLocal / (L.depth / 2)); // 0 at edges, 1 in the middle
      const n =
        Math.sin(x * L.freq + L.seed) * 0.5 +
        Math.sin(x * L.freq * 2.3 + L.seed * 2.1) * 0.3 +
        Math.sin(x * L.freq * 5.1 + L.seed * 0.7) * 0.2;
      // The land falls away towards the sea.
      const coast = THREE.MathUtils.smoothstep(PORT.x0 - x, -4, 22);
      const h = (0.55 + 0.45 * n) * L.height * Math.pow(across, 0.7) * coast;
      pos.setXYZ(i, x, h - 0.4, zLocal + L.z);
    }
    g.computeVertexNormals();
    const colored2 = colored(g, L.color);
    parts.push(colored2);
  }
  const merged = mergeGeometries(parts, false)!;
  parts.forEach((p) => p.dispose());
  merged.computeVertexNormals();
  return merged;
}

// ── Assembly ─────────────────────────────────────────────────────
export type WorldMaterials = {
  /** Matte boxes with a hairline edge — the drawn look of an architectural model. */
  outlined: THREE.MeshStandardMaterial;
  matte: THREE.MeshStandardMaterial;
  glass: THREE.MeshStandardMaterial;
  metal: THREE.MeshStandardMaterial;
  light: THREE.MeshBasicMaterial;
  vertex: THREE.MeshStandardMaterial;
};

/**
 * Darkens a ~1px band along each face edge of a unit box (via its UVs and
 * screen-space derivatives), so every volume reads with a crisp drawn edge.
 */
function withEdges(mat: THREE.MeshStandardMaterial, strength = 0.3) {
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec2 vEdgeUv;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvEdgeUv = uv;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying vec2 vEdgeUv;")
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
        vec2 edgeD = min(vEdgeUv, 1.0 - vEdgeUv) / max(fwidth(vEdgeUv), vec2(1e-5));
        float edgeLine = 1.0 - smoothstep(0.4, 1.4, min(edgeD.x, edgeD.y));
        diffuseColor.rgb *= 1.0 - edgeLine * ${strength.toFixed(2)};`,
      );
  };
  mat.customProgramCacheKey = () => `aurex-edges-${strength}`;
  return mat;
}

export function createMaterials(): WorldMaterials {
  return {
    outlined: withEdges(new THREE.MeshStandardMaterial({ roughness: 0.8, metalness: 0, envMapIntensity: 1 })),
    matte: new THREE.MeshStandardMaterial({ roughness: 0.8, metalness: 0, envMapIntensity: 1 }),
    glass: new THREE.MeshStandardMaterial({ roughness: 0.1, metalness: 0.55, envMapIntensity: 1.6 }),
    metal: new THREE.MeshStandardMaterial({ roughness: 0.34, metalness: 0.85, envMapIntensity: 1.3 }),
    light: new THREE.MeshBasicMaterial({ toneMapped: false }),
    vertex: vertexMaterial(),
  };
}

/** Material for the vertex-coloured vehicle and ship models. */
export function vertexMaterial() {
  return new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.7, metalness: 0.05, envMapIntensity: 0.9 });
}

function instanced(geo: THREE.BufferGeometry, mat: THREE.Material, list: Instance[] | THREE.Matrix4[], name: string, shadows = true) {
  const mesh = new THREE.InstancedMesh(geo, mat, list.length);
  mesh.name = name;
  list.forEach((it, i) => {
    if (it instanceof THREE.Matrix4) mesh.setMatrixAt(i, it);
    else {
      mesh.setMatrixAt(i, it.m);
      mesh.setColorAt(i, it.c);
    }
  });
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  mesh.castShadow = shadows;
  mesh.receiveShadow = shadows;
  mesh.computeBoundingSphere();
  return mesh;
}

export type World = {
  group: THREE.Group;
  /** Emissive indicator lights (pulsed by the scene). */
  lights: THREE.MeshBasicMaterial;
  dispose: () => void;
};

/**
 * Builds the static panorama. `lite` trims repetitive detail for small screens.
 * Vehicles on the road, the conveyor, the departing ship and the route arcs are
 * animated separately by the scene.
 */
export function buildWorld(lite: boolean, mats: WorldMaterials, models: { truck: THREE.BufferGeometry; van: THREE.BufferGeometry; ship: THREE.BufferGeometry }): World {
  const b = new Builder(lite);
  solar(b);
  cleanTech(b);
  recycling(b);
  packaging(b);
  mobility(b);
  logistics(b);
  port(b);
  spine(b);
  landscape(b);

  const seg = lite ? 12 : 18;
  const geos = {
    box: new THREE.BoxGeometry(1, 1, 1),
    cyl: new THREE.CylinderGeometry(0.5, 0.5, 1, seg),
    cone: new THREE.ConeGeometry(0.5, 1, seg),
    wedge: prismGeometry([
      [-0.5, 0],
      [0.5, 0],
      [0.5, 1],
    ]),
    gable: prismGeometry([
      [-0.5, 0],
      [0.5, 0],
      [0, 1],
    ]),
  };

  const group = new THREE.Group();
  group.name = "green-world";
  const add = (m: THREE.Object3D) => group.add(m);

  add(instanced(geos.box, mats.outlined, b.items.box, "box"));
  add(instanced(geos.box, mats.glass, b.items.glass, "glass"));
  add(instanced(geos.box, mats.metal, b.items.metal, "metal"));
  add(instanced(geos.cyl, mats.matte, b.items.cyl, "cyl"));
  add(instanced(geos.cyl, mats.metal, b.items.cylMetal, "cylMetal"));
  add(instanced(geos.cone, mats.matte, b.items.cone, "cone"));
  add(instanced(geos.wedge, mats.matte, b.items.wedge, "wedge"));
  add(instanced(geos.gable, mats.matte, b.items.gable, "gable"));
  add(instanced(geos.box, mats.light, b.items.light, "lights", false));
  add(instanced(models.truck, mats.vertex, b.trucks, "trucks"));
  add(instanced(models.van, mats.vertex, b.vans, "vans"));
  add(instanced(models.ship, mats.vertex, b.ships, "ships"));

  // Ground (land ends at the quay) and sea.
  const groundMat = new THREE.MeshStandardMaterial({ color: COLORS.ground, roughness: 1, metalness: 0, envMapIntensity: 0.5 });
  // Hinterland west of the port, plus the port's own land up to the east quay.
  const groundW = PORT.x0 - (ROAD_START - 120);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(groundW, 260), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(PORT.x0 - groundW / 2, 0, -90);
  ground.receiveShadow = true;
  add(ground);
  const portLand = new THREE.Mesh(new THREE.PlaneGeometry(PORT.x1 - PORT.x0, 40 - PORT.quayZ), groundMat);
  portLand.rotation.x = -Math.PI / 2;
  portLand.position.set((PORT.x0 + PORT.x1) / 2, 0, (40 + PORT.quayZ) / 2);
  portLand.receiveShadow = true;
  add(portLand);

  const seaMat = new THREE.MeshStandardMaterial({ color: COLORS.sea, roughness: 0.3, metalness: 0.15, envMapIntensity: 0.55 });
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(700, 700), seaMat);
  sea.rotation.x = -Math.PI / 2;
  sea.position.set(PORT.x0 + 340, WATER_Y, -250);
  add(sea);

  const ridgeMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, metalness: 0, flatShading: true, envMapIntensity: 0.4 });
  const ridges = new THREE.Mesh(ridgeGeometry(lite), ridgeMat);
  add(ridges);

  return {
    group,
    lights: mats.light,
    dispose: () => {
      Object.values(geos).forEach((g) => g.dispose());
      group.traverse((o) => {
        if (o instanceof THREE.InstancedMesh) o.dispose();
      });
      ground.geometry.dispose();
      portLand.geometry.dispose();
      sea.geometry.dispose();
      ridges.geometry.dispose();
      groundMat.dispose();
      seaMat.dispose();
      ridgeMat.dispose();
    },
  };
}
