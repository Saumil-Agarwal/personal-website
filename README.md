# Saumil Agarwal — Personal Portfolio

A dark-first, terminal-inspired portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS 4. It presents selected systems, security, and applied-AI work with an accessible interactive terminal, command palette, and local scripted Q&A.

**Live site:** [saumil-agarwal.vercel.app](https://saumil-agarwal.vercel.app)

## Architecture

- `src/content/site.ts` — the single typed source for profile, experience, projects, skills, and Q&A.
- `src/components/` — server-first portfolio sections plus focused client enhancements.
- `src/components/hero-artwork.tsx` — decorative SVG neural-core geometry. Hidden from assistive technology. No image assets or animation libraries.
- `src/components/project-visual.tsx` — reusable diagram-style SVG visual keyed by project slug (workflow, network, services, layers, stream, object). Falls back to a neutral visual for unknown slugs.
- `src/features/terminal/` — pure command registry, browser result handler, and terminal UI.
- `src/features/command-palette/` — keyboard command search using the same terminal registry.
- `src/features/ai/` — `AskProvider` and the deterministic local `scriptedProvider`.
- `src/app/projects/[slug]/` — statically generated project pages and per-project metadata.

### Visual design

The cinematic portfolio uses oversized ivory typography, an obsidian canvas, mint accents, and a custom SVG neural core. The experience starts at the hero and continues through 13 native-scroll chapters. Each project has its own scene, a distinct accent, and an evidence-backed impact statement. A chapter rail and persistent progress bar support direct jumps and next-chapter navigation. Quick-view dialogs and project routes remain available.

- `src/app/cinematic.css` contains the redesign styles, loaded after shared base styles.
- `src/app/story.css` defines the chapter composition and responsive snap behavior.
- `src/components/chapter-navigation.tsx` tracks active chapters and schedules decorative transforms through one animation frame per scroll update. Direct anchor jumps temporarily suspend snap to cancel pending wheel momentum; native snap resumes on the next gesture or navigation key.
- `src/components/motion-controls.tsx` provides a global pause/resume control.
- Mobile and reduced-motion users get every chapter in normal document flow. Content is server rendered; project links are available in a no-JavaScript fallback.
- Both light and dark themes remain available. No new runtime dependencies, external image requests, or AI service credentials are required. The portfolio Q&A remains explicitly scripted.

For environments that restrict Turbopack worker ports, use `npm run build -- --webpack` to run the supported Next.js production-build fallback. Google Fonts must be reachable for the existing `next/font` configuration.

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
