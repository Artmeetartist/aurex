import type { SiteContent } from "../types";

const fr: SiteContent = {
  meta: {
    siteName: "AUREX",
    tagline: "La valeur en mouvement",
    signature: "Standards européens. Portée mondiale.",
    description:
      "AUREX est un groupe international de négoce, de participations et d’investissement aux racines européennes, conçu pour relier marchés, partenaires et capitaux par-delà les frontières, dans la durée.",
    pages: {
      home: {
        title: "La valeur en mouvement",
        description:
          "Groupe international de négoce, de participations et d’investissement aux racines européennes, conçu pour relier marchés, partenaires et capitaux par-delà les frontières, dans la durée.",
      },
      about: {
        title: "À propos d’AUREX",
        description:
          "Un groupe aux racines européennes et à l’horizon mondial : négoce international, participations et investissement, sous une même philosophie de long terme.",
      },
      trade: {
        title: "Négoce",
        description:
          "Un négoce international structuré selon les standards européens : alimentaire, médical, composants électroniques, LARP & objets historiques, de l’approvisionnement à la distribution.",
      },
      sustainability: {
        title: "AUREX Green",
        description:
          "La transition verte : l’axe stratégique d’AUREX consacré aux matériaux durables, aux technologies propres, aux produits économes en ressources et aux chaînes d’approvisionnement à moindre impact.",
      },
      portfolio: {
        title: "Portefeuille & investissements",
        description:
          "Comment AUREX entend investir : capital patient, alignement stratégique et gouvernance avant tout, dans six secteurs d’intérêt stratégique.",
      },
      presence: {
        title: "Présence mondiale",
        description:
          "L’Europe au cœur, avec des corridors stratégiques vers le Golfe, l’Inde et l’Afrique. AUREX s’organise autour de corridors, non de marchés isolés.",
      },
      partnerships: {
        title: "Partenariats",
        description:
          "Modèles de partenariat pour producteurs, distributeurs, entreprises, institutions et co-investisseurs qui partagent les standards et l’horizon d’AUREX.",
      },
      contact: {
        title: "Contact",
        description: "Demandes de partenariat, d’investissement, d’entreprise et d’ordre général adressées à AUREX.",
      },
      privacy: {
        title: "Politique de confidentialité",
        description: "Comment sont traitées les informations transmises via le site internet d’AUREX.",
      },
    },
  },

  nav: {
    labels: {
      home: "Accueil",
      about: "À propos",
      trade: "Négoce",
      sustainability: "Durabilité",
      portfolio: "Portefeuille",
      presence: "Présence mondiale",
      partnerships: "Partenariats",
      contact: "Contact",
      privacy: "Confidentialité",
    },
    cta: "Engager le dialogue",
    menu: "Menu",
    close: "Fermer le menu",
    language: "Langue",
    skipToContent: "Aller au contenu",
    primaryLabel: "Navigation principale",
  },

  common: {
    readMore: "En savoir plus",
    breadcrumbHome: "Accueil",
    status: { core: "Cœur de métier", strategic: "Axe stratégique" },
    marketsFootnote:
      "Les marchés prioritaires indiquent une orientation stratégique. Ils ne désignent ni bureaux ni filiales.",
    comingSoon: "Publication à venir",
    scroll: "Défiler",
    backToTop: "Retour en haut",
    viewAll: "Tout voir",
  },

  home: {
    hero: {
      eyebrow: "Négoce international · Participations · Investissement",
      title: "La valeur en mouvement.",
      accent: ["mouvement."],
      intro:
        "AUREX est un groupe aux racines européennes conçu pour relier marchés, partenaires et capitaux par-delà les frontières, selon des standards institutionnels et dans une perspective de long terme.",
      primaryCta: "Découvrir le groupe",
      secondaryCta: "S’associer à AUREX",
      panelTitle: "Demandes directes",
      panelIntro: "Chaque échange avec AUREX commence par un mandat clair. Choisissez la voie adaptée au vôtre.",
      modes: { sea: "Mer", air: "Air", land: "Terre", connected: "Connecté" },
      scroll: "Défiler",
      pause: "Mettre en pause la vidéo d’arrière-plan",
      play: "Lire la vidéo d’arrière-plan",
    },
    who: {
      eyebrow: "Qui nous sommes",
      statement:
        "AUREX est un groupe international de négoce, de participations et d’investissement. Européen par ses origines comme par ses standards, tourné vers le monde, il est conçu pour relier producteurs, marchés et capitaux, et pour mesurer la valeur en décennies, non en transactions.",
      pillars: [
        {
          title: "Négoce",
          text: "Commerce transfrontalier, import et export, structurés avec la rigueur des standards européens.",
        },
        {
          title: "Participations",
          text: "Une structure de holding pensée pour la détention, la gestion responsable et l’alignement durable avec les partenaires.",
        },
        {
          title: "Investissement",
          text: "Un capital patient, destiné aux secteurs où se rencontrent commerce, infrastructures et croissance.",
        },
      ],
      link: "À propos du groupe",
    },
    motion: {
      eyebrow: "Nos métiers",
      title: "Faire circuler la valeur par mer, air et terre.",
      accent: ["valeur"],
      chapters: [
        {
          mode: "Mer",
          division: "trade",
          title: "Commerce international & EXIM",
          text: "Approvisionnement, import et export à l’international, conçus pour être structurés, documentés et exécutés selon les standards européens.",
        },
        {
          mode: "Air",
          division: "logistics",
          title: "Logistique",
          text: "Des flux coordonnés par mer, air et terre, planifiés en fonction de la fiabilité, de la conformité et des réalités propres à chaque corridor.",
        },
        {
          mode: "Terre",
          division: "distribution",
          title: "Distribution",
          text: "Des canaux d’accès au marché, conçus pour relier l’offre à la demande sur les marchés prioritaires.",
        },
        {
          mode: "Connecté",
          division: "holdings",
          title: "Participations, investissement & capital",
          text: "Une détention de long terme et un capital patient, conçus pour assurer la cohésion de la plateforme et faire fructifier la valeur d’un cycle à l’autre, d’une frontière à l’autre.",
        },
      ],
      link: "Découvrir nos activités",
    },
    trade: {
      eyebrow: "Négoce",
      title: "Des filières de négoce à vocation stratégique.",
      accent: ["stratégique."],
      intro:
        "Des filières de négoce spécialisées, chacune abordée avec discernement, aux côtés de partenaires qualifiés et selon ses propres mérites.",
      link: "Découvrir nos filières",
      greenLabel: "Produits et technologies durables",
    },
    green: {
      eyebrow: "AUREX Green",
      title: "La transition verte",
      subtitle: "Le négoce des produits et technologies qui façonnent un monde plus économe en ressources.",
      body: [
        "AUREX étend ses activités de négoce et d’investissement aux matériaux durables, aux technologies propres, aux produits économes en ressources et aux chaînes d’approvisionnement à moindre impact.",
        "Des matériaux recyclés et des emballages durables aux infrastructures d’énergie propre et à la logistique verte, nous relions les opportunités émergentes aux marchés internationaux.",
      ],
      primaryCta: "Découvrir AUREX Green",
      secondaryCta: "Devenir partenaire",
      stages: [
        "Énergie solaire",
        "Technologies propres",
        "Matériaux recyclés",
        "Emballages durables",
        "Mobilité électrique",
        "Logistique verte",
        "Distribution mondiale",
      ],
      pillarsEyebrow: "Piliers d’activité",
      explore: "Découvrir",
      flowLabel: "Le modèle AUREX",
      flow: ["Approvisionnement", "Négoce", "Distribution", "Investissement"],
      statement: "Bâtir le commerce d’un monde en mutation.",
      statementText:
        "AUREX Green traduit notre orientation vers les produits, technologies et opportunités durables susceptibles de circuler sur les marchés mondiaux.",
      statementCta: "Échanger sur un partenariat",
      note: "AUREX Green constitue un axe stratégique de développement du négoce et de l’investissement.",
    },
    reach: {
      eyebrow: "Portée mondiale",
      title: "L’Europe au cœur. Des corridors vers le Golfe, l’Inde et l’Afrique.",
      accent: ["cœur."],
      intro:
        "AUREX est façonné par les standards européens et tourné vers les corridors qui relient l’Europe au Moyen-Orient, à l’Inde et à l’Afrique.",
      footnote:
        "Les marchés prioritaires indiquent une orientation stratégique. Ils ne désignent ni bureaux ni filiales.",
      link: "Voir notre présence mondiale",
      legend: { focus: "Marché prioritaire", corridor: "Corridor indicatif" },
    },
    capital: {
      eyebrow: "Investissements & participations",
      title: "Un capital patient, détenu à dessein.",
      accent: ["dessein."],
      intro:
        "AUREX est conçu pour investir avec patience et conviction, hors de tout calendrier de fonds. Le capital a vocation à être orienté là où il renforce la plateforme, et à être conservé aussi longtemps qu’il crée de la valeur.",
      principles: [
        {
          title: "Horizon long",
          text: "Nous visons à construire, pas seulement à allouer, et à mesurer les résultats sur des cycles plutôt que sur des trimestres.",
        },
        {
          title: "Alignement stratégique",
          text: "Une préférence pour les investissements qui renforcent le commerce, la distribution et l’accès aux marchés à l’échelle du groupe.",
        },
        {
          title: "La gouvernance d’abord",
          text: "Des structures claires, des décisions documentées et une gestion responsable dès l’origine.",
        },
      ],
      note: "Les participations sont rendues publiques une fois formalisées.",
      cta: "Demandes d’investissement",
    },
    why: {
      eyebrow: "Pourquoi AUREX",
      title: "Bâti pour les décennies, pas pour les transactions.",
      accent: ["décennies,"],
      intro:
        "La résilience plutôt que la vitesse. La réputation plutôt que le volume. La valeur à long terme plutôt que le gain à court terme.",
      pillars: [
        {
          title: "Standards européens",
          text: "Des normes européennes de conformité, de documentation et de conduite, qu’AUREX est conçu pour appliquer partout où il intervient.",
        },
        {
          title: "Gouvernance & transparence",
          text: "Actionnariat clair, mandats clairs, reporting clair envers les partenaires. La confiance s’inscrit dans la structure avant de se gagner par les résultats.",
        },
        {
          title: "Perspective transfrontalière",
          text: "Un groupe conçu autour de corridors plutôt que de marchés isolés, reliant l’Europe au Golfe, à l’Inde et à l’Afrique.",
        },
        {
          title: "Valeur de long terme",
          text: "La résilience plutôt que la vitesse, la réputation plutôt que le volume. Nous visons à faire fructifier la valeur d’un cycle à l’autre, d’une frontière à l’autre.",
        },
      ],
    },
    partnerships: {
      eyebrow: "Partenariats stratégiques",
      title: "Une croissance bâtie sur le partenariat.",
      accent: ["partenariat."],
      intro:
        "AUREX cherche à travailler avec des producteurs, distributeurs, entreprises, institutions et co-investisseurs dont les standards et l’horizon rejoignent les siens.",
      cta: "Découvrir nos partenariats",
    },
    leadership: {
      eyebrow: "Direction & gouvernance",
      title: "Une gestion responsable, par construction.",
      accent: ["responsable,"],
      intro:
        "AUREX est conçu pour être dirigé selon un mandat de long terme : responsabilités claires, décisions documentées et une culture de gouvernance établie avant le changement d’échelle, non après.",
      principles: [
        "Mandats clairs et responsabilités assumées",
        "Décisions documentées et vérifiables",
        "Alignement sur les intérêts de long terme des partenaires",
        "Conformité intégrée dès l’origine",
      ],
      link: "Direction & gouvernance",
    },
    contact: {
      eyebrow: "Contact",
      title: "Engager le dialogue.",
      accent: ["dialogue."],
      intro:
        "Que vous représentiez une institution, une entreprise, un producteur ou un investisseur, présentez votre mandat pour engager le dialogue avec AUREX.",
      direct: "Vous préférez l’e-mail ?",
    },
  },

  divisions: {
    trade: {
      name: "Commerce international & EXIM",
      short: "Commerce & EXIM",
      summary:
        "Approvisionnement, import et export à l’international, conçus autour des standards européens de documentation, de conformité et de vérification des contreparties.",
      scope: [
        "Approvisionnement & achats",
        "Import & export (EXIM)",
        "Vérification des contreparties & conformité",
        "Structuration des transactions",
      ],
    },
    logistics: {
      name: "Logistique",
      short: "Logistique",
      summary:
        "Coordination des flux par mer, air et terre, avec des partenaires logistiques sélectionnés pour leur fiabilité sur chaque corridor.",
      scope: [
        "Coordination multimodale",
        "Planification des corridors",
        "Douanes & documentation",
        "Gestion du réseau de partenaires",
      ],
    },
    distribution: {
      name: "Distribution",
      short: "Distribution",
      summary:
        "Des canaux d’accès au marché, conçus pour relier l’offre à la demande sur les marchés prioritaires.",
      scope: ["Partenariats de distribution", "Entrée sur le marché", "Développement des canaux"],
    },
    holdings: {
      name: "Participations, investissement & capital",
      short: "Participations & capital",
      summary:
        "Le socle actionnarial du groupe : des participations de long terme et un capital patient, conçus pour fédérer commerce, logistique et distribution en une plateforme unique.",
      scope: [
        "Participations de long terme",
        "Investissement stratégique",
        "Co-investissement",
        "Gouvernance & gestion responsable",
      ],
    },
  },

  sectors: {
    food: {
      name: "Alimentaire",
      summary:
        "Approvisionnement, commerce et distribution de produits alimentaires entre marchés producteurs et marchés consommateurs.",
      focus: ["Approvisionnement transfrontalier", "Import & export", "Partenariats de distribution"],
    },
    property: {
      name: "Foncier & immobilier",
      summary:
        "Des opportunités d’actifs réels à long horizon, où le capital et le partenariat local peuvent créer une valeur durable.",
      focus: ["Actifs réels", "Co-investissement", "Détention de long terme"],
    },
    medical: {
      name: "Médical",
      summary:
        "Produits et équipements médicaux, un domaine où qualité, conformité et traçabilité ne se négocient pas.",
      focus: ["Fournitures médicales", "Équipements", "Diligence réglementaire"],
    },
    electronics: {
      name: "Composants électroniques",
      summary:
        "Commerce de composants et de pièces électroniques, reliant des fournisseurs qualifiés à la demande industrielle.",
      focus: ["Composants", "Pièces & équipements", "Qualification des fournisseurs"],
    },
    sustainability: {
      name: "Durabilité & transition écologique",
      summary:
        "Des opportunités liées à la transition énergétique et à celle des ressources, abordées avec la même rigueur que tout actif de long terme.",
      focus: ["Transition écologique", "Efficacité des ressources", "Actifs de long terme"],
    },
    larp: {
      name: "LARP & objets historiques",
      summary:
        "Costumes, armures, accessoires et reproductions historiques pour le jeu de rôle grandeur nature (GN), la reconstitution et le théâtre.",
      focus: ["Costumes & armures", "Accessoires de scène", "Reproductions historiques"],
    },
  },

  markets: {
    eu: {
      name: "Union européenne",
      role: "Cœur",
      detail: "Le cadre de référence du groupe en matière de standards, de gouvernance et de conduite.",
    },
    pl: {
      name: "Pologne",
      role: "Marché prioritaire",
      detail:
        "Un marché faisant l’objet d’une attention particulière au sein de l’Union européenne, au carrefour des échanges d’Europe centrale.",
    },
    ae: {
      name: "EAU & Moyen-Orient",
      role: "Passerelle",
      detail: "Une plaque tournante naturelle entre l’Europe, l’Asie et l’Afrique pour le commerce, le capital et la logistique.",
    },
    in: {
      name: "Inde",
      role: "Corridor de croissance",
      detail: "Une économie vaste et en évolution rapide, et un corridor stratégique pour l’approvisionnement et le commerce.",
    },
    af: {
      name: "Afrique",
      role: "Horizon de long terme",
      detail:
        "Un continent d’opportunités de long terme dans le commerce, l’alimentaire et les infrastructures, abordé avec patience et aux côtés de partenaires.",
    },
  },

  partnerModels: {
    suppliers: {
      name: "Producteurs & fournisseurs",
      summary: "Des producteurs qualifiés en quête d’un accès fiable et bien structuré à de nouveaux marchés.",
      examples: ["Contrats d’approvisionnement", "Développement à l’export", "Alignement qualité & conformité"],
    },
    distributors: {
      name: "Distributeurs",
      summary: "Des distributeurs établis à la recherche d’un approvisionnement fiable et d’une coopération durable.",
      examples: ["Contrats de distribution", "Entrée sur le marché", "Développement de catégories"],
    },
    corporate: {
      name: "Entreprises & institutions",
      summary:
        "Des entreprises et des institutions qui ont besoin d’un interlocuteur structuré pour leurs échanges et leurs achats transfrontaliers.",
      examples: ["Programmes d’achats", "Approvisionnement transfrontalier", "Collaboration stratégique"],
    },
    capital: {
      name: "Co-investisseurs & partenaires financiers",
      summary:
        "Des investisseurs en phase avec une démarche patiente, fondée sur la gouvernance, pour bâtir une valeur de long terme.",
      examples: ["Co-investissement", "Coentreprises", "Participations de long terme"],
    },
  },

  trades: {
    food: {
      name: "Alimentaire",
      title: "L’alimentaire, négocié en toute traçabilité.",
      accent: ["traçabilité."],
      intro:
        "AUREX est conçu pour relier les régions productrices aux marchés de consommation, avec la documentation, le contrôle qualité et la continuité qu’exigent les acheteurs institutionnels.",
      overview:
        "Dans le négoce alimentaire, la fiabilité prime sur tout : qualité constante, origine vérifiable et logistique sûre. AUREX aborde l’alimentaire comme une filière de long terme et s’attache à nouer des partenariats avec des producteurs qualifiés et des distributeurs établis sur les marchés prioritaires.",
      categories: [
        {
          title: "Denrées de base",
          text: "Céréales, riz et légumineuses, pour lesquels spécifications et continuité sont essentielles.",
          items: ["Blé & céréales", "Riz", "Légumineuses & lentilles"],
        },
        {
          title: "Huiles & matières grasses alimentaires",
          text: "Des huiles végétales en vrac et conditionnées pour l’industrie, le commerce de gros et la distribution de détail.",
          items: ["Huile de tournesol", "Huile de colza", "Huile d’olive"],
        },
        {
          title: "Sucres & édulcorants",
          text: "Sucres raffinés et bruts, et édulcorants, destinés aux fabricants et aux distributeurs.",
          items: ["Sucre raffiné", "Sucre de canne brut", "Sirops"],
        },
        {
          title: "Produits conditionnés & spécialités",
          text: "Des produits finis destinés aux circuits de détail, de gros et de l’hôtellerie-restauration.",
          items: ["Marques de distributeur", "Spécialités régionales", "Boissons"],
        },
        {
          title: "Produits sous température dirigée",
          text: "Des produits dont la qualité dépend d’une chaîne du froid ininterrompue, de l’origine à la destination.",
          items: ["Produits surgelés", "Produits laitiers", "Produits frais"],
        },
        {
          title: "Ingrédients alimentaires",
          text: "Des intrants pour l’industrie agroalimentaire, spécifiés selon la formulation de l’acheteur.",
          items: ["Farines & amidons", "Fruits secs & à coque", "Épices & assaisonnements"],
        },
      ],
      flow: [
        {
          title: "Origine",
          text: "Des producteurs et des régions de culture qualifiés au regard de la qualité, de la sécurité et de la documentation d’origine.",
        },
        {
          title: "Spécification",
          text: "Qualité, conditionnement, étiquetage et durée de conservation définis en fonction du marché de destination.",
        },
        {
          title: "Acheminement",
          text: "Un transport à température ambiante ou dirigée, avec des inspections à des étapes définies.",
        },
        {
          title: "Marché",
          text: "Livraison aux importateurs, aux grossistes et aux circuits de la distribution et de la restauration hors foyer.",
        },
      ],
      approach: [
        {
          title: "Origine & qualité",
          text: "Des producteurs qualifiés au regard de normes documentées de qualité, de sécurité et d’origine.",
        },
        {
          title: "Conformité",
          text: "Sécurité alimentaire, étiquetage et exigences à l’importation traités avant tout mouvement de marchandises.",
        },
        {
          title: "Documentation",
          text: "Des certificats d’origine, d’analyse et de conformité appelés à accompagner chaque expédition.",
        },
        {
          title: "Continuité",
          text: "Un approvisionnement planifié dans la régularité plutôt qu’au gré de transactions ponctuelles.",
        },
      ],
      standards: [
        {
          title: "Législation alimentaire générale",
          ref: "Règlement (CE) n° 178/2002",
          text: "Le cadre de l’UE en matière de sécurité et de traçabilité des denrées alimentaires, une étape en amont et une étape en aval.",
        },
        {
          title: "Hygiène alimentaire & HACCP",
          ref: "Règlement (CE) n° 852/2004",
          text: "Les obligations d’hygiène des exploitants du secteur alimentaire, fondées sur les principes HACCP.",
        },
        {
          title: "Information des consommateurs sur les denrées alimentaires",
          ref: "Règlement (UE) n° 1169/2011",
          text: "Étiquetage, allergènes et informations nutritionnelles des denrées alimentaires mises sur le marché de l’UE.",
        },
        {
          title: "Certification reconnue par la GFSI",
          ref: "BRCGS · IFS · FSSC 22000",
          text: "Des référentiels de certification pertinents pour la qualification des producteurs, des conditionneurs et des transformateurs.",
        },
      ],
      counterparts: [
        {
          title: "Producteurs & transformateurs",
          text: "Exploitations agricoles, meuneries, conditionneurs et transformateurs dotés de systèmes qualité documentés.",
        },
        {
          title: "Importateurs & grossistes",
          text: "Des distributeurs établis au service des marchés prioritaires.",
        },
        {
          title: "Distribution & restauration",
          text: "Groupes de distribution, détenteurs de marques de distributeur et acheteurs de l’hôtellerie-restauration.",
        },
        {
          title: "Industriels de l’agroalimentaire",
          text: "Des fabricants qui s’approvisionnent en ingrédients selon leurs spécifications.",
        },
      ],
      cta: {
        title: "Échanger sur le négoce alimentaire.",
        accent: ["alimentaire."],
        primary: "Soumettre une demande de partenariat",
      },
    },
    medical: {
      name: "Médical",
      title: "L’approvisionnement médical, la conformité avant tout.",
      accent: ["conformité"],
      intro:
        "Les produits et équipements médicaux exigent une qualité documentée, une conformité réglementaire et une traçabilité complète. AUREX aborde ce secteur avec toute la rigueur qu’il requiert.",
      overview:
        "Les chaînes d’approvisionnement de santé ne tolèrent aucune incertitude. L’approche d’AUREX en matière de négoce médical repose sur la diligence réglementaire, des fabricants qualifiés et des flux traçables, ainsi que sur l’exigence que ses partenaires détiennent les autorisations requises sur chaque marché.",
      categories: [
        {
          title: "Consommables médicaux",
          text: "Des consommables cliniques courants, pour lesquels régularité et conformité sont essentielles.",
          items: ["Gants & champs opératoires", "Seringues & aiguilles", "Soin des plaies"],
        },
        {
          title: "Dispositifs & équipements",
          text: "Dispositifs médicaux et équipements destinés aux structures de soins et aux acheteurs institutionnels.",
          items: ["Dispositifs de diagnostic", "Surveillance des patients", "Aides à la mobilité"],
        },
        {
          title: "Équipements de protection",
          text: "Équipements de protection individuelle pour la santé et l’industrie.",
          items: ["Masques & protections respiratoires", "Blouses & combinaisons", "Protection des yeux & du visage"],
        },
        {
          title: "Mobilier & fournitures hospitaliers",
          text: "Aménagements et fournitures pour les services hospitaliers, les cliniques et les établissements de soins.",
          items: ["Lits & brancards", "Chariots & dessertes", "Textiles hospitaliers"],
        },
        {
          title: "Fournitures de laboratoire",
          text: "Consommables et équipements pour les laboratoires cliniques et de recherche.",
          items: ["Prélèvement d’échantillons", "Matériel de laboratoire", "Conservation au froid"],
        },
        {
          title: "Hygiène & prévention des infections",
          text: "Des produits de nettoyage, de désinfection et de prévention des infections.",
          items: ["Désinfectants", "Hygiène des mains", "Consommables de stérilisation"],
        },
      ],
      flow: [
        {
          title: "Fabricant",
          text: "Des fabricants évalués sur leurs systèmes de management de la qualité et leur documentation technique.",
        },
        {
          title: "Conformité",
          text: "Vérification du marquage CE, des déclarations de conformité et des enregistrements sur le marché de destination.",
        },
        {
          title: "Acheminement",
          text: "Un stockage et un transport maîtrisés, préservant l’identification des lots.",
        },
        {
          title: "Destinataire",
          text: "Approvisionnement des distributeurs autorisés, des institutions et des acheteurs du secteur de la santé.",
        },
      ],
      approach: [
        {
          title: "Conformité réglementaire",
          text: "Des produits évalués au regard des exigences applicables de l’UE et des marchés de destination.",
        },
        {
          title: "Fabricants qualifiés",
          text: "Des fabricants évalués sur leurs systèmes qualité et leur documentation.",
        },
        {
          title: "Traçabilité",
          text: "Une documentation au niveau du lot, du fabricant jusqu’au destinataire.",
        },
        {
          title: "Circuits autorisés",
          text: "Un approvisionnement exclusivement assuré par des partenaires détenant les autorisations requises sur chaque marché.",
        },
      ],
      standards: [
        {
          title: "Règlement relatif aux dispositifs médicaux",
          ref: "Règlement (UE) 2017/745",
          text: "Les exigences de mise sur le marché de l’UE des dispositifs médicaux, y compris la traçabilité par l’IUD.",
        },
        {
          title: "Règlement relatif aux dispositifs de diagnostic in vitro",
          ref: "Règlement (UE) 2017/746",
          text: "Le cadre de l’UE applicable aux dispositifs médicaux de diagnostic in vitro.",
        },
        {
          title: "Management de la qualité",
          ref: "ISO 13485",
          text: "La norme de management de la qualité attendue des fabricants de dispositifs médicaux.",
        },
        {
          title: "Équipements de protection individuelle",
          ref: "Règlement (UE) 2016/425",
          text: "Les exigences de conception, de fabrication et de conformité applicables aux EPI.",
        },
      ],
      counterparts: [
        {
          title: "Fabricants",
          text: "Des fabricants de dispositifs et de consommables dotés de systèmes qualité certifiés.",
        },
        {
          title: "Distributeurs autorisés",
          text: "Des distributeurs agréés sur leurs marchés, dotés de compétences réglementaires.",
        },
        {
          title: "Établissements de santé",
          text: "Hôpitaux, cliniques et prestataires de soins, par l’intermédiaire de leurs circuits d’achat.",
        },
        {
          title: "Organismes d’achat",
          text: "Centrales et groupements d’achat au service du secteur de la santé.",
        },
      ],
      cta: {
        title: "Échanger sur l’approvisionnement médical.",
        accent: ["médical."],
        primary: "Soumettre une demande de partenariat",
      },
    },
    electronics: {
      name: "Composants électroniques",
      title: "Des composants au service de la demande industrielle.",
      accent: ["industrielle."],
      intro:
        "AUREX est conçu pour relier des fournisseurs qualifiés de composants et de pièces électroniques aux fabricants et aux acheteurs industriels, avec les garanties d’authenticité et la documentation qu’exige le secteur.",
      overview:
        "En matière de composants électroniques, tout repose sur la provenance. L’approche d’AUREX est centrée sur la qualification des fournisseurs, les contrôles d’authenticité et une chaîne de traçabilité documentée, afin que les acheteurs industriels puissent s’approvisionner en toute confiance.",
      categories: [
        {
          title: "Semi-conducteurs & circuits intégrés",
          text: "Circuits intégrés, microcontrôleurs, mémoires et semi-conducteurs discrets.",
          items: ["Microcontrôleurs", "Mémoires", "Semi-conducteurs discrets"],
        },
        {
          title: "Composants passifs",
          text: "Résistances, condensateurs, inductances et pièces associées, en volumes de production.",
          items: ["Condensateurs", "Résistances", "Inductances"],
        },
        {
          title: "Pièces électromécaniques",
          text: "Connecteurs, relais, commutateurs et assemblages destinés aux applications industrielles.",
          items: ["Connecteurs", "Relais", "Commutateurs"],
        },
        {
          title: "Capteurs & modules",
          text: "Modules de détection, de communication et d’interface pour les fabricants d’équipements.",
          items: ["Capteurs", "Modules sans fil", "Écrans"],
        },
        {
          title: "Composants de puissance",
          text: "Des composants pour la conversion de puissance, la protection et le stockage d’énergie.",
          items: ["Alimentations", "Semi-conducteurs de puissance", "Protection des circuits"],
        },
        {
          title: "Pièces d’équipements industriels",
          text: "Pièces et sous-ensembles au service de la production et de la maintenance.",
          items: ["Pièces d’automatisme", "Pièces de rechange", "Sous-ensembles"],
        },
      ],
      flow: [
        {
          title: "Approvisionnement",
          text: "Des distributeurs franchisés et des sources indépendantes qualifiées, privilégiés selon leur traçabilité jusqu’au fabricant.",
        },
        {
          title: "Vérification",
          text: "Examen documentaire et inspection conformes aux pratiques de prévention de la contrefaçon.",
        },
        {
          title: "Manutention",
          text: "Des pièces sensibles à l’humidité et aux décharges électrostatiques stockées et conditionnées selon les spécifications.",
        },
        {
          title: "Livraison",
          text: "Livraison aux fabricants et aux acheteurs industriels, avec les enregistrements de la chaîne de traçabilité.",
        },
      ],
      approach: [
        {
          title: "Qualification des fournisseurs",
          text: "Des fournisseurs évalués en matière d’authenticité, de systèmes qualité et de continuité.",
        },
        {
          title: "Authenticité",
          text: "Une documentation et des inspections qui protègent contre les pièces contrefaites.",
        },
        {
          title: "Manutention & conditionnement",
          text: "Protection ESD, maîtrise de la sensibilité à l’humidité et conservation de l’emballage d’origine.",
        },
        {
          title: "Conformité à l’export",
          text: "Vérification des exigences relatives aux biens à double usage et au contrôle des exportations avant tout engagement.",
        },
      ],
      standards: [
        {
          title: "Prévention de la contrefaçon",
          ref: "SAE AS6081 · AS5553",
          text: "Des normes sectorielles pour détecter et prévenir les pièces électroniques contrefaites.",
        },
        {
          title: "Substances dangereuses",
          ref: "Directive 2011/65/UE (RoHS)",
          text: "La limitation des substances dangereuses dans les équipements électriques et électroniques.",
        },
        {
          title: "Substances chimiques dans les articles",
          ref: "Règlement (CE) n° 1907/2006 (REACH)",
          text: "Les obligations de communication sur les substances extrêmement préoccupantes présentes dans les articles.",
        },
        {
          title: "Contrôle des exportations de biens à double usage",
          ref: "Règlement (UE) 2021/821",
          text: "Le contrôle des exportations, du courtage et du transit des biens à double usage.",
        },
      ],
      counterparts: [
        {
          title: "Fabricants de composants",
          text: "Les fabricants et leurs réseaux de distribution franchisés.",
        },
        {
          title: "Sous-traitants électroniques",
          text: "Prestataires EMS et assembleurs produisant selon les conceptions de leurs clients.",
        },
        {
          title: "Fabricants d’équipements",
          text: "Des équipementiers (OEM) des secteurs de l’industrie, de l’énergie et de l’automatisation.",
        },
        {
          title: "Maintenance & exploitation",
          text: "Des acheteurs industriels qui s’approvisionnent en pièces pour la maintenance, la réparation et l’exploitation.",
        },
      ],
      cta: {
        title: "Échanger sur l’approvisionnement en composants.",
        accent: ["l’approvisionnement"],
        primary: "Soumettre une demande de partenariat",
      },
    },
    larp: {
      name: "LARP & objets historiques",
      title: "Des pièces artisanales pour l’histoire vivante.",
      accent: ["vivante."],
      intro:
        "Costumes, armures, accessoires et reproductions historiques pour le jeu de rôle grandeur nature (GN), la reconstitution historique et le théâtre, en reliant des artisans expérimentés aux détaillants spécialisés, aux organisateurs et aux productions.",
      overview:
        "Le jeu de rôle grandeur nature, la reconstitution historique et le théâtre reposent sur des pièces d’apparence authentique, durables à l’usage et sûres à porter. AUREX aborde ce marché spécialisé comme toute autre filière de négoce : avec des artisans qualifiés, des spécifications claires et une logistique fiable.",
      categories: [
        {
          title: "Armures de mailles",
          text: "Des mailles d’acier, rivetées ou aboutées, des chemises complètes aux pièces individuelles.",
          items: ["Hauberts & chemises", "Coiffes", "Pèlerines & camails"],
        },
        {
          title: "Armures de plates & de cuir",
          text: "Casques, armures de plates et de cuir durci pour les événements et le spectacle.",
          items: ["Casques", "Gantelets & brassards", "Cuirasses en cuir"],
        },
        {
          title: "Tenues & costumes",
          text: "Vêtements d’époque et d’inspiration fantasy, textiles et accessoires.",
          items: ["Tuniques & gambisons", "Capes", "Robes & surcots"],
        },
        {
          title: "Accessoires & reproductions",
          text: "Accessoires sûrs pour un usage événementiel, reproductions historiques et pièces décoratives.",
          items: ["Accessoires en mousse & latex", "Répliques", "Pièces décoratives"],
        },
        {
          title: "Maroquinerie & accessoires",
          text: "Ceintures, bourses, sacs et pièces de finition qui complètent un personnage.",
          items: ["Ceintures & bourses", "Sacs & fourreaux", "Boucles & garnitures"],
        },
        {
          title: "Matériel de camp & d’événement",
          text: "Tentes, mobilier et vaisselle pour les campements et les événements d’époque.",
          items: ["Tentes d’époque", "Mobilier de camp", "Vaisselle & éclairage"],
        },
      ],
      flow: [
        {
          title: "Atelier",
          text: "Des artisans et des fabricants sélectionnés pour leur savoir-faire, leurs matériaux et leur capacité.",
        },
        {
          title: "Spécification",
          text: "Tailles, matériaux, finitions et exigences de sécurité événementielle convenus en amont.",
        },
        {
          title: "Acheminement",
          text: "Une expédition groupée des marchandises lourdes et volumineuses, emballées pour protéger les finitions.",
        },
        {
          title: "Marché",
          text: "Distribution auprès des détaillants spécialisés, des organisateurs d’événements et des productions.",
        },
      ],
      approach: [
        {
          title: "Artisans expérimentés",
          text: "Des ateliers et des fabricants sélectionnés pour leur savoir-faire et leur constance.",
        },
        {
          title: "Sécurité & matériaux",
          text: "Des matériaux et des finitions évalués pour un usage sûr lors d’événements et sur scène.",
        },
        {
          title: "Spécifications & tailles",
          text: "Des spécifications claires de tailles, de poids et de matériaux pour chaque gamme.",
        },
        {
          title: "Distribution spécialisée",
          text: "Des canaux d’accès au marché via les détaillants, les organisateurs et les productions.",
        },
      ],
      standards: [
        {
          title: "Sécurité générale des produits",
          ref: "Règlement (UE) 2023/988 (GPSR)",
          text: "Les exigences de sécurité applicables aux produits de consommation mis sur le marché de l’UE.",
        },
        {
          title: "Libération de nickel",
          ref: "REACH, annexe XVII, entrée 27",
          text: "Les limites de libération de nickel des objets métalliques en contact prolongé avec la peau.",
        },
        {
          title: "Étiquetage des textiles",
          ref: "Règlement (UE) n° 1007/2011",
          text: "Dénominations des fibres et étiquetage de la composition des produits textiles.",
        },
        {
          title: "Répliques & règles événementielles",
          ref: "Règles nationales et propres à chaque événement",
          text: "Les règles relatives aux répliques d’armes et aux accessoires varient selon les pays et les événements, et sont évaluées marché par marché.",
        },
      ],
      counterparts: [
        {
          title: "Ateliers & artisans",
          text: "Armuriers, forgerons, maroquiniers et costumiers.",
        },
        {
          title: "Détaillants spécialisés",
          text: "Des boutiques physiques et en ligne dédiées au GN et à la reconstitution historique.",
        },
        {
          title: "Organisateurs d’événements",
          text: "Organisateurs d’événements de GN, de festivals et de reconstitutions historiques.",
        },
        {
          title: "Théâtre & productions",
          text: "Des productions de théâtre, de cinéma et de télévision qui s’approvisionnent en costumes et en accessoires.",
        },
      ],
      showcase: {
        eyebrow: "Gros plan",
        title: "L’art de la cotte de mailles.",
        accent: ["mailles."],
        text: "La maille compte parmi les plus anciennes formes d’armure, et reste l’une des plus exigeantes à bien réaliser. Une seule chemise peut réunir des dizaines de milliers d’anneaux, chacun fermé à la main. La taille des anneaux, le calibre du fil et le mode de fermeture, riveté ou abouté, déterminent son poids, sa solidité et son authenticité.",
        setCaption: "Gamme présentée à titre indicatif : chemises de mailles, haubert, coiffe et pèlerine, avec garnitures en cuir et en laiton.",
        details: [
          {
            key: "weave",
            title: "Le maillage",
            text: "Le motif européen quatre-en-un : chaque anneau passe dans quatre autres, pour la solidité et le tombé.",
          },
          {
            key: "buckles",
            title: "Sangles & boucles",
            text: "Des sangles en cuir et des boucles métalliques ferment le vêtement et permettent de l’ajuster à celui qui le porte.",
          },
          {
            key: "collar",
            title: "Le col",
            text: "Un col en cuir à garnitures de laiton termine l’encolure et répartit le poids de manière uniforme.",
          },
          {
            key: "coif",
            title: "La coiffe",
            text: "Une capuche de mailles qui protège la tête et le cou, portée sous un casque ou seule.",
          },
          {
            key: "mantle",
            title: "La pèlerine",
            text: "Une cape de mailles couvrant les épaules, à col de cuir doublé, portée par-dessus une chemise pour une meilleure couverture.",
          },
        ],
      },
      cta: {
        title: "Échanger sur le LARP & les objets historiques.",
        accent: ["historiques."],
        primary: "Soumettre une demande de partenariat",
      },
    },
  },

  tradePage: {
    eyebrow: "Filière de négoce",
    overview: "Vue d’ensemble",
    categoriesEyebrow: "Catégories prioritaires",
    categoriesTitle: "Le périmètre de la filière.",
    examplesLabel: "Exemples",
    flowEyebrow: "De l’origine au marché",
    flowTitle: "Le parcours des marchandises.",
    approachEyebrow: "Approche",
    approachTitle: "Comment AUREX l’aborde.",
    standardsEyebrow: "Normes & cadres de référence",
    standardsTitle: "Les règles qui encadrent le négoce.",
    standardsNote:
      "Cadres de référence pris en compte par AUREX pour qualifier ses partenaires et ses produits. Les exigences varient selon le produit et le marché de destination. Il ne s’agit pas d’une déclaration de certification.",
    counterpartsEyebrow: "Contreparties",
    counterpartsTitle: "Avec qui AUREX cherche à travailler.",
    counterpartsCta: "Proposer un partenariat",
    corridorsEyebrow: "Marchés prioritaires",
    otherEyebrow: "Autres filières",
    allTrade: "Toutes les filières",
  },

  greenPillars: {
    materials: {
      name: "Matériaux verts",
      summary: "Des matériaux recyclés, circulaires et biosourcés qui gagnent de nouveaux marchés.",
      detail:
        "Métaux, polymères et fibres recyclés, intrants circulaires et alternatives biosourcées deviennent des matériaux industriels à part entière. AUREX recherche des opportunités de les faire circuler entre les producteurs et les industriels qui en ont besoin.",
      focus: ["Matériaux recyclés", "Intrants circulaires", "Alternatives biosourcées"],
    },
    energy: {
      name: "Énergie propre",
      summary:
        "Solaire, stockage d’énergie, infrastructures pour véhicules électriques et technologies d’efficacité énergétique.",
      detail:
        "La transition énergétique est, par essence, un commerce d’équipements et de composants. L’intérêt d’AUREX porte sur les équipements solaires et de stockage, les infrastructures de recharge pour véhicules électriques et les technologies qui améliorent l’efficacité énergétique.",
      focus: ["Solaire & stockage", "Infrastructures pour VE", "Efficacité énergétique"],
    },
    commerce: {
      name: "Commerce durable",
      summary:
        "Agriculture et emballages durables, produits de spécialité et solutions économes en ressources.",
      detail:
        "La durabilité caractérise de plus en plus les produits du quotidien, des produits agricoles et des emballages aux produits de spécialité conçus pour consommer moins de ressources.",
      focus: ["Agriculture durable", "Emballages durables", "Produits économes en ressources"],
    },
    logistics: {
      name: "Logistique verte",
      summary:
        "Des transports plus efficients, des chaînes d’approvisionnement optimisées et une distribution à moindre impact.",
      detail:
        "La manière dont les marchandises circulent compte autant que leur nature. AUREX apporte son regard de logisticien à des transports plus efficients, à des chaînes d’approvisionnement mieux planifiées et à une distribution à moindre impact.",
      focus: ["Transport efficient", "Chaînes d’approvisionnement optimisées", "Distribution à moindre impact"],
    },
  },

  sustainability: {
    hero: {
      eyebrow: "AUREX Green",
      title: "La transition verte",
      accent: ["verte"],
      intro: "Le négoce des produits et technologies qui façonnent un monde plus économe en ressources.",
    },
    intro: {
      eyebrow: "AUREX Green",
      title: "La durabilité, partie intégrante du commerce concret.",
      accent: ["concret."],
    },
    ecosystem: {
      eyebrow: "L’écosystème",
      title: "De la source à la distribution mondiale.",
      accent: ["mondiale."],
    },
    pillars: {
      eyebrow: "Piliers d’activité",
      title: "Les quatre piliers d’AUREX Green.",
      accent: ["piliers"],
    },
    flow: {
      eyebrow: "Le modèle AUREX",
      title: "Approvisionnement. Négoce. Distribution. Investissement.",
      accent: ["Investissement."],
      intro:
        "AUREX Green suit le même modèle que le reste du groupe : une maison de négoce et de participations, non un cabinet de conseil.",
      steps: [
        {
          title: "Approvisionnement",
          text: "Identifier des producteurs crédibles de produits et de technologies durables.",
        },
        {
          title: "Négoce",
          text: "Structurer des transactions transfrontalières, documentation et diligences à l’appui.",
        },
        {
          title: "Distribution",
          text: "Développer des canaux d’accès au marché avec des partenaires logistiques et de distribution.",
        },
        {
          title: "Investissement",
          text: "Engager des capitaux de long terme là où émerge une valeur durable.",
        },
      ],
    },
    principles: {
      eyebrow: "Notre approche",
      title: "La crédibilité avant les allégations.",
      accent: ["crédibilité"],
      items: [
        {
          title: "Allégations produit vérifiables",
          text: "Des attributs environnementaux étayés par une documentation, non par le marketing.",
        },
        {
          title: "Chaînes d’approvisionnement traçables",
          text: "Une origine et des flux documentés, de la source à la destination.",
        },
        {
          title: "Solidité commerciale",
          text: "Des opportunités qui reposent sur leur propre équilibre économique, et pas uniquement sur des subventions.",
        },
        {
          title: "Partenariat de long terme",
          text: "Des relations structurées pour se développer à mesure que les marchés mûrissent.",
        },
      ],
    },
    note: "AUREX Green constitue un axe stratégique de développement du négoce et de l’investissement. Les catégories présentées sont des domaines d’intérêt et ne représentent pas chacune une activité établie d’AUREX.",
  },

  about: {
    hero: {
      eyebrow: "À propos d’AUREX",
      title: "Un groupe aux racines européennes, à l’horizon mondial.",
      accent: ["mondial."],
      intro:
        "AUREX réunit négoce international, participations et investissement autour d’une même philosophie : la valeur se crée en la faisant circuler avec soin par-delà les frontières, et en la détenant sur le long terme.",
    },
    statement:
      "Le nom AUREX évoque aurum, le mot latin désignant l’or, mesure durable de la valeur, et l’échange : la circulation de cette valeur entre les marchés et par-delà les frontières.",
    story: {
      eyebrow: "Notre histoire",
      title: "La valeur, portée plus loin.",
      accent: ["loin."],
      paragraphs: [
        "AUREX est conçu comme un groupe international plutôt que comme une entreprise tournée vers un seul marché : une structure pensée pour commercer, détenir et investir le long des corridors qui relient l’Europe au Moyen-Orient, à l’Inde et à l’Afrique.",
        "Son regard est européen : dans la manière dont il est conçu pour se gouverner, documenter ses décisions et traiter ses partenaires. Son horizon est mondial, et il mesure sa réussite à la valeur de long terme plutôt qu’au volume de court terme.",
        "Il en résulte un groupe pensé pour des interlocuteurs institutionnels et des entreprises : rigoureux dans l’exécution, réfléchi dans sa croissance et bâti pour les décennies, pas pour les transactions.",
      ],
    },
    principles: {
      eyebrow: "Principes",
      title: "Ce qui définit AUREX.",
      accent: ["définit"],
      items: [
        {
          title: "La résilience plutôt que la vitesse",
          text: "Nous privilégions les structures qui durent à celles qui se contentent d’aller vite.",
        },
        {
          title: "La réputation plutôt que le volume",
          text: "Chaque engagement porte le nom du groupe. Contreparties et engagements sont choisis en conséquence.",
        },
        {
          title: "Le partenariat plutôt que la transaction",
          text: "Les relations sont bâties pour durer au-delà d’une seule opération.",
        },
        {
          title: "La valeur à long terme plutôt que le gain à court terme",
          text: "L’objectif : faire fructifier la valeur d’un cycle à l’autre, d’une frontière à l’autre.",
        },
      ],
    },
    structure: {
      eyebrow: "Structure du groupe",
      title: "Un groupe, quatre métiers.",
      accent: ["quatre"],
      intro: "AUREX s’organise autour de pôles d’activité complémentaires, réunis sous une même philosophie de holding.",
      groupLabel: "Groupe AUREX",
      groupText: "Holding, gouvernance et allocation du capital",
    },
    governance: {
      eyebrow: "Gouvernance",
      title: "La structure avant la croissance.",
      accent: ["croissance."],
      intro:
        "Les principes sur lesquels AUREX est bâti pour engager des capitaux, conduire des opérations de négoce et travailler avec des partenaires.",
      items: [
        { title: "Mandats clairs", text: "Des responsabilités et des pouvoirs de décision définis dans chaque pôle d’activité." },
        { title: "Décisions documentées", text: "Des décisions consignées, vérifiables et traçables." },
        {
          title: "La conformité comme préalable",
          text: "La vérification des contreparties et la conformité commerciale traitées comme des préalables, non comme des formalités.",
        },
        {
          title: "Transparence envers les partenaires",
          text: "Un reporting clair et une communication ouverte avec ceux qui partagent nos engagements.",
        },
      ],
    },
    cta: {
      eyebrow: "Ensuite",
      title: "Découvrir comment le groupe est conçu pour créer de la valeur.",
      accent: ["valeur."],
      primary: "Découvrir le négoce",
      secondary: "Engager le dialogue",
    },
  },

  tradeHub: {
    hero: {
      eyebrow: "Négoce",
      title: "Un négoce international, structuré selon les standards européens.",
      accent: ["structuré"],
      intro:
        "AUREX est conçu pour approvisionner, acheminer et distribuer des marchandises par-delà les frontières, en reliant des producteurs qualifiés à la demande des marchés prioritaires, selon les standards européens de documentation, de conformité et de vérification des contreparties.",
    },
    core: {
      eyebrow: "Le négoce selon AUREX",
      title: "De l’approvisionnement à la distribution.",
      accent: ["distribution."],
    },
    scopeLabel: "Périmètre",
    lines: {
      eyebrow: "Filières de négoce",
      title: "Des filières de négoce à vocation stratégique.",
      accent: ["stratégique."],
      intro:
        "Chaque filière de négoce constitue un axe stratégique, développé avec discernement et aux côtés de partenaires qualifiés.",
      note: "Les filières de négoce sont des axes stratégiques en cours de développement. Les activités concrètes seront présentées à mesure de leur formalisation.",
    },
    connection: {
      eyebrow: "Le modèle AUREX",
      title: "Approvisionnement. Négoce. Distribution. Investissement.",
      accent: ["Investissement."],
      steps: [
        {
          title: "Approvisionnement",
          text: "Des producteurs et des fournisseurs qualifiés au regard des standards européens, avant tout engagement.",
        },
        {
          title: "Négoce",
          text: "Des transactions transfrontalières structurées autour de la documentation, de la conformité et de la vérification des contreparties.",
        },
        {
          title: "Distribution",
          text: "Des canaux d’accès au marché, pensés pour être bâtis aux côtés de partenaires logistiques et de distribution de long terme.",
        },
        {
          title: "Investissement",
          text: "Un capital et une détention de long terme, là où le négoce révèle une valeur durable.",
        },
      ],
    },
    green: {
      eyebrow: "AUREX Green",
      title: "Produits et technologies durables.",
      accent: ["durables."],
      text: "Matériaux recyclés et biosourcés, équipements d’énergie propre, emballages durables et logistique verte : le volet négoce de la transition verte.",
      link: "Découvrir AUREX Green",
    },
    cta: {
      eyebrow: "Demandes liées au négoce",
      title: "Proposer un partenariat de négoce.",
      accent: ["partenariat"],
      primary: "Soumettre une demande de partenariat",
    },
  },

  portfolio: {
    hero: {
      eyebrow: "Portefeuille & investissements",
      title: "Un capital patient, déployé avec conviction.",
      accent: ["conviction."],
      intro:
        "AUREX est conçu pour investir avec patience et conviction, hors de tout calendrier de fonds, et pour travailler aux côtés de ses partenaires et des équipes dirigeantes afin de construire plutôt que simplement allouer.",
    },
    approach: {
      eyebrow: "Approche d’investissement",
      title: "Notre approche de l’investissement.",
      accent: ["l’investissement."],
      items: [
        {
          title: "Horizon",
          text: "Le long terme par défaut. Un investissement est conservé aussi longtemps qu’il crée de la valeur.",
        },
        {
          title: "Alignement",
          text: "Une préférence pour les opportunités qui renforcent le commerce, la distribution ou l’accès aux marchés à l’échelle du groupe.",
        },
        {
          title: "Partenariat",
          text: "Une approche pensée pour travailler aux côtés des équipes dirigeantes et des co-investisseurs, en apportant structure et gouvernance.",
        },
        {
          title: "Discipline",
          text: "Des diligences approfondies, des thèses d’investissement claires et un processus de décision documenté.",
        },
      ],
    },
    criteria: {
      eyebrow: "Ce que nous recherchons",
      title: "Critères d’investissement.",
      accent: ["Critères"],
      items: [
        "Une adéquation stratégique claire avec les métiers ou les secteurs d’intérêt d’AUREX",
        "Des dirigeants et des partenaires orientés vers le long terme",
        "Une gouvernance saine, ou la volonté de la bâtir",
        "Une demande résiliente et une position de marché défendable",
        "Un potentiel transfrontalier au sein des marchés prioritaires",
      ],
    },
    sectors: {
      eyebrow: "Secteurs d’intérêt",
      title: "Là où le capital sera orienté.",
      accent: ["capital"],
      intro: "L’intérêt d’investissement se concentre sur six secteurs d’importance stratégique.",
    },
    holdings: {
      eyebrow: "Participations",
      title: "Informations sur le portefeuille.",
      accent: ["Informations"],
      intro: "AUREX rend publiques ses participations une fois celles-ci formalisées et autorisées à la publication.",
      empty:
        "Aucune participation n’est rendue publique à ce jour. Ce registre sera mis à jour à mesure que les investissements seront formalisés.",
    },
    cta: {
      eyebrow: "Demandes d’investissement",
      title: "Présenter une opportunité.",
      accent: ["opportunité."],
      intro: "Fondateurs, actionnaires et co-investisseurs sont invités à nous soumettre des opportunités en phase avec notre approche.",
      primary: "Soumettre une demande d’investissement",
    },
  },

  presence: {
    hero: {
      eyebrow: "Présence mondiale",
      title: "Bâti autour de corridors, non de marchés isolés.",
      accent: ["corridors,"],
      intro:
        "AUREX aborde le monde à travers les corridors qui relient l’Europe au Moyen-Orient, à l’Inde et à l’Afrique, là où se rencontrent commerce, capital et opportunités de long terme.",
    },
    map: {
      eyebrow: "Marchés prioritaires",
      title: "L’Europe au cœur.",
      accent: ["cœur."],
      intro: "Cinq marchés prioritaires, reliés par des corridors stratégiques, définissent les zones d’attention d’AUREX.",
      footnote:
        "Les marchés prioritaires indiquent une orientation stratégique. Ils ne désignent ni bureaux, ni filiales, ni établissements enregistrés.",
    },
    corridors: {
      eyebrow: "Corridors stratégiques",
      title: "Là où la valeur peut circuler.",
      accent: ["circuler."],
      items: [
        {
          title: "Europe — Golfe",
          text: "Relier les standards et la demande de l’Europe au rôle du Golfe comme plaque tournante du commerce et du capital.",
        },
        {
          title: "Europe — Inde",
          text: "Relier les marchés européens à l’une des plus grandes économies du monde en matière d’approvisionnement et de consommation.",
        },
        {
          title: "Europe — Afrique",
          text: "Un corridor de long terme pour le commerce, l’alimentaire et les infrastructures, abordé avec des partenaires.",
        },
        { title: "Golfe — Inde & Afrique", text: "Des routes via le Golfe qui relient les marchés asiatiques et africains." },
      ],
    },
    offices: {
      eyebrow: "Bureaux",
      title: "Siège social & représentation.",
      empty: "Les coordonnées du siège social et de la représentation seront publiées ici.",
    },
    cta: {
      eyebrow: "Contact",
      title: "Échanger sur un corridor.",
      accent: ["corridor."],
      primary: "Engager le dialogue",
    },
  },

  leadership: {
    approach: {
      eyebrow: "Approche de direction",
      title: "Comment AUREX est dirigé.",
      accent: ["dirigé."],
      items: [
        {
          title: "Gestion responsable",
          text: "Les dirigeants sont appelés à agir en garants du capital et de la réputation, et pas seulement en gestionnaires de l’activité.",
        },
        {
          title: "Responsabilité",
          text: "Des décisions clairement assumées, avec des attributions définies et visibles.",
        },
        {
          title: "Vision de long terme",
          text: "Des décisions mesurées à l’aune de la valeur qu’elles créent au fil des cycles, non des trimestres.",
        },
      ],
    },
    profiles: {
      eyebrow: "Équipe dirigeante",
      title: "Les personnes qui font AUREX.",
      accent: ["personnes"],
      empty: "Les profils des dirigeants seront publiés ici.",
    },
    cta: {
      eyebrow: "Demandes d’entreprise",
      title: "Échanger avec AUREX.",
      accent: ["AUREX."],
      primary: "Soumettre une demande d’entreprise",
    },
  },

  partnerships: {
    hero: {
      eyebrow: "Partenariats",
      title: "Une croissance bâtie sur le partenariat.",
      accent: ["partenariat."],
      intro:
        "AUREX cherche à se développer aux côtés de partenaires dont les standards et l’horizon rejoignent les siens : producteurs, distributeurs, entreprises, institutions et co-investisseurs.",
    },
    models: {
      eyebrow: "Modèles de partenariat",
      title: "Quatre façons de travailler avec AUREX.",
      accent: ["travailler"],
    },
    offer: {
      eyebrow: "Ce qu’apporte AUREX",
      title: "Un interlocuteur structuré.",
      accent: ["structuré."],
      items: [
        { title: "Standards européens", text: "Documentation, conformité et conduite alignées sur les normes européennes." },
        {
          title: "Perspective transfrontalière",
          text: "Une vision construite autour des corridors reliant l’Europe, le Golfe, l’Inde et l’Afrique.",
        },
        {
          title: "Métiers intégrés",
          text: "Commerce, logistique, distribution et capital, conçus pour s’articuler au sein d’un même groupe.",
        },
        { title: "Engagement de long terme", text: "Des partenariats structurés pour durer au-delà d’une seule transaction." },
      ],
    },
    seek: {
      eyebrow: "Ce que nous recherchons",
      title: "Des standards alignés. Un horizon partagé.",
      accent: ["horizon"],
      items: [
        "Une orientation de long terme",
        "Transparence et gouvernance saine",
        "Qualité, conformité et traçabilité",
        "Rigueur commerciale et fiabilité",
        "Capacités complémentaires ou accès aux marchés",
      ],
    },
    process: {
      eyebrow: "Processus",
      title: "Du premier contact à l’exécution.",
      accent: ["l’exécution."],
      steps: [
        {
          title: "Prise de contact",
          text: "Présentez votre organisation, votre mandat et vos objectifs via une demande de partenariat.",
        },
        {
          title: "Évaluation",
          text: "Adéquation stratégique, standards et diligence sur les contreparties font l’objet d’une évaluation.",
        },
        { title: "Structuration", text: "Conditions, responsabilités et gouvernance sont convenues et documentées." },
        { title: "Exécution", text: "Le partenariat progresse, avec un reporting clair et des points d’étape." },
      ],
    },
    cta: {
      eyebrow: "Demandes de partenariat",
      title: "Proposer un partenariat.",
      accent: ["partenariat."],
      primary: "Soumettre une demande de partenariat",
    },
  },

  contact: {
    hero: {
      eyebrow: "Contact",
      title: "Engager le dialogue.",
      accent: ["dialogue."],
      intro:
        "Précisez la nature de votre demande et présentez votre mandat pour engager le dialogue avec AUREX.",
    },
    routes: {
      eyebrow: "Types de demande",
      title: "Choisissez votre voie.",
      accent: ["voie."],
    },
    direct: {
      title: "Contact direct",
      emailLabel: "E-mail",
      emailPending:
        "Une adresse dédiée aux demandes directes sera publiée ici. Dans l’intervalle, merci d’utiliser le formulaire.",
      responseNote: "Merci de ne pas inclure d’informations confidentielles dans un premier message.",
    },
  },

  privacy: {
    hero: {
      eyebrow: "Informations légales",
      title: "Politique de confidentialité.",
      intro: "La manière dont sont traitées les informations transmises via ce site.",
    },
    updated: "Dernière mise à jour : septembre 2026",
    sections: [
      {
        title: "Champ d’application",
        paragraphs: [
          "La présente politique s’applique aux informations transmises via le site internet d’AUREX, y compris ses formulaires de demande.",
        ],
      },
      {
        title: "Informations collectées",
        paragraphs: [
          "Lorsque vous soumettez une demande, nous collectons les informations que vous fournissez : nom, organisation, fonction, adresse e-mail, pays et message.",
          "Ce site n’utilise aucun cookie publicitaire ou de suivi.",
        ],
      },
      {
        title: "Utilisation des informations",
        paragraphs: [
          "Les informations sont utilisées uniquement pour examiner votre demande et y répondre, ainsi que pour conserver une trace de la correspondance. Elles ne sont ni vendues ni partagées à des fins de marketing.",
        ],
      },
      {
        title: "Conservation",
        paragraphs: [
          "Les données liées aux demandes ne sont conservées que le temps nécessaire pour y répondre et satisfaire aux obligations légales.",
        ],
      },
      {
        title: "Vos droits",
        paragraphs: [
          "En vertu du règlement général européen sur la protection des données (RGPD), vous pouvez demander l’accès à vos données personnelles, leur rectification ou leur effacement, et vous opposer à leur traitement. Ces demandes peuvent être adressées via le formulaire de contact.",
        ],
      },
      {
        title: "Responsable du traitement",
        paragraphs: [
          "L’identité et l’adresse du siège social du responsable du traitement seront publiées sur cette page.",
        ],
      },
    ],
  },

  inquiry: {
    title: "Demande",
    types: {
      partnership: { label: "Partenariat", description: "Approvisionnement, distribution ou collaboration stratégique" },
      investment: { label: "Investissement", description: "Opportunités, co-investissement et capital" },
      corporate: { label: "Entreprise", description: "Questions d’entreprise et institutionnelles" },
      general: { label: "Général", description: "Toute autre demande" },
    },
    fields: {
      type: "Nature de la demande",
      name: "Nom et prénom",
      organisation: "Organisation",
      role: "Fonction / poste",
      email: "E-mail professionnel",
      country: "Pays",
      message: "Votre message",
      messagePlaceholder:
        "Présentez brièvement votre organisation, votre mandat et les pistes que vous souhaitez explorer.",
      consent: "J’accepte qu’AUREX utilise ces informations pour répondre à ma demande, conformément à la",
      privacyLink: "politique de confidentialité",
      optional: "Facultatif",
    },
    submit: "Envoyer la demande",
    submitting: "Envoi en cours…",
    success: {
      title: "Merci d’avoir contacté AUREX.",
      text: "Nous avons bien reçu votre demande et reviendrons vers vous.",
      again: "Envoyer une autre demande",
    },
    error: "Une erreur est survenue lors de l’envoi de votre demande. Veuillez réessayer.",
    unavailable: "Les demandes en ligne sont momentanément indisponibles. Veuillez réessayer ultérieurement.",
    validation: {
      required: "Champ obligatoire",
      email: "Saisissez une adresse e-mail valide",
      tooShort: "Merci d’apporter un peu plus de précisions",
      consent: "Veuillez confirmer pour continuer",
    },
  },

  notFound: {
    eyebrow: "404",
    title: "Cette page a poursuivi sa route.",
    text: "La page que vous recherchez n’existe pas ou n’est plus disponible.",
    cta: "Retour à l’accueil",
  },

  footer: {
    statement:
      "Un groupe international de négoce, de participations et d’investissement aux racines européennes, conçu pour relier marchés, partenaires et capitaux par-delà les frontières.",
    groups: { group: "Groupe", businesses: "Activités", contact: "Demandes" },
    rights: "Tous droits réservés.",
    languages: "Langues",
    legal: "Mentions légales",
  },
};

export default fr;
