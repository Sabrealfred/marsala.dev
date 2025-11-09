// Client-safe blog utilities that don't require fs or other server-only modules

export type BlogCategory = {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
};

export const BLOG_CATEGORIES: Record<string, BlogCategory> = {
  "growth-marketing": {
    id: "growth-marketing",
    name: "Growth & Marketing",
    description: "Estrategias de growth, marketing automation y data activation",
    color: "moss",
    icon: "📈"
  },
  "tech-architecture": {
    id: "tech-architecture",
    name: "Tech & Architecture",
    description: "Arquitecturas modernas, headless, y stacks tecnológicos",
    color: "sage",
    icon: "⚙️"
  },
  "data-analytics": {
    id: "data-analytics",
    name: "Data & Analytics",
    description: "Analytics, dashboards, y business intelligence",
    color: "moss",
    icon: "📊"
  },
  "ai-automation": {
    id: "ai-automation",
    name: "AI & Automation",
    description: "Inteligencia artificial, copilots y automatización",
    color: "sage",
    icon: "🤖"
  },
  "crm-sales": {
    id: "crm-sales",
    name: "CRM & Sales",
    description: "CRM, sales ops, y lead management",
    color: "moss",
    icon: "💼"
  },
  "frameworks-playbooks": {
    id: "frameworks-playbooks",
    name: "Frameworks & Playbooks",
    description: "Guías prácticas y frameworks de implementación",
    color: "sage",
    icon: "📚"
  }
};

export function formatBlogDate(date: string, locale = "en-US") {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingTime?: string;
  tags?: string[];
  type?: string;
  content: string;
};

export function getCategoryForPost(post: BlogPost): BlogCategory {
  const tags = post.tags?.map(t => t.toLowerCase()) || [];
  const title = post.title.toLowerCase();
  const type = post.type?.toLowerCase() || "";

  // AI & Automation
  if (tags.some(t => t.includes("ai") || t.includes("automation") || t.includes("copilot"))) {
    return BLOG_CATEGORIES["ai-automation"];
  }

  // Growth & Marketing
  if (tags.some(t => t.includes("growth") || t.includes("marketing") || t.includes("cac") || t.includes("performance"))) {
    return BLOG_CATEGORIES["growth-marketing"];
  }

  // Data & Analytics
  if (tags.some(t => t.includes("data") || t.includes("analytics") || t.includes("dashboard") || t.includes("business intelligence"))) {
    return BLOG_CATEGORIES["data-analytics"];
  }

  // CRM & Sales
  if (tags.some(t => t.includes("crm") || t.includes("sales") || t.includes("lead"))) {
    return BLOG_CATEGORIES["crm-sales"];
  }

  // Tech & Architecture
  if (tags.some(t => t.includes("headless") || t.includes("architecture") || t.includes("stack") || t.includes("jamstack"))) {
    return BLOG_CATEGORIES["tech-architecture"];
  }

  // Frameworks & Playbooks
  if (type.includes("playbook") || type.includes("guide") || type.includes("framework")) {
    return BLOG_CATEGORIES["frameworks-playbooks"];
  }

  // Default
  return BLOG_CATEGORIES["frameworks-playbooks"];
}
