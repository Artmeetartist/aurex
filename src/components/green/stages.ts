import type { GreenPillarId } from "@/content/types";

/**
 * Shared AUREX Green constants. Kept free of three.js so the page chrome can
 * import them without pulling the WebGL scene into the main bundle.
 */

/** Solar → Clean tech → Recycled → Packaging → E-mobility → Logistics → Distribution. */
export const STAGE_COUNT = 7;

/** Pillar each ecosystem stage belongs to (used as a small caption). */
export const STAGE_PILLAR: GreenPillarId[] = ["energy", "energy", "materials", "commerce", "energy", "logistics", "logistics"];

export const PILLAR_ORDER: GreenPillarId[] = ["materials", "energy", "commerce", "logistics"];

/**
 * Scene progress (0–1) → continuous stage position (0–6).
 * Each step eases so the camera lingers on a stage and then glides to the next,
 * while still drifting slightly so the panorama never feels frozen.
 */
export function stagePosition(progress: number) {
  const s = Math.min(Math.max(progress, 0), 1) * (STAGE_COUNT - 1);
  const i = Math.min(Math.floor(s), STAGE_COUNT - 2);
  const t = s - i;
  const eased = t * t * t * (t * (t * 6 - 15) + 10); // smootherstep
  return i + 0.3 * t + 0.7 * eased;
}

/** Nearest stage index for a scene progress value. */
export function stageAt(progress: number) {
  return Math.min(STAGE_COUNT - 1, Math.max(0, Math.round(stagePosition(progress))));
}

/** Scene progress at which a stage is centred (inverse of `stagePosition` at integers). */
export function progressForStage(stage: number) {
  return Math.min(Math.max(stage, 0), STAGE_COUNT - 1) / (STAGE_COUNT - 1);
}

/**
 * Where the scene's travel sits on the pinned section's own 0–1 scroll track.
 * Before `start` the camera holds on stage 1 (headline); after `end` it holds on
 * the port while the closing copy is shown.
 */
export const TRAVEL = { start: 0.07, end: 0.84 } as const;
