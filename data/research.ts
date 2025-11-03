export type ResearchSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ResearchPost = {
  slug: string;
  type: "Case Study" | "Whitepaper" | "Insight";
  title: string;
  summary: string;
  detail: string;
  date: string;
  metrics: string[];
  readingTime: string;
  tags: string[];
  heroQuote?: string;
  heroAttribution?: string;
  sections: ResearchSection[];
  closingNote?: string;
};

export const researchPosts: ResearchPost[] = [
  {
    slug: "fintech-launch-system",
    type: "Case Study",
    title: "Fintech Launch System",
    summary: "How a regulated fintech platform achieved 10× faster time-to-market with a composable digital operating system.",
    detail: "Complete breakdown of architecture decisions, compliance workflows, and operational metrics over a six-week rollout.",
    date: "November 2025",
    metrics: ["10× faster GTM", "+38% lead conversion", "Green Core Web Vitals"],
    readingTime: "9 min read",
    tags: ["Fintech", "Compliance", "Next.js", "Automation"],
    heroQuote: "“Marsala helped us stand up a compliant go-to-market stack in weeks, not quarters.”",
    heroAttribution: "VP Growth · Regulated Fintech Startup",
    sections: [
      {
        heading: "Context & Objectives",
        paragraphs: [
          "A US-based fintech startup needed to launch a full marketing and onboarding experience under strict compliance constraints. The growth team wanted velocity, while the risk team required clear data contracts and audit trails.",
        ],
        bullets: [
          "Single source of truth for marketing, onboarding, and KYC.",
          "Launch window: 6 weeks with phased feature flags.",
          "SOC2-ready data handling and vendor approvals.",
        ],
      },
      {
        heading: "Architecture Decisions",
        paragraphs: [
          "We implemented a headless architecture on Next.js + Vercel with a component library wired to Contentlayer for editorial velocity. Compliance-sensitive data flowed through Supabase with row-level security and Stripe for payments.",
        ],
        bullets: [
          "Modular UI kit with tokenized theming for rapid iteration.",
          "Automated KYC pipeline (Persona + internal scoring) surfaced inside a unified RevOps dashboard.",
          "Segment warehouse exports synchronized marketing and product telemetry while respecting data minimization policies.",
        ],
      },
      {
        heading: "Performance & Results",
        paragraphs: [
          "Shipping in weekly increments gave the leadership team confidence to expand scope. Core Web Vitals were kept green by enforcing performance budgets in CI and using edge caching for all public endpoints.",
        ],
        bullets: [
          "Lead → SQL conversion lifted by 38% after CRM automations went live.",
          "Compliance reviews shortened from weeks to days thanks to automated evidence packets.",
          "Time-to-market improved 10× compared with the company’s original forecast.",
        ],
      },
    ],
    closingNote: "Looking to launch in a regulated market? Let’s architect your modular fintech stack together.",
  },
  {
    slug: "retail-automation-platform",
    type: "Case Study",
    title: "Retail Automation Platform",
    summary: "How an omnichannel retailer improved ad efficiency by 47% through creative automation and LTV-driven audiences.",
    detail: "Dynamic creative generation, weekly experimentation cadence, and lifetime-value segmentation delivered measurable growth.",
    date: "October 2025",
    metrics: ["+47% ad efficiency", "+19% AOV", "ROAS > 3.0"],
    readingTime: "8 min read",
    tags: ["Retail", "Ads Automation", "Creative Testing"],
    sections: [
      {
        heading: "The Challenge",
        paragraphs: [
          "A global retail brand was running siloed paid campaigns across multiple geos. Creative testing cadence was ad-hoc and audiences were not aligned with the brand’s lifetime value insights.",
        ],
      },
      {
        heading: "Solution Blueprint",
        paragraphs: [
          "Marsala OS connected Shopify (headless), GA4, and Meta/Google ads to a central experimentation engine orchestrated by n8n.",
        ],
        bullets: [
          "Automated feed-based creative variations with guard-railed brand components.",
          "Bandit testing schedule wired to a shared experimentation calendar.",
          "Audiences segmented by predicted LTV tiers and synced daily to paid channels.",
        ],
      },
      {
        heading: "Business Impact",
        paragraphs: [
          "Within two months, the growth team saw uplift across efficiency and revenue metrics, while the creative studio spent less time on repetitive asset work.",
        ],
        bullets: [
          "+47% improvement in cost-per-purchase efficiency.",
          "+19% increase in average order value through tailored messaging.",
          "Sustained ROAS above 3.0 even during seasonal peaks.",
        ],
      },
    ],
    closingNote: "Want creative automation without sacrificing brand control? Let’s design your Retail OS.",
  },
  {
    slug: "ai-crm-migration",
    type: "Case Study",
    title: "AI CRM Migration",
    summary: "A B2B SaaS team tripled engagement by migrating CRM data, layering ML scoring, and orchestrating AI-assisted nurture journeys.",
    detail: "ETL process, ID reconciliation, segmentation strategy, and AI playbooks for revenue teams operating at scale.",
    date: "September 2025",
    metrics: ["3× engagement", "-35% response time", "Unified pipeline dashboard"],
    readingTime: "10 min read",
    tags: ["B2B SaaS", "CRM", "AI Automation"],
    sections: [
      {
        heading: "Migration Strategy",
        paragraphs: [
          "Legacy Salesforce and HubSpot instances were consolidated into a single RevOps blueprint. We ran parallel ETL pipelines with Airbyte and validated IDs via deterministic + fuzzy matching.",
        ],
      },
      {
        heading: "AI-Powered Journeys",
        paragraphs: [
          "Lightweight ML models scored accounts based on intent signals from product usage, marketing engagement, and support tickets.",
        ],
        bullets: [
          "Copilot-generated outreach templates aligned to personas and buying stage.",
          "Automated enrichment and deduplication to keep records clean.",
          "Revenue dashboard covering MQL → SQL → Closed Won in real time.",
        ],
      },
      {
        heading: "Outcomes",
        paragraphs: [
          "Post-migration, the revenue team saw tighter collaboration and faster cycles, while leadership gained visibility into pipeline health.",
        ],
        bullets: [
          "3× engagement lift in key nurture journeys.",
          "-35% reduction in time-to-first-response for inbound leads.",
          "Single source of truth dashboards accessible to marketing, sales, and success.",
        ],
      },
    ],
    closingNote: "Planning a CRM consolidation with AI in the loop? Let’s build an automation brief together.",
  },
  {
    slug: "modular-growth-stacks",
    type: "Whitepaper",
    title: "Modular Growth Stacks",
    summary: "A practical framework for building digital operating systems that scale with your company.",
    detail: "Principles for modular architecture, integration contracts, and operational playbooks used across Marsala OS engagements.",
    date: "August 2025",
    metrics: [],
    readingTime: "12 min read",
    tags: ["Framework", "Architecture", "Operating Model"],
    sections: [
      {
        heading: "Why Modularity Matters",
        paragraphs: [
          "Monolithic growth stacks are brittle. Modularity allows companies to swap, extend, or pause components without derailing the entire system.",
        ],
      },
      {
        heading: "Core Principles",
        paragraphs: [
          "We break down the five governing principles that shape Marsala OS deployments—from data contracts to UI tokenization.",
        ],
        bullets: [
          "Interface-first components with clear hand-offs.",
          "Observable contracts that define consumption and mutation rights.",
          "Playbooks that bundle tooling, governance, and owner responsibilities.",
        ],
      },
      {
        heading: "Implementation Roadmap",
        paragraphs: [
          "Use a six-stage roadmap (Discover → Optimize) to guide cross-functional teams through the transformation.",
        ],
      },
    ],
    closingNote: "Download the workbook or talk to our team to tailor the framework to your org.",
  },
  {
    slug: "ai-automation-playbook",
    type: "Insight",
    title: "AI Automation Playbook",
    summary: "Practical guidance for designing AI workflows that ship value and stay compliant.",
    detail: "From content generation to support automation, with call-outs for guardrails and measurable success criteria.",
    date: "July 2025",
    metrics: [],
    readingTime: "7 min read",
    tags: ["AI", "Automation", "Operations"],
    sections: [
      {
        heading: "Use-Case Prioritization",
        paragraphs: [
          "We outline a decision matrix for selecting AI automations based on business impact, data readiness, and regulatory considerations.",
        ],
      },
      {
        heading: "Guardrails & Monitoring",
        paragraphs: [
          "Every AI workflow includes a minimum guardrail package: prompt governance, output auditing, and human-in-the-loop checkpoints.",
        ],
        bullets: [
          "Prompt libraries with semantic versioning.",
          "Red-teaming scripts for hallucination detection.",
          "Dashboards tracking adoption, quality, and savings.",
        ],
      },
      {
        heading: "Operationalizing AI",
        paragraphs: [
          "We close with a play-by-play for onboarding teams, measuring outcomes, and iterating AI features responsibly.",
        ],
      },
    ],
    closingNote: "Need a tailored AI automation roadmap? We’ll build it with your team.",
  },
  {
    slug: "performance-budgets-modern-web",
    type: "Insight",
    title: "Performance Budgets for the Modern Web",
    summary: "A handbook for keeping Core Web Vitals green across complex marketing and product surfaces.",
    detail: "Monitoring strategies, optimization techniques, and automated enforcement in CI/CD pipelines.",
    date: "June 2025",
    metrics: [],
    readingTime: "6 min read",
    tags: ["Performance", "Next.js", "DevOps"],
    sections: [
      {
        heading: "Setting the Budget",
        paragraphs: [
          "We show how to define budgets mapped to business KPIs—balancing brand experience with load time thresholds.",
        ],
      },
      {
        heading: "Tooling Stack",
        paragraphs: [
          "Integrate Lighthouse CI, WebPageTest, and custom synthetic checks to keep teams accountable.",
        ],
        bullets: [
          "Automated pull-request gates flag regressions.",
          "Performance snapshots for every release via GitHub Actions.",
          "Alerts routed to Slack with actionable guidance.",
        ],
      },
      {
        heading: "Governance & Culture",
        paragraphs: [
          "Performance budgets succeed when they become shared language for designers, engineers, and marketers.",
        ],
      },
    ],
    closingNote: "Talk to us about setting up performance budgets that stick long after launch.",
  },
];
