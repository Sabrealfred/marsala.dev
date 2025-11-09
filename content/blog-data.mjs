/**
 * @typedef {Object} BlogEntry
 * @property {string} title
 * @property {string} slug
 * @property {"Guide"|"Playbook"|"Case Study"|"Insight"|"Tutorial"} type
 * @property {string} date
 * @property {string} readingTime
 * @property {string} summary
 * @property {string} description
 * @property {string[]} keywords
 * @property {string[]} tags
 * @property {string} image
 * @property {boolean} featured
 * @property {string} signal
 * @property {string} context
 * @property {string[]} stack
 * @property {string[]} playbook
 * @property {string[]} metrics
 * @property {string[]} lessons
 * @property {string} next
 */

/** @type {BlogEntry[]} */
export const blogEntries = [
  {
    title: "How I Orchestrated a Modular Marketing Stack in 2025",
    slug: "modular-marketing-stack-guide",
    type: "Guide",
    date: "2025-02-14",
    readingTime: "9 min read",
    summary: "Blueprint for aligning brand, web, data and automation around a single warehouse with explicit integration contracts.",
    description:
      "Deep dive covering the architectural decisions, contracts, release cadence and observability that let the Marsala team ship new marketing modules every week.",
    keywords: ["modular marketing", "growth ops", "data warehouse", "nextjs", "automation"],
    tags: ["Growth", "Architecture", "Data"],
    image: "/blog/modular-stack.jpg",
    featured: true,
    signal: "We had to treat the marketing stack like infrastructure, with swappable modules and versioned contracts.",
    context:
      "The engineering group took ownership of the go-to-market stack after three failed launches on monolithic suites. This article explains how we rebuilt it as a composable system centered on the warehouse.",
    stack: [
      "Next.js 15 + Turborepo for customer surfaces",
      "Supabase + BigQuery as the canonical data core",
      "Resend + PostHog for engagement and telemetry",
      "n8n and Segment as orchestration fabric",
    ],
    playbook: [
      "Map every funnel stage to a module with a named owner and a data contract.",
      "Version schemas and transformations in Git with dbt tests and reversible Airbyte jobs.",
      "Ship UI through a shared token system and multi-brand Storybook.",
      "Run weekly release trains guarded by feature flags and PostHog experiments.",
      "Publish swap runbooks so CRM, CMS or email changes look like standard PRs.",
    ],
    metrics: [
      "Lead-to-SQL +34% after unifying enrichment",
      "Core Web Vitals stayed green with four experiences live",
      "Average onboarding time for a new module: 2.5 days",
    ],
    lessons: [
      "Contracts, not components, keep modular stacks sane.",
      "Release rituals (demos, retros, alerts) separate composability from chaos.",
    ],
    next:
      "We are piloting an AI copilot that reads telemetry and suggests experiments automatically; early adopters welcome.",
    manual: true,
  },
  {
    title: "Modular Workflows with Resend and React Email",
    slug: "modular-resend-workflows",
    type: "Tutorial",
    date: "2024-11-15",
    readingTime: "8 min read",
    summary: "How the Marsala engineering team ships email like software using React components, automated QA, and Resend delivery.",
    description:
      "Explains the component system, workflow orchestration, observability and governance behind our modular messaging stack.",
    keywords: ["resend", "react email", "workflow automation", "n8n"],
    tags: ["Email", "Automation"],
    image: "/blog/resend-workflows.jpg",
    featured: true,
    signal: "Email needed the same engineering rigor as the rest of the stack, so we built a componentized system with strict QA.",
    context:
      "The team replaced brittle ESP templates with React Email components, Storybook previews, Chromatic regression tests, and n8n workflows versioned in Git.",
    stack: [
      "Private React Email component library",
      "Storybook + Chromatic visual tests",
      "Mailosaur inbox automation",
      "n8n YAML-defined workflows",
      "Resend delivery with domain authentication",
    ],
    playbook: [
      "Audit and deduplicate templates; capture requirements per module.",
      "Build a design-token-driven component kit and publish it as an internal package.",
      "Wire Storybook, Chromatic and Mailosaur into CI for every template.",
      "Express workflows as code, deploy via Fly.io and lint before merge.",
      "Instrument Resend webhooks + warehouse logging for observability.",
    ],
    metrics: [
      "Build time per sequence: 2 days → 4 hours",
      "Manual QA debt: -80%",
      "CTR lift: +38% on average",
      "Email-related incidents in 6 months: 0",
    ],
    lessons: [
      "Treat templates like software—components, linting, CI/CD.",
      "Version workflows; YAML plus Git beats drag-and-drop editing.",
      "Telemetry beats opinions; rely on Chromatic/Mailosaur/Resend signals.",
    ],
    next:
      "Extending the kit with localization slots and AI-powered QA so regional teams move as fast as the core squad.",
    manual: true,
  },
  {
    title: "Product Ops Roadmap Council: How We Stay Aligned",
    slug: "product-ops-roadmap-council",
    type: "Insight",
    date: "2024-11-18",
    readingTime: "7 min read",
    summary: "Process blueprint for a monthly roadmap council that balances growth bets, engineering capacity, and ops readiness.",
    description:
      "Covers the participants, data pack, scoring model, tooling, and lessons gathered after a year of running the council.",
    keywords: ["product ops", "roadmap", "council", "process"],
    tags: ["Product", "Ops"],
    image: "/blog/product-ops.jpg",
    featured: false,
    signal: "Roadmaps only work when decisions are transparent, data-backed, and capacity-aware.",
    context:
      "Product ops formalized decision-making with a monthly council fed by capacity data, initiative briefs, and KPI dashboards.",
    stack: [
      "Linear for capacity + dependency graphs",
      "Notion for briefs and decision logs",
      "Metabase for KPI slides",
      "Resend for automated summaries",
    ],
    playbook: [
      "Distribute a data pack (capacity, KPIs, briefs) one week prior.",
      "Run a structured 60-minute session with time boxes and clear decision rights.",
      "Score initiatives on fit, impact, confidence, and effort before voting.",
      "Log decisions within 24 hours and update Linear epics automatically.",
      "Review quarterly hit rate to ensure approved bets ship and move KPIs.",
    ],
    metrics: [
      "Initiatives shipped per quarter: 11 (vs 6 pre-council)",
      "Approval-to-launch lead time: 9 working days",
      "Unplanned work: -37%",
      "Stakeholder satisfaction: 9.3/10",
    ],
    lessons: [
      "Great briefs make or break the meeting; reject low-quality submissions.",
      "Publish the math behind every claim to keep trust high.",
      "Include RevOps and Finance early or risk downstream blockers.",
    ],
    next:
      "Publishing editable templates for briefs, scoring matrices, and decision logs.",
    manual: true,
  },
  {
    title: "AI Support Sandbox for Healthtech",
    slug: "ai-support-sandbox",
    type: "Case Study",
    date: "2024-11-20",
    readingTime: "8 min read",
    summary: "How we deployed AI triage in a regulated environment by isolating it inside a monitored sandbox.",
    description:
      "Breaks down the architecture, guardrails, monitoring and rollout plan behind our compliant AI support deployment.",
    keywords: ["ai support", "sandbox", "healthtech", "compliance"],
    tags: ["AI", "Support"],
    image: "/blog/ai-support.jpg",
    featured: false,
    signal: "Support wanted AI acceleration, compliance wanted guarantees—our sandbox satisfied both.",
    context:
      "The engineering team built an isolated Cloud Run service, redaction pipeline, and human-review desk so agents stay in control while AI suggests responses.",
    stack: [
      "Zendesk webhooks",
      "Supabase with row-level security",
      "OpenAI GPT-4o mini",
      "Cloud Run sandbox service",
      "Notion-based review UI",
    ],
    playbook: [
      "Redact and classify incoming tickets before sending them to the sandbox.",
      "Use bounded prompts with confidence scoring and tool call restrictions.",
      "Log every suggestion plus agent action to BigQuery for audits.",
      "Roll out in four stages (shadow, pilot, expanded, full) with legal sign-off at each gate.",
      "Feed agent edits back into the prompt library via nightly jobs.",
    ],
    metrics: [
      "Resolution time: -52%",
      "Deflection rate: 87%",
      "Agent satisfaction: 4.5/5",
      "Compliance incidents: 0",
    ],
    lessons: [
      "Legal only trusts what it can inspect—sandbox logs are your ally.",
      "Measure rejection reasons to improve prompts faster than aggregate accuracy stats.",
    ],
    next:
      "Packaging the sandbox (Terraform + prompts + evaluator scripts) for other regulated teams.",
    manual: true,
  },
  {
    title: "Experimentation Rituals That Actually Scale",
    slug: "experimentation-sprint-rituals",
    type: "Playbook",
    date: "2024-11-22",
    readingTime: "8 min read",
    summary: "Rituals, tooling, and accountability loops that let the team ship four experiments per sprint without chaos.",
    description:
      "Explains intake, planning, QA, telemetry, and retro cadences plus the tooling stack behind Marsala’s experimentation program.",
    keywords: ["experimentation", "sprints", "growth", "process"],
    tags: ["Growth", "Product"],
    image: "/blog/experimentation.jpg",
    featured: false,
    signal: "Experiments stopped being random bets—they became part of our weekly heartbeat.",
    context:
      "Growth, product, and engineering rebuilt the experimentation process around strict intake rules, feature flags, and automated analysis.",
    stack: [
      "Linear board dedicated to experiments",
      "Notion playbooks with A/B templates",
      "PostHog + dbt for tracking and analysis",
      "Resend digests + #experiments Slack updates",
    ],
    playbook: [
      "Weekly intake meeting vets hypotheses and ensures owner + metric.",
      "Plan sprints with tracking plans, QA checklists, and flag configs baked in.",
      "Launch via feature flags; Playwright + analytics smoke tests guard deployments.",
      "Friday demo + retro capturing actionable learnings and documenting outcomes.",
      "Auto-archive experiments with documentation snapshots and Resend summaries.",
    ],
    metrics: [
      "Velocity: 4 experiments per sprint",
      "Analysis completion: 100%",
      "Approval-to-decision time: 6.2 days",
      "Win rate: 27%",
    ],
    lessons: [
      "Guardrails (sample sizes, stopping rules) keep data honest.",
      "Documenting failed tests prevents rerunning them two months later.",
    ],
    next:
      "Piloting AI-generated hypotheses and automated debrief summaries.",
    manual: true,
  },
  {
    title: "Guardrails for a Marketing CMS in Production",
    slug: "marketing-site-cms-guardrails",
    type: "Guide",
    date: "2024-11-25",
    readingTime: "7 min read",
    summary: "How I let marketing edit freely without breaking the site or SEO.",
    description:
      "Guide for adding guardrails to a headless CMS: roles, previews and automated tests.",
    keywords: ["cms", "guardrails", "marketing site", "sanity", "nextjs"],
    tags: ["Web", "CMS"],
    image: "/blog/cms-guardrails.jpg",
    featured: false,
    signal: "I love when marketing edits without fear because I know the site is protected.",
    context:
      "Marketing asked for full autonomy but I refused to babysit releases. I built guardrails for Sanity/Contentful and Next.js.",
    stack: [
      "Sanity Studio with granular permissions",
      "Next.js preview mode + Vercel",
      "Playwright for visual QA",
      "Resend notifications on publish",
    ],
    playbook: [
      "Defined roles and approval workflows directly in the CMS.",
      "Implemented pixel-perfect previews wired to Slack approvals.",
      "Added SEO, accessibility and broken-link validators inside the editor.",
      "Ran end-to-end tests before publishing critical pages.",
      "Published a marketing handbook with best practices and no-gos.",
    ],
    metrics: [
      "Incidents caused by content changes: 0",
      "Time to launch campaigns: -50%",
      "Marketing satisfaction: 9.4/10",
    ],
    lessons: [
      "Previews must be identical to prod; 'close enough' is not enough.",
      "The CMS should educate with clear messages when something breaks.",
    ],
    next:
      "Next I'll add AI-powered SEO suggestions in real time. Want a demo? send me a note.",
  },
  {
    title: "AI Sales Desk Notebook with Unified Context",
    slug: "ai-sales-desk-notebook",
    type: "Case Study",
    date: "2024-11-28",
    readingTime: "8 min read",
    summary: "I built an interactive notebook so sales reps get every piece of context in one place.",
    description:
      "Case study of a sales desk powered by AI: notes, actions and resources in a living notebook.",
    keywords: ["sales desk", "ai", "notebook", "revops"],
    tags: ["AI", "SalesOps"],
    image: "/blog/sales-desk.jpg",
    featured: false,
    signal: "AEs stopped juggling 10 tabs—they live in the notebook now.",
    context:
      "Between the CRM, documents and email, context was always missing. I created a sales desk where AI summarizes, suggests and documents in one canvas.",
    stack: [
      "Notion with synced blocks for live data",
      "Attio API to pull pipeline + notes",
      "OpenAI for summaries and suggestions",
      "Resend to trigger follow-ups directly",
    ],
    playbook: [
      "Created deal templates with sections for notes, risks and next steps.",
      "Synced real-time data from Attio via rollups.",
      "Added buttons that draft follow-ups with AI yet keep humans in control.",
      "Instrumented access controls and logs for every sensitive action.",
      "Captured feedback from reps and shipped iterations every sprint.",
    ],
    metrics: [
      "Onboarding time for new AEs: -30%",
      "Complete notes per call: +55%",
      "Daily desk usage: 94% of the team",
    ],
    lessons: [
      "AI doesn’t replace judgement; everything stays editable before sending.",
      "Action-level logging keeps compliance happy.",
    ],
    next:
      "I'll be sharing this desk as a clonable template. Want it? leave me a ping.",
  },
  {
    title: "Partner Enablement Ops with Actionable Playbooks",
    slug: "partner-enablement-ops",
    type: "Guide",
    date: "2024-12-02",
    readingTime: "7 min read",
    summary: "I built a partner enablement program that keeps itself up to date.",
    description:
      "Guide for assembling partner enablement with content modules, metrics and automation.",
    keywords: ["partner enablement", "ops", "playbooks", "b2b"],
    tags: ["RevOps", "Enablement"],
    image: "/blog/partner-enablement.jpg",
    featured: false,
    signal: "Happy partners sell more; they needed enablement that actually breathes.",
    context:
      "Owning channel revenue taught me that partners get lost without operating guides. I built a modular program that adapts by maturity.",
    stack: [
      "Notion + Super.so for the public portal",
      "Supabase + n8n to track usage",
      "Resend for educational nurtures",
      "Attio to score engagement",
    ],
    playbook: [
      "Segmented partners by maturity and needs.",
      "Designed content tracks with short modules and quick assessments.",
      "Automated reminders based on activity and shared deals.",
      "Measured progress with dashboards for consumption + attributed revenue.",
      "Hosted bi-weekly office hours to reinforce learning.",
    ],
    metrics: [
      "Monthly active partners: +41%",
      "Onboarding time: 4 weeks → 9 days",
      "Average deal size via partners: +18%",
    ],
    lessons: [
      "Enablement has to be bite-sized and actionable; no endless PDFs.",
      "Measuring real usage tells you which modules to tweak without guessing.",
    ],
    next:
      "I'm packaging these modules as a ready-to-clone portal. Want early access? let me know.",
  },
  {
    title: "Localized Content Factory Without Losing Voice",
    slug: "localized-content-factory",
    type: "Case Study",
    date: "2024-12-04",
    readingTime: "9 min read",
    summary: "I automated translations and regional QA without sacrificing tone.",
    description:
      "Case study of a localized content factory mixing AI, human reviewers and governance.",
    keywords: ["localization", "content ops", "ai", "workflow"],
    tags: ["Content", "AI", "Ops"],
    image: "/blog/localized-content.jpg",
    featured: false,
    signal: "We graduated from improvised translations to a regional editorial line.",
    context:
      "Marketing wanted to launch in three new markets fast. I built a content factory where AI drafts, humans review and regional guidelines keep us honest.",
    stack: [
      "Notion CMS with content IDs",
      "OpenAI + custom glossaries",
      "Lokalise for regional reviewers",
      "Resend to send proofs to stakeholders",
    ],
    playbook: [
      "Defined voice guidelines per region and turned them into prompts.",
      "Automated first-pass translation and queued human review with SLAs.",
      "Built SEO + legal checklists for every market.",
      "Published dashboards for throughput and quality.",
      "Stored terminology in versioned glossaries.",
    ],
    metrics: [
      "Localization time: 10 days → 2.5 days",
      "Tone errors: -70%",
      "CTR on localized campaigns: +23%",
    ],
    lessons: [
      "AI accelerates, but local reviewers remain non-negotiable.",
      "Without living glossaries every person invents new terms.",
    ],
    next:
      "I'm working on a Figma + Notion plugin so design sees localized copy in context. Interested? let's chat.",
  },
  {
    title: "Data Quality Fire Drills for Growth Teams",
    slug: "data-quality-fire-drills",
    type: "Guide",
    date: "2024-12-06",
    readingTime: "7 min read",
    summary: "I run data fire drills so nobody panics when a real incident hits.",
    description:
      "Guide for executing data-quality fire drills: scripts, roles and learnings.",
    keywords: ["data quality", "fire drill", "analytics", "ops"],
    tags: ["Data", "Ops"],
    image: "/blog/data-drills.jpg",
    featured: false,
    signal: "Data crises are easier when you already rehearsed them.",
    context:
      "Whenever a dashboard broke Slack turned into chaos. I instituted monthly drills to train the response muscle.",
    stack: [
      "Supabase clones for staging",
      "dbt seeds with corrupt data",
      "PagerDuty for simulations",
      "Notion as the incident logbook",
    ],
    playbook: [
      "Plan realistic scenarios (freshness, duplicates, schema changes).",
      "Inject controlled bad data and trigger fake alerts.",
      "Run the drill with clear roles (incident commander, scribe, comms).",
      "Close with a retro and PRs to improve scripts/tests.",
      "Archive learnings and repeat monthly with variations.",
    ],
    metrics: [
      "Time to detect real incidents: -40%",
      "Team confidence during incidents: 9/10",
      "Runbooks updated after drills: 100%",
    ],
    lessons: [
      "Warn leadership ahead of time to avoid unnecessary escalations.",
      "Document immediately or the drill evaporates from memory.",
    ],
    next:
      "I'm publishing a library of ready-made scenarios. Want to contribute? DM me.",
  },
  {
    title: "Automation SRE for RevOps",
    slug: "automation-sre-revops",
    type: "Insight",
    date: "2024-12-09",
    readingTime: "7 min read",
    summary: "Treating RevOps automations like services with SRE discipline and SLAs.",
    description:
      "Insight on how I borrowed SRE practices for revenue automations.",
    keywords: ["sre", "revops", "automation", "reliability", "n8n"],
    tags: ["Ops", "Automation"],
    image: "/blog/automation-sre.jpg",
    featured: false,
    signal: "My RevOps workflows now have SLAs, alerts and on-call rotations just like any critical service.",
    context:
      "Every time a workflow failed, sales chased us. I implemented SRE practices to stabilize automations and sleep better.",
    stack: [
      "n8n + healthchecks.io",
      "Grafana + Loki for logs",
      "PagerDuty for shared on-call",
      "Supabase for audit trails",
    ],
    playbook: [
      "Defined SLOs for every critical workflow (latency, availability).",
      "Instrumented structured logging and centralized storage.",
      "Built error-budget dashboards and maintenance plans.",
      "Wrote runbooks and executed quarterly drills.",
      "Shared on-call rotations between automation and RevOps.",
    ],
    metrics: [
      "Incident response time: 25 min → 7 min",
      "Critical errors/month: -70%",
      "Sales satisfaction with automations: 9/10",
    ],
    lessons: [
      "Workflows need owners, alerts and documentation just like microservices.",
      "Sharing on-call builds empathy between dev and RevOps.",
    ],
    next:
      "I'm releasing runbook + SLO templates for RevOps. Want the bundle? drop your email.",
  },
  {
    title: "Segment-to-Warehouse Governance",
    slug: "segment-warehouse-governance",
    type: "Guide",
    date: "2024-12-11",
    readingTime: "7 min read",
    summary: "My framework so Segment and the warehouse speak the same language.",
    description:
      "Guide for coordinating the tracking plan, ownership and syncs between Segment and your warehouse.",
    keywords: ["segment", "warehouse", "governance", "tracking plan", "analytics"],
    tags: ["Data", "Analytics"],
    image: "/blog/segment-governance.jpg",
    featured: false,
    signal: "Without governance Segment is trash; with process it’s magic.",
    context:
      "I lead analytics and have seen too many tracking plans scribbled on napkins. Here’s how I keep ours alive and aligned with the warehouse.",
    stack: [
      "Segment tracking plan stored as YAML",
      "dbt tests + Elementary alerts",
      "Supabase ownership table",
      "Slack bots for approvals",
    ],
    playbook: [
      "Catalog events with owners and publish them in a repo.",
      "Automate validations comparing production payloads vs plan.",
      "Route every change through a PR with data + product reviewers.",
      "Version downstream transformations and reflect them in dbt.",
      "Sync critical fields to the warehouse with consistent naming.",
    ],
    metrics: [
      "Events without an owner: 0",
      "Tickets for inconsistent data: -65%",
      "Time to approve new events: 48h → 12h",
    ],
    lessons: [
      "Governance needs champions—rotate ownership to avoid burnout.",
      "Document good/bad event examples so teams learn faster.",
    ],
    next:
      "I'm releasing a versionable tracking-plan template. Drop your email and I’ll share it.",
  },
  {
    title: "Feature Flags with PostHog Without Breaking Prod",
    slug: "posthog-feature-flags-playbook",
    type: "Tutorial",
    date: "2024-12-13",
    readingTime: "8 min read",
    summary: "How I manage flags, experiments and cohorts directly inside PostHog.",
    description:
      "Tutorial for scaling feature flags with PostHog: naming, segmentation and metrics.",
    keywords: ["posthog", "feature flags", "experimentation", "nextjs", "cohorts"],
    tags: ["Product", "Experimentation"],
    image: "/blog/feature-flags.jpg",
    featured: false,
    signal: "Flags stopped being random strings—they’re governed like code now.",
    context:
      "We needed cohort-based rollouts without LaunchDarkly pricing. PostHog plus a bit of discipline did the trick.",
    stack: [
      "PostHog feature flags and cohorts",
      "Next.js middleware for gating",
      "Supabase edge functions for server toggles",
      "Slack + Linear for communication",
    ],
    playbook: [
      "Defined naming conventions and expiration dates for every flag.",
      "Use dynamic cohorts built from real events.",
      "Wire flags into middleware to guard entire routes.",
      "Track in Linear which flags must be removed post-experiment.",
      "Measure impact directly in PostHog and close the loop in dashboards.",
    ],
    metrics: [
      "Orphaned flags: 0 (automatic expiry FTW)",
      "Time to launch an experiment: 1 day",
      "Incidents caused by misconfigured flags: zero in 6 months",
    ],
    lessons: [
      "Every flag needs an owner and a death date.",
      "Document activation/deactivation steps to avoid late-night nerves.",
    ],
    next:
      "I'm writing reusable middleware snippets. Want them? let me know and I’ll share.",
  },
  {
    title: "Launch Readiness Runbook for Calm Releases",
    slug: "launch-readiness-runbook",
    type: "Guide",
    date: "2024-12-16",
    readingTime: "7 min read",
    summary: "My scorecard to know if a launch is truly ready.",
    description:
      "Guide with a cross-functional launch checklist: brand, web, data, automations and operations.",
    keywords: ["launch", "readiness", "scorecard", "ops", "process"],
    tags: ["Process", "Ops"],
    image: "/blog/launch-readiness.jpg",
    featured: false,
    signal: "Every launch starts with the same question—are we ready? This runbook gives me the answer.",
    context:
      "Too many rushed launches broke our funnels. I documented the scorecard I use to approve or stop releases.",
    stack: [
      "Linear board with gates per area",
      "Notion template for the scorecard",
      "Metabase dashboards for pre-launch KPIs",
      "PagerDuty for launch guard duty",
    ],
    playbook: [
      "Evaluate five dimensions (brand, web, data, automation, ops).",
      "Assign owners and risk labels per checklist.",
      "Run smoke tests on APIs and front ends.",
      "Execute a fire drill 48 hours before go-live.",
      "Document a post-launch plan with responsible people.",
    ],
    metrics: [
      "Launches delayed due to readiness: +2 (worth it)",
      "Critical incidents after launch: -80%",
      "Internal satisfaction with the process: 9/10",
    ],
    lessons: [
      "The scorecard isn’t bureaucracy; it’s a structured conversation.",
      "Celebrate when someone raises a red flag early.",
    ],
    next:
      "I’m sharing my Notion template soon. Want it? leave me your email.",
  },
  {
    title: "Privacy Layer for Growth Teams",
    slug: "privacy-layer-for-growth",
    type: "Insight",
    date: "2024-12-18",
    readingTime: "7 min read",
    summary: "I built a privacy layer that lets us experiment without scaring legal.",
    description:
      "Insight on how I structured consent, tokenization and governance for growth teams.",
    keywords: ["privacy", "growth", "compliance", "gdpr", "data"],
    tags: ["Data", "Compliance"],
    image: "/blog/privacy-layer.jpg",
    featured: false,
    signal: "There’s no sustainable growth without trust; the privacy layer is my insurance policy.",
    context:
      "I work with sensitive data. To move quickly without violating GDPR or SOC2, I created a privacy layer that abstracts PII and documents every use.",
    stack: [
      "Supabase + Row Level Security",
      "HashiCorp Vault for keys and secrets",
      "Segment consent mode + OneTrust",
      "PostHog proxy for anonymous events",
    ],
    playbook: [
      "Classified data by sensitivity and defined access rules.",
      "Tokenized emails/IDs before sending them to external tools.",
      "Implemented a legal-owned consent panel.",
      "Documented data purposes with automatic expiry rules.",
      "Automated audit reports each sprint.",
    ],
    metrics: [
      "Deletion requests served in <48h",
      "Privacy incidents in 2024: 0",
      "Time to approve new tools: -40%",
    ],
    lessons: [
      "Legal needs real-time visibility of where data travels.",
      "Teams accept constraints when they see the upside (fewer endless forms).",
    ],
    next:
      "I’m building a CLI that lists which services touch PII. Want to beta test it? ping me.",
  },
  {
    title: "Next.js Performance Audits Without the Drama",
    slug: "nextjs-performance-audits",
    type: "Guide",
    date: "2024-12-20",
    readingTime: "7 min read",
    summary: "The checklist I follow to keep Core Web Vitals green across complex Next.js properties.",
    description:
      "Practical performance guide: budgets, tooling and runbooks to keep Next.js fast.",
    keywords: ["nextjs", "performance", "core web vitals", "audits", "lighthouse"],
    tags: ["Web", "Performance"],
    image: "/blog/next-performance.jpg",
    featured: false,
    signal: "Give me clear budgets over last-minute hacks any day.",
    context:
      "I maintain landing pages and content-heavy apps. To avoid nuking Web Vitals I run frequent audits with repeatable processes.",
    stack: [
      "Lighthouse CI + GitHub Actions",
      "WebPageTest for real scenarios",
      "Calibre for continuous monitoring",
      "Next.js analyzer + bundle buddy",
    ],
    playbook: [
      "Define budgets (LCP, CLS, JS weight) and document them in the repo.",
      "Run Lighthouse on every PR and block merges on regressions.",
      "Use optimized images and streaming for heavy assets.",
      "Review shared bundles and convert heavy libs into dynamic imports.",
      "Share results weekly via a simple dashboard.",
    ],
    metrics: [
      "Average LCP: <2.2s desktop, <2.6s mobile",
      "JS shipped per page: -35%",
      "Post-release performance bugs: near zero",
    ],
    lessons: [
      "Audits must live inside the sprint, not as an extra chore.",
      "Budgets only work if every squad knows them by heart.",
    ],
    next:
      "I’m sharing a GitHub Actions workflow template with configurable budgets. Want it? let me know.",
  },
  {
    title: "Prompt Ops for Growth: How I Version Prompts",
    slug: "ai-prompt-ops-growth",
    type: "Insight",
    date: "2024-12-23",
    readingTime: "7 min read",
    summary: "My system for versioning prompts, monitoring outputs and avoiding hallucinations in growth flows.",
    description:
      "Practical insight for running prompt operations: repos, linters and review rituals.",
    keywords: ["prompt ops", "ai", "growth", "versioning", "automation"],
    tags: ["AI", "Process"],
    image: "/blog/prompt-ops.jpg",
    featured: false,
    signal: "I treat prompts like code: tests, PRs and success metrics.",
    context:
      "After breaking a nurture because of a poorly edited prompt, I established Prompt Ops with engineering-grade standards.",
    stack: [
      "Git repo dedicated to prompts",
      "Playwright + custom evals",
      "Linear issues with cross-functional reviewers",
      "Datadog for usage metrics",
    ],
    playbook: [
      "Tag every prompt with context, inputs and expected outputs.",
      "Create automated tests that validate length, tone and critical fields.",
      "Run monthly evals against real datasets to detect drift.",
      "Version templates and publish release notes for marketing.",
      "Handle incidents as if it were broken code (postmortem + fixes).",
    ],
    metrics: [
      "Incidents caused by prompt edits: -80%",
      "Approval time for updates: 3 days → 8h",
      "Team confidence in AI-guided flows: 9/10",
    ],
    lessons: [
      "Ownerless prompts become Frankenstein monsters; assign module captains.",
      "Documentation needs negative examples so people know what to avoid.",
    ],
    next:
      "I'm shipping a repo template with linting built in. Want early access? send me your GitHub.",
  },
  {
    title: "Modular Brand Library with Tokens and Version Control",
    slug: "modular-brand-library-tokens",
    type: "Guide",
    date: "2024-12-27",
    readingTime: "7 min read",
    summary: "I organized brand assets as if they were code: tokens, releases and visual QA.",
    description:
      "Guide for converting brand identity into a versioned system with tokens and clear workflows.",
    keywords: ["brand system", "tokens", "design ops", "storybook", "figma"],
    tags: ["Brand", "DesignOps"],
    image: "/blog/brand-library.jpg",
    featured: false,
    signal: "I stopped chasing logos on Slack once the brand lived in a repo.",
    context:
      "Between marketing and product we had 12 logo versions. I built a library with releases and accessible metadata.",
    stack: [
      "Figma libraries + variables",
      "GitHub repo with optimized assets",
      "Storybook for living documentation",
      "Cloudinary for dynamic delivery",
    ],
    playbook: [
      "Inventoried assets and defined consistent naming.",
      "Created tokens for color, type and motion, then synced them with code.",
      "Automated optimized exports via scripts.",
      "Publish release notes and changelog every two weeks.",
      "Added request forms for new variants with SLAs.",
    ],
    metrics: [
      "Urgent asset requests: -70%",
      "Multi-brand update time: 6h → 45 min",
      "Logo misuse incidents: almost zero",
    ],
    lessons: [
      "Governance matters: define who can publish and rollback.",
      "Embedded previews in Notion built trust quickly.",
    ],
    next:
      "I'm opening a best-practices guide for teams without dedicated design ops. Want to collaborate? let me know.",
  },
  {
    title: "Merging CRMs: HubSpot + Attio Without Losing History",
    slug: "crm-merge-attio-hubspot",
    type: "Case Study",
    date: "2024-12-30",
    readingTime: "9 min read",
    summary: "How I unified two CRMs and rebuilt the pipeline in a single trustworthy view.",
    description:
      "Practical case for merging HubSpot and Attio: ID reconciliation, owners and automations.",
    keywords: ["crm merge", "attio", "hubspot", "revops", "data"],
    tags: ["RevOps", "Data"],
    image: "/blog/crm-merge.jpg",
    featured: false,
    signal: "I had to clean the mess of parallel CRMs—and lived to tell the tale.",
    context:
      "After an acquisition we ended up with two CRMs fighting each other. I designed a controlled merge with staging, QA and clear comms.",
    stack: [
      "Airbyte + dbt for extraction and mapping",
      "Supabase staging with RLS rules",
      "Attio API to create final records",
      "Notion playbooks + Slack updates",
    ],
    playbook: [
      "Cataloged properties and flagged equivalences/conflicts.",
      "Designed dedupe rules with fuzzy + deterministic matches.",
      "Migrated in waves by account segments to reduce risk.",
      "Rebuilt critical automations in Attio with unit tests.",
      "Delivered training and health dashboards post-merge.",
    ],
    metrics: [
      "Records migrated successfully: 118k (98.7%)",
      "Automations re-enabled: 15 in two weeks",
      "Support tickets post-migration: <10",
    ],
    lessons: [
      "Merges fail due to poor communication; send daily status and public dashboards.",
      "Owners must validate their own data before anything gets deleted.",
    ],
    next:
      "I'm building reusable merge scripts; need one? reach out and we’ll adapt it.",
  },
  {
    title: "Figma to Production Without Friction",
    slug: "figma-to-production-pipeline",
    type: "Guide",
    date: "2025-01-02",
    readingTime: "8 min read",
    summary: "How I connect Figma, Storybook and Next.js to ship UI with zero surprises.",
    description:
      "Guide for syncing design and code: tokens, visual linters and joint releases.",
    keywords: ["figma", "storybook", "design handoff", "nextjs", "tokens"],
    tags: ["Design", "Frontend"],
    image: "/blog/figma-pipeline.jpg",
    featured: false,
    signal: "I made peace with Figma when the handoff literally became a PR.",
    context:
      "I'm a developer who loves visual craft. I built a pipeline where every Figma change mirrors Storybook and lands as a tagged release.",
    stack: [
      "Figma variables + tokens",
      "Style Dictionary for exports",
      "Storybook 8 with Chromatic",
      "Next.js + Tailwind token utilities",
    ],
    playbook: [
      "Sync color/type variables weekly into a private npm package.",
      "Create design PRs just like code, with assigned reviewers.",
      "Run visual tests in Chromatic and publish release notes for product.",
      "Coach marketing on how to play inside the playground before go-live.",
      "Version assets and mission-critical copy alongside the code release.",
    ],
    metrics: [
      "Visual bugs in production: -70%",
      "Handoff time: 4 days → 1.5 days",
      "Token adoption across squads: 100%",
    ],
    lessons: [
      "Variables need owners; design ops without guardrails is chaos.",
      "Storybook becomes the single source of truth only if everything gets reviewed there.",
    ],
    next:
      "I'm adding linters that compare frames vs components and raise PRs. Want in? I'll loop you when it's ready.",
  },
  {
    title: "Go-to-Market Ops Handoff Without Losing Context",
    slug: "go-to-market-ops-handoff",
    type: "Insight",
    date: "2025-01-04",
    readingTime: "7 min read",
    summary: "My framework for handing growth initiatives to operations without killing momentum.",
    description:
      "Practical insight for GTM handoffs: checklists, contracts and shared boards.",
    keywords: ["gtm", "handoff", "operations", "process", "growth"],
    tags: ["Process", "RevOps"],
    image: "/blog/gtm-handoff.jpg",
    featured: false,
    signal: "I never green-light an experiment unless I know who will run it afterwards.",
    context:
      "Too many experiments die because they never get productized. I built a handoff framework that forces us to document owners, metrics and runbooks.",
    stack: [
      "Linear for the shared roadmap",
      "Notion + Loom for handbooks",
      "Supabase to check exit metrics",
      "Slack workflows for reminders",
    ],
    playbook: [
      "Ask five key questions before closing a sprint (owner, metric, risks, playbooks, backlog).",
      "Record five-minute walkthroughs that travel with every handoff.",
      "Verify instrumentation and alerts before the build squad shuts down.",
      "Create status dashboards so operations can monitor without pinging engineering.",
      "Schedule quarterly retros to adjust process and tooling.",
    ],
    metrics: [
      "Initiatives still alive after three months: 92%",
      "Transition time to ops: 14 days → 4 days",
      "Incidents due to missing context: -60%",
    ],
    lessons: [
      "A solid handoff needs storytelling; cold documents flop.",
      "Operations must show up in discovery, not only at the finish line.",
    ],
    next:
      "I'm writing a reusable template for any squad. Want to pilot it? leave me your email.",
  },
  {
    title: "AI Ops War Room: Live Control Board for Operations",
    slug: "ai-ops-war-room",
    type: "Insight",
    date: "2025-01-06",
    readingTime: "8 min read",
    summary: "I built a war room that blends metrics, alerts and AI assistants to react in minutes.",
    description:
      "Insight on centralizing critical metrics, alerts and actionable playbooks with AI.",
    keywords: ["ai ops", "war room", "operations", "dashboards", "automation"],
    tags: ["Operations", "AI", "Dashboards"],
    image: "/blog/ai-ops-war-room.jpg",
    featured: false,
    signal: "The war room lives in a dark dashboard where AI summarizes and suggests actions.",
    context:
      "As we grew every team brought its own dashboard. I designed a digital war room with unified metrics and copilots that propose plans.",
    stack: [
      "Metabase + Notion for timeline and metrics",
      "PostHog + Snowflake for fresh data",
      "OpenAI function calling for playbooks",
      "PagerDuty/Slack for incidents",
    ],
    playbook: [
      "Pick three critical metrics per front (MRR, leads, support) and set budgets.",
      "Automate daily summaries with AI to highlight relevant changes.",
      "Add buttons to execute playbooks (activate nurture, pause campaign).",
      "Version every playbook in Git and surface it in the dashboard.",
      "Log actions and owners for historical accountability.",
    ],
    metrics: [
      "Daily stand-up: 45 min → 18 min",
      "Alerts handled in <10 minutes",
      "Actions with documented owners: 100%",
    ],
    lessons: [
      "The war room doesn’t replace human decisions—it accelerates them.",
      "Playbooks must be editable from the dashboard, not buried in a doc.",
    ],
    next:
      "Next step: use small local models for early anomaly detection. Want to try it with me? let me know.",
  },
  {
    title: "Product Qualified Leads System with Snowflake + Hightouch",
    slug: "product-qualified-leads-system",
    type: "Case Study",
    date: "2025-01-08",
    readingTime: "10 min read",
    summary: "I detect PQLs inside the product and hand them to sales in under 30 minutes.",
    description:
      "Case study on building a PQL pipeline using product events, Snowflake models and Hightouch activation.",
    keywords: ["pql", "snowflake", "hightouch", "plg", "activation"],
    tags: ["PLG", "Data", "Automation"],
    image: "/blog/pql-system.jpg",
    featured: false,
    signal: "The best leads were already inside the product; they just needed a spotlight.",
    context:
      "I own PLG and hated seeing hot accounts ignored. So I built a pipeline that listens to product activity, predicts intent and pings the right owner.",
    stack: [
      "Snowflake + Snowpark for models",
      "Hightouch for syncing to Attio/HubSpot",
      "PostHog for feature flags and traits",
      "Slack bots for instant alerts",
    ],
    playbook: [
      "Defined usage signals (workspaces, automations, seats) and built dbt views.",
      "Trained a logistic regression and exposed it as a consumable view.",
      "Synced scores to CRM, Slack and product via Hightouch.",
      "Added a weekly survey so AEs tag whether the PQL was legit.",
      "Retrained the model quarterly with real outcomes.",
    ],
    metrics: [
      "Pipeline generated internally: +44%",
      "Win rate on hot PQLs: +18 points",
      "Reaction time: <30 minutes",
    ],
    lessons: [
      "Human feedback matters; without AE notes the model gets arrogant.",
      "Document the logic behind each signal to avoid myths.",
    ],
    next:
      "I'm releasing dbt templates for teams that want to launch PQLs fast. Want them? let me know.",
  },
  {
    title: "Customer Journeys Orchestrated with Resend + Segment",
    slug: "customer-journey-automation-resend",
    type: "Guide",
    date: "2025-01-10",
    readingTime: "9 min read",
    summary: "I designed modular journeys that accompany onboarding, adoption and expansion.",
    description:
      "Guide for coordinating Segment, Resend, Notion and n8n to automate customer-first journeys.",
    keywords: ["resend", "segment", "journeys", "automation", "cx"],
    tags: ["CX", "Automation", "Email"],
    image: "/blog/customer-journey.jpg",
    featured: false,
    signal: "Journeys stopped being generic blasts and became useful conversations.",
    context:
      "I lead growth but think like a dev. I created modular journeys where each stage uses real data and living copy managed in Notion.",
    stack: [
      "Segment for event capture and fan-out",
      "Resend + React Email for versioned templates",
      "Notion as an editable CMS",
      "n8n for timers and conditions",
    ],
    playbook: [
      "Mapped stages (onboarding, adoption, expansion) with triggers and KPIs.",
      "Stored copy/assets in Notion with stable IDs that Resend reads.",
      "Configured n8n flows that watch activity and fire the right email.",
      "Ran QA with Mailosaur and real inboxes before launch.",
      "Tracked impact in PostHog to see which modules move metrics.",
    ],
    metrics: [
      "Activation rate: +31%",
      "Time-to-value: -42%",
      "Quarterly upsell ARR: +18%",
    ],
    lessons: [
      "Versioning templates is mandatory; we use Git + PRs for copy changes.",
      "Journeys need off-ramps; always offer a path to support or the CSM.",
    ],
    next:
      "I'm building email components marketing can remix without touching code. Want to see it? reach out.",
  },
  {
    title: "Lead Routing with n8n + Attio",
    slug: "lead-routing-n8n-attio",
    type: "Tutorial",
    date: "2025-01-12",
    readingTime: "7 min read",
    summary: "Routing leads based on actual capacity, specialization and timezone—no spreadsheets hidden in someone's desk.",
    description:
      "Tutorial for building a smart lead router with n8n, Attio and Slack.",
    keywords: ["lead routing", "n8n", "attio", "automation", "slack"],
    tags: ["Automation", "RevOps"],
    image: "/blog/lead-routing.jpg",
    featured: false,
    signal: "The router understands real availability, not just territory copied from an outdated Excel.",
    context:
      "Leads were being assigned at random. I built a dynamic router with transparent rules so nothing falls through the cracks.",
    stack: [
      "n8n hosted on Railway",
      "Attio API",
      "Supabase for load history",
      "Slack buttons for accept/reassign",
    ],
    playbook: [
      "Gathered signals: segment, industry, load and timezone.",
      "Built custom functions in n8n that return the ideal owner.",
      "Updated Attio with the assignment and triggered tasks automatically.",
      "Notified Slack with accept/reassign buttons.",
      "Added a Retool dashboard to pause owners on PTO.",
    ],
    metrics: [
      "Time to first contact: <15 minutes",
      "Lead acceptance rate: 93%",
      "Load deviation across owners: -41%",
    ],
    lessons: [
      "Automatic pause is critical; otherwise people on PTO keep receiving leads.",
      "All rules live in a repo—no secret spreadsheets allowed.",
    ],
    next:
      "Next I'm adding a fairness model. Want to try it in your team? let me know.",
  },
  {
    title: "Growth Sprints in 30 Days to Launch Marsala OS",
    slug: "growth-sprint-30-days",
    type: "Playbook",
    date: "2025-01-14",
    readingTime: "10 min read",
    summary: "My four-week methodology for going from discovery to modular system in production.",
    description:
      "Playbook showing how I ship Marsala OS in 30 days: discover, build foundations, craft experiences and activate.",
    keywords: ["growth sprint", "marsala os", "process", "launch", "playbook"],
    tags: ["Process", "Growth", "Product"],
    image: "/blog/growth-sprint.jpg",
    featured: false,
    signal: "I don't ship endless projects; I prefer intense 30-day sprints with real deliverables.",
    context:
      "WhenI lead a Marsala OS implementation I need momentum. This sprint lets me deliver value every week while keeping the whole crew aligned.",
    stack: [
      "Linear + Notion for planning",
      "Figma + Storybook for assets",
      "Next.js + Supabase for experience",
      "Resend + n8n for forms and nurtures",
    ],
    playbook: [
      "Week 1: workshops, current system map and prioritized backlog.",
      "Week 2: foundations (brand kit, data layer, environments).",
      "Week 3: core experiences (modules, research, contact).",
      "Week 4: cross-team QA, partial deploy and retro.",
      "Post sprint: 60-day backlog with owners.",
    ],
    metrics: [
      "Time to first real lead: ≤48h post go-live",
      "Internal satisfaction: ≥8/10",
      "Reusable modules activated: ≥70%",
    ],
    lessons: [
      "Every week ends with a demo; without visibility the energy dies.",
      "Experiments are planned from day one, not after launch.",
    ],
    next:
      "I'm polishing a Linear template so any team can run this sprint. Want it? DM me.",
  },
  {
    title: "Sales Copilot: Gong, Notion and Resend in One Panel",
    slug: "ai-sales-copilot-gong",
    type: "Insight",
    date: "2025-01-16",
    readingTime: "8 min read",
    summary: "I built a copilot that summarizes calls, updates the deal and drafts ready-to-send follow-ups.",
    description:
      "Insight on combining Gong, OpenAI, Notion and Resend so every call ends with clear next steps.",
    keywords: ["gong", "ai", "sales", "copilot", "notion"],
    tags: ["AI", "Sales", "Automation"],
    image: "/blog/sales-copilot.jpg",
    featured: false,
    signal: "My AEs no longer spend half an hour writing recaps; the copilot delivers human-sounding drafts.",
    context:
      "I was tired of half-written notes. I developed a copilot that understands our process and fills the gaps.",
    stack: [
      "Gong webhooks + secure storage",
      "OpenAI GPT-4o mini with versioned prompts",
      "Notion API for deals and next steps",
      "Resend for follow-ups built with React Email",
    ],
    playbook: [
      "Cached transcripts in encrypted Supabase for auditability.",
      "Fed prompts with deal history, stage and risks.",
      "Generated summaries, risks and actions straight into Notion.",
      "Drafted follow-up emails AEs can tweak in seconds.",
      "Collected feedback and retrained prompts weekly.",
    ],
    metrics: [
      "Time to follow-up: 25 min → 4 min",
      "Open tasks per deal: 17% → 5%",
      "Forecast confidence: 62% → 81%",
    ],
    lessons: [
      "AI needs guardrails; I cap length, tone and required fields.",
      "AEs adopt faster when they can edit before sending.",
    ],
    next:
      "I'm exploring automatic coaching based on conversation metrics. Want to join the beta? tell me.",
  },
  {
    title: "Partner Portal in 3 Weeks with Next.js + Supabase",
    slug: "partner-portal-nextjs-supabase",
    type: "Case Study",
    date: "2025-01-18",
    readingTime: "11 min read",
    summary: "Blueprint for launching a partner portal with auth, shared deals and automatic notifications.",
    description:
      "Case study detailing how I built a partner portal with authentication, shared pipeline, incentives and reporting.",
    keywords: ["partners", "nextjs", "supabase", "resend", "b2b portal"],
    tags: ["Web", "RevOps", "Product"],
    image: "/blog/partner-portal.jpg",
    featured: false,
    signal: "Partners deserved a proper UX; no more endless spreadsheets.",
    context:
      "Channel drives 35% of our pipeline. I crafted a portal because we needed speed and transparency.",
    stack: [
      "Next.js App Router + Tailwind",
      "Supabase Auth and RLS",
      "Attio + Notion APIs",
      "Resend for notifications",
    ],
    playbook: [
      "Designed role model (Admin, Sales, Marketing) with Supabase policies.",
      "Built modules: shared deals, content hub, incentives, support.",
      "Synced Attio webhooks to keep statuses aligned.",
      "Added Metabase dashboards for channel metrics.",
      "Tested releases with real partners via feature flags.",
    ],
    metrics: [
      "Partner response time: 24h → <4h",
      "Shared deals per month: +52%",
      "Quarterly partner satisfaction: 9.1/10",
    ],
    lessons: [
      "Partners crave clarity in incentives; expose calculations and statuses.",
      "Documenting APIs and flows reduced random support tickets.",
    ],
    next:
      "I'm preparing a starter kit for teams using Attio. Want early access? ping me.",
  },
  {
    title: "Turn PostHog into a Mini CDP",
    slug: "posthog-mini-cdp",
    type: "Tutorial",
    date: "2025-01-20",
    readingTime: "9 min read",
    summary: "I use PostHog, Kafka and Resend to activate audiences without a six-figure CDP.",
    description:
      "Tutorial for structuring events, streaming into Kafka and activating channels directly from PostHog.",
    keywords: ["posthog", "cdp", "activation", "kafka", "resend"],
    tags: ["Analytics", "Growth", "Automation"],
    image: "/blog/posthog-cdp.jpg",
    featured: false,
    signal: "I hacked PostHog until it behaved like a mini CDP and saved us $60k a year.",
    context:
      "We needed audiencies that update in real time without enterprise pricing. PostHog plus microservices delivered.",
    stack: [
      "PostHog Cloud with custom properties",
      "Kafka + Cloud Run consumers",
      "Firestore for rapid segmentation",
      "Resend + Meta Marketing API for activation",
    ],
    playbook: [
      "Defined a tracking plan with 12 canonical events and owners.",
      "Activated the Kafka destination and built a consumer that validates payloads.",
      "Synced CRM attributes through the API to enrich profiles.",
      "Created microservices to generate audiences and trigger nurtures.",
      "Automated QA scripts that simulate cohorts weekly.",
    ],
    metrics: [
      "Contextual email CTR: +46%",
      "Paid CAC by excluding active users: -28%",
      "Feature adoption on flagged cohorts: +19%",
    ],
    lessons: [
      "Without governance PostHog becomes a junk drawer.",
      "Tokenize PII before sending it anywhere; privacy isn't optional.",
    ],
    next:
      "I'll open-source part of the pipeline. Want the repo link when it's ready? let me know.",
  },
  {
    title: "Observability for RevOps Analytics",
    slug: "revops-analytics-observability",
    type: "Insight",
    date: "2025-01-22",
    readingTime: "7 min read",
    summary: "Monitoring freshness, volume and logic of RevOps models so sales never finds out first.",
    description:
      "How I implemented observability for the revenue pipeline using dbt, Metaplane and actionable alerts.",
    keywords: ["observability", "dbt", "revops", "metaplane", "analytics"],
    tags: ["Data", "RevOps", "Monitoring"],
    image: "/blog/data-observability.jpg",
    featured: false,
    signal: "I'd rather be the one telling sales about an incident, not the other way around.",
    context:
      "Revenue lives and dies by clean metrics. I implemented observability so anomalies show up minutes—not hours—later.",
    stack: [
      "dbt Core + Elementary",
      "Metaplane listening to artifacts",
      "Notion + PagerDuty for runbooks",
      "Slack alerts with context",
    ],
    playbook: [
      "Tag critical tables (leads, pipeline, recognized revenue) and assign budgets.",
      "Add freshness, volume and schema tests in dbt.",
      "Let Metaplane learn expectations and reduce alert noise.",
      "Automate incident tickets with n8n after two consecutive failures.",
      "Publish pipeline-health dashboards so everyone sees the same truth.",
    ],
    metrics: [
      "Incidents detected before business notices: 35 minutes earlier",
      "Blocked launches from bad metrics: 0 in Q1",
      "Model ownership coverage: 3 engineers can maintain all tables",
    ],
    lessons: [
      "Alerts need context; I include queries and next steps every time.",
      "Document budgets so teams stop arguing about severity.",
    ],
    next:
      "I'm exploring GitHub hooks that block PRs when contracts break. Want to beta it? reach out.",
  },
  {
    title: "Modular Design Systems for Scaleups",
    slug: "modular-design-system-scaleups",
    type: "Case Study",
    date: "2025-01-24",
    readingTime: "8 min read",
    summary: "How I built a multi-brand design system that serves marketing and product without duplicating components.",
    description:
      "Case study outlining tokens, Storybook federation and release cadence for a multi-brand design system.",
    keywords: ["design system", "figma", "storybook", "tokens", "brand"],
    tags: ["Design", "Process"],
    image: "/blog/design-system.jpg",
    featured: false,
    signal: "I refuse to maintain four copy-paste libraries; layered architectures keep us sane.",
    context:
      "Marketing and product both needed speed. I designed a layered system: core, brand and context components.",
    stack: [
      "Figma variables + Style Dictionary",
      "Storybook ๘ with Chromatic",
      "Tailwind tokens",
      "Linear + Notion release notes",
    ],
    playbook: [
      "Classified tokens into core, brand and context layers and versioned them in Git.",
      "Synced Figma to code via Style Dictionary.",
      "Defined request board with SLAs and weekly rituals.",
      "Automated Storybook releases with semantic tags.",
      "Documented anti-patterns to avoid rogue components.",
    ],
    metrics: [
      "Landing launch time: 8 days → 2.5 days",
      "Component reuse: 78%",
      "Visual QA tickets: -63%",
    ],
    lessons: [
      "Design systems need storytelling; otherwise teams think it's a blocker.",
      "Document when NOT to use a component—it avoids endless debates.",
    ],
    next:
      "I'm preparing a starter kit for teams adopting multi-brand systems. Want in? send me a note.",
  },
  {
    title: "Attio Migration Playbook",
    slug: "attio-migration-playbook",
    type: "Case Study",
    date: "2025-01-26",
    readingTime: "10 min read",
    summary: "Checklists and scripts I used to move 120k records from HubSpot to Attio without downtime.",
    description:
      "Playbook covering data, automations, QA and enablement for a high-stakes Attio migration.",
    keywords: ["attio", "hubspot", "migration", "crm", "revops"],
    tags: ["RevOps", "Data", "Automation"],
    image: "/blog/attio-migration.jpg",
    featured: false,
    signal: "I promised zero all-nighters and delivered a clean cutover.",
    context:
      "I love Attio because I can shape it to my process. This migration was my final exam: 120k records, 37 properties and multi-team workflows.",
    stack: [
      "Airbyte + dbt for extraction and normalization",
      "Attio API + TypeScript scripts",
      "Supabase for staging/QA",
      "Notion + Loom for enablement",
    ],
    playbook: [
      "Defined success criteria and blocked a freeze window.",
      "Created field mapping and dedupe rules versioned in Git.",
      "Ran a dress rehearsal with 5% of data and documented gaps.",
      "Rebuilt automations with Attio Actions and tests.",
      "Delivered trainings and a health dashboard after cutover.",
    ],
    metrics: [
      "Data completeness: 99.3%",
      "Automations rebuilt: 12 in three days",
      "Annual stack cost: -42%",
    ],
    lessons: [
      "Owners need 5-minute video walk-throughs per flow.",
      "Never ignore obscure properties; there's always a hidden integration.",
    ],
    next:
      "I'm packaging this playbook into a CLI. Want to test it? DM me.",
  },
  {
    title: "AI Lead Qualification Copilot",
    slug: "ai-lead-qualification-copilot",
    type: "Playbook",
    date: "2025-02-05",
    readingTime: "9 min read",
    summary: "My copilot mixes LLMs, enrichment and scoring to answer leads in 90 seconds.",
    description:
      "Playbook for building a copilot that qualifies leads with real context and respects the CRM.",
    keywords: ["LLM", "lead scoring", "copilot", "attio", "openai"],
    tags: ["AI", "RevOps", "Automation"],
    image: "/blog/ai-copilot.jpg",
    featured: false,
    signal: "I gave the sales team an assistant that thinks like we do, not like a bot.",
    context:
      "I didn’t want another generic template. I trained a copilot on real deals, objections and CRM chaos so it responds the way I would.",
    stack: [
      "OpenAI GPT-4o mini + versioned prompts",
      "Airtable as an editable buffer",
      "Attio API to write notes and scores",
      "Cloud Run + Redis for snappy queues",
    ],
    playbook: [
      "Collected examples of good/bad emails and annotated them with context (ICP, stage, objections).",
      "Built modular prompts with data from the warehouse and recent activity.",
      "Added human-in-the-loop when the score crosses a threshold.",
      "Synced outputs back to the CRM and triggered personalized follow-ups in Resend.",
      "Held weekly retros with sales to tweak tone and fields.",
    ],
    metrics: [
      "Time to first reply: 3h → 90 seconds",
      "Sales acceptance rate: +34%",
      "Manual corrections: -62%",
    ],
    lessons: [
      "The dataset dictates everything; without deal-desk context the model hallucinated optimism.",
      "Version prompts with change control; I store every edit in Git.",
    ],
    next:
      "I'm experimenting with small models trained on closed-won/lost tickets. Want to co-build? DM me.",
  },
  {
    title: "Why I Only Push Headless When It Hurts (and Pays)",
    slug: "why-headless-architecture",
    type: "Insight",
    date: "2025-01-28",
    readingTime: "7 min read",
    summary: "Lessons from migrating DTC brands to headless architectures without burning the team.",
    description:
      "Honest look at when headless is worth it, how I plan releases and what mistakes to avoid.",
    keywords: ["headless", "ecommerce", "nextjs", "sanity", "architecture"],
    tags: ["Architecture", "Commerce", "Web"],
    image: "/blog/headless.jpg",
    featured: false,
    signal: "I'm not dogmatic—I only push headless when it accelerates experiments and kills toxic fees.",
    context:
      "I've guided three migrations where Shopify exhausted its runway. This piece shares my mental checklists and how I defend the investment to finance.",
    stack: [
      "Next.js 15 + edge runtime",
      "Sanity + Portable Text",
      "Medusa.js or Shopify Storefront API",
      "Vercel + Netlify hybrid deploy",
    ],
    playbook: [
      "Start with performance, content and governance audit to ensure it's worth it.",
      "Lay out incremental roadmap (frontend, CMS, backend) with feature flags and dark launches.",
      "Version the design system in Figma + Storybook before touching production.",
      "Integrate analytics and SEO from day zero to avoid losing ranking.",
      "Plan module-level rollback runbooks so no one pulls all-nighters.",
    ],
    metrics: [
      "Lighthouse score: 42 → 96",
      "Platform fees: $60k → $2.4k per year",
      "Deploy time: 2 weeks → 5 minutes",
    ],
    lessons: [
      "Headless without content ownership is a ticking bomb; I train editors and build playgrounds.",
      "SEO cannot be an afterthought; migrations include URLs and redirects in every sprint.",
    ],
    next:
      "I'm iterating on a headless commerce kit optimized for LATAM. Want to be a beta partner? reach out.",
  },
  {
    title: "From Spreadsheets to Living Dashboards in 21 Days",
    slug: "spreadsheets-to-dashboards",
    type: "Guide",
    date: "2025-01-22",
    readingTime: "8 min read",
    summary: "How I transformed the CEO's spreadsheets into self-serve dashboards.",
    description:
      "Guide for migrating manual reporting to a governed analytics stack with versioning, alerts and storytelling.",
    keywords: ["dashboards", "analytics", "metabase", "supabase", "automation"],
    tags: ["Data", "Analytics", "Ops"],
    image: "/blog/dashboards.jpg",
    featured: false,
    signal: "My Mondays no longer start with copy/paste—every metric lives in a trustworthy board.",
    context:
      "I inherited 14 spreadsheets with fragile macros. Instead of crying I turned them into reproducible pipelines and self-service panels.",
    stack: [
      "Supabase as staging DB",
      "BigQuery for consolidated facts",
      "dbt + Elementary for tests and alerts",
      "Metabase + Looker Studio for viz",
    ],
    playbook: [
      "Audited every spreadsheet and mapped owners, columns and definitions.",
      "Built intermediate tables in dbt with schema + freshness tests.",
      "Redesigned KPIs in Metabase with filterable narratives.",
      "Automated PDF snapshots and Slack alerts for ±15% swings.",
      "Trained the team on safe exploration using curated collections.",
    ],
    metrics: [
      "Hours spent on reporting: 24h/month → 3h/month",
      "Manual errors detected: ~10% → <1%",
      "Time to answer CEO questions: 'tomorrow' → 'right now'",
    ],
    lessons: [
      "Don't delete spreadsheets until the new layer has champions.",
      "Storytelling matters; each dashboard includes notes and FAQs.",
    ],
    next:
      "I'm experimenting with interactive notebooks so product and growth build their own deep dives. Want a tour? schedule it on /contact.",
  },
  {
    title: "Cutting CAC with Conscious Data Activation",
    slug: "reduce-cac-data-activation",
    type: "Case Study",
    date: "2025-02-06",
    readingTime: "10 min read",
    summary: "I connected warehouse, ads and nurtures to reduce CAC by 42% without more budget.",
    description:
      "Case study showing real-time activation: scoring, synced audiences and intelligent campaigns.",
    keywords: ["data activation", "CAC", "warehouse", "ads", "revops"],
    tags: ["Growth", "Data", "Ads"],
    image: "/blog/reduce-cac.jpg",
    featured: false,
    signal: "Instead of burning budget I made the data smarter and focused on the leads that move the needle.",
    context:
      "Finance kept asking for proof. I modeled intent signals, prioritized hot leads and proved we didn’t need more spend.",
    stack: [
      "BigQuery + dbt for models",
      "Hightouch for synced audiences",
      "Resend Journeys for nurtures",
      "Metabase for leadership dashboards",
    ],
    playbook: [
      "Classified intent signals (product, marketing, support) and assigned weights.",
      "Trained a simple Snowpark model and wrapped it in FastAPI.",
      "Automated daily audience syncs per tier with tailored campaigns.",
      "Instrumented Slack notifications when a PQL changed status.",
      "Compared cohorts pre/post to defend the budget with finance.",
    ],
    metrics: [
      "Overall CAC: -42%",
      "Hot PQL win rate: +18 points",
      "Reaction time to strong signals: <30 minutes",
    ],
    lessons: [
      "Without consistent naming in the warehouse no automation survives.",
      "Teams trust the system when they see live dashboards replacing manual reports.",
    ],
    next:
      "Next up: near-real-time activation using Kafka and a lightweight feature store. Want to explore it with me? reach out.",
  },
  {
    title: "Automating Funnels with n8n Without Torching the CRM",
    slug: "automate-conversion-funnel-n8n",
    type: "Playbook",
    date: "2025-02-10",
    readingTime: "8 min read",
    summary: "Went from 40 manual hours to two hours a week by orchestrating scoring, nurtures and alerts inside n8n.",
    description:
      "Playbook for orchestrating a B2B funnel with n8n, Clearbit, Attio and Resend.",
    keywords: ["n8n", "automation", "lead funnel", "attio", "resend"],
    tags: ["Automation", "RevOps"],
    image: "/blog/n8n-automation.jpg",
    featured: false,
    signal: "I promised the team I’d give them their time back, and 17 versioned workflows later I kept that promise.",
    context:
      "I’m the dev who gets paged when Zapier hiccups. One day I moved everything to self-hosted n8n so leads stopped drowning in spreadsheets and duplicated tasks.",
    stack: [
      "n8n on Fly.io with Redis queues",
      "Clearbit Enrichment + Apollo",
      "Attio API",
      "Resend + PostHog for nurtures and tracking",
    ],
    playbook: [
      "Wrote JSON contracts for every trigger (forms, calendly, ads) and validated them with Zod.",
      "Built custom n8n nodes for scoring to avoid repeated function blocks.",
      "Synced everything with Attio using signed webhooks and mapping files.",
      "Published Metabase dashboards to see bottlenecks in real time.",
      "Set Slack alerts whenever an execution exceeded 90 seconds or hit fallback.",
    ],
    metrics: [
      "Operations time: 40h → 2h per week",
      "Misrouted leads: 18% → 2%",
      "Average time to first reply: 3h → 32 minutes",
    ],
    lessons: [
      "Without observability you’re blind; I store every payload in Supabase for replays.",
      "Non-technical owners love visual checklists; I document each play with Mermaid diagrams.",
    ],
    next:
      "I'm testing lightweight models to prioritize sentiment-driven follow-ups. Want help migrating off Zapier or Make? ping me.",
  },
];
