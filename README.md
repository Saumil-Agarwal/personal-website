# Saumil Agarwal — Personal Portfolio

A dark-first, terminal-inspired portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS 4. It presents selected systems, security, and applied-AI work with an accessible interactive terminal, command palette, and local scripted Q&A.

## Architecture

- `src/content/site.ts` — the single typed source for profile, experience, projects, skills, and Q&A.
- `src/components/` — server-first portfolio sections plus focused client enhancements.
- `src/components/hero-artwork.tsx` — decorative SVG/CSS hero artwork (organic core, orbit rings, network nodes, glow, grid, caption). Hidden from assistive technology. No image assets or animation libraries.
- `src/components/project-visual.tsx` — reusable diagram-style SVG visual keyed by project slug (workflow, network, services, layers, stream, object). Falls back to a neutral visual for unknown slugs.
- `src/features/terminal/` — pure command registry, browser result handler, and terminal UI.
- `src/features/command-palette/` — keyboard command search using the same terminal registry.
- `src/features/ai/` — `AskProvider` and the deterministic local `scriptedProvider`.
- `src/app/projects/[slug]/` — statically generated project pages and per-project metadata.

### Visual design

The homepage uses a full-width deep-emerald sticky glass header and an editorial two-column hero layout. Hero artwork and project visuals are pure SVG/CSS with subtle `transform`/`opacity` animations (core drift, ring rotation, node pulse, scan sweep). When `prefers-reduced-motion: reduce` is active, all animation names are set to `none` and the artwork renders statically. On mobile (below 760 px), the hero stacks to a single column and artwork scales down. No stock images, canvas/WebGL, or external animation packages are used.

Supabase is intentionally unused: the launch has no persistence or authentication requirements, and its AI is stateless scripted matching rather than a live model backend.

## Local setup

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Editing content

Update `src/content/site.ts` to change the profile, experience, project cards/pages, skills, suggested prompts, and scripted answers. Keep employer work at portfolio-summary level; do not add confidential implementation details.

`scriptedProvider` is behind the `AskProvider` interface. A future API-backed model provider can implement `answer(question)` without changing the chat UI.

## Quality checks

```bash
npm run test:run     # Vitest unit/component tests
npm run lint         # ESLint
npm run build        # production build
npx playwright install chromium
npm run test:e2e     # desktop and mobile Chromium journeys
```

Playwright builds and starts the production app automatically.

## Deployment

Deploy as a standard Next.js project on Vercel with `npm run build`. Confirm the homepage, a project route, `/sitemap.xml`, `/robots.txt`, and the resume download. No environment variables are required for the stateless launch.
