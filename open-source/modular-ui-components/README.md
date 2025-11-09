# Modular UI Components

Reusable React/Next.js components extracted from marsala.dev. Built with Tailwind CSS + framer-motion.

## Components Included

- `HomePageHero`, `HomePageSections`, `HomePageClient`
- `BlogCarousel`, `BlogPostCard`, `ResearchPageClient`
- Utility components: `MagneticButton`, `TiltCard`, `AnimatedCounter`, badges, CTA blocks

## Usage

```bash
npx degit Sabrealfred/marsala.dev/open-source/modular-ui-components ui-library
cd ui-library
npm install
npm run storybook
```

Or import directly into an existing Next.js project:

```tsx
import { HomePageHero } from "@/components/HomePageHero";

export default function Index() {
  return <HomePageHero />;
}
```

## Notes

- Components expect Tailwind config from marsala.dev. Copy `tailwind.config.ts` or merge the color tokens into your project.
- Animations use `framer-motion`. Disable motion by removing `motion` wrappers if you need pure CSS.

MIT Licensed.
