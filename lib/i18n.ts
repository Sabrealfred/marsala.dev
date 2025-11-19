export type Locale = "es" | "en" | "pt" | "fr" | "de" | "it";

export const locales: Locale[] = ["es", "en", "pt", "fr", "de", "it"];

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
};

export const localeFlags: Record<Locale, string> = {
  es: "🇪🇸",
  en: "🇺🇸",
  pt: "🇧🇷",
  fr: "🇫🇷",
  de: "🇩🇪",
  it: "🇮🇹",
};

type TranslationKey = keyof typeof translations.es;

export const translations = {
  es: {
    // Navbar
    "nav.modules": "Módulos",
    "nav.research": "Research",
    "nav.lab": "Lab",
    "nav.about": "Acerca",
    "nav.contact": "Contacto",

    // Homepage Hero
    "hero.badge": "Intelligent Growth Studio",
    "hero.title": "Crecer con",
    "hero.subtitle": "inteligencia modular",
    "hero.description": "Construye tu ecosistema digital con módulos plug-and-play para marca, web, IA y automatización",
    "hero.cta.modules": "Explorar Módulos",
    "hero.cta.start": "Comenzar",

    // Features Section
    "features.title": "Capacidades de la Plataforma",
    "features.subtitle": "Todas las herramientas que necesitas para escalar tu negocio con inteligencia modular",
    "features.ai.title": "IA Empresarial",
    "features.ai.description": "Automatización inteligente y análisis con modelos de IA de última generación adaptados a tu negocio",
    "features.crm.title": "CRM Inteligente",
    "features.crm.description": "Gestión de relaciones y herramientas de ventas con insights potenciados por IA",
    "features.data.title": "Análisis de Datos",
    "features.data.description": "Dashboards, visualizaciones e infraestructura de datos para tomar decisiones informadas",
    "features.automation.title": "Flujos de Trabajo",
    "features.automation.description": "Sistemas de automatización y integración de flujos de trabajo para optimizar operaciones",
    "features.analytics.title": "Métricas de Rendimiento",
    "features.analytics.description": "Seguimiento completo de métricas y análisis de rendimiento en tiempo real",
    "features.security.title": "Seguridad Empresarial",
    "features.security.description": "Infraestructura segura de nivel empresarial y cumplimiento de normativas",

    // Homepage Sections
    "home.blog.title": "Aprende de Casos Reales",
    "home.blog.subtitle": "Casos de estudio, frameworks y playbooks operativos de sistemas de crecimiento modular",
    "home.blog.viewAll": "Ver todos los artículos",

    "home.tutorials.title": "Empieza a Construir Hoy",
    "home.tutorials.subtitle": "Guías paso a paso para dominar tu stack de crecimiento modular",

    "home.comparison.title": "¿Por qué Inteligencia Modular?",
    "home.comparison.subtitle": "Ve cómo nuestro enfoque se compara con soluciones tradicionales",
    "home.comparison.agencies": "Agencias Tradicionales",
    "home.comparison.marsala": "Enfoque Modular",
    "home.comparison.inhouse": "Equipos Internos",

    "home.highlights.title": "Construido para Equipos de Crecimiento Modernos",
    "home.highlights.subtitle": "El sistema operativo inteligente que tu negocio merece",

    // Footer
    "footer.status": "Todos los sistemas operativos",
    "footer.uptime": "uptime este trimestre",
    "footer.response": "Tiempo de Respuesta",
    "footer.deployments": "Despliegues",
    "footer.explore": "Explorar",
    "footer.legal": "Legal",
    "footer.connect": "Conectar",
    "footer.remote": "Remoto",
    "footer.certified": "SOC 2 Type II",
    "footer.crafted": "Creado con inteligencia modular",
    "footer.terms": "Términos",
    "footer.privacy": "Privacidad",
    "footer.aiUsage": "Uso de IA",
    "footer.sla": "SLA de Soporte",

    // Blog
    "blog.backToArticles": "Volver a artículos",
    "blog.previousArticle": "Artículo Anterior",
    "blog.nextArticle": "Siguiente Artículo",
    "blog.alsoInterested": "También te puede interesar",
    "blog.moreContent": "Más contenido de",

    // Common
    "common.readMore": "Leer más",
    "common.learnMore": "Saber más",
    "common.getStarted": "Comenzar",
    "common.viewAll": "Ver todos",
  },
  en: {
    // Navbar
    "nav.modules": "Modules",
    "nav.research": "Research",
    "nav.lab": "Lab",
    "nav.about": "About",
    "nav.contact": "Contact",

    // Homepage Hero
    "hero.badge": "Intelligent Growth Studio",
    "hero.title": "Grow with",
    "hero.subtitle": "modular intelligence",
    "hero.description": "Build your digital ecosystem with plug-and-play modules for brand, web, AI, and automation",
    "hero.cta.modules": "Explore Modules",
    "hero.cta.start": "Get Started",

    // Features Section
    "features.title": "Platform Capabilities",
    "features.subtitle": "All the tools you need to scale your business with modular intelligence",
    "features.ai.title": "Enterprise AI",
    "features.ai.description": "Intelligent automation and analytics with state-of-the-art AI models tailored to your business",
    "features.crm.title": "Smart CRM",
    "features.crm.description": "Relationship management and sales tools with AI-powered insights",
    "features.data.title": "Data Analytics",
    "features.data.description": "Dashboards, visualizations, and data infrastructure for informed decision making",
    "features.automation.title": "Workflow Automation",
    "features.automation.description": "Automation systems and workflow integration to streamline operations",
    "features.analytics.title": "Performance Metrics",
    "features.analytics.description": "Comprehensive metric tracking and real-time performance analytics",
    "features.security.title": "Enterprise Security",
    "features.security.description": "Enterprise-grade secure infrastructure and regulatory compliance",

    // Homepage Sections
    "home.blog.title": "Learn from Real Engagements",
    "home.blog.subtitle": "Case studies, frameworks, and operational playbooks from building modular growth systems",
    "home.blog.viewAll": "View all articles",

    "home.tutorials.title": "Start Building Today",
    "home.tutorials.subtitle": "Step-by-step guides to master your modular growth stack",

    "home.comparison.title": "Why Choose Modular Intelligence?",
    "home.comparison.subtitle": "See how our approach compares to traditional solutions",
    "home.comparison.agencies": "Traditional Agencies",
    "home.comparison.marsala": "Modular Approach",
    "home.comparison.inhouse": "In-House Teams",

    "home.highlights.title": "Built for Modern Growth Teams",
    "home.highlights.subtitle": "The intelligent operating system your business deserves",

    // Footer
    "footer.status": "All Systems Operational",
    "footer.uptime": "uptime this quarter",
    "footer.response": "Response Time",
    "footer.deployments": "Deployments",
    "footer.explore": "Explore",
    "footer.legal": "Legal",
    "footer.connect": "Connect",
    "footer.remote": "Remote-first",
    "footer.certified": "SOC 2 Type II",
    "footer.crafted": "Crafted with modular intelligence",
    "footer.terms": "Terms",
    "footer.privacy": "Privacy",
    "footer.aiUsage": "AI Usage",
    "footer.sla": "Support SLA",

    // Blog
    "blog.backToArticles": "Back to articles",
    "blog.previousArticle": "Previous Article",
    "blog.nextArticle": "Next Article",
    "blog.alsoInterested": "You might also like",
    "blog.moreContent": "More content from",

    // Common
    "common.readMore": "Read more",
    "common.learnMore": "Learn more",
    "common.getStarted": "Get started",
    "common.viewAll": "View all",
  },
  pt: {
    // Navbar
    "nav.modules": "Módulos",
    "nav.research": "Pesquisa",
    "nav.lab": "Lab",
    "nav.about": "Sobre",
    "nav.contact": "Contato",

    // Homepage Hero
    "hero.badge": "Estúdio de Crescimento Inteligente",
    "hero.title": "Crescer com",
    "hero.subtitle": "inteligência modular",
    "hero.description": "Construa seu ecossistema digital com módulos plug-and-play para marca, web, IA e automação",
    "hero.cta.modules": "Explorar Módulos",
    "hero.cta.start": "Começar",

    // Features Section
    "features.title": "Capacidades da Plataforma",
    "features.subtitle": "Todas as ferramentas que você precisa para escalar seu negócio com inteligência modular",
    "features.ai.title": "IA Empresarial",
    "features.ai.description": "Automação inteligente e análise com modelos de IA de última geração adaptados ao seu negócio",
    "features.crm.title": "CRM Inteligente",
    "features.crm.description": "Gestão de relacionamentos e ferramentas de vendas com insights potencializados por IA",
    "features.data.title": "Análise de Dados",
    "features.data.description": "Dashboards, visualizações e infraestrutura de dados para tomada de decisões informadas",
    "features.automation.title": "Automação de Fluxos",
    "features.automation.description": "Sistemas de automação e integração de fluxos de trabalho para otimizar operações",
    "features.analytics.title": "Métricas de Desempenho",
    "features.analytics.description": "Rastreamento completo de métricas e análise de desempenho em tempo real",
    "features.security.title": "Segurança Empresarial",
    "features.security.description": "Infraestrutura segura de nível empresarial e conformidade regulatória",

    // Homepage Sections
    "home.blog.title": "Aprenda com Casos Reais",
    "home.blog.subtitle": "Estudos de caso, frameworks e playbooks operacionais de sistemas de crescimento modular",
    "home.blog.viewAll": "Ver todos os artigos",

    "home.tutorials.title": "Comece a Construir Hoje",
    "home.tutorials.subtitle": "Guias passo a passo para dominar seu stack de crescimento modular",

    "home.comparison.title": "Por que Inteligência Modular?",
    "home.comparison.subtitle": "Veja como nossa abordagem se compara às soluções tradicionais",
    "home.comparison.agencies": "Agências Tradicionais",
    "home.comparison.marsala": "Abordagem Modular",
    "home.comparison.inhouse": "Equipes Internas",

    "home.highlights.title": "Construído para Equipes de Crescimento Modernas",
    "home.highlights.subtitle": "O sistema operacional inteligente que seu negócio merece",

    // Footer
    "footer.status": "Todos os Sistemas Operacionais",
    "footer.uptime": "uptime neste trimestre",
    "footer.response": "Tempo de Resposta",
    "footer.deployments": "Implantações",
    "footer.explore": "Explorar",
    "footer.legal": "Legal",
    "footer.connect": "Conectar",
    "footer.remote": "Remoto",
    "footer.certified": "SOC 2 Type II",
    "footer.crafted": "Criado com inteligência modular",
    "footer.terms": "Termos",
    "footer.privacy": "Privacidade",
    "footer.aiUsage": "Uso de IA",
    "footer.sla": "SLA de Suporte",

    // Blog
    "blog.backToArticles": "Voltar aos artigos",
    "blog.previousArticle": "Artigo Anterior",
    "blog.nextArticle": "Próximo Artigo",
    "blog.alsoInterested": "Você também pode gostar",
    "blog.moreContent": "Mais conteúdo de",

    // Common
    "common.readMore": "Leia mais",
    "common.learnMore": "Saiba mais",
    "common.getStarted": "Começar",
    "common.viewAll": "Ver todos",
  },
  fr: {
    // Navbar
    "nav.modules": "Modules",
    "nav.research": "Recherche",
    "nav.lab": "Lab",
    "nav.about": "À propos",
    "nav.contact": "Contact",

    // Homepage Hero
    "hero.badge": "Studio de Croissance Intelligent",
    "hero.title": "Grandir avec",
    "hero.subtitle": "intelligence modulaire",
    "hero.description": "Construisez votre écosystème numérique avec des modules plug-and-play pour la marque, le web, l'IA et l'automatisation",
    "hero.cta.modules": "Explorer les Modules",
    "hero.cta.start": "Commencer",

    // Features Section
    "features.title": "Capacités de la Plateforme",
    "features.subtitle": "Tous les outils dont vous avez besoin pour développer votre entreprise avec l'intelligence modulaire",
    "features.ai.title": "IA d'Entreprise",
    "features.ai.description": "Automatisation intelligente et analyses avec des modèles d'IA de pointe adaptés à votre entreprise",
    "features.crm.title": "CRM Intelligent",
    "features.crm.description": "Gestion des relations et outils de vente avec des insights alimentés par l'IA",
    "features.data.title": "Analyse de Données",
    "features.data.description": "Tableaux de bord, visualisations et infrastructure de données pour une prise de décision éclairée",
    "features.automation.title": "Automatisation des Flux",
    "features.automation.description": "Systèmes d'automatisation et intégration des flux de travail pour rationaliser les opérations",
    "features.analytics.title": "Métriques de Performance",
    "features.analytics.description": "Suivi complet des métriques et analyses de performance en temps réel",
    "features.security.title": "Sécurité d'Entreprise",
    "features.security.description": "Infrastructure sécurisée de niveau entreprise et conformité réglementaire",

    // Homepage Sections
    "home.blog.title": "Apprenez de Cas Réels",
    "home.blog.subtitle": "Études de cas, frameworks et playbooks opérationnels de systèmes de croissance modulaire",
    "home.blog.viewAll": "Voir tous les articles",

    "home.tutorials.title": "Commencez à Construire Aujourd'hui",
    "home.tutorials.subtitle": "Guides pas à pas pour maîtriser votre stack de croissance modulaire",

    "home.comparison.title": "Pourquoi l'Intelligence Modulaire?",
    "home.comparison.subtitle": "Voyez comment notre approche se compare aux solutions traditionnelles",
    "home.comparison.agencies": "Agences Traditionnelles",
    "home.comparison.marsala": "Approche Modulaire",
    "home.comparison.inhouse": "Équipes Internes",

    "home.highlights.title": "Conçu pour les Équipes de Croissance Modernes",
    "home.highlights.subtitle": "Le système d'exploitation intelligent que votre entreprise mérite",

    // Footer
    "footer.status": "Tous les Systèmes Opérationnels",
    "footer.uptime": "uptime ce trimestre",
    "footer.response": "Temps de Réponse",
    "footer.deployments": "Déploiements",
    "footer.explore": "Explorer",
    "footer.legal": "Juridique",
    "footer.connect": "Connecter",
    "footer.remote": "Remote-first",
    "footer.certified": "SOC 2 Type II",
    "footer.crafted": "Créé avec intelligence modulaire",
    "footer.terms": "Conditions",
    "footer.privacy": "Confidentialité",
    "footer.aiUsage": "Utilisation de l'IA",
    "footer.sla": "SLA de Support",

    // Blog
    "blog.backToArticles": "Retour aux articles",
    "blog.previousArticle": "Article Précédent",
    "blog.nextArticle": "Article Suivant",
    "blog.alsoInterested": "Vous pourriez aussi aimer",
    "blog.moreContent": "Plus de contenu de",

    // Common
    "common.readMore": "Lire plus",
    "common.learnMore": "En savoir plus",
    "common.getStarted": "Commencer",
    "common.viewAll": "Voir tout",
  },
  de: {
    // Navbar
    "nav.modules": "Module",
    "nav.research": "Forschung",
    "nav.lab": "Lab",
    "nav.about": "Über",
    "nav.contact": "Kontakt",

    // Homepage Hero
    "hero.badge": "Intelligentes Wachstumsstudio",
    "hero.title": "Wachsen mit",
    "hero.subtitle": "modularer Intelligenz",
    "hero.description": "Bauen Sie Ihr digitales Ökosystem mit Plug-and-Play-Modulen für Marke, Web, KI und Automatisierung",
    "hero.cta.modules": "Module Erkunden",
    "hero.cta.start": "Loslegen",

    // Features Section
    "features.title": "Plattform-Funktionen",
    "features.subtitle": "Alle Tools, die Sie brauchen, um Ihr Unternehmen mit modularer Intelligenz zu skalieren",
    "features.ai.title": "Unternehmens-KI",
    "features.ai.description": "Intelligente Automatisierung und Analysen mit hochmodernen KI-Modellen, angepasst an Ihr Unternehmen",
    "features.crm.title": "Intelligentes CRM",
    "features.crm.description": "Beziehungsmanagement und Vertriebstools mit KI-gestützten Erkenntnissen",
    "features.data.title": "Datenanalyse",
    "features.data.description": "Dashboards, Visualisierungen und Dateninfrastruktur für fundierte Entscheidungen",
    "features.automation.title": "Workflow-Automatisierung",
    "features.automation.description": "Automatisierungssysteme und Workflow-Integration zur Optimierung von Abläufen",
    "features.analytics.title": "Leistungsmetriken",
    "features.analytics.description": "Umfassendes Metrik-Tracking und Echtzeit-Leistungsanalyse",
    "features.security.title": "Unternehmenssicherheit",
    "features.security.description": "Sichere Infrastruktur auf Unternehmensniveau und regulatorische Compliance",

    // Homepage Sections
    "home.blog.title": "Lernen Sie von realen Fällen",
    "home.blog.subtitle": "Fallstudien, Frameworks und operative Playbooks von modularen Wachstumssystemen",
    "home.blog.viewAll": "Alle Artikel anzeigen",

    "home.tutorials.title": "Beginnen Sie heute zu bauen",
    "home.tutorials.subtitle": "Schritt-für-Schritt-Anleitungen zur Beherrschung Ihres modularen Wachstumsstacks",

    "home.comparison.title": "Warum Modulare Intelligenz?",
    "home.comparison.subtitle": "Sehen Sie, wie sich unser Ansatz mit traditionellen Lösungen vergleicht",
    "home.comparison.agencies": "Traditionelle Agenturen",
    "home.comparison.marsala": "Modularer Ansatz",
    "home.comparison.inhouse": "Interne Teams",

    "home.highlights.title": "Entwickelt für moderne Wachstumsteams",
    "home.highlights.subtitle": "Das intelligente Betriebssystem, das Ihr Unternehmen verdient",

    // Footer
    "footer.status": "Alle Systeme Betriebsbereit",
    "footer.uptime": "Betriebszeit dieses Quartals",
    "footer.response": "Antwortzeit",
    "footer.deployments": "Bereitstellungen",
    "footer.explore": "Erkunden",
    "footer.legal": "Rechtliches",
    "footer.connect": "Verbinden",
    "footer.remote": "Remote-first",
    "footer.certified": "SOC 2 Type II",
    "footer.crafted": "Erstellt mit modularer Intelligenz",
    "footer.terms": "Bedingungen",
    "footer.privacy": "Datenschutz",
    "footer.aiUsage": "KI-Nutzung",
    "footer.sla": "Support-SLA",

    // Blog
    "blog.backToArticles": "Zurück zu Artikeln",
    "blog.previousArticle": "Vorheriger Artikel",
    "blog.nextArticle": "Nächster Artikel",
    "blog.alsoInterested": "Das könnte Sie auch interessieren",
    "blog.moreContent": "Mehr Inhalte von",

    // Common
    "common.readMore": "Mehr lesen",
    "common.learnMore": "Mehr erfahren",
    "common.getStarted": "Loslegen",
    "common.viewAll": "Alle anzeigen",
  },
  it: {
    // Navbar
    "nav.modules": "Moduli",
    "nav.research": "Ricerca",
    "nav.lab": "Lab",
    "nav.about": "Chi siamo",
    "nav.contact": "Contatto",

    // Homepage Hero
    "hero.badge": "Studio di Crescita Intelligente",
    "hero.title": "Crescere con",
    "hero.subtitle": "intelligenza modulare",
    "hero.description": "Costruisci il tuo ecosistema digitale con moduli plug-and-play per brand, web, IA e automazione",
    "hero.cta.modules": "Esplora i Moduli",
    "hero.cta.start": "Inizia",

    // Features Section
    "features.title": "Capacità della Piattaforma",
    "features.subtitle": "Tutti gli strumenti di cui hai bisogno per scalare il tuo business con intelligenza modulare",
    "features.ai.title": "IA Aziendale",
    "features.ai.description": "Automazione intelligente e analisi con modelli di IA all'avanguardia adattati al tuo business",
    "features.crm.title": "CRM Intelligente",
    "features.crm.description": "Gestione delle relazioni e strumenti di vendita con insight potenziati dall'IA",
    "features.data.title": "Analisi Dati",
    "features.data.description": "Dashboard, visualizzazioni e infrastruttura dati per decisioni informate",
    "features.automation.title": "Automazione Flussi",
    "features.automation.description": "Sistemi di automazione e integrazione dei flussi di lavoro per ottimizzare le operazioni",
    "features.analytics.title": "Metriche di Performance",
    "features.analytics.description": "Tracciamento completo delle metriche e analisi delle performance in tempo reale",
    "features.security.title": "Sicurezza Aziendale",
    "features.security.description": "Infrastruttura sicura di livello aziendale e conformità normativa",

    // Homepage Sections
    "home.blog.title": "Impara da Casi Reali",
    "home.blog.subtitle": "Casi studio, framework e playbook operativi di sistemi di crescita modulare",
    "home.blog.viewAll": "Vedi tutti gli articoli",

    "home.tutorials.title": "Inizia a Costruire Oggi",
    "home.tutorials.subtitle": "Guide passo-passo per padroneggiare il tuo stack di crescita modulare",

    "home.comparison.title": "Perché Intelligenza Modulare?",
    "home.comparison.subtitle": "Scopri come il nostro approccio si confronta con le soluzioni tradizionali",
    "home.comparison.agencies": "Agenzie Tradizionali",
    "home.comparison.marsala": "Approccio Modulare",
    "home.comparison.inhouse": "Team Interni",

    "home.highlights.title": "Costruito per Team di Crescita Moderni",
    "home.highlights.subtitle": "Il sistema operativo intelligente che la tua azienda merita",

    // Footer
    "footer.status": "Tutti i Sistemi Operativi",
    "footer.uptime": "uptime questo trimestre",
    "footer.response": "Tempo di Risposta",
    "footer.deployments": "Distribuzioni",
    "footer.explore": "Esplora",
    "footer.legal": "Legale",
    "footer.connect": "Connetti",
    "footer.remote": "Remote-first",
    "footer.certified": "SOC 2 Type II",
    "footer.crafted": "Creato con intelligenza modulare",
    "footer.terms": "Termini",
    "footer.privacy": "Privacy",
    "footer.aiUsage": "Utilizzo dell'IA",
    "footer.sla": "SLA di Supporto",

    // Blog
    "blog.backToArticles": "Torna agli articoli",
    "blog.previousArticle": "Articolo Precedente",
    "blog.nextArticle": "Prossimo Articolo",
    "blog.alsoInterested": "Potrebbe interessarti anche",
    "blog.moreContent": "Più contenuti da",

    // Common
    "common.readMore": "Leggi di più",
    "common.learnMore": "Saperne di più",
    "common.getStarted": "Inizia",
    "common.viewAll": "Vedi tutti",
  },
};

export function getTranslation(locale: Locale, key: TranslationKey): string {
  const dictionary = translations[locale] ?? translations.en;
  return dictionary[key] ?? translations.en[key] ?? key;
}
