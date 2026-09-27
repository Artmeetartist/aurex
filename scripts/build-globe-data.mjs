// Precomputes the dotted-globe dataset used by the Global Reach scene.
// Samples a Fibonacci sphere, keeps land points, and tags points that fall
// inside AUREX markets of focus. Output: public/data/globe.json
//
// Run: node scripts/build-globe-data.mjs

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { geoContains } from "d3-geo";
import { feature } from "topojson-client";

const require = createRequire(import.meta.url);
const topology = JSON.parse(
  await readFile(require.resolve("world-atlas/countries-110m.json"), "utf8"),
);
const countries = feature(topology, topology.objects.countries).features;
const land = feature(topology, topology.objects.land);

// ISO 3166-1 numeric codes.
const EU = [
  "040", "056", "100", "191", "196", "203", "208", "233", "246", "250", "276",
  "300", "348", "372", "380", "428", "440", "442", "470", "528", "620", "642",
  "703", "705", "724", "752",
];
const POLAND = ["616"];
const UAE = ["784"];
const MIDDLE_EAST = ["682", "512", "634", "048", "414", "400", "368", "376", "422", "760", "887", "364"];
const INDIA = ["356"];
const AFRICA = [
  "012", "024", "204", "072", "854", "108", "132", "120", "140", "148", "174",
  "178", "180", "384", "262", "818", "226", "232", "748", "231", "266", "270",
  "288", "324", "624", "404", "426", "430", "434", "450", "454", "466", "478",
  "480", "504", "508", "516", "562", "566", "646", "678", "686", "690", "694",
  "706", "710", "728", "729", "834", "768", "788", "800", "894", "716", "732",
];

// Region index written per point: 0 = other land.
const REGIONS = [
  { key: "eu", ids: EU },
  { key: "pl", ids: POLAND },
  { key: "ae", ids: UAE },
  { key: "me", ids: MIDDLE_EAST },
  { key: "in", ids: INDIA },
  { key: "af", ids: AFRICA },
];

const byRegion = REGIONS.map((r) => ({
  ...r,
  features: countries.filter((c) => r.ids.includes(String(c.id).padStart(3, "0"))),
}));

const SAMPLES = Number(process.env.GLOBE_SAMPLES ?? 42000);
const golden = Math.PI * (3 - Math.sqrt(5));
const points = [];

for (let i = 0; i < SAMPLES; i++) {
  const y = 1 - (i / (SAMPLES - 1)) * 2;
  const theta = golden * i;
  const lat = (Math.asin(y) * 180) / Math.PI;
  const lng = ((((theta * 180) / Math.PI) % 360) + 540) % 360 - 180;
  const p = [lng, lat];
  if (!geoContains(land, p)) continue;

  let region = 0;
  for (let r = 0; r < byRegion.length; r++) {
    if (byRegion[r].features.some((f) => geoContains(f, p))) {
      region = r + 1;
      break;
    }
  }
  points.push(Math.round(lat * 100) / 100, Math.round(lng * 100) / 100, region);
}

await mkdir(new URL("../public/data/", import.meta.url), { recursive: true });
await writeFile(
  new URL("../public/data/globe.json", import.meta.url),
  JSON.stringify({ v: 1, regions: ["land", ...REGIONS.map((r) => r.key)], stride: 3, points }),
);

const counts = {};
for (let i = 2; i < points.length; i += 3) counts[points[i]] = (counts[points[i]] ?? 0) + 1;
console.log(`globe.json: ${points.length / 3} land points`, counts);
