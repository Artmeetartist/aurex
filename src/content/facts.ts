/**
 * Locale-independent facts about AUREX.
 *
 * RULE: only confirmed information belongs here. Anything not yet supplied by
 * AUREX stays `null` or an empty list, and the UI renders a neutral state
 * instead of placeholder data. See docs/SOURCE_OF_TRUTH.md.
 */

import type { DivisionId, MarketId, PartnerModelId, SectorId } from "./types";

export const company = {
  brand: "AUREX",
  /** Registered legal name — to be supplied. */
  legalName: null as string | null,
  /** Registered office address — to be supplied. */
  registeredOffice: null as string | null,
  /** Company registration / VAT number — to be supplied. */
  registration: null as string | null,
  /** Website hosting provider (name and address), for the legal notice — to be supplied. */
  hostingProvider: null as string | null,
  /** Public inquiries mailbox. Set NEXT_PUBLIC_CONTACT_EMAIL once the domain mailbox exists. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
};

/** Core business areas that define the group model. */
export const divisions: { id: DivisionId; mode: "sea" | "air" | "land" | "connected"; image: string }[] = [
  { id: "trade", mode: "sea", image: "/media/stills/still-sea" },
  { id: "logistics", mode: "air", image: "/media/stills/still-coast" },
  { id: "distribution", mode: "land", image: "/media/stills/still-land" },
  { id: "holdings", mode: "connected", image: "/media/stills/still-connected" },
];

/**
 * Sectors of strategic interest. None is confirmed as an operating business,
 * so all carry status "strategic" and are presented as focus areas.
 */
export const sectors: { id: SectorId; status: "strategic" }[] = [
  { id: "food", status: "strategic" },
  { id: "property", status: "strategic" },
  { id: "medical", status: "strategic" },
  { id: "electronics", status: "strategic" },
  { id: "sustainability", status: "strategic" },
  { id: "larp", status: "strategic" },
];

/**
 * Markets of focus. These mark commercial focus, not offices or subsidiaries.
 * Coordinates are regional reference points for the globe only.
 */
export const markets: { id: MarketId; lat: number; lng: number }[] = [
  { id: "eu", lat: 48.6, lng: 8.8 },
  { id: "pl", lat: 52.1, lng: 19.4 },
  { id: "ae", lat: 24.0, lng: 54.3 },
  { id: "in", lat: 21.4, lng: 78.6 },
  { id: "af", lat: 4.5, lng: 20.5 },
];

/** Illustrative trade corridors between markets of focus. */
export const corridors: [MarketId, MarketId][] = [
  ["eu", "ae"],
  ["eu", "in"],
  ["eu", "af"],
  ["ae", "in"],
  ["ae", "af"],
  ["pl", "ae"],
];

export const partnerModels: PartnerModelId[] = ["suppliers", "distributors", "corporate", "capital"];

export type Leader = {
  name: string;
  role: string;
  bio?: string;
  portrait?: string;
};

/** Leadership profiles — publish only once confirmed by AUREX. */
export const leaders: Leader[] = [];

export type Holding = {
  name: string;
  sector: SectorId;
  summary: string;
  since?: string;
  url?: string;
};

/** Portfolio holdings — publish only once formalised and approved for disclosure. */
export const holdings: Holding[] = [];

export type Office = { label: string; city: string; country: string; address?: string };

/** Offices / representations — none confirmed. */
export const offices: Office[] = [];
