# Next.js Starter Kit

Production-ready starter that mirrors the stack running on marsala.dev. It ships with:

- Next.js 15 App Router + React Server Components
- TypeScript + ESLint + Prettier + absolute imports
- Tailwind CSS with the Marsala token system (moss, sage, cream)
- Supabase auth + data starter wiring
- Netlify + Vercel ready `netlify.toml` / `vercel.json`
- Example marketing + blog routes using the same MDX pipeline as the main site

## Getting Started

```bash
npx degit Sabrealfred/marsala.dev/open-source/nextjs-starter my-app
cd my-app
npm install
npm run dev
```

## Features

- RSC-safe data helpers (`lib/api-server` vs `lib/api-client`)
- Pre-configured MDX pipeline with `next-mdx-remote`
- Minimal CMS adapter pattern (Sanity or Contentful)
- Ready-to-use `BlogCarousel`, `ModuleBuilder`, `Lab` sections

## License

MIT — use it freely for your own projects.
