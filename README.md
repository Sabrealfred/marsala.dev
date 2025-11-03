⚙️ ESTRUCTURA DEL SITIO (para Claude Code / Git / Vercel)

Rutas principales (Next.js):

/ (Home)
/about
/modules
/lab
/cases
/contact


Estructura de carpetas:

/src
  /app
    /page.tsx                → Home principal
    /about/page.tsx          → Filosofía y equipo
    /modules/page.tsx        → Lista de servicios modulares (Brand, Web, CRM, AI, Ads)
    /lab/page.tsx            → Proyectos experimentales, código, IA, automatización
    /cases/page.tsx          → Casos de éxito y resultados
    /contact/page.tsx        → Formulario y datos de contacto
  /components
    /Hero.tsx
    /ModuleCard.tsx
    /Navbar.tsx
    /Footer.tsx
    /CaseCard.tsx
  /styles
    /globals.css
  /data
    modules.json
    cases.json

    ✍️ CONTENIDO BASE (para el sitio)
HERO

Headline:

Marsala OS: The Intelligent Growth Studio.

Subheadline:

Build your digital ecosystem with modular intelligence — from brand to automation, all in one system.

CTA:

[Explore Modules] · [Contact Team]

SECCIÓN 1 — What We Build

Every business deserves its own digital operating system.
Marsala OS integrates design, development, and AI to build your brand’s digital core.
Each service is a module — plug in, grow faster, automate smarter.

SECCIÓN 2 — Modules
Módulo	Descripción breve
Brand OS	Identity systems, visual languages, and storytelling for scalable brands.
Web OS	High-performance web architectures — built with Next.js, Vercel & Claude Code.
CRM OS	Automated lead pipelines with AI-driven insights and customer journeys.
AI OS	Generative workflows, copilots, and intelligent assistants for operations.
Ads OS	Paid media and growth automation tuned to maximize your CAC/LTV ratio.
SECCIÓN 3 — The Lab

Marsala Lab is where we prototype the future — integrating new APIs, AI models, and growth tools before they hit mainstream.
A living sandbox for innovation.

SECCIÓN 4 — Case Studies

Fintech Launch System — 10x faster GTM using modular stack.

Retail Brand Automation — 47% ad spend efficiency improvement.

AI CRM Migration — 300% engagement increase in customer flows.

SECCIÓN 5 — About

Marsala is a collective of developers, designers, and strategists building digital infrastructures that think.
We believe the next generation of growth comes from systems that learn.

SECCIÓN 6 — Contact

Let’s build your Marsala OS.
→ hello@marsalalabs.dev

[Schedule a Call] or [Join the Waitlist]

🎨 ESTILO VISUAL

Tema: oscuro con acentos borgoña y blanco

Tipografía: Inter + Satoshi / Sans moderna

Inspiración UI: Vercel
, Framer
, Linear

Motion: suave, con microinteracciones tipo fade y slide

Componentes clave:

Cards 3D hover para cada módulo

Animación de boot-up tipo “OS startup” al cargar el sitio

Navbar sticky minimalista con blur

{
  "intro": "Casos reales resumidos en decisiones, métricas y tiempos.",
  "items": [
    {
      "slug": "fintech-launch-system",
      "title": "Fintech Launch System",
      "industry": "Fintech",
      "objective": "GTM rápido con cumplimiento y data confiable",
      "stack": ["Next.js", "Vercel", "Supabase", "Stripe", "HubSpot", "Segment"],
      "decisions": [
        "Arquitectura headless con CMS ligero y componentes UI reusable",
        "Orquestación de leads y KYC en un solo dashboard",
        "Data layer común para marketing y producto"
      ],
      "results": {
        "ttm_speed": "10x más rápido vs baseline",
        "lead_to_sql": "+38% tasa lead→SQL",
        "core_web_vitals": "Mejora a green en LCP/CLS/INP"
      },
      "timeline_weeks": 6,
      "modules": ["Web OS", "CRM OS", "Data OS", "Integrations OS"]
    },
    {
      "slug": "retail-automation",
      "title": "Retail Automation",
      "industry": "Retail & e-commerce",
      "objective": "Eficiencia de ad-spend y mayor AOV",
      "stack": ["Next.js", "Shopify Headless", "GA4", "Meta/Google Ads", "n8n"],
      "decisions": [
        "Creatividades dinámicas por feed",
        "Experimentación semanal con bandit testing",
        "Audiencias sincronizadas por LTV"
      ],
      "results": {
        "ad_efficiency": "+47% eficiencia",
        "aov": "+19% AOV",
        "roas": "ROAS estable > 3.0"
      },
      "timeline_weeks": 8,
      "modules": ["Commerce OS", "Ads OS", "Data OS", "Content OS"]
    },
    {
      "slug": "ai-crm-migration",
      "title": "AI CRM Migration",
      "industry": "B2B SaaS",
      "objective": "Migrar CRM y aumentar engagement",
      "stack": ["HubSpot", "Salesforce", "Airbyte", "Postgres", "S3"],
      "decisions": [
        "ETL con validaciones y reconciliación de IDs",
        "Segmentación con scoring ML ligero",
        "Playbooks con IA para nurtures"
      ],
      "results": {
        "engagement": "x3 en journeys clave",
        "time_to_first_response": "-35% TTR",
        "pipeline_visibility": "Dashboard unificado de MQL→Closed Won"
      },
      "timeline_weeks": 5,
      "modules": ["CRM OS", "AI OS", "Data OS", "Integrations OS"]
    }
  ]
}
{
  "intro": "Activa los módulos que necesites hoy y conéctalos mañana. Todo habla el mismo idioma: datos, diseño y automatización.",
  "modules": [
    {
      "slug": "brand-os",
      "title": "Brand OS",
      "tagline": "Identidad escalable y accionable",
      "description": "Sistemas de identidad visual, tono de voz y kits para diseño y contenido reutilizable.",
      "deliverables": ["Logo & sistema", "Brand book", "UI kit", "Librería de componentes"],
      "outcomes": ["Consistencia", "Mayor reconocimiento", "Velocidad creativa"]
    },
    {
      "slug": "web-os",
      "title": "Web OS",
      "tagline": "Arquitecturas web de alto rendimiento",
      "description": "Sitios Next.js + Vercel optimizados para SEO, velocidad y conversión.",
      "deliverables": ["Landing/Website", "Blog/Docs", "Forms/Leads", "SEO técnico"],
      "outcomes": ["Mejor Core Web Vitals", "Más leads", "Menor rebote"]
    },
    {
      "slug": "crm-os",
      "title": "CRM OS",
      "tagline": "Pipelines y journeys con IA",
      "description": "Modelos de scoring, nurturing y reporting conectados a ventas y marketing.",
      "deliverables": ["Arquitectura CRM", "Workflows", "Dashboards", "Playbooks"],
      "outcomes": ["Más cierre", "Menos fricción", "Visibilidad real"]
    },
    {
      "slug": "ai-os",
      "title": "AI OS",
      "tagline": "Copilotos y automatización inteligente",
      "description": "Agentes para soporte interno, generación de contenido y tareas repetitivas.",
      "deliverables": ["Workflows generativos", "RAG/Embeddings", "Guardrails", "Monitoreo"],
      "outcomes": ["Ahorro de tiempo", "Calidad consistente", "Escalado operacional"]
    },
    {
      "slug": "ads-os",
      "title": "Ads OS",
      "tagline": "Paid media con ciencia",
      "description": "Creatividades dinámicas, testeo sistemático y optimización CAC/LTV.",
      "deliverables": ["Estrategia", "Setups", "Experimentación", "Reporting"],
      "outcomes": ["Mejor CPA", "Eficiencia +", "Escala controlada"]
    },
    {
      "slug": "data-os",
      "title": "Data OS",
      "tagline": "Datos confiables, decisiones mejores",
      "description": "Tracking, ETL y dashboards que unifican producto, marketing y ventas.",
      "deliverables": ["Data layer", "ETL/ELT", "Warehouse", "BI/Dashboards"],
      "outcomes": ["Alineación", "Velocidad de aprendizaje", "Menos conjeturas"]
    },
    {
      "slug": "commerce-os",
      "title": "Commerce OS",
      "tagline": "Headless listo para crecer",
      "description": "E-commerce desacoplado con catálogos, pagos y OMS conectados.",
      "deliverables": ["Catálogo", "Checkout", "OMS", "Integraciones"],
      "outcomes": ["AOV↑", "Conversión↑", "Operación fluida"]
    },
    {
      "slug": "content-os",
      "title": "Content OS",
      "tagline": "Motor editorial multiformato",
      "description": "Calendario, generación, QA y distribución automatizada.",
      "deliverables": ["Calendar", "Playbooks", "Templates", "Distribución"],
      "outcomes": ["Publicación constante", "Mejor SEO", "Menos costos"]
    },
    {
      "slug": "devops-os",
      "title": "DevOps OS",
      "tagline": "CI/CD y observabilidad",
      "description": "Pipelines, performance budgets y seguridad aplicada.",
      "deliverables": ["CI/CD", "Sentry/Logs", "Alertas", "WAF/CDN"],
      "outcomes": ["Menos downtime", "Release seguro", "Rendimiento estable"]
    },
    {
      "slug": "integrations-os",
      "title": "Integrations OS",
      "tagline": "Todo conectado",
      "description": "Conectores con CRM, Ads, Analytics, pagos, mensajería y más.",
      "deliverables": ["Connectors", "Webhooks", "iPaaS", "QA"],
      "outcomes": ["Menos tareas manuales", "Datos coherentes", "Velocidad de entrega"]
    }
  ]
}
/ (Home)

Hero — H1
Marsala OS — Intelligent Growth Studio

Subtítulo
Construimos tu ecosistema digital con módulos inteligentes: marca, web, IA, automatización y performance, listos para escalar.

CTAs
[Explorar módulos] · [Reservar llamada]

Highlights (3–5 bullets cortos)

Websites ultra-rápidos (Next.js + Vercel) optimizados para SEO y conversión.

Flujos de ventas y CRM con IA: menos fricción, más cierre.

Automatización end-to-end (ads, contenidos, reporting).

Diseño de marca escalable y consistente.

De idea a impacto medible en semanas, no meses.

Social proof (logos o texto breve)
Confiado por equipos en fintech, retail, salud y tecnología.

Bloque “Qué es Marsala OS”
Cada servicio es un módulo conectable. Activa solo lo que necesitas hoy y añade más a medida que escalas. Tu stack, tus reglas.

Módulos (cards resumidas)
Brand OS · Web OS · CRM OS · AI OS · Ads OS · Data OS · Commerce OS · Content OS · DevOps OS · Integrations OS

Mini-Casos (teasers)

Fintech Launch System: 10× time-to-market más rápido.

Retail Automation: +47% eficiencia en ad-spend.

AI CRM Migration: +3× engagement en journeys.

CTA final
Construyamos tu Marsala OS. [Hablemos] · [Únete a la lista de espera]

/about

Quiénes somos
Marsala es un estudio de crecimiento inteligente que combina estrategia, diseño, desarrollo y automatización. Creamos infraestructuras digitales que aprenden y mejoran con el tiempo.

Misión
Eliminar fricción entre marketing, producto y ventas con sistemas modulares, medibles y hermosos.

Visión
Un stack digital propio para cada empresa, tan simple de operar como un sistema operativo.

Valores

Clareza sobre complejidad. Diseño y code que se entiende.

Velocidad responsable. Entregas rápidas sin deuda impagable.

Obsesión por el impacto. Métricas antes que opiniones.

Escalabilidad real. Arquitecturas que soportan el crecimiento.

Privacidad y confianza. Seguridad por diseño.

Equipo (genérico para salir a producción)
Diseñadores, developers y estrategas con experiencia en SaaS, e-commerce, AI y growth.

Stack preferido
Next.js 15, Vercel, TypeScript, Tailwind, Supabase/Postgres, Prisma, Stripe, n8n, Make, Airbyte, LangChain/LlamaIndex, OpenAI/Anthropic, Pinecone/Weaviate, Cloudflare, GitHub Actions.

Manifiesto corto
Creemos que la próxima ola de crecimiento vendrá de sistemas que piensan, no de campañas aisladas.

/modules

Intro
Activa los módulos que necesites hoy y conéctalos mañana. Todo habla el mismo idioma: datos, diseño y automatización.

Listado (descripciones cortas)

Brand OS — Sistemas de identidad, guidelines, kits reutilizables.

Web OS — Arquitecturas web de alto rendimiento listas para SEO y escalamiento.

CRM OS — Pipelines, scoring, journeys y reporting con IA.

AI OS — Copilots internos, workflows generativos y asistentes operativos.

Ads OS — Media buying, creatividades dinámicas y optimización CAC/LTV.

Data OS — Tracking confiable, dashboards, ETL y activación de audiencias.

Commerce OS — E-commerce headless, catálogos y pagos orquestados.

Content OS — Motor editorial, multiformato, traducciones y distribución.

DevOps OS — CI/CD, observabilidad, rendimiento y seguridad.

Integrations OS — Conectores (HubSpot, Salesforce, GA4, Meta/Google Ads, Slack, Notion, etc.).

CTA
Solicita un Assessment de 30 minutos para mapear tu OS ideal.

/lab

Qué es el Lab
El Marsala Lab es nuestro sandbox de experimentación: nuevas APIs, modelos de IA, frameworks UI, conectores y playbooks.

Secciones

Experimentos: prototipos públicos.

Open Source: paquetes y plantillas.

Papers & Notas: aprendizajes aplicables.

Roadmap: lo que estamos probando después.

Nota
Algunas piezas del Lab se gradúan a Módulos cuando demuestran impacto sostenido.

/cases

Intro
Casos resumidos, centrados en métricas y decisiones de diseño/arquitectura.

Formato por caso

Contexto: industria, objetivo de negocio.

Stack: tecnologías, integraciones.

Lo clave: 3–5 decisiones de alto impacto.

Resultado: métricas (con rango o proxy si hay NDA).

Tiempo: semanas totales y fases.

Módulos activos: lista.

(Ver JSON de ejemplos más abajo)

/pricing

Enfoque
Precios transparentes por paquetes y retainers. Sin ataduras innecesarias.

Paquetes orientativos

Launch (3–4 semanas)

Website marketing (5–7 secciones) + Brand kit + Tracking base

Desde €6,900

Scale (6–8 semanas)

Web OS + CRM OS + Ads OS + Data OS

Desde €18,000

Operate (retainer mensual)

Growth+Automation con SLOs y roadmap trimestral

Desde €3,500/mes

Nota: presupuestos finales tras Assessment (complejidad, integraciones, compliance).

/contact

Copy
Hablemos de tu OS ideal. Cuéntanos tu objetivo de negocio y tu stack actual.

Datos

Email: hello@marsalalabs.dev

Calendly/Booking: (añadir link)

Ubicación: NYC · Londres · Remoto

Formulario
Nombre, Email, Empresa, Industria, Objetivo principal, Presupuesto estimado, Mensaje.

Aviso privacidad breve
Procesamos tus datos para responderte. No compartimos con terceros sin tu consentimiento.

Bloques reutilizables

Diferenciadores

Modular y evolutivo: activa lo necesario, crece sin rehacer.

Engineering first: performance, seguridad y CI/CD como base.

Growth con IA: creatividad y automatización con métricas.

Time-to-value rápido: entregables útiles desde la semana 1.

Playbooks y repos propios: repetimos lo que funciona.

Proceso (6 etapas)

Discover → diagnóstico y KPIs.

Architect → blueprint del OS y contratos de datos.

Build → diseño UI, frontend, backend e integraciones.

Automate → flujos de IA, CRM, contenidos y ads.

Launch → hardening, SEO técnico y performance.

Optimize → experimentación continua y reporting.

Seguridad & Compliance

OWASP, revisión de dependencias, políticas de acceso.

Data minimization y cifrado en tránsito/reposo (proveedores).

Cumplimiento según región (GDPR/UK GDPR, PCI-DSS para pagos).

Backups/versionado, monitoreo y rol-based access.

Industrias foco
Fintech · Retail & e-commerce · Salud/Bienestar · SaaS B2B · Educación.

FAQs (muestra)

¿Pueden trabajar con equipo interno? Sí, co-creamos y transferimos conocimiento.

¿Qué CMS usan? Headless (Contentlayer/MDX, Sanity, Strapi) o el que ya tengas.

¿Pueden migrar CRM? Sí (HubSpot, Salesforce, Pipedrive) con ETL y QA.

¿Hacen sólo diseño? Podemos, pero recomendamos entregar con Dev + Data.

¿Garantizan resultados? Garantizamos proceso y calidad; los KPIs dependen de contexto y ejecución continua.

Legal (footers/páginas dedicadas)

Términos de Servicio

Política de Privacidad

SLA de Soporte (para retainers)

Uso de IA y datos (transparencia de prompts, logs, storage)

Carreras
Buscamos builders: Frontend/Full-stack, Product Designers, Growth Engineers, Data/AI. Portafolio y Git son un plus.