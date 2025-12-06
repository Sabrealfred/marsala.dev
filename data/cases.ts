import type { DualString } from "./modules";

export type CaseStudyResult = {
  label: DualString;
  value: DualString;
};

export type CaseStudy = {
  slug: string;
  title: DualString;
  industry: DualString;
  objective: DualString;
  stack: string[];
  decisions: DualString[];
  results: CaseStudyResult[];
  timelineWeeks: number;
  modules: string[];
};

export const casesIntro: DualString = {
  en: "Real cases distilled into decisions, metrics, and timelines.",
  es: "Casos reales resumidos en decisiones, métricas y tiempos.",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "fintech-launch-system",
    title: { en: "Fintech Launch System", es: "Fintech Launch System" },
    industry: { en: "Fintech", es: "Fintech" },
    objective: {
      en: "Accelerated GTM with compliance and reliable data.",
      es: "GTM rápido con cumplimiento y data confiable.",
    },
    stack: ["Next.js", "Vercel", "Supabase", "Stripe", "HubSpot", "Segment"],
    decisions: [
      {
        en: "Headless architecture with reusable UI components and a lightweight CMS.",
        es: "Arquitectura headless con componentes UI reutilizables y CMS ligero.",
      },
      {
        en: "Lead orchestration and KYC flows consolidated into a single dashboard.",
        es: "Orquestación de leads y KYC en un solo dashboard.",
      },
      {
        en: "Shared data layer for marketing and product analytics.",
        es: "Data layer común para marketing y producto.",
      },
    ],
    results: [
      {
        label: { en: "Time to market", es: "Time to market" },
        value: { en: "10× faster than baseline", es: "10× más rápido vs baseline" },
      },
      {
        label: { en: "Lead → SQL", es: "Lead → SQL" },
        value: { en: "+38% conversion", es: "+38% tasa lead→SQL" },
      },
      {
        label: { en: "Core Web Vitals", es: "Core Web Vitals" },
        value: {
          en: "Green scores across LCP, CLS, and INP",
          es: "Green en LCP/CLS/INP",
        },
      },
    ],
    timelineWeeks: 6,
    modules: ["Web OS", "CRM OS", "Data OS", "Integrations OS"],
  },
  {
    slug: "retail-automation",
    title: { en: "Retail Automation", es: "Retail Automation" },
    industry: { en: "Retail & e-commerce", es: "Retail & e-commerce" },
    objective: {
      en: "Improve ad-spend efficiency and average order value.",
      es: "Eficiencia de ad-spend y mayor AOV.",
    },
    stack: [
      "Next.js",
      "Shopify Headless",
      "GA4",
      "Meta Ads",
      "Google Ads",
      "n8n",
    ],
    decisions: [
      {
        en: "Dynamic creatives generated per product feed.",
        es: "Creatividades dinámicas por feed.",
      },
      {
        en: "Weekly experimentation cadence with bandit testing.",
        es: "Experimentación semanal con bandit testing.",
      },
      {
        en: "Synced audiences based on lifetime value tiers.",
        es: "Audiencias sincronizadas por LTV.",
      },
    ],
    results: [
      {
        label: { en: "Ad efficiency", es: "Eficiencia ads" },
        value: { en: "+47% efficiency", es: "+47% eficiencia" },
      },
      {
        label: { en: "Average order value", es: "AOV" },
        value: { en: "+19% AOV", es: "+19% AOV" },
      },
      {
        label: { en: "ROAS", es: "ROAS" },
        value: { en: ">3.0 sustained", es: "ROAS estable > 3.0" },
      },
    ],
    timelineWeeks: 8,
    modules: ["Commerce OS", "Ads OS", "Data OS", "Content OS"],
  },
  {
    slug: "ai-crm-migration",
    title: { en: "AI CRM Migration", es: "AI CRM Migration" },
    industry: { en: "B2B SaaS", es: "B2B SaaS" },
    objective: {
      en: "Migrate CRM and increase engagement.",
      es: "Migrar CRM y aumentar engagement.",
    },
    stack: ["HubSpot", "Salesforce", "Airbyte", "Postgres", "S3"],
    decisions: [
      {
        en: "ETL with validation rules and ID reconciliation.",
        es: "ETL con validaciones y reconciliación de IDs.",
      },
      {
        en: "Segmentation powered by lightweight ML scoring.",
        es: "Segmentación con scoring ML ligero.",
      },
      {
        en: "AI-assisted playbooks for nurture sequences.",
        es: "Playbooks con IA para nurtures.",
      },
    ],
    results: [
      {
        label: { en: "Engagement", es: "Engagement" },
        value: { en: "3× more engagement in key journeys", es: "x3 en journeys clave" },
      },
      {
        label: { en: "Time to first response", es: "Tiempo de respuesta" },
        value: { en: "-35% TTR", es: "-35% TTR" },
      },
      {
        label: { en: "Pipeline visibility", es: "Visibilidad pipeline" },
        value: {
          en: "Unified dashboard from MQL to closed won",
          es: "Dashboard unificado de MQL→Closed Won",
        },
      },
    ],
    timelineWeeks: 5,
    modules: ["CRM OS", "AI OS", "Data OS", "Integrations OS"],
  },
];
