# Marsala.dev

**Intelligent Growth Studio** — Build your digital ecosystem with modular intelligence.

Live at [marsala.dev](https://marsala.dev)

## Overview

Marsala is a modular digital operating system for growing businesses. This repository contains the marketing website built with Next.js 14, featuring:

- 🎨 **Interactive module builder** with real-time state management
- 📚 **Research blog** with 8+ case studies and insights
- 🎯 **Moss green design system** with custom Tailwind configuration
- ⚡ **Performance optimized** static site generation
- 📱 **Fully responsive** with smooth animations and transitions

## Tech Stack

- **Framework**: Next.js 14.2.3 with App Router
- **Styling**: Tailwind CSS with custom color palette
- **Fonts**: Inter (300-700 weights)
- **Deployment**: Netlify
- **Language**: TypeScript
- **Package Manager**: npm

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
/app
  /page.tsx                    # Homepage with interactive module builder
  /modules/page.tsx            # Services overview
  /research/page.tsx           # Research blog listing
  /research/[slug]/page.tsx    # Individual research articles
  /about/page.tsx              # About page
  /contact/page.tsx            # Contact page
  /lab/page.tsx                # Lab page
  /layout.tsx                  # Root layout

/components
  /Navbar.tsx                  # Navigation with logo
  /Footer.tsx                  # Footer with links
  /ModuleCard.tsx              # Module display component

/data
  /modules.ts                  # Module definitions
  /research.ts                 # Research posts content

/public
  /logo.png                    # Brand logo
  /icon-arc.svg                # Custom SVG icons
  /icon-path.svg               # Custom SVG icons

/tailwind.config.ts            # Custom design system
```

## Design System

### Color Palette

**Moss Green** (Primary):
- `moss-50` to `moss-950` — Main brand color scale
- `moss-gradient` — Linear gradient (135deg)

**Sage** (Secondary):
- `sage-50` to `sage-900` — Complementary green-gray tones

**Cream** (Background):
- `cream-50` to `cream-300` — Warm neutral backgrounds

### Key Components

- **Interactive Cards**: Hover effects with translate-y and border transitions
- **Gradient Backgrounds**: Moss and sage blur effects for depth
- **Typography**: Bold headings with Inter font, clear hierarchy
- **Shadows**: Custom `shadow-glow`, `shadow-card`, `shadow-hover`

## Features

### Homepage
- Hero section with gradient backgrounds
- Metrics display with custom SVG icons
- **Interactive module builder**: Click to activate/deactivate modules
- Features section on dark moss background
- Call-to-action with dual buttons

### Research Blog
- Dynamic routes for individual articles
- 8+ case studies with metrics and insights
- Full-text content with sections, bullets, and quotes
- Share buttons for LinkedIn and Twitter
- SEO optimized with metadata

### Modules Page
- Overview of 10 modular services
- Clean card layout with descriptions
- CTA section for getting started

## Deployment

The site is deployed to Netlify with automatic builds from the `main` branch.

**Production URL**: https://marsala.dev

### Build Configuration

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "22"
```

## Development

### Adding Research Posts

Edit `/data/research.ts`:

```typescript
export const researchPosts: ResearchPost[] = [
  {
    slug: "your-post-slug",
    type: "Case Study" | "Whitepaper" | "Insight",
    title: "Your Title",
    summary: "Brief summary",
    detail: "Extended description",
    date: "Month YYYY",
    metrics: ["Metric 1", "Metric 2"],
    readingTime: "X min read",
    tags: ["Tag1", "Tag2"],
    sections: [/* content sections */],
    closingNote: "CTA text"
  }
];
```

### Adding Modules

Edit `/data/modules.ts` to add new service modules.

### Custom Colors

Modify `/tailwind.config.ts` to adjust the color palette:

```typescript
colors: {
  moss: { /* 50-950 */ },
  sage: { /* 50-900 */ },
  cream: { /* 50-300 */ }
}
```

## Performance

- ✅ Static site generation for all pages
- ✅ Optimized images with Next.js Image component
- ✅ Minimal JavaScript bundle size
- ✅ Fast page transitions
- ✅ Core Web Vitals optimized

## License

All rights reserved © Marsala.dev

## Contact

- **Email**: sales@marsala.dev
- **Website**: https://marsala.dev

---

Built with modular intelligence.
