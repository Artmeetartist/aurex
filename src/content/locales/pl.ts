import type { SiteContent } from "../types";

const pl: SiteContent = {
  meta: {
    siteName: "AUREX",
    tagline: "Wartość w ruchu",
    signature: "Europejskie standardy. Globalny zasięg.",
    description:
      "AUREX to międzynarodowa grupa handlowa, holdingowa i inwestycyjna o europejskich korzeniach, stworzona, by długofalowo łączyć rynki, partnerów i kapitał ponad granicami.",
    pages: {
      home: {
        title: "Wartość w ruchu",
        description:
          "Międzynarodowa grupa handlowa, holdingowa i inwestycyjna o europejskich korzeniach, zbudowana z myślą o długofalowym łączeniu rynków, partnerów i kapitału ponad granicami.",
      },
      about: {
        title: "O grupie AUREX",
        description:
          "Grupa o europejskich korzeniach i globalnym horyzoncie: handel międzynarodowy, działalność holdingowa i inwestycje w ramach jednej długoterminowej filozofii.",
      },
      trade: {
        title: "Handel",
        description:
          "Handel międzynarodowy zorganizowany według europejskich standardów: żywność, produkty medyczne, komponenty elektroniczne oraz LARP i artykuły historyczne, od pozyskania towarów po dystrybucję.",
      },
      sustainability: {
        title: "AUREX Green",
        description:
          "Zielona transformacja: strategiczny kierunek AUREX obejmujący zrównoważone materiały, czyste technologie, produkty oszczędzające zasoby i łańcuchy dostaw o mniejszym wpływie na środowisko.",
      },
      portfolio: {
        title: "Portfel i inwestycje",
        description:
          "Założenia inwestycyjne AUREX: cierpliwy kapitał, spójność strategiczna i priorytet ładu korporacyjnego w sześciu sektorach strategicznego zainteresowania.",
      },
      presence: {
        title: "Globalna obecność",
        description:
          "Europa w centrum i strategiczne korytarze do regionu Zatoki Perskiej, Indii i Afryki. AUREX opiera się na korytarzach, a nie na pojedynczych rynkach.",
      },
      partnerships: {
        title: "Partnerstwa",
        description:
          "Modele partnerstwa dla producentów, dystrybutorów, przedsiębiorstw, instytucji i współinwestorów, których standardy i horyzont odpowiadają standardom AUREX.",
      },
      contact: {
        title: "Kontakt",
        description: "Zapytania partnerskie, inwestycyjne, korporacyjne i ogólne kierowane do grupy AUREX.",
      },
      privacy: {
        title: "Polityka prywatności",
        description: "Jak postępujemy z informacjami przekazanymi za pośrednictwem strony internetowej AUREX.",
      },
    },
  },

  nav: {
    labels: {
      home: "Strona główna",
      about: "O grupie",
      trade: "Handel",
      sustainability: "Zrównoważony rozwój",
      portfolio: "Portfel",
      presence: "Globalna obecność",
      partnerships: "Partnerstwa",
      contact: "Kontakt",
      privacy: "Prywatność",
    },
    cta: "Rozpocznijmy rozmowę",
    menu: "Menu",
    close: "Zamknij menu",
    language: "Język",
    skipToContent: "Przejdź do treści",
    primaryLabel: "Główna",
  },

  common: {
    readMore: "Więcej",
    breadcrumbHome: "Strona główna",
    status: { core: "Kluczowy obszar działalności", strategic: "Kierunek strategiczny" },
    marketsFootnote: "Rynki priorytetowe wskazują strategiczne ukierunkowanie. Nie oznaczają biur ani spółek zależnych.",
    comingSoon: "Zostanie opublikowane",
    scroll: "Przewiń",
    backToTop: "Powrót na górę",
    viewAll: "Wszystkie",
  },

  home: {
    hero: {
      eyebrow: "Handel międzynarodowy · Holding · Inwestycje",
      title: "Wartość w ruchu.",
      accent: ["ruchu."],
      intro:
        "AUREX to grupa o europejskich korzeniach, stworzona, by łączyć rynki, partnerów i kapitał ponad granicami – według standardów instytucjonalnych i z myślą o długiej perspektywie.",
      primaryCta: "Więcej o grupie",
      secondaryCta: "Współpraca z AUREX",
      panelTitle: "Zapytania bezpośrednie",
      panelIntro:
        "Każda rozmowa z AUREX zaczyna się od jasno określonego celu. Prosimy wybrać ścieżkę, która mu odpowiada.",
      modes: { sea: "Morze", air: "Powietrze", land: "Ląd", connected: "Połączenie" },
      scroll: "Przewiń",
      pause: "Wstrzymaj wideo w tle",
      play: "Odtwórz wideo w tle",
    },
    who: {
      eyebrow: "Kim jesteśmy",
      statement:
        "AUREX to międzynarodowa grupa handlowa, holdingowa i inwestycyjna. Z europejskim rodowodem i standardami oraz globalną perspektywą grupa została zbudowana, by łączyć producentów, rynki i kapitał, a wartość mierzyć w dekadach, nie w transakcjach.",
      pillars: [
        {
          title: "Handel",
          text: "Handel transgraniczny oraz import i eksport, prowadzone z dyscypliną europejskich standardów.",
        },
        {
          title: "Holding",
          text: "Struktura holdingowa stworzona z myślą o własności, odpowiedzialnym nadzorze i długoterminowej zbieżności interesów z partnerami.",
        },
        {
          title: "Inwestycje",
          text: "Cierpliwy kapitał przeznaczony dla sektorów, w których spotykają się handel, infrastruktura i wzrost.",
        },
      ],
      link: "O grupie",
    },
    motion: {
      eyebrow: "Czym się zajmujemy",
      title: "Przenosimy wartość morzem, powietrzem i lądem.",
      accent: ["wartość"],
      chapters: [
        {
          mode: "Morze",
          division: "trade",
          title: "Handel międzynarodowy i EXIM",
          text: "Pozyskiwanie towarów, import i eksport ponad granicami, zaprojektowane tak, by były ustrukturyzowane, udokumentowane i realizowane według europejskich standardów.",
        },
        {
          mode: "Powietrze",
          division: "logistics",
          title: "Logistyka",
          text: "Transport koordynowany drogą morską, lotniczą i lądową, planowany z myślą o niezawodności, zgodności z przepisami i realiach każdego korytarza.",
        },
        {
          mode: "Ląd",
          division: "distribution",
          title: "Dystrybucja",
          text: "Kanały dotarcia do rynku, zaprojektowane tak, by łączyć podaż z popytem na rynkach priorytetowych.",
        },
        {
          mode: "Połączenie",
          division: "holdings",
          title: "Holding, inwestycje i kapitał",
          text: "Długoterminowa własność i cierpliwy kapitał, pomyślane tak, by spajać całą platformę i pomnażać wartość w kolejnych cyklach i ponad granicami.",
        },
      ],
      link: "Więcej o naszej działalności",
    },
    trade: {
      eyebrow: "Handel",
      title: "Obszary handlowe o strategicznym znaczeniu.",
      accent: ["strategicznym"],
      intro:
        "Wyspecjalizowane obszary handlowe. Do każdego z nich podchodzimy z rozwagą, wspólnie ze sprawdzonymi partnerami i po indywidualnej ocenie.",
      link: "Więcej o handlu",
      greenLabel: "Zrównoważone produkty i technologie",
    },
    green: {
      eyebrow: "AUREX Green",
      title: "Zielona transformacja",
      subtitle: "Handel produktami i technologiami, które kształtują świat oszczędniej gospodarujący zasobami.",
      body: [
        "AUREX rozszerza swoją działalność handlową i inwestycyjną o zrównoważone materiały, czyste technologie, produkty oszczędzające zasoby oraz łańcuchy dostaw o mniejszym wpływie na środowisko.",
        "Od materiałów z recyklingu i zrównoważonych opakowań po infrastrukturę czystej energii i zieloną logistykę – łączymy pojawiające się możliwości z rynkami międzynarodowymi.",
      ],
      primaryCta: "Więcej o AUREX Green",
      secondaryCta: "Współpraca z nami",
      stages: [
        "Energia słoneczna",
        "Czyste technologie",
        "Materiały z recyklingu",
        "Zrównoważone opakowania",
        "Elektromobilność",
        "Zielona logistyka",
        "Globalna dystrybucja",
      ],
      pillarsEyebrow: "Filary działalności",
      explore: "Więcej",
      flowLabel: "Model AUREX",
      flow: ["Pozyskanie", "Handel", "Dystrybucja", "Inwestycje"],
      statement: "Budujemy handel na miarę zmieniającego się świata.",
      statementText:
        "AUREX Green to wyraz naszej koncentracji na zrównoważonych produktach, technologiach i możliwościach, które mogą przepływać przez rynki globalne.",
      statementCta: "Porozmawiajmy o partnerstwie",
      note: "AUREX Green to strategiczny obszar rozwoju działalności handlowej i inwestycyjnej.",
    },
    reach: {
      eyebrow: "Globalny zasięg",
      title: "Europa w centrum. Korytarze do Zatoki Perskiej, Indii i Afryki.",
      accent: ["centrum."],
      intro:
        "Grupa AUREX opiera się na europejskich standardach i jest zorientowana na korytarze łączące Europę z Bliskim Wschodem, Indiami i Afryką.",
      footnote: "Rynki priorytetowe wskazują strategiczne ukierunkowanie. Nie oznaczają biur ani spółek zależnych.",
      link: "Więcej o globalnej obecności",
      legend: { focus: "Rynek priorytetowy", corridor: "Korytarz poglądowy" },
    },
    capital: {
      eyebrow: "Inwestycje i udziały",
      title: "Cierpliwy kapitał o jasno określonym celu.",
      accent: ["celu."],
      intro:
        "Założeniem AUREX jest inwestowanie z cierpliwością i przekonaniem, bez presji terminów typowej dla funduszy. Kapitał ma trafiać tam, gdzie wzmacnia platformę, i pozostawać zaangażowany tak długo, jak tworzy wartość.",
      principles: [
        {
          title: "Długi horyzont",
          text: "Dążymy do tego, by budować, a nie jedynie alokować kapitał, i by mierzyć wyniki w perspektywie cykli, a nie kwartałów.",
        },
        {
          title: "Spójność strategiczna",
          text: "Pierwszeństwo dla inwestycji, które wzmacniają handel, dystrybucję i dostęp do rynków w całej grupie.",
        },
        {
          title: "Najpierw ład korporacyjny",
          text: "Przejrzyste struktury, udokumentowane decyzje i odpowiedzialny nadzór od samego początku.",
        },
      ],
      note: "Udziały są ujawniane publicznie po ich formalnym sfinalizowaniu.",
      cta: "Zapytania inwestycyjne",
    },
    why: {
      eyebrow: "Dlaczego AUREX",
      title: "Na dekady, nie na transakcje.",
      accent: ["dekady,"],
      intro: "Odporność ponad szybkość. Reputacja ponad wolumen. Długoterminowa wartość ponad krótkoterminowy zysk.",
      pillars: [
        {
          title: "Europejskie standardy",
          text: "Europejskie normy zgodności regulacyjnej, dokumentacji i postępowania, które z założenia mają obowiązywać wszędzie tam, gdzie angażuje się AUREX.",
        },
        {
          title: "Ład korporacyjny i przejrzystość",
          text: "Jasna struktura własności, jasne mandaty i jasna sprawozdawczość wobec partnerów. Zaufanie jest wbudowane w strukturę, zanim zostanie potwierdzone wynikami.",
        },
        {
          title: "Perspektywa transgraniczna",
          text: "Grupa zbudowana wokół korytarzy, a nie pojedynczych rynków, łącząca Europę z regionem Zatoki Perskiej, Indiami i Afryką.",
        },
        {
          title: "Długoterminowa wartość",
          text: "Odporność ponad szybkość, reputacja ponad wolumen. Dążymy do pomnażania wartości w kolejnych cyklach i ponad granicami.",
        },
      ],
    },
    partnerships: {
      eyebrow: "Partnerstwa strategiczne",
      title: "Wzrost budowany w partnerstwie.",
      accent: ["partnerstwie."],
      intro:
        "AUREX współpracuje z producentami, dystrybutorami, przedsiębiorstwami, instytucjami i współinwestorami, których standardy i horyzont odpowiadają naszym.",
      cta: "Więcej o partnerstwach",
    },
    leadership: {
      eyebrow: "Przywództwo i ład korporacyjny",
      title: "Odpowiedzialny nadzór, wpisany w strukturę.",
      accent: ["nadzór,"],
      intro:
        "Grupa AUREX jest kierowana z długoterminowym mandatem: jasny podział odpowiedzialności, udokumentowane decyzje i kultura ładu korporacyjnego budowana przed osiągnięciem skali, a nie po nim.",
      principles: [
        "Jasne mandaty i odpowiedzialność",
        "Udokumentowane, weryfikowalne decyzje",
        "Zbieżność z długoterminowymi interesami partnerów",
        "Zgodność z przepisami wbudowana od początku",
      ],
      link: "Przywództwo i ład korporacyjny",
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Rozpocznijmy rozmowę.",
      accent: ["rozmowę."],
      intro:
        "Niezależnie od tego, czy reprezentują Państwo instytucję, przedsiębiorstwo, producenta czy inwestora, prosimy o przedstawienie celu kontaktu. Odpowiemy, wskazując właściwy kolejny krok.",
      direct: "Wolą Państwo e-mail?",
    },
  },

  divisions: {
    trade: {
      name: "Handel międzynarodowy i EXIM",
      short: "Handel i EXIM",
      summary:
        "Transgraniczne pozyskiwanie towarów, import i eksport, prowadzone według europejskich standardów dokumentacji, zgodności z przepisami i weryfikacji kontrahentów.",
      scope: [
        "Pozyskiwanie dostawców i zakupy",
        "Import i eksport (EXIM)",
        "Weryfikacja kontrahentów i zgodności",
        "Strukturyzowanie transakcji handlowych",
      ],
    },
    logistics: {
      name: "Logistyka",
      short: "Logistyka",
      summary:
        "Koordynacja transportu morskiego, lotniczego i lądowego z partnerami logistycznymi wybieranymi pod kątem niezawodności na każdym korytarzu.",
      scope: ["Koordynacja multimodalna", "Planowanie korytarzy", "Odprawy celne i dokumentacja", "Zarządzanie siecią partnerów"],
    },
    distribution: {
      name: "Dystrybucja",
      short: "Dystrybucja",
      summary:
        "Kanały dotarcia do rynku rozwijane wspólnie z partnerami dystrybucyjnymi, łączące podaż z popytem na rynkach priorytetowych.",
      scope: ["Partnerstwa dystrybucyjne", "Wejście na rynek", "Rozwój kanałów sprzedaży"],
    },
    holdings: {
      name: "Holding, inwestycje i kapitał",
      short: "Holding i kapitał",
      summary:
        "Warstwa właścicielska grupy: długoterminowe udziały i cierpliwy kapitał, które spajają handel, logistykę i dystrybucję w jedną platformę.",
      scope: ["Długoterminowe udziały", "Inwestycje strategiczne", "Współinwestycje", "Ład korporacyjny i nadzór właścicielski"],
    },
  },

  sectors: {
    food: {
      name: "Żywność",
      summary: "Pozyskiwanie, handel i dystrybucja produktów spożywczych między rynkami produkcji a rynkami konsumpcji.",
      focus: ["Transgraniczne pozyskiwanie dostaw", "Import i eksport", "Partnerstwa dystrybucyjne"],
    },
    property: {
      name: "Nieruchomości",
      summary: "Długoterminowe możliwości w obszarze aktywów realnych, gdzie kapitał i lokalne partnerstwo mogą tworzyć trwałą wartość.",
      focus: ["Aktywa realne", "Współinwestycje", "Długoterminowa własność"],
    },
    medical: {
      name: "Medycyna",
      summary: "Produkty i sprzęt medyczny, w przypadku których jakość, zgodność z przepisami i identyfikowalność nie podlegają negocjacjom.",
      focus: ["Materiały medyczne", "Sprzęt", "Weryfikacja regulacyjna"],
    },
    electronics: {
      name: "Komponenty elektroniczne",
      summary: "Handel komponentami i częściami elektronicznymi, łączący sprawdzonych dostawców z zapotrzebowaniem przemysłu.",
      focus: ["Komponenty", "Części i sprzęt", "Kwalifikacja dostawców"],
    },
    sustainability: {
      name: "Zrównoważony rozwój i zielona transformacja",
      summary:
        "Możliwości związane z transformacją energetyczną i surowcową, traktowane z taką samą dyscypliną jak każde aktywo długoterminowe.",
      focus: ["Zielona transformacja", "Efektywne gospodarowanie zasobami", "Aktywa długoterminowe"],
    },
    larp: {
      name: "LARP i artykuły historyczne",
      summary:
        "Kostiumy, zbroje, rekwizyty i repliki historyczne dla rynków LARP, rekonstrukcji historycznych i teatru.",
      focus: ["Kostiumy i zbroje", "Rekwizyty i akcesoria", "Repliki historyczne"],
    },
  },

  markets: {
    eu: {
      name: "Unia Europejska",
      role: "Rdzeń",
      detail: "Punkt odniesienia grupy w zakresie standardów, ładu korporacyjnego i postępowania.",
    },
    pl: {
      name: "Polska",
      role: "Rynek priorytetowy",
      detail: "Rynek szczególnie istotny w ramach Unii Europejskiej, na skrzyżowaniu szlaków handlowych Europy Środkowej.",
    },
    ae: {
      name: "ZEA i Bliski Wschód",
      role: "Brama",
      detail: "Naturalny węzeł między Europą, Azją i Afryką dla handlu, kapitału i logistyki.",
    },
    in: {
      name: "Indie",
      role: "Korytarz wzrostu",
      detail: "Duża i szybko rozwijająca się gospodarka oraz strategiczny korytarz zaopatrzenia i handlu.",
    },
    af: {
      name: "Afryka",
      role: "Horyzont długoterminowy",
      detail:
        "Kontynent długoterminowych możliwości w handlu, sektorze spożywczym i infrastrukturze, do którego podchodzimy cierpliwie i wspólnie z partnerami.",
    },
  },

  partnerModels: {
    suppliers: {
      name: "Producenci i dostawcy",
      summary: "Sprawdzeni producenci poszukujący niezawodnego, dobrze zorganizowanego dostępu do nowych rynków.",
      examples: ["Umowy dostaw", "Rozwój eksportu", "Harmonizacja standardów jakości i zgodności"],
    },
    distributors: {
      name: "Dystrybutorzy",
      summary: "Uznani dystrybutorzy poszukujący pewnych źródeł dostaw i długoterminowej współpracy.",
      examples: ["Umowy dystrybucyjne", "Wejście na rynek", "Rozwój kategorii"],
    },
    corporate: {
      name: "Przedsiębiorstwa i instytucje",
      summary:
        "Przedsiębiorstwa i instytucje, które potrzebują partnera o jasnej strukturze w handlu transgranicznym i zakupach.",
      examples: ["Programy zakupowe", "Transgraniczne pozyskiwanie dostaw", "Współpraca strategiczna"],
    },
    capital: {
      name: "Współinwestorzy i partnerzy kapitałowi",
      summary: "Inwestorzy podzielający cierpliwe, oparte na ładzie korporacyjnym podejście do budowania długoterminowej wartości.",
      examples: ["Współinwestycje", "Wspólne przedsięwzięcia", "Długoterminowe udziały"],
    },
  },

  trades: {
    food: {
      name: "Food",
      title: "Food, traded with traceability.",
      accent: ["traceability."],
      intro:
        "AUREX is built to connect producing regions with consuming markets, with the documentation, quality control and continuity that institutional buyers require.",
      overview:
        "Food trade rewards reliability above all: consistent quality, verifiable origin and dependable logistics. AUREX approaches food as a long-term trade line, working towards partnerships with qualified producers and established distributors in markets of focus.",
      categories: [
        { title: "Staple foods", text: "Grains, pulses, rice, sugar and edible oils, where specification and continuity matter most." },
        { title: "Packaged & specialty foods", text: "Finished products for retail, wholesale and hospitality channels." },
        { title: "Temperature-controlled goods", text: "Products whose quality depends on an unbroken cold chain from origin to destination." },
      ],
      approach: [
        { title: "Origin & quality", text: "Producers qualified against documented quality, safety and origin standards." },
        { title: "Compliance", text: "Food safety, labelling and import requirements addressed before goods move." },
        { title: "Continuity", text: "Supply planned for consistency rather than one-off transactions." },
      ],
      cta: { title: "Discuss food trade.", accent: ["food"], primary: "Submit a partnership inquiry" },
    },
    medical: {
      name: "Medical",
      title: "Medical supply, where compliance comes first.",
      accent: ["compliance"],
      intro:
        "Medical products and equipment demand documented quality, regulatory conformity and full traceability. AUREX approaches the sector with the diligence it requires.",
      overview:
        "Healthcare supply chains cannot tolerate uncertainty. AUREX's approach to medical trade is defined by regulatory diligence, qualified manufacturers and traceable movement, and by the requirement that partners hold the relevant authorisations in each market.",
      categories: [
        { title: "Medical supplies & consumables", text: "Everyday clinical consumables where consistency and conformity are essential." },
        { title: "Medical equipment", text: "Devices and equipment for clinical and institutional buyers." },
        { title: "Protective equipment", text: "Personal protective equipment for healthcare and industry." },
      ],
      approach: [
        { title: "Regulatory conformity", text: "Products assessed against the applicable EU and destination-market requirements." },
        { title: "Qualified manufacturers", text: "Manufacturers evaluated for quality systems and documentation." },
        { title: "Traceability", text: "Batch-level documentation from manufacturer to recipient." },
      ],
      cta: { title: "Discuss medical supply.", accent: ["medical"], primary: "Submit a partnership inquiry" },
    },
    electronics: {
      name: "Electronic Components",
      title: "Components for industrial demand.",
      accent: ["industrial"],
      intro:
        "AUREX is built to connect qualified suppliers of electronic components and parts with manufacturers and industrial buyers, with the authenticity and documentation the sector requires.",
      overview:
        "In electronic components, provenance is everything. AUREX's approach centres on supplier qualification, authenticity controls and documented chains of custody, so that industrial buyers can source with confidence.",
      categories: [
        { title: "Active & passive components", text: "Semiconductors, integrated circuits, resistors, capacitors and related parts." },
        { title: "Electromechanical parts", text: "Connectors, relays, switches and assemblies for industrial applications." },
        { title: "Industrial equipment parts", text: "Parts and sub-assemblies that support production and maintenance." },
      ],
      approach: [
        { title: "Supplier qualification", text: "Suppliers assessed for authenticity, quality systems and continuity." },
        { title: "Authenticity", text: "Documentation and inspection that guard against counterfeit parts." },
        { title: "Export compliance", text: "Dual-use and export-control requirements checked before any commitment." },
      ],
      cta: { title: "Discuss component sourcing.", accent: ["sourcing."], primary: "Submit a partnership inquiry" },
    },
    larp: {
      name: "LARP & Historical Goods",
      title: "Crafted goods for living history.",
      accent: ["living"],
      intro:
        "Costumes, armour, props and historical reproductions for live-action role-play, re-enactment and theatre, connecting skilled makers with specialist retailers, organisers and productions.",
      overview:
        "Live-action role-play, historical re-enactment and theatre depend on goods that look authentic, last in use and are safe to wear. AUREX approaches this specialist market as it does any trade line: with qualified makers, clear specifications and dependable logistics.",
      categories: [
        { title: "Costumes & garb", text: "Period and fantasy garments, textiles and accessories." },
        { title: "Armour & protective wear", text: "Leather and metal armour, helmets and protective pieces for events and performance." },
        { title: "Props & reproductions", text: "Event-safe props, historical reproductions and decorative pieces." },
      ],
      approach: [
        { title: "Skilled makers", text: "Workshops and manufacturers selected for craftsmanship and consistency." },
        { title: "Safety & materials", text: "Materials and finishes assessed for safe use at events and on stage." },
        { title: "Specialist distribution", text: "Routes to market through retailers, organisers and productions." },
      ],
      cta: { title: "Discuss LARP & historical goods.", accent: ["historical"], primary: "Submit a partnership inquiry" },
    },
  },

  tradePage: {
    eyebrow: "Trade line",
    overview: "Overview",
    categoriesEyebrow: "Focus categories",
    categoriesTitle: "What the trade line covers.",
    approachEyebrow: "Approach",
    approachTitle: "How AUREX approaches it.",
    corridorsEyebrow: "Markets of focus",
    otherEyebrow: "Other trade lines",
    allTrade: "All trade lines",
  },

  greenPillars: {
    materials: {
      name: "Green Materials",
      summary: "Recycled, circular and bio-based materials moving into new markets.",
      detail:
        "Recycled metals, polymers and fibres, circular inputs and bio-based alternatives are becoming mainstream industrial materials. AUREX looks for opportunities to move them between producers and the manufacturers that need them.",
      focus: ["Recycled materials", "Circular inputs", "Bio-based alternatives"],
    },
    energy: {
      name: "Clean Energy",
      summary: "Solar, energy storage, EV infrastructure and energy-efficiency technologies.",
      detail:
        "The energy transition is, at its core, a trade in equipment and components. AUREX's interest spans solar and storage hardware, EV-charging infrastructure and technologies that improve energy efficiency.",
      focus: ["Solar & storage", "EV infrastructure", "Energy efficiency"],
    },
    commerce: {
      name: "Sustainable Commerce",
      summary: "Sustainable agriculture, packaging, specialty products and resource-efficient solutions.",
      detail:
        "Sustainability is increasingly a feature of everyday products, from agricultural goods and packaging to specialty products designed to use fewer resources.",
      focus: ["Sustainable agriculture", "Sustainable packaging", "Resource-efficient products"],
    },
    logistics: {
      name: "Green Logistics",
      summary: "More efficient transportation, optimised supply chains and lower-impact distribution.",
      detail:
        "How goods move matters as much as what they are. AUREX brings its logistics perspective to more efficient transport, better-planned supply chains and lower-impact distribution.",
      focus: ["Efficient transport", "Optimised supply chains", "Lower-impact distribution"],
    },
  },

  sustainability: {
    hero: {
      eyebrow: "AUREX Green",
      title: "The Green Transition",
      accent: ["Green"],
      intro: "Trading the products and technologies shaping a more resource-efficient world.",
    },
    intro: {
      eyebrow: "AUREX Green",
      title: "Sustainability as part of real-world commerce.",
      accent: ["real-world"],
    },
    ecosystem: {
      eyebrow: "The ecosystem",
      title: "From source to global distribution.",
      accent: ["global"],
    },
    pillars: {
      eyebrow: "Business pillars",
      title: "Four pillars of AUREX Green.",
      accent: ["pillars"],
    },
    flow: {
      eyebrow: "The AUREX model",
      title: "Source. Trade. Distribute. Invest.",
      accent: ["Invest."],
      intro: "AUREX Green follows the same model as the rest of the group: a trading and holding house, not a consultancy.",
      steps: [
        { title: "Source", text: "Identify credible producers of sustainable products and technologies." },
        { title: "Trade", text: "Structure cross-border transactions with documentation and diligence." },
        { title: "Distribute", text: "Develop routes to market with logistics and distribution partners." },
        { title: "Invest", text: "Commit long-term capital where durable value emerges." },
      ],
    },
    principles: {
      eyebrow: "Our approach",
      title: "Credibility before claims.",
      accent: ["Credibility"],
      items: [
        { title: "Verifiable product claims", text: "Environmental attributes supported by documentation, not marketing." },
        { title: "Traceable supply chains", text: "Origin and movement documented from source to destination." },
        { title: "Commercial durability", text: "Opportunities that stand on their economics, not on subsidies alone." },
        { title: "Long-term partnership", text: "Relationships structured to grow as markets mature." },
      ],
    },
    note: "AUREX Green is a strategic area of trading and investment development. The categories described are areas of focus and do not each represent an established AUREX business.",
  },

  about: {
    hero: {
      eyebrow: "O grupie AUREX",
      title: "Grupa o europejskich korzeniach i globalnym horyzoncie.",
      accent: ["globalnym"],
      intro:
        "AUREX łączy handel międzynarodowy, działalność holdingową i inwestycje w ramach jednej filozofii: wartość tworzy się, starannie przenosząc ją ponad granicami i utrzymując w długiej perspektywie.",
    },
    statement:
      "Nazwa AUREX nawiązuje do aurum, czyli złota, najstarszej miary wartości, oraz do wymiany (ang. exchange): przepływu tej wartości między rynkami i ponad granicami.",
    story: {
      eyebrow: "Nasza historia",
      title: "Wartość przenoszona w przyszłość.",
      accent: ["przyszłość."],
      paragraphs: [
        "AUREX pomyślano jako grupę międzynarodową, a nie przedsiębiorstwo działające na jednym rynku: strukturę zdolną do handlu, posiadania udziałów i inwestowania w korytarzach łączących Europę z Bliskim Wschodem, Indiami i Afryką.",
        "Perspektywa grupy jest europejska: w sposobie zarządzania, dokumentowania decyzji i traktowania partnerów. Jej horyzont jest globalny, a miarą sukcesu jest długoterminowa wartość, nie krótkoterminowy wolumen.",
        "W efekcie powstała grupa stworzona z myślą o partnerach instytucjonalnych i korporacyjnych: zdyscyplinowana w działaniu, rozważna w rozwoju i zbudowana na dekady, nie na transakcje.",
      ],
    },
    principles: {
      eyebrow: "Zasady",
      title: "Co definiuje AUREX.",
      accent: ["definiuje"],
      items: [
        { title: "Odporność ponad szybkość", text: "Przedkładamy struktury trwałe nad te, które jedynie szybko się poruszają." },
        {
          title: "Reputacja ponad wolumen",
          text: "Każde zobowiązanie jest sygnowane nazwą grupy. Kontrahentów i zobowiązania dobieramy z odpowiednią starannością.",
        },
        { title: "Partnerstwo ponad transakcję", text: "Relacje budujemy tak, by trwały dłużej niż pojedyncza transakcja." },
        {
          title: "Długoterminowa wartość ponad krótkoterminowy zysk",
          text: "Wartość pomnażamy w kolejnych cyklach i ponad granicami.",
        },
      ],
    },
    structure: {
      eyebrow: "Struktura grupy",
      title: "Jedna grupa, cztery obszary.",
      accent: ["cztery"],
      intro: "Grupa AUREX jest zorganizowana wokół komplementarnych obszarów działalności, objętych jedną filozofią holdingową.",
      groupLabel: "Grupa AUREX",
      groupText: "Holding, ład korporacyjny i alokacja kapitału",
    },
    governance: {
      eyebrow: "Ład korporacyjny",
      title: "Najpierw struktura, potem skala.",
      accent: ["skala."],
      intro: "Zasady, według których AUREX angażuje kapitał, prowadzi handel i współpracuje z partnerami.",
      items: [
        {
          title: "Jasne mandaty",
          text: "Określone zakresy odpowiedzialności i uprawnień decyzyjnych we wszystkich obszarach działalności.",
        },
        { title: "Udokumentowane decyzje", text: "Decyzje zapisywane, podlegające weryfikacji i możliwe do prześledzenia." },
        {
          title: "Zgodność jako warunek wstępny",
          text: "Weryfikacja kontrahentów i zgodność regulacyjna w handlu traktowane jako warunki konieczne, a nie formalności.",
        },
        {
          title: "Przejrzystość wobec partnerów",
          text: "Jasna sprawozdawczość i otwarta komunikacja z tymi, którzy podzielają nasze zobowiązania.",
        },
      ],
    },
    cta: {
      eyebrow: "Dalej",
      title: "Jak grupa tworzy wartość.",
      accent: ["wartość."],
      primary: "Nasza działalność",
      secondary: "Rozpocznijmy rozmowę",
    },
  },

  tradeHub: {
    hero: {
      eyebrow: "Trade",
      title: "International trade, structured to European standards.",
      accent: ["structured"],
      intro:
        "AUREX is built to source, move and distribute goods across borders, connecting qualified producers with demand in markets of focus under European standards of documentation, compliance and counterparty diligence.",
    },
    core: {
      eyebrow: "How AUREX trades",
      title: "From sourcing to distribution.",
      accent: ["distribution."],
    },
    scopeLabel: "Scope",
    lines: {
      eyebrow: "Trade lines",
      title: "Trade lines of strategic focus.",
      accent: ["strategic"],
      intro: "Each trade line is a strategic focus, developed deliberately and with qualified partners.",
      note: "Trade lines are areas of strategic focus under development. Specific activities will be presented as they are formalised.",
    },
    connection: {
      eyebrow: "The AUREX model",
      title: "Source. Trade. Distribute. Invest.",
      accent: ["Invest."],
      steps: [
        { title: "Source", text: "Qualified producers and suppliers, assessed against European standards." },
        { title: "Trade", text: "Cross-border transactions structured with documentation, compliance and counterparty diligence." },
        { title: "Distribute", text: "Routes to market developed with logistics and distribution partners." },
        { title: "Invest", text: "Long-term capital and ownership where trade reveals durable value." },
      ],
    },
    green: {
      eyebrow: "AUREX Green",
      title: "Sustainable products and technologies.",
      accent: ["Sustainable"],
      text: "Recycled and bio-based materials, clean-energy equipment, sustainable packaging and green logistics: the trade side of the green transition.",
      link: "Explore AUREX Green",
    },
    cta: {
      eyebrow: "Trade inquiries",
      title: "Propose a trade partnership.",
      accent: ["partnership."],
      primary: "Submit a partnership inquiry",
    },
  },

  portfolio: {
    hero: {
      eyebrow: "Portfel i inwestycje",
      title: "Cierpliwy kapitał, kierowany z przekonaniem.",
      accent: ["przekonaniem."],
      intro:
        "AUREX inwestuje cierpliwie i z przekonaniem, bez presji terminów typowej dla funduszy, współpracując z partnerami i kadrą zarządzającą, by budować, a nie jedynie alokować kapitał.",
    },
    approach: {
      eyebrow: "Podejście inwestycyjne",
      title: "Jak inwestujemy.",
      accent: ["inwestujemy."],
      items: [
        { title: "Horyzont", text: "Domyślnie długoterminowy. Inwestycję utrzymujemy tak długo, jak tworzy wartość." },
        {
          title: "Spójność",
          text: "Preferujemy możliwości, które wzmacniają handel, dystrybucję lub dostęp do rynków w całej grupie.",
        },
        {
          title: "Partnerstwo",
          text: "Współpraca z kadrą zarządzającą i współinwestorami, do której wnosimy strukturę i ład korporacyjny.",
        },
        { title: "Dyscyplina", text: "Wnikliwe badanie due diligence, jasne tezy inwestycyjne i udokumentowany proces decyzyjny." },
      ],
    },
    criteria: {
      eyebrow: "Czego szukamy",
      title: "Kryteria inwestycyjne.",
      accent: ["Kryteria"],
      items: [
        "Wyraźne dopasowanie strategiczne do obszarów działalności lub sektorów zainteresowania AUREX",
        "Kadra zarządzająca i partnerzy zorientowani długoterminowo",
        "Solidny ład korporacyjny lub gotowość do jego zbudowania",
        "Odporny popyt i trudna do podważenia pozycja rynkowa",
        "Potencjał transgraniczny w obrębie rynków priorytetowych",
      ],
    },
    sectors: {
      eyebrow: "Sektory zainteresowania",
      title: "Dokąd trafia kapitał.",
      accent: ["kapitał."],
      intro: "Zainteresowanie inwestycyjne koncentruje się na sześciu sektorach o strategicznym znaczeniu.",
    },
    holdings: {
      eyebrow: "Udziały",
      title: "Informacje o portfelu.",
      accent: ["Informacje"],
      intro: "AUREX publikuje informacje o udziałach, gdy zostaną one sformalizowane i dopuszczone do ujawnienia.",
      empty: "Obecnie żadne udziały nie są publicznie ujawnione. Rejestr będzie aktualizowany w miarę formalizowania inwestycji.",
    },
    cta: {
      eyebrow: "Zapytania inwestycyjne",
      title: "Porozmawiajmy o możliwościach.",
      accent: ["możliwościach."],
      intro: "Zapraszamy założycieli, właścicieli i współinwestorów do przedstawiania możliwości zgodnych z naszym podejściem.",
      primary: "Zapytanie inwestycyjne",
    },
  },

  presence: {
    hero: {
      eyebrow: "Globalna obecność",
      title: "Wokół korytarzy, nie pojedynczych rynków.",
      accent: ["korytarzy,"],
      intro:
        "AUREX postrzega świat przez pryzmat korytarzy łączących Europę z Bliskim Wschodem, Indiami i Afryką, w których spotykają się handel, kapitał i długoterminowe możliwości.",
    },
    map: {
      eyebrow: "Rynki priorytetowe",
      title: "Europa w centrum.",
      accent: ["centrum."],
      intro:
        "Pięć rynków priorytetowych, połączonych strategicznymi korytarzami, wyznacza obszary, na których AUREX koncentruje swoją uwagę.",
      footnote:
        "Rynki priorytetowe wskazują strategiczne ukierunkowanie. Nie oznaczają biur, spółek zależnych ani zarejestrowanej działalności.",
    },
    corridors: {
      eyebrow: "Korytarze strategiczne",
      title: "Gdzie przepływa wartość.",
      accent: ["przepływa"],
      items: [
        {
          title: "Europa — Zatoka Perska",
          text: "Połączenie europejskich standardów i popytu z rolą regionu Zatoki Perskiej jako węzła handlu i kapitału.",
        },
        {
          title: "Europa — Indie",
          text: "Połączenie rynków europejskich z jedną z największych gospodarek świata, będącą zarówno źródłem dostaw, jak i rynkiem zbytu.",
        },
        {
          title: "Europa — Afryka",
          text: "Długoterminowy korytarz dla handlu, sektora spożywczego i infrastruktury, rozwijany wspólnie z partnerami.",
        },
        { title: "Zatoka Perska — Indie i Afryka", text: "Szlaki przez region Zatoki Perskiej, łączące rynki azjatyckie i afrykańskie." },
      ],
    },
    offices: {
      eyebrow: "Biura",
      title: "Siedziba i przedstawicielstwo.",
      empty: "Dane siedziby i przedstawicielstwa zostaną opublikowane w tym miejscu.",
    },
    cta: {
      eyebrow: "Kontakt",
      title: "Porozmawiajmy o korytarzu.",
      accent: ["korytarzu."],
      primary: "Rozpocznijmy rozmowę",
    },
  },

  leadership: {
    approach: {
      eyebrow: "Podejście do przywództwa",
      title: "Jak kierowana jest grupa AUREX.",
      accent: ["kierowana"],
      items: [
        {
          title: "Powiernictwo",
          text: "Liderzy działają jako powiernicy kapitału i reputacji, a nie wyłącznie jako zarządzający bieżącą działalnością.",
        },
        {
          title: "Rozliczalność",
          text: "Jasna odpowiedzialność za decyzje oraz określone i przejrzyste zakresy obowiązków.",
        },
        {
          title: "Orientacja długoterminowa",
          text: "Decyzje oceniane przez pryzmat wartości tworzonej w perspektywie cykli, a nie kwartałów.",
        },
      ],
    },
    profiles: {
      eyebrow: "Zespół kierowniczy",
      title: "Ludzie stojący za AUREX.",
      accent: ["Ludzie"],
      empty: "Profile kierownictwa zostaną opublikowane w tym miejscu.",
    },
    cta: {
      eyebrow: "Zapytania korporacyjne",
      title: "Dialog z AUREX.",
      accent: ["AUREX."],
      primary: "Zapytanie korporacyjne",
    },
  },

  partnerships: {
    hero: {
      eyebrow: "Partnerstwa",
      title: "Wzrost budowany w partnerstwie.",
      accent: ["partnerstwie."],
      intro:
        "AUREX rozwija się wspólnie z partnerami o standardach i horyzoncie zbieżnych z własnymi: producentami, dystrybutorami, przedsiębiorstwami, instytucjami i współinwestorami.",
    },
    models: {
      eyebrow: "Modele partnerstwa",
      title: "Cztery formy współpracy z AUREX.",
      accent: ["współpracy"],
    },
    offer: {
      eyebrow: "Co wnosi AUREX",
      title: "Partner o jasnej strukturze.",
      accent: ["strukturze."],
      items: [
        {
          title: "Europejskie standardy",
          text: "Dokumentacja, zgodność z przepisami i postępowanie oparte na europejskich normach.",
        },
        {
          title: "Perspektywa transgraniczna",
          text: "Spojrzenie zbudowane wokół korytarzy łączących Europę, region Zatoki Perskiej, Indie i Afrykę.",
        },
        { title: "Zintegrowane kompetencje", text: "Handel, logistyka, dystrybucja i kapitał w ramach jednej grupy." },
        { title: "Długoterminowe zaangażowanie", text: "Partnerstwa budowane tak, by trwały dłużej niż pojedyncza transakcja." },
      ],
    },
    seek: {
      eyebrow: "Czego szukamy",
      title: "Zbieżne standardy. Wspólny horyzont.",
      accent: ["horyzont."],
      items: [
        "Orientacja długoterminowa",
        "Przejrzystość i solidny ład korporacyjny",
        "Jakość, zgodność z przepisami i identyfikowalność",
        "Dyscyplina handlowa i niezawodność",
        "Komplementarne kompetencje lub dostęp do rynków",
      ],
    },
    process: {
      eyebrow: "Proces",
      title: "Od pierwszego kontaktu do realizacji.",
      accent: ["realizacji."],
      steps: [
        {
          title: "Pierwszy kontakt",
          text: "Przedstawienie organizacji, zakresu działalności i celów w zapytaniu dotyczącym partnerstwa.",
        },
        { title: "Ocena", text: "Ocenie podlegają dopasowanie strategiczne, standardy oraz wiarygodność kontrahenta." },
        {
          title: "Strukturyzacja",
          text: "Warunki, obowiązki i zasady ładu korporacyjnego są uzgadniane i dokumentowane.",
        },
        {
          title: "Realizacja",
          text: "Partnerstwo jest realizowane z jasną sprawozdawczością i ustalonymi punktami przeglądu.",
        },
      ],
    },
    cta: {
      eyebrow: "Zapytania partnerskie",
      title: "Propozycja partnerstwa.",
      accent: ["partnerstwa."],
      primary: "Zapytanie o partnerstwo",
    },
  },

  contact: {
    hero: {
      eyebrow: "Kontakt",
      title: "Rozpocznijmy rozmowę.",
      accent: ["rozmowę."],
      intro:
        "Prosimy wybrać rodzaj zapytania i przedstawić jego cel. Każde zapytanie jest analizowane, a w odpowiedzi wskazujemy właściwy kolejny krok.",
    },
    routes: {
      eyebrow: "Rodzaje zapytań",
      title: "Wybór ścieżki.",
      accent: ["ścieżki."],
    },
    direct: {
      title: "Kontakt bezpośredni",
      emailLabel: "E-mail",
      emailPending:
        "Adres do zapytań bezpośrednich zostanie opublikowany w tym miejscu. Do tego czasu prosimy korzystać z formularza.",
      responseNote: "Prosimy nie zamieszczać informacji poufnych w pierwszej wiadomości.",
    },
  },

  privacy: {
    hero: {
      eyebrow: "Informacje prawne",
      title: "Polityka prywatności.",
      intro: "Jak postępujemy z informacjami przekazanymi za pośrednictwem tej strony.",
    },
    updated: "Ostatnia aktualizacja: wrzesień 2026",
    sections: [
      {
        title: "Zakres",
        paragraphs: [
          "Niniejsza polityka dotyczy informacji przekazywanych za pośrednictwem strony internetowej AUREX, w tym formularzy zapytań.",
        ],
      },
      {
        title: "Gromadzone informacje",
        paragraphs: [
          "W przypadku przesłania zapytania gromadzimy przekazane w nim dane: imię i nazwisko, nazwę organizacji, stanowisko, adres e-mail, kraj oraz treść wiadomości.",
          "Strona nie wykorzystuje reklamowych ani śledzących plików cookie.",
        ],
      },
      {
        title: "Sposób wykorzystania informacji",
        paragraphs: [
          "Informacje są wykorzystywane wyłącznie w celu rozpatrzenia zapytania i udzielenia na nie odpowiedzi oraz prowadzenia rejestru korespondencji. Nie są sprzedawane ani udostępniane do celów marketingowych.",
        ],
      },
      {
        title: "Okres przechowywania",
        paragraphs: [
          "Dane z zapytań są przechowywane wyłącznie przez okres niezbędny do udzielenia odpowiedzi oraz wypełnienia obowiązków prawnych.",
        ],
      },
      {
        title: "Państwa prawa",
        paragraphs: [
          "Zgodnie z unijnym ogólnym rozporządzeniem o ochronie danych (RODO) przysługuje Państwu prawo dostępu do swoich danych osobowych, ich sprostowania lub usunięcia, a także prawo wniesienia sprzeciwu wobec ich przetwarzania. Wnioski można składać za pośrednictwem formularza kontaktowego.",
        ],
      },
      {
        title: "Administrator danych",
        paragraphs: ["Tożsamość i adres siedziby administratora danych zostaną opublikowane na tej stronie."],
      },
    ],
  },

  inquiry: {
    title: "Zapytanie",
    types: {
      partnership: { label: "Partnerstwo", description: "Dostawy, dystrybucja lub współpraca strategiczna" },
      investment: { label: "Inwestycje", description: "Okazje inwestycyjne, współinwestycje i kapitał" },
      corporate: { label: "Sprawy korporacyjne", description: "Kwestie instytucjonalne i korporacyjne" },
      general: { label: "Sprawy ogólne", description: "Wszelkie inne zapytania" },
    },
    fields: {
      type: "Rodzaj zapytania",
      name: "Imię i nazwisko",
      organisation: "Organizacja",
      role: "Stanowisko / funkcja",
      email: "Służbowy adres e-mail",
      country: "Kraj",
      message: "Treść wiadomości",
      messagePlaceholder:
        "Prosimy krótko opisać organizację, cel kontaktu oraz kwestie, które chcieliby Państwo omówić.",
      consent:
        "Wyrażam zgodę na wykorzystanie przez AUREX podanych danych w celu udzielenia odpowiedzi na moje zapytanie, na zasadach opisanych w",
      privacyLink: "polityce prywatności",
      optional: "Opcjonalnie",
    },
    submit: "Wyślij zapytanie",
    submitting: "Wysyłanie…",
    success: {
      title: "Dziękujemy.",
      text: "Zapytanie zostało przyjęte. Odpowiemy, wskazując właściwy kolejny krok.",
      again: "Wyślij kolejne zapytanie",
    },
    error: "Podczas wysyłania zapytania wystąpił błąd. Prosimy spróbować ponownie.",
    unavailable: "Przesyłanie zapytań online jest chwilowo niedostępne. Prosimy spróbować ponownie później.",
    validation: {
      required: "Pole wymagane",
      email: "Prosimy podać prawidłowy adres e-mail",
      tooShort: "Prosimy podać nieco więcej szczegółów",
      consent: "Prosimy potwierdzić zgodę",
    },
  },

  notFound: {
    eyebrow: "404",
    title: "Tej strony już tu nie ma.",
    text: "Poszukiwana strona nie istnieje lub nie jest już dostępna.",
    cta: "Powrót na stronę główną",
  },

  footer: {
    statement:
      "Międzynarodowa grupa handlowa, holdingowa i inwestycyjna o europejskich korzeniach, łącząca rynki, partnerów i kapitał ponad granicami.",
    groups: { group: "Grupa", businesses: "Działalność", contact: "Zapytania" },
    rights: "Wszelkie prawa zastrzeżone.",
    languages: "Języki",
    legal: "Informacje prawne",
  },
};

export default pl;
