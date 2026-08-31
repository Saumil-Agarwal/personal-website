# Saumil Agarwal — Personal Portfolio

A dark-first, terminal-inspired portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS 4. It presents selected systems, security, and applied-AI work with an accessible interactive terminal, command palette, and local scripted Q&A.

## Architecture

- `src/content/site.ts` — the single typed source for profile, experience, projects, skills, and Q&A.
- `src/components/` — server-first portfolio sections plus focused client enhancements.
- `src/features/terminal/` — pure command registry, browser result handler, and terminal UI.
- `src/features/command-palette/` — keyboard command search using the same terminal registry.
- `src/features/ai/` — `AskProvider` and the deterministic local `scriptedProvider`.
- `src/app/projects/[slug]/` — statically generated project pages and per-project metadata.

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
