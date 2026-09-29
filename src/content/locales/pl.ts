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
      eyebrow: "Value in Motion.",
      title: "Handel międzynarodowy, holding i inwestycje z europejskimi korzeniami.",
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
      stagesLabel: "Etapy ekosystemu",
      tourPause: "Wstrzymaj prezentację",
      tourPlay: "Odtwórz prezentację",
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
        "AUREX dąży do współpracy z producentami, dystrybutorami, przedsiębiorstwami, instytucjami i współinwestorami o standardach i horyzoncie zbieżnych z własnymi.",
      cta: "Więcej o partnerstwach",
    },
    leadership: {
      eyebrow: "Przywództwo i ład korporacyjny",
      title: "Odpowiedzialny nadzór, wpisany w strukturę.",
      accent: ["nadzór,"],
      intro:
        "Model kierowania AUREX zakłada długoterminowy mandat: jasny podział odpowiedzialności, udokumentowane decyzje i kulturę ładu korporacyjnego ugruntowaną przed osiągnięciem skali, a nie po nim.",
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
        "Niezależnie od tego, czy reprezentują Państwo instytucję, przedsiębiorstwo, producenta czy inwestora, zapraszamy do przedstawienia celu kontaktu i rozpoczęcia rozmowy z AUREX.",
      direct: "Wolą Państwo e-mail?",
    },
  },

  divisions: {
    trade: {
      name: "Handel międzynarodowy i EXIM",
      short: "Handel i EXIM",
      summary:
        "Transgraniczne pozyskiwanie towarów, import i eksport, zaprojektowane w oparciu o europejskie standardy dokumentacji, zgodności z przepisami i weryfikacji kontrahentów.",
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
        "Kanały dotarcia do rynku, zaprojektowane tak, by łączyć podaż z popytem na rynkach priorytetowych.",
      scope: ["Partnerstwa dystrybucyjne", "Wejście na rynek", "Rozwój kanałów sprzedaży"],
    },
    holdings: {
      name: "Holding, inwestycje i kapitał",
      short: "Holding i kapitał",
      summary:
        "Warstwa właścicielska grupy: długoterminowe udziały i cierpliwy kapitał, pomyślane tak, by spajać handel, logistykę i dystrybucję w jedną platformę.",
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
      name: "Żywność",
      title: "Handel żywnością z zachowaniem identyfikowalności.",
      accent: ["identyfikowalności."],
      intro:
        "Grupa AUREX została stworzona, by łączyć regiony produkcji z rynkami konsumpcji – z dokumentacją, kontrolą jakości i ciągłością dostaw, jakich wymagają nabywcy instytucjonalni.",
      overview:
        "W handlu żywnością liczy się przede wszystkim niezawodność: stała jakość, weryfikowalne pochodzenie i pewna logistyka. AUREX traktuje żywność jako długoterminowy obszar handlowy i dąży do partnerstw ze sprawdzonymi producentami oraz uznanymi dystrybutorami na rynkach priorytetowych.",
      categories: [
        {
          title: "Podstawowe artykuły spożywcze",
          text: "Zboża, ryż i rośliny strączkowe, w przypadku których najważniejsze są specyfikacja i ciągłość dostaw.",
          items: ["Pszenica i zboża", "Ryż", "Strączki i soczewica"],
        },
        {
          title: "Oleje i tłuszcze jadalne",
          text: "Oleje roślinne luzem i w opakowaniach – dla przemysłu oraz handlu hurtowego i detalicznego.",
          items: ["Olej słonecznikowy", "Olej rzepakowy", "Oliwa z oliwek"],
        },
        {
          title: "Cukier i substancje słodzące",
          text: "Cukier rafinowany i surowy oraz substancje słodzące dla producentów i dystrybutorów.",
          items: ["Cukier rafinowany", "Surowy cukier trzcinowy", "Syropy"],
        },
        {
          title: "Żywność paczkowana i delikatesowa",
          text: "Produkty gotowe dla handlu detalicznego i hurtowego oraz gastronomii i hotelarstwa.",
          items: ["Marki własne", "Specjały regionalne", "Napoje"],
        },
        {
          title: "Towary w kontrolowanej temperaturze",
          text: "Produkty, których jakość zależy od nieprzerwanego łańcucha chłodniczego – od miejsca pochodzenia do miejsca przeznaczenia.",
          items: ["Mrożonki", "Nabiał", "Świeże owoce i warzywa"],
        },
        {
          title: "Składniki spożywcze",
          text: "Surowce do produkcji żywności, specyfikowane zgodnie z recepturą nabywcy.",
          items: ["Mąki i skrobie", "Bakalie", "Przyprawy"],
        },
      ],
      flow: [
        {
          title: "Pochodzenie",
          text: "Producenci i regiony upraw weryfikowani pod kątem jakości, bezpieczeństwa i dokumentacji pochodzenia.",
        },
        {
          title: "Specyfikacja",
          text: "Klasa jakości, opakowanie, znakowanie i okres przydatności uzgadniane z uwzględnieniem wymogów rynku docelowego.",
        },
        {
          title: "Transport",
          text: "Przewóz w temperaturze otoczenia lub w kontrolowanej temperaturze, z inspekcjami w ustalonych punktach.",
        },
        {
          title: "Rynek",
          text: "Dostawy do importerów i hurtowników oraz kanałów handlu detalicznego i gastronomii.",
        },
      ],
      approach: [
        {
          title: "Pochodzenie i jakość",
          text: "Producenci weryfikowani pod kątem udokumentowanych standardów jakości, bezpieczeństwa i pochodzenia.",
        },
        {
          title: "Zgodność z przepisami",
          text: "Wymogi w zakresie bezpieczeństwa żywności, znakowania i importu uwzględniane przed wysyłką towaru.",
        },
        {
          title: "Dokumentacja",
          text: "Świadectwa pochodzenia oraz certyfikaty analiz i zgodności, które mają towarzyszyć każdej przesyłce.",
        },
        { title: "Ciągłość", text: "Dostawy planowane z myślą o regularności, a nie o jednorazowych transakcjach." },
      ],
      standards: [
        {
          title: "Ogólne prawo żywnościowe",
          ref: "Rozporządzenie (WE) nr 178/2002",
          text: "Unijne ramy prawne bezpieczeństwa i identyfikowalności żywności – jeden krok wstecz i jeden krok naprzód.",
        },
        {
          title: "Higiena żywności i HACCP",
          ref: "Rozporządzenie (WE) nr 852/2004",
          text: "Obowiązki w zakresie higieny ciążące na podmiotach prowadzących przedsiębiorstwa spożywcze, oparte na zasadach HACCP.",
        },
        {
          title: "Informowanie konsumentów o żywności",
          ref: "Rozporządzenie (UE) nr 1169/2011",
          text: "Znakowanie oraz informacje o alergenach i wartości odżywczej żywności wprowadzanej do obrotu na rynku UE.",
        },
        {
          title: "Certyfikacja uznawana przez GFSI",
          ref: "BRCGS · IFS · FSSC 22000",
          text: "Systemy certyfikacji istotne przy weryfikacji producentów, pakowni i zakładów przetwórczych.",
        },
      ],
      counterparts: [
        {
          title: "Producenci i przetwórcy",
          text: "Producenci rolni, młyny, pakownie i zakłady przetwórcze z udokumentowanymi systemami zarządzania jakością.",
        },
        { title: "Importerzy i hurtownicy", text: "Uznani dystrybutorzy obsługujący rynki priorytetowe." },
        {
          title: "Handel detaliczny i gastronomia",
          text: "Sieci handlowe, właściciele marek własnych i nabywcy z sektora hotelarsko-gastronomicznego.",
        },
        { title: "Producenci żywności", text: "Zakłady zaopatrujące się w składniki zgodnie ze specyfikacją." },
      ],
      cta: { title: "Porozmawiajmy o handlu żywnością.", accent: ["żywnością."], primary: "Zapytanie o partnerstwo" },
    },
    medical: {
      name: "Medycyna",
      title: "Dostawy medyczne, w których zgodność ma pierwszeństwo.",
      accent: ["zgodność"],
      intro:
        "Produkty i sprzęt medyczny wymagają udokumentowanej jakości, zgodności z wymogami regulacyjnymi i pełnej identyfikowalności. AUREX podchodzi do tego sektora z wymaganą przez niego starannością.",
      overview:
        "Łańcuchy dostaw w ochronie zdrowia nie tolerują niepewności. Podejście AUREX do handlu produktami medycznymi wyznaczają staranna weryfikacja regulacyjna, sprawdzeni producenci i identyfikowalny przepływ towarów, a także wymóg, by partnerzy posiadali odpowiednie zezwolenia na każdym rynku.",
      categories: [
        {
          title: "Materiały medyczne jednorazowego użytku",
          text: "Codziennie wykorzystywane materiały kliniczne, w przypadku których kluczowe są powtarzalność i zgodność z wymogami.",
          items: ["Rękawice i serwety", "Strzykawki i igły", "Opatrunki"],
        },
        {
          title: "Urządzenia i sprzęt medyczny",
          text: "Wyroby medyczne i sprzęt dla placówek ochrony zdrowia i nabywców instytucjonalnych.",
          items: ["Urządzenia diagnostyczne", "Monitorowanie pacjentów", "Pomoce w poruszaniu się"],
        },
        {
          title: "Sprzęt ochronny",
          text: "Środki ochrony indywidualnej dla sektora medycznego i przemysłu.",
          items: ["Maski i półmaski", "Fartuchy i kombinezony", "Ochrona oczu i twarzy"],
        },
        {
          title: "Meble i wyposażenie szpitalne",
          text: "Umeblowanie i zaopatrzenie oddziałów szpitalnych, przychodni i placówek opiekuńczych.",
          items: ["Łóżka i nosze", "Wózki medyczne", "Tekstylia szpitalne"],
        },
        {
          title: "Zaopatrzenie laboratoryjne",
          text: "Materiały eksploatacyjne i sprzęt dla laboratoriów diagnostycznych i badawczych.",
          items: ["Pobieranie próbek", "Naczynia laboratoryjne", "Przechowywanie chłodnicze"],
        },
        {
          title: "Higiena i kontrola zakażeń",
          text: "Produkty do czyszczenia, dezynfekcji i zapobiegania zakażeniom.",
          items: ["Środki dezynfekcyjne", "Higiena rąk", "Materiały do sterylizacji"],
        },
      ],
      flow: [
        {
          title: "Producent",
          text: "Producenci oceniani pod kątem systemów zarządzania jakością i dokumentacji technicznej.",
        },
        {
          title: "Zgodność",
          text: "Weryfikacja oznakowania CE, deklaracji zgodności i rejestracji na rynku docelowym.",
        },
        {
          title: "Transport",
          text: "Kontrolowane warunki magazynowania i przewozu, z zachowaniem identyfikacji partii i serii.",
        },
        {
          title: "Odbiorca",
          text: "Dostawy do uprawnionych dystrybutorów, instytucji i nabywców z sektora ochrony zdrowia.",
        },
      ],
      approach: [
        {
          title: "Zgodność regulacyjna",
          text: "Produkty oceniane pod kątem obowiązujących wymogów UE i rynku docelowego.",
        },
        {
          title: "Sprawdzeni producenci",
          text: "Producenci oceniani pod kątem systemów zarządzania jakością i dokumentacji.",
        },
        { title: "Identyfikowalność", text: "Dokumentacja na poziomie partii, od producenta do odbiorcy." },
        {
          title: "Uprawnione kanały",
          text: "Dostawy wyłącznie za pośrednictwem partnerów posiadających odpowiednie zezwolenia na każdym rynku.",
        },
      ],
      standards: [
        {
          title: "Rozporządzenie w sprawie wyrobów medycznych",
          ref: "Rozporządzenie (UE) 2017/745",
          text: "Wymogi dotyczące wprowadzania wyrobów medycznych do obrotu w UE, w tym identyfikowalność za pomocą systemu UDI.",
        },
        {
          title: "Rozporządzenie w sprawie wyrobów do diagnostyki in vitro",
          ref: "Rozporządzenie (UE) 2017/746",
          text: "Unijne ramy prawne dla wyrobów medycznych do diagnostyki in vitro.",
        },
        {
          title: "Zarządzanie jakością",
          ref: "ISO 13485",
          text: "Norma systemu zarządzania jakością, której spełnienia oczekuje się od producentów wyrobów medycznych.",
        },
        {
          title: "Środki ochrony indywidualnej",
          ref: "Rozporządzenie (UE) 2016/425",
          text: "Wymogi w zakresie projektowania, wytwarzania i zgodności ŚOI.",
        },
      ],
      counterparts: [
        {
          title: "Producenci",
          text: "Wytwórcy wyrobów medycznych i materiałów jednorazowego użytku, posiadający certyfikowane systemy zarządzania jakością.",
        },
        {
          title: "Uprawnieni dystrybutorzy",
          text: "Dystrybutorzy posiadający zezwolenia na swoich rynkach oraz kompetencje regulacyjne.",
        },
        {
          title: "Placówki ochrony zdrowia",
          text: "Szpitale, przychodnie i placówki opiekuńcze – za pośrednictwem ich kanałów zakupowych.",
        },
        {
          title: "Organizacje zakupowe",
          text: "Podmioty zamawiające i grupy zakupowe obsługujące sektor ochrony zdrowia.",
        },
      ],
      cta: { title: "Porozmawiajmy o dostawach medycznych.", accent: ["medycznych."], primary: "Zapytanie o partnerstwo" },
    },
    electronics: {
      name: "Komponenty elektroniczne",
      title: "Komponenty na potrzeby przemysłu.",
      accent: ["przemysłu."],
      intro:
        "Grupa AUREX powstała, by łączyć sprawdzonych dostawców komponentów i części elektronicznych z producentami i odbiorcami przemysłowymi – z weryfikacją autentyczności i dokumentacją, jakich wymaga ten sektor.",
      overview:
        "W komponentach elektronicznych pochodzenie jest wszystkim. Podejście AUREX koncentruje się na kwalifikacji dostawców, kontroli autentyczności i udokumentowanej historii obrotu, tak aby odbiorcy przemysłowi mogli zaopatrywać się z pełnym zaufaniem.",
      categories: [
        {
          title: "Półprzewodniki i układy scalone",
          text: "Układy scalone, mikrokontrolery, pamięci i półprzewodniki dyskretne.",
          items: ["Mikrokontrolery", "Pamięci", "Półprzewodniki dyskretne"],
        },
        {
          title: "Komponenty pasywne",
          text: "Rezystory, kondensatory, cewki indukcyjne i pokrewne elementy w wolumenach produkcyjnych.",
          items: ["Kondensatory", "Rezystory", "Cewki indukcyjne"],
        },
        {
          title: "Podzespoły elektromechaniczne",
          text: "Złącza, przekaźniki, przełączniki i zespoły do zastosowań przemysłowych.",
          items: ["Złącza", "Przekaźniki", "Przełączniki"],
        },
        {
          title: "Czujniki i moduły",
          text: "Moduły czujnikowe, komunikacyjne i interfejsowe dla producentów urządzeń.",
          items: ["Czujniki", "Moduły bezprzewodowe", "Wyświetlacze"],
        },
        {
          title: "Komponenty zasilania",
          text: "Elementy do przetwarzania energii, zabezpieczeń i magazynowania energii.",
          items: ["Zasilacze", "Półprzewodniki mocy", "Zabezpieczenia obwodów"],
        },
        {
          title: "Części do urządzeń przemysłowych",
          text: "Części i podzespoły wspierające produkcję i utrzymanie ruchu.",
          items: ["Części automatyki", "Części zamienne", "Podzespoły"],
        },
      ],
      flow: [
        {
          title: "Pozyskanie",
          text: "Autoryzowane i sprawdzone niezależne źródła dostaw, z pierwszeństwem dla tych, które zapewniają identyfikowalność do producenta.",
        },
        {
          title: "Weryfikacja",
          text: "Przegląd dokumentacji i inspekcja zgodne z praktykami przeciwdziałania podrobionym komponentom.",
        },
        {
          title: "Przechowywanie",
          text: "Części wrażliwe na wilgoć i wyładowania elektrostatyczne (ESD) przechowywane i pakowane zgodnie ze specyfikacją.",
        },
        {
          title: "Dostawa",
          text: "Dostawy do producentów i odbiorców przemysłowych wraz z dokumentacją historii obrotu.",
        },
      ],
      approach: [
        {
          title: "Kwalifikacja dostawców",
          text: "Dostawcy oceniani pod kątem autentyczności, systemów zarządzania jakością i ciągłości dostaw.",
        },
        { title: "Autentyczność", text: "Dokumentacja i inspekcje chroniące przed podrobionymi częściami." },
        {
          title: "Obsługa i opakowania",
          text: "Ochrona przed ESD, kontrola wrażliwości na wilgoć i zachowanie oryginalnych opakowań.",
        },
        {
          title: "Zgodność eksportowa",
          text: "Wymogi dotyczące towarów podwójnego zastosowania i kontroli eksportu weryfikowane przed podjęciem jakichkolwiek zobowiązań.",
        },
      ],
      standards: [
        {
          title: "Unikanie podrobionych części",
          ref: "SAE AS6081 · AS5553",
          text: "Normy branżowe w zakresie wykrywania i unikania podrobionych części elektronicznych.",
        },
        {
          title: "Substancje niebezpieczne",
          ref: "Dyrektywa 2011/65/UE (RoHS)",
          text: "Ograniczenia stosowania substancji niebezpiecznych w sprzęcie elektrycznym i elektronicznym.",
        },
        {
          title: "Substancje chemiczne w wyrobach",
          ref: "Rozporządzenie (WE) nr 1907/2006 (REACH)",
          text: "Obowiązek przekazywania informacji o substancjach wzbudzających szczególnie duże obawy, obecnych w wyrobach.",
        },
        {
          title: "Kontrola eksportu towarów podwójnego zastosowania",
          ref: "Rozporządzenie (UE) 2021/821",
          text: "Kontrola wywozu, pośrednictwa i tranzytu produktów podwójnego zastosowania.",
        },
      ],
      counterparts: [
        { title: "Producenci komponentów", text: "Producenci i ich autoryzowani dystrybutorzy." },
        {
          title: "Producenci kontraktowi",
          text: "Dostawcy usług EMS i firmy montażowe realizujące produkcję według projektów klientów.",
        },
        { title: "Producenci urządzeń", text: "Producenci OEM z sektorów przemysłu, energetyki i automatyki." },
        {
          title: "Utrzymanie ruchu i eksploatacja",
          text: "Odbiorcy przemysłowi zaopatrujący się w części na potrzeby utrzymania ruchu, napraw i eksploatacji.",
        },
      ],
      cta: {
        title: "Porozmawiajmy o zaopatrzeniu w komponenty.",
        accent: ["zaopatrzeniu"],
        primary: "Zapytanie o partnerstwo",
      },
    },
    larp: {
      name: "LARP i artykuły historyczne",
      title: "Wyroby rzemieślnicze dla żywej historii.",
      accent: ["żywej"],
      intro:
        "Kostiumy, zbroje, rekwizyty i repliki historyczne dla gier fabularnych na żywo (LARP), rekonstrukcji historycznych i teatru: obszar łączący wykwalifikowanych wytwórców ze specjalistycznymi sprzedawcami, organizatorami wydarzeń i produkcjami scenicznymi.",
      overview:
        "LARP, rekonstrukcje historyczne i teatr wymagają wyrobów, które wyglądają autentycznie, są trwałe w użytkowaniu i bezpieczne w noszeniu. AUREX podchodzi do tego specjalistycznego rynku tak jak do każdego obszaru handlowego: ze sprawdzonymi wytwórcami, jasnymi specyfikacjami i niezawodną logistyką.",
      categories: [
        {
          title: "Zbroje kolcze",
          text: "Stalowa plecionka kolcza, nitowana lub łączona na styk – od pełnych kolczug po pojedyncze elementy.",
          items: ["Hauberki i kolczugi", "Czepce kolcze", "Pelerynki i barmice"],
        },
        {
          title: "Zbroje płytowe i skórzane",
          text: "Hełmy oraz zbroje płytowe i z utwardzanej skóry na wydarzenia i występy.",
          items: ["Hełmy", "Rękawice i karwasze", "Kirysy skórzane"],
        },
        {
          title: "Kostiumy i stroje",
          text: "Stroje z epoki i fantasy, tkaniny oraz dodatki.",
          items: ["Tuniki i przeszywanice", "Płaszcze", "Suknie i wapenroki"],
        },
        {
          title: "Rekwizyty i repliki",
          text: "Rekwizyty bezpieczne w użyciu podczas wydarzeń, repliki historyczne i elementy dekoracyjne.",
          items: ["Rekwizyty piankowo-lateksowe", "Repliki", "Elementy dekoracyjne"],
        },
        {
          title: "Wyroby skórzane i akcesoria",
          text: "Pasy, sakiewki, torby i elementy wykończeniowe, które dopełniają wizerunek postaci.",
          items: ["Pasy i sakiewki", "Torby i pochwy", "Klamry i okucia"],
        },
        {
          title: "Wyposażenie obozów i wydarzeń",
          text: "Namioty, meble i zastawa na potrzeby obozowisk i wydarzeń historycznych.",
          items: ["Namioty z epoki", "Meble obozowe", "Zastawa i oświetlenie"],
        },
      ],
      flow: [
        {
          title: "Pracownia",
          text: "Wytwórcy i producenci wybierani ze względu na kunszt wykonania, materiały i moce produkcyjne.",
        },
        {
          title: "Specyfikacja",
          text: "Rozmiarówka, materiały, wykończenia i wymogi bezpieczeństwa podczas wydarzeń uzgadniane z wyprzedzeniem.",
        },
        {
          title: "Transport",
          text: "Skonsolidowana wysyłka ciężkich i wielkogabarytowych towarów, pakowanych tak, by chronić wykończenia.",
        },
        {
          title: "Rynek",
          text: "Dystrybucja do specjalistycznych sprzedawców, organizatorów wydarzeń i produkcji scenicznych.",
        },
      ],
      approach: [
        {
          title: "Wykwalifikowani wytwórcy",
          text: "Pracownie i producenci wybierani ze względu na kunszt wykonania i powtarzalność jakości.",
        },
        {
          title: "Bezpieczeństwo i materiały",
          text: "Materiały i wykończenia oceniane pod kątem bezpiecznego użytkowania podczas wydarzeń i na scenie.",
        },
        {
          title: "Specyfikacja i rozmiarówka",
          text: "Jasne specyfikacje rozmiarów, wagi i materiałów dla każdej linii produktów.",
        },
        {
          title: "Dystrybucja specjalistyczna",
          text: "Kanały dotarcia do rynku za pośrednictwem sprzedawców, organizatorów wydarzeń i produkcji scenicznych.",
        },
      ],
      standards: [
        {
          title: "Ogólne bezpieczeństwo produktów",
          ref: "Rozporządzenie (UE) 2023/988 (GPSR)",
          text: "Wymogi bezpieczeństwa dla produktów konsumenckich wprowadzanych do obrotu na rynku UE.",
        },
        {
          title: "Uwalnianie niklu",
          ref: "REACH, załącznik XVII, pozycja 27",
          text: "Limity uwalniania niklu z wyrobów metalowych pozostających w długotrwałym kontakcie ze skórą.",
        },
        {
          title: "Etykietowanie tekstyliów",
          ref: "Rozporządzenie (UE) nr 1007/2011",
          text: "Nazwy włókien tekstylnych oraz etykietowanie składu włóknistego wyrobów włókienniczych.",
        },
        {
          title: "Repliki i zasady wydarzeń",
          ref: "Przepisy krajowe i regulaminy wydarzeń",
          text: "Przepisy dotyczące replik broni i rekwizytów różnią się w zależności od kraju i wydarzenia, dlatego są analizowane odrębnie dla każdego rynku.",
        },
      ],
      counterparts: [
        { title: "Pracownie i wytwórcy", text: "Płatnerze, kowale, kaletnicy i twórcy kostiumów." },
        {
          title: "Specjalistyczni sprzedawcy",
          text: "Sklepy stacjonarne i internetowe obsługujące środowiska LARP i rekonstrukcji historycznej.",
        },
        {
          title: "Organizatorzy wydarzeń",
          text: "Organizatorzy gier LARP, festiwali i rekonstrukcji historycznych.",
        },
        {
          title: "Teatr i produkcje",
          text: "Produkcje teatralne, filmowe i telewizyjne zaopatrujące się w kostiumy i rekwizyty.",
        },
      ],
      showcase: {
        eyebrow: "W centrum uwagi",
        title: "Sztuka wyrobu kolczug.",
        accent: ["kolczug."],
        text: "Kolczuga to jedna z najstarszych form zbroi i wciąż jedna z najtrudniejszych do dobrego wykonania. Pojedyncza kolczuga może składać się z dziesiątek tysięcy kółek, z których każde zamykane jest ręcznie. O jej wadze, wytrzymałości i autentyczności decydują rozmiar kółek, grubość drutu oraz sposób ich zamknięcia – nitowanie lub łączenie na styk.",
        setCaption:
          "Przykładowy asortyment: kolczugi, hauberk, czepiec i pelerynka kolcza ze skórzanymi elementami i mosiężnymi okuciami.",
        details: [
          {
            key: "weave",
            title: "Splot",
            text: "Europejski splot 4 w 1: każde kółko połączone z czterema innymi, co zapewnia wytrzymałość i swobodne układanie się plecionki.",
          },
          {
            key: "buckles",
            title: "Paski i klamry",
            text: "Skórzane paski i metalowe klamry służą do zapinania i pozwalają dopasować element do sylwetki użytkownika.",
          },
          {
            key: "collar",
            title: "Kołnierz",
            text: "Skórzany kołnierz z mosiężnymi okuciami wykańcza podkrój szyi i równomiernie rozkłada ciężar.",
          },
          {
            key: "coif",
            title: "Czepiec",
            text: "Kolczy kaptur chroniący głowę i szyję, noszony pod hełmem lub samodzielnie.",
          },
          {
            key: "mantle",
            title: "Pelerynka",
            text: "Kolcza peleryna na ramiona z podszytym skórzanym kołnierzem, noszona na kolczudze dla pełniejszej osłony.",
          },
        ],
      },
      cta: {
        title: "Porozmawiajmy o LARP i artykułach historycznych.",
        accent: ["historycznych."],
        primary: "Zapytanie o partnerstwo",
      },
    },
  },

  tradePage: {
    eyebrow: "Obszar handlowy",
    overview: "Przegląd",
    categoriesEyebrow: "Kategorie priorytetowe",
    categoriesTitle: "Co obejmuje ten obszar handlowy.",
    examplesLabel: "Przykłady",
    flowEyebrow: "Od źródła do rynku",
    flowTitle: "Jak przemieszczają się towary.",
    approachEyebrow: "Podejście",
    approachTitle: "Jak AUREX podchodzi do tego obszaru.",
    standardsEyebrow: "Normy i ramy prawne",
    standardsTitle: "Przepisy, którym podlega ten handel.",
    standardsNote:
      "Ramy odniesienia, które AUREX uwzględnia przy weryfikacji partnerów i produktów. Wymogi różnią się w zależności od produktu i rynku docelowego. Nie stanowi to oświadczenia o posiadaniu certyfikacji.",
    counterpartsEyebrow: "Kontrahenci",
    counterpartsTitle: "Z kim AUREX dąży do współpracy.",
    counterpartsCta: "Propozycja partnerstwa",
    corridorsEyebrow: "Rynki priorytetowe",
    otherEyebrow: "Pozostałe obszary handlowe",
    allTrade: "Wszystkie obszary handlowe",
  },

  greenPillars: {
    materials: {
      name: "Zielone materiały",
      summary: "Materiały z recyklingu, z obiegu zamkniętego i biopochodne, wchodzące na nowe rynki.",
      detail:
        "Metale, polimery i włókna z recyklingu, surowce z obiegu zamkniętego oraz biopochodne zamienniki stają się powszechnymi materiałami przemysłowymi. AUREX szuka możliwości, by kierować je od wytwórców do producentów, którzy ich potrzebują.",
      focus: ["Materiały z recyklingu", "Surowce z obiegu zamkniętego", "Zamienniki biopochodne"],
    },
    energy: {
      name: "Czysta energia",
      summary:
        "Energia słoneczna, magazynowanie energii, infrastruktura dla elektromobilności i technologie poprawiające efektywność energetyczną.",
      detail:
        "Transformacja energetyczna to w swej istocie handel urządzeniami i komponentami. Zainteresowanie AUREX obejmuje urządzenia do wytwarzania i magazynowania energii słonecznej, infrastrukturę ładowania pojazdów elektrycznych oraz technologie poprawiające efektywność energetyczną.",
      focus: ["Energia słoneczna i magazynowanie", "Infrastruktura dla elektromobilności", "Efektywność energetyczna"],
    },
    commerce: {
      name: "Zrównoważony handel",
      summary:
        "Zrównoważone rolnictwo i opakowania, produkty specjalistyczne oraz rozwiązania oszczędzające zasoby.",
      detail:
        "Zrównoważony charakter coraz częściej wyróżnia produkty codziennego użytku: od produktów rolnych i opakowań po produkty specjalistyczne zaprojektowane tak, by zużywać mniej zasobów.",
      focus: ["Zrównoważone rolnictwo", "Zrównoważone opakowania", "Produkty oszczędzające zasoby"],
    },
    logistics: {
      name: "Zielona logistyka",
      summary:
        "Bardziej efektywny transport, zoptymalizowane łańcuchy dostaw i dystrybucja o mniejszym wpływie na środowisko.",
      detail:
        "Sposób przemieszczania towarów ma równie duże znaczenie jak same towary. AUREX wnosi swoją perspektywę logistyczną do bardziej efektywnego transportu, lepiej zaplanowanych łańcuchów dostaw i dystrybucji o mniejszym wpływie na środowisko.",
      focus: ["Efektywny transport", "Zoptymalizowane łańcuchy dostaw", "Dystrybucja o mniejszym wpływie na środowisko"],
    },
  },

  sustainability: {
    hero: {
      eyebrow: "AUREX Green",
      title: "Zielona transformacja",
      accent: ["Zielona"],
      intro: "Handel produktami i technologiami, które kształtują świat oszczędniej gospodarujący zasobami.",
    },
    intro: {
      eyebrow: "AUREX Green",
      title: "Zrównoważony rozwój jako część realnego handlu.",
      accent: ["realnego"],
    },
    ecosystem: {
      eyebrow: "Ekosystem",
      title: "Od źródła po globalną dystrybucję.",
      accent: ["globalną"],
    },
    pillars: {
      eyebrow: "Filary działalności",
      title: "Cztery filary AUREX Green.",
      accent: ["filary"],
    },
    flow: {
      eyebrow: "Model AUREX",
      title: "Pozyskanie. Handel. Dystrybucja. Inwestycje.",
      accent: ["Inwestycje."],
      intro: "AUREX Green opiera się na tym samym modelu co cała grupa: handlowym i holdingowym, a nie doradczym.",
      steps: [
        { title: "Pozyskanie", text: "Identyfikowanie wiarygodnych producentów zrównoważonych produktów i technologii." },
        {
          title: "Handel",
          text: "Strukturyzowanie transakcji transgranicznych w oparciu o dokumentację i należytą staranność.",
        },
        {
          title: "Dystrybucja",
          text: "Rozwijanie kanałów dotarcia do rynku wspólnie z partnerami logistycznymi i dystrybucyjnymi.",
        },
        { title: "Inwestycje", text: "Angażowanie długoterminowego kapitału tam, gdzie powstaje trwała wartość." },
      ],
    },
    principles: {
      eyebrow: "Nasze podejście",
      title: "Najpierw wiarygodność, potem deklaracje.",
      accent: ["wiarygodność,"],
      items: [
        {
          title: "Weryfikowalne deklaracje produktowe",
          text: "Cechy środowiskowe potwierdzone dokumentacją, a nie marketingiem.",
        },
        {
          title: "Identyfikowalne łańcuchy dostaw",
          text: "Pochodzenie i przepływ towarów udokumentowane od źródła do miejsca przeznaczenia.",
        },
        { title: "Trwałość ekonomiczna", text: "Możliwości, które bronią się ekonomicznie, a nie wyłącznie dzięki dotacjom." },
        {
          title: "Długoterminowe partnerstwo",
          text: "Relacje budowane tak, by rozwijały się wraz z dojrzewaniem rynków.",
        },
      ],
    },
    note: "AUREX Green to strategiczny obszar rozwoju działalności handlowej i inwestycyjnej. Opisane kategorie to obszary priorytetowe i nie każda z nich stanowi ugruntowaną działalność AUREX.",
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
      "Nazwa AUREX przywołuje łacińskie aurum, czyli złoto, trwałą miarę wartości, oraz wymianę (ang. exchange): przepływ tej wartości między rynkami i ponad granicami.",
    story: {
      eyebrow: "Nasza historia",
      title: "Wartość przenoszona w przyszłość.",
      accent: ["przyszłość."],
      paragraphs: [
        "AUREX to z założenia grupa międzynarodowa, a nie przedsiębiorstwo działające na jednym rynku: struktura zaprojektowana z myślą o handlu, posiadaniu udziałów i inwestowaniu w korytarzach łączących Europę z Bliskim Wschodem, Indiami i Afryką.",
        "Perspektywa AUREX jest europejska: w tym, jak grupa ma być zarządzana, jak ma dokumentować swoje decyzje i traktować partnerów. Jej horyzont jest globalny, a miarą sukcesu jest długoterminowa wartość, nie krótkoterminowy wolumen.",
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
          text: "Cel: pomnażać wartość w kolejnych cyklach i ponad granicami.",
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
      intro: "Zasady, na których zbudowano AUREX w zakresie angażowania kapitału, prowadzenia handlu i współpracy z partnerami.",
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
      title: "Jak grupa jest zbudowana, by tworzyć wartość.",
      accent: ["wartość."],
      primary: "Poznaj handel",
      secondary: "Rozpocznijmy rozmowę",
    },
  },

  tradeHub: {
    hero: {
      eyebrow: "Handel",
      title: "Handel międzynarodowy zorganizowany według europejskich standardów.",
      accent: ["zorganizowany"],
      intro:
        "Grupa AUREX została zbudowana, by pozyskiwać, transportować i dystrybuować towary ponad granicami oraz łączyć sprawdzonych producentów z popytem na rynkach priorytetowych – według europejskich standardów dokumentacji, zgodności z przepisami i weryfikacji kontrahentów.",
    },
    core: {
      eyebrow: "Jak AUREX prowadzi handel",
      title: "Od pozyskania towarów po dystrybucję.",
      accent: ["dystrybucję."],
    },
    scopeLabel: "Zakres",
    lines: {
      eyebrow: "Obszary handlowe",
      title: "Obszary handlowe o strategicznym znaczeniu.",
      accent: ["strategicznym"],
      intro: "Każdy obszar handlowy to kierunek strategiczny, rozwijany z rozwagą i wspólnie ze sprawdzonymi partnerami.",
      note: "Obszary handlowe to kierunki strategiczne w fazie rozwoju. Konkretne działania będą prezentowane w miarę ich formalizowania.",
    },
    connection: {
      eyebrow: "Model AUREX",
      title: "Pozyskanie. Handel. Dystrybucja. Inwestycje.",
      accent: ["Inwestycje."],
      steps: [
        {
          title: "Pozyskanie",
          text: "Producenci i dostawcy oceniani według europejskich standardów przed podjęciem jakiegokolwiek zobowiązania.",
        },
        {
          title: "Handel",
          text: "Transakcje transgraniczne strukturyzowane w oparciu o dokumentację, zgodność z przepisami i weryfikację kontrahentów.",
        },
        {
          title: "Dystrybucja",
          text: "Kanały dotarcia do rynku, pomyślane tak, by budować je wspólnie z długoterminowymi partnerami logistycznymi i dystrybucyjnymi.",
        },
        { title: "Inwestycje", text: "Długoterminowy kapitał i własność tam, gdzie handel ujawnia trwałą wartość." },
      ],
    },
    green: {
      eyebrow: "AUREX Green",
      title: "Zrównoważone produkty i technologie.",
      accent: ["Zrównoważone"],
      text: "Materiały z recyklingu i biopochodne, urządzenia dla czystej energetyki, zrównoważone opakowania i zielona logistyka: handlowy wymiar zielonej transformacji.",
      link: "Więcej o AUREX Green",
    },
    cta: {
      eyebrow: "Zapytania handlowe",
      title: "Propozycja partnerstwa handlowego.",
      accent: ["partnerstwa"],
      primary: "Zapytanie o partnerstwo",
    },
  },

  portfolio: {
    hero: {
      eyebrow: "Portfel i inwestycje",
      title: "Cierpliwy kapitał, kierowany z przekonaniem.",
      accent: ["przekonaniem."],
      intro:
        "Założeniem AUREX jest inwestowanie z cierpliwością i przekonaniem, bez presji terminów typowej dla funduszy, oraz współpraca z partnerami i kadrą zarządzającą, by budować, a nie jedynie alokować kapitał.",
    },
    approach: {
      eyebrow: "Podejście inwestycyjne",
      title: "Nasze podejście do inwestowania.",
      accent: ["inwestowania."],
      items: [
        { title: "Horyzont", text: "Domyślnie długoterminowy. Inwestycję utrzymujemy tak długo, jak tworzy wartość." },
        {
          title: "Spójność",
          text: "Preferujemy możliwości, które wzmacniają handel, dystrybucję lub dostęp do rynków w całej grupie.",
        },
        {
          title: "Partnerstwo",
          text: "Pomyślane jako współpraca z kadrą zarządzającą i współinwestorami, w której AUREX wnosi strukturę i ład korporacyjny.",
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
      title: "Dokąd będzie kierowany kapitał.",
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
      title: "Gdzie wartość może przepływać.",
      accent: ["przepływać."],
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
          text: "Od liderów oczekuje się działania w roli powierników kapitału i reputacji, a nie wyłącznie zarządzających bieżącą działalnością.",
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
        "AUREX dąży do rozwoju wspólnie z partnerami o standardach i horyzoncie zbieżnych z własnymi: producentami, dystrybutorami, przedsiębiorstwami, instytucjami i współinwestorami.",
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
        {
          title: "Zintegrowane kompetencje",
          text: "Handel, logistyka, dystrybucja i kapitał, zaprojektowane tak, by współdziałać w ramach jednej grupy.",
        },
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
        "Prosimy wybrać rodzaj zapytania i przedstawić jego cel, aby rozpocząć rozmowę z AUREX.",
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
      title: "Dziękujemy za kontakt z AUREX.",
      text: "Otrzymaliśmy zapytanie i skontaktujemy się z Państwem.",
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
      "Międzynarodowa grupa handlowa, holdingowa i inwestycyjna o europejskich korzeniach, stworzona, by łączyć rynki, partnerów i kapitał ponad granicami.",
    groups: { group: "Grupa", businesses: "Działalność", contact: "Zapytania" },
    rights: "Wszelkie prawa zastrzeżone.",
    languages: "Języki",
    legal: "Informacje prawne",
  },
};

export default pl;
