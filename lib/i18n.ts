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
    "footer.connect": "Conectar",
    "footer.remote": "Remoto",
    "footer.certified": "SOC 2 Type II",

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
    "footer.connect": "Connect",
    "footer.remote": "Remote-first",
    "footer.certified": "SOC 2 Type II",

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

    // Footer
    "footer.status": "Todos os Sistemas Operacionais",
    "footer.uptime": "uptime neste trimestre",
    "footer.response": "Tempo de Resposta",
    "footer.deployments": "Implantações",
    "footer.connect": "Conectar",
    "footer.remote": "Remoto",
    "footer.certified": "SOC 2 Type II",

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

    // Footer
    "footer.status": "Tous les Systèmes Opérationnels",
    "footer.uptime": "uptime ce trimestre",
    "footer.response": "Temps de Réponse",
    "footer.deployments": "Déploiements",
    "footer.connect": "Connecter",
    "footer.remote": "Remote-first",
    "footer.certified": "SOC 2 Type II",

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

    // Footer
    "footer.status": "Alle Systeme Betriebsbereit",
    "footer.uptime": "Betriebszeit dieses Quartals",
    "footer.response": "Antwortzeit",
    "footer.deployments": "Bereitstellungen",
    "footer.connect": "Verbinden",
    "footer.remote": "Remote-first",
    "footer.certified": "SOC 2 Type II",

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

    // Footer
    "footer.status": "Tutti i Sistemi Operativi",
    "footer.uptime": "uptime questo trimestre",
    "footer.response": "Tempo di Risposta",
    "footer.deployments": "Distribuzioni",
    "footer.connect": "Connetti",
    "footer.remote": "Remote-first",
    "footer.certified": "SOC 2 Type II",

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
