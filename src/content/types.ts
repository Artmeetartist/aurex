/**
 * AUREX content model.
 *
 * Every locale file must satisfy `SiteContent`, so a missing translation is a
 * type error rather than a runtime gap. The shape mirrors the collections and
 * globals a headless CMS would expose (see docs/CMS.md), so the local
 * repository in ./repository.ts can be swapped for a CMS adapter without
 * touching components.
 */

import type { InquiryType, RouteKey } from "@/lib/routes";

export type DivisionId = "trade" | "logistics" | "distribution" | "holdings";
export type SectorId = "food" | "property" | "medical" | "electronics" | "sustainability" | "larp";
export type MarketId = "eu" | "pl" | "ae" | "in" | "af";
export type PartnerModelId = "suppliers" | "distributors" | "corporate" | "capital";
export type TradeId = "food" | "medical" | "electronics" | "larp";
export type GreenPillarId = "materials" | "energy" | "commerce" | "logistics";

export type PageMeta = { title: string; description: string };

export type Heading = {
  eyebrow: string;
  title: string;
  /** Words in `title` rendered in the gold serif accent. */
  accent?: string[];
  intro?: string;
};

export type TitledText = { title: string; text: string };

export type PageHero = {
  eyebrow: string;
  title: string;
  accent?: string[];
  intro: string;
};

export type SiteContent = {
  meta: {
    siteName: string;
    /** Master brand line. */
    tagline: string;
    /** Supporting line. */
    signature: string;
    description: string;
    pages: Record<RouteKey, PageMeta>;
  };

  nav: {
    labels: Record<RouteKey, string>;
    cta: string;
    menu: string;
    close: string;
    language: string;
    skipToContent: string;
    primaryLabel: string;
  };

  common: {
    readMore: string;
    breadcrumbHome: string;
    status: { core: string; strategic: string };
    marketsFootnote: string;
    comingSoon: string;
    scroll: string;
    backToTop: string;
    viewAll: string;
  };

  home: {
    hero: {
      eyebrow: string;
      title: string;
      accent: string[];
      intro: string;
      primaryCta: string;
      secondaryCta: string;
      panelTitle: string;
      panelIntro: string;
      modes: { sea: string; air: string; land: string; connected: string };
      scroll: string;
      pause: string;
      play: string;
    };
    who: {
      eyebrow: string;
      statement: string;
      pillars: TitledText[];
      link: string;
    };
    motion: {
      eyebrow: string;
      title: string;
      accent: string[];
      chapters: { mode: string; division: DivisionId; title: string; text: string }[];
      link: string;
    };
    trade: Heading & { link: string; greenLabel: string };
    green: {
      eyebrow: string;
      title: string;
      subtitle: string;
      body: string[];
      primaryCta: string;
      secondaryCta: string;
      /** Seven stages of the sustainable-commerce ecosystem, in scroll order. */
      stages: string[];
      pillarsEyebrow: string;
      explore: string;
      flowLabel: string;
      /** Source → Trade → Distribute → Invest */
      flow: string[];
      statement: string;
      statementText: string;
      statementCta: string;
      note: string;
    };
    reach: Heading & { footnote: string; link: string; legend: { focus: string; corridor: string } };
    capital: Heading & { principles: TitledText[]; note: string; cta: string };
    why: Heading & { pillars: TitledText[] };
    partnerships: Heading & { cta: string };
    leadership: Heading & { principles: string[]; link: string };
    contact: Heading & { direct: string };
  };

  divisions: Record<DivisionId, { name: string; short: string; summary: string; scope: string[] }>;
  sectors: Record<SectorId, { name: string; summary: string; focus: string[] }>;
  markets: Record<MarketId, { name: string; role: string; detail: string }>;
  partnerModels: Record<PartnerModelId, { name: string; summary: string; examples: string[] }>;

  trades: Record<
    TradeId,
    {
      name: string;
      title: string;
      accent: string[];
      intro: string;
      overview: string;
      /** Six focus categories, each with example items. */
      categories: (TitledText & { items: string[] })[];
      /** Trade-specific journey from origin to market (four steps). */
      flow: TitledText[];
      approach: TitledText[];
      /** Reference frameworks considered — not certifications held. */
      standards: { title: string; ref: string; text: string }[];
      /** Counterpart profiles AUREX seeks to work with. */
      counterparts: TitledText[];
      /** Optional product showcase (LARP & Historical Goods). */
      showcase?: {
        eyebrow: string;
        title: string;
        accent: string[];
        text: string;
        setCaption: string;
        details: { key: "weave" | "buckles" | "collar" | "coif" | "mantle"; title: string; text: string }[];
      };
      cta: { title: string; accent: string[]; primary: string };
    }
  >;

  tradePage: {
    eyebrow: string;
    overview: string;
    categoriesEyebrow: string;
    categoriesTitle: string;
    examplesLabel: string;
    flowEyebrow: string;
    flowTitle: string;
    approachEyebrow: string;
    approachTitle: string;
    standardsEyebrow: string;
    standardsTitle: string;
    standardsNote: string;
    counterpartsEyebrow: string;
    counterpartsTitle: string;
    counterpartsCta: string;
    corridorsEyebrow: string;
    otherEyebrow: string;
    allTrade: string;
  };

  greenPillars: Record<GreenPillarId, { name: string; summary: string; detail: string; focus: string[] }>;

  sustainability: {
    hero: PageHero;
    intro: Heading;
    ecosystem: Heading;
    pillars: Heading;
    flow: Heading & { steps: TitledText[] };
    principles: Heading & { items: TitledText[] };
    note: string;
  };

  about: {
    hero: PageHero;
    statement: string;
    story: Heading & { paragraphs: string[] };
    principles: Heading & { items: TitledText[] };
    structure: Heading & { groupLabel: string; groupText: string };
    governance: Heading & { items: TitledText[] };
    cta: Heading & { primary: string; secondary: string };
  };

  tradeHub: {
    hero: PageHero;
    core: Heading;
    scopeLabel: string;
    lines: Heading & { note: string };
    connection: Heading & { steps: TitledText[] };
    green: Heading & { text: string; link: string };
    cta: Heading & { primary: string };
  };

  portfolio: {
    hero: PageHero;
    approach: Heading & { items: TitledText[] };
    criteria: Heading & { items: string[] };
    sectors: Heading;
    holdings: Heading & { empty: string };
    cta: Heading & { primary: string };
  };

  presence: {
    hero: PageHero;
    map: Heading & { footnote: string };
    corridors: Heading & { items: TitledText[] };
    offices: Heading & { empty: string };
    cta: Heading & { primary: string };
  };

  /** Leadership is presented as a section of the About page. */
  leadership: {
    approach: Heading & { items: TitledText[] };
    profiles: Heading & { empty: string };
    cta: Heading & { primary: string };
  };

  partnerships: {
    hero: PageHero;
    models: Heading;
    offer: Heading & { items: TitledText[] };
    seek: Heading & { items: string[] };
    process: Heading & { steps: TitledText[] };
    cta: Heading & { primary: string };
  };

  contact: {
    hero: PageHero;
    routes: Heading;
    direct: { title: string; emailLabel: string; emailPending: string; responseNote: string };
  };

  privacy: {
    hero: PageHero;
    updated: string;
    sections: { title: string; paragraphs: string[] }[];
  };

  inquiry: {
    title: string;
    types: Record<InquiryType, { label: string; description: string }>;
    fields: {
      type: string;
      name: string;
      organisation: string;
      role: string;
      email: string;
      country: string;
      message: string;
      messagePlaceholder: string;
      consent: string;
      privacyLink: string;
      optional: string;
    };
    submit: string;
    submitting: string;
    success: { title: string; text: string; again: string };
    error: string;
    unavailable: string;
    validation: {
      required: string;
      email: string;
      tooShort: string;
      consent: string;
    };
  };

  notFound: {
    eyebrow: string;
    title: string;
    text: string;
    cta: string;
  };

  footer: {
    statement: string;
    groups: { group: string; businesses: string; contact: string };
    rights: string;
    languages: string;
    legal: string;
  };
};
