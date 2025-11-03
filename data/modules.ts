export type DualString = {
  en: string;
  es: string;
};

export type Module = {
  slug: string;
  title: DualString;
  tagline: DualString;
  description: DualString;
  deliverables: DualString[];
  outcomes: DualString[];
};

export const modules: Module[] = [
  {
    slug: "brand-os",
    title: {
      en: "Brand OS",
      es: "Brand OS",
    },
    tagline: {
      en: "Scalable identity systems",
      es: "Identidad escalable y accionable",
    },
    description: {
      en: "Visual identities, voice, and reusable kits that stay consistent across teams.",
      es: "Sistemas de identidad visual, tono de voz y kits reutilizables para equipos.",
    },
    deliverables: [
      { en: "Logo & system", es: "Logo y sistema" },
      { en: "Brand book", es: "Brand book" },
      { en: "UI kit", es: "UI kit" },
      { en: "Component library", es: "Librería de componentes" },
    ],
    outcomes: [
      { en: "Consistent storytelling", es: "Storytelling consistente" },
      { en: "Recognition boost", es: "Mayor reconocimiento" },
      { en: "Faster creative cycles", es: "Velocidad creativa" },
    ],
  },
  {
    slug: "web-os",
    title: {
      en: "Web OS",
      es: "Web OS",
    },
    tagline: {
      en: "High-performance web architecture",
      es: "Arquitecturas web de alto rendimiento",
    },
    description: {
      en: "Next.js + Vercel sites optimized for SEO, speed, and conversion.",
      es: "Sitios Next.js + Vercel optimizados para SEO, velocidad y conversión.",
    },
    deliverables: [
      { en: "Marketing site", es: "Website marketing" },
      { en: "Blog / Docs", es: "Blog / Docs" },
      { en: "Lead forms", es: "Forms / Leads" },
      { en: "Technical SEO", es: "SEO técnico" },
    ],
    outcomes: [
      { en: "Better Core Web Vitals", es: "Mejor Core Web Vitals" },
      { en: "More qualified leads", es: "Más leads calificados" },
      { en: "Lower bounce", es: "Menor rebote" },
    ],
  },
  {
    slug: "crm-os",
    title: {
      en: "CRM OS",
      es: "CRM OS",
    },
    tagline: {
      en: "AI-powered pipelines and journeys",
      es: "Pipelines y journeys con IA",
    },
    description: {
      en: "Revenue automation connected to sales and marketing with shared reporting.",
      es: "Automatización de revenue conectada a ventas y marketing con reporting compartido.",
    },
    deliverables: [
      { en: "CRM architecture", es: "Arquitectura CRM" },
      { en: "Workflows", es: "Workflows" },
      { en: "Dashboards", es: "Dashboards" },
      { en: "Playbooks", es: "Playbooks" },
    ],
    outcomes: [
      { en: "Higher close rate", es: "Más cierre" },
      { en: "Less friction", es: "Menos fricción" },
      { en: "Real-time visibility", es: "Visibilidad en tiempo real" },
    ],
  },
  {
    slug: "ai-os",
    title: {
      en: "AI OS",
      es: "AI OS",
    },
    tagline: {
      en: "Copilots and intelligent automation",
      es: "Copilotos y automatización inteligente",
    },
    description: {
      en: "Agents for internal support, content generation, and repetitive workflows.",
      es: "Agentes para soporte interno, generación de contenido y workflows repetitivos.",
    },
    deliverables: [
      { en: "Generative workflows", es: "Workflows generativos" },
      { en: "RAG / embeddings", es: "RAG / Embeddings" },
      { en: "Guardrails", es: "Guardrails" },
      { en: "Monitoring", es: "Monitoreo" },
    ],
    outcomes: [
      { en: "Time savings", es: "Ahorro de tiempo" },
      { en: "Consistent quality", es: "Calidad consistente" },
      { en: "Operational scale", es: "Escalado operacional" },
    ],
  },
  {
    slug: "ads-os",
    title: {
      en: "Ads OS",
      es: "Ads OS",
    },
    tagline: {
      en: "Performance media with rigor",
      es: "Paid media con ciencia",
    },
    description: {
      en: "Dynamic creatives, systematic testing, and CAC/LTV optimization.",
      es: "Creatividades dinámicas, testeo sistemático y optimización CAC/LTV.",
    },
    deliverables: [
      { en: "Strategy", es: "Estrategia" },
      { en: "Campaign setups", es: "Setups" },
      { en: "Experimentation", es: "Experimentación" },
      { en: "Reporting", es: "Reporting" },
    ],
    outcomes: [
      { en: "Better CPA", es: "Mejor CPA" },
      { en: "Efficiency uplift", es: "Eficiencia superior" },
      { en: "Controlled scale", es: "Escala controlada" },
    ],
  },
  {
    slug: "data-os",
    title: {
      en: "Data OS",
      es: "Data OS",
    },
    tagline: {
      en: "Reliable data, better decisions",
      es: "Datos confiables, decisiones mejores",
    },
    description: {
      en: "Tracking, ETL, and dashboards that unite product, marketing, and sales.",
      es: "Tracking, ETL y dashboards que unifican producto, marketing y ventas.",
    },
    deliverables: [
      { en: "Data layer", es: "Data layer" },
      { en: "ETL / ELT", es: "ETL / ELT" },
      { en: "Warehouse", es: "Warehouse" },
      { en: "BI dashboards", es: "BI / Dashboards" },
    ],
    outcomes: [
      { en: "Aligned teams", es: "Equipos alineados" },
      { en: "Faster learnings", es: "Velocidad de aprendizaje" },
      { en: "Less guesswork", es: "Menos conjeturas" },
    ],
  },
  {
    slug: "commerce-os",
    title: {
      en: "Commerce OS",
      es: "Commerce OS",
    },
    tagline: {
      en: "Headless commerce ready to scale",
      es: "Headless listo para crecer",
    },
    description: {
      en: "Decoupled e-commerce with connected catalogues, payments, and OMS.",
      es: "E-commerce desacoplado con catálogos, pagos y OMS conectados.",
    },
    deliverables: [
      { en: "Catalog", es: "Catálogo" },
      { en: "Checkout", es: "Checkout" },
      { en: "Order management", es: "OMS" },
      { en: "Integrations", es: "Integraciones" },
    ],
    outcomes: [
      { en: "Higher AOV", es: "AOV superior" },
      { en: "Better conversion", es: "Conversión mejorada" },
      { en: "Smooth operations", es: "Operación fluida" },
    ],
  },
  {
    slug: "content-os",
    title: {
      en: "Content OS",
      es: "Content OS",
    },
    tagline: {
      en: "Editorial engine across formats",
      es: "Motor editorial multiformato",
    },
    description: {
      en: "Calendars, generation, QA, and distribution working together.",
      es: "Calendario, generación, QA y distribución automatizada.",
    },
    deliverables: [
      { en: "Content calendar", es: "Calendario" },
      { en: "Playbooks", es: "Playbooks" },
      { en: "Templates", es: "Templates" },
      { en: "Distribution", es: "Distribución" },
    ],
    outcomes: [
      { en: "Consistent publishing", es: "Publicación constante" },
      { en: "SEO lift", es: "Mejor SEO" },
      { en: "Lower costs", es: "Menos costos" },
    ],
  },
  {
    slug: "devops-os",
    title: {
      en: "DevOps OS",
      es: "DevOps OS",
    },
    tagline: {
      en: "CI/CD and observability",
      es: "CI/CD y observabilidad",
    },
    description: {
      en: "Pipelines, performance budgets, and applied security.",
      es: "Pipelines, performance budgets y seguridad aplicada.",
    },
    deliverables: [
      { en: "CI/CD", es: "CI/CD" },
      { en: "Monitoring", es: "Sentry / Logs" },
      { en: "Alerts", es: "Alertas" },
      { en: "Edge protection", es: "WAF / CDN" },
    ],
    outcomes: [
      { en: "Less downtime", es: "Menos downtime" },
      { en: "Safe releases", es: "Releases seguros" },
      { en: "Stable performance", es: "Rendimiento estable" },
    ],
  },
  {
    slug: "integrations-os",
    title: {
      en: "Integrations OS",
      es: "Integrations OS",
    },
    tagline: {
      en: "Everything connected",
      es: "Todo conectado",
    },
    description: {
      en: "Connectors for CRM, ads, analytics, payments, messaging, and more.",
      es: "Conectores con CRM, Ads, Analytics, pagos, mensajería y más.",
    },
    deliverables: [
      { en: "Connectors", es: "Connectors" },
      { en: "Webhooks", es: "Webhooks" },
      { en: "iPaaS automation", es: "iPaaS" },
      { en: "QA", es: "QA" },
    ],
    outcomes: [
      { en: "Fewer manual tasks", es: "Menos tareas manuales" },
      { en: "Coherent data", es: "Datos coherentes" },
      { en: "Faster shipping", es: "Velocidad de entrega" },
    ],
  },
];
