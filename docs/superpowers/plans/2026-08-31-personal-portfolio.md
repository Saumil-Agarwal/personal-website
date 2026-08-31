# Personal Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy Saumil Agarwal’s production-ready personal portfolio with an interactive terminal, command palette, scripted AI assistant, project pages, and strong SEO/accessibility.

**Architecture:** A Next.js App Router site whose server-rendered portfolio sections and client-side interactions consume one typed content module. Terminal commands are pure functions in a shared registry used by both the terminal and command palette; the AI UI consumes a provider interface whose default implementation performs deterministic local matching and streaming.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Vitest, Testing Library, Playwright, Vercel.

## Global Constraints

- Dark-first visual system with `#0a0a0a` background and `#00e5a0` accent.
- Use Geist Sans and Geist Mono through `next/font`.
- Honor `prefers-reduced-motion`, WCAG AA contrast, visible focus, semantic HTML, and full keyboard access.
- Maintain one typed source of truth for profile, experience, projects, skills, and Q&A.
- Ship the scripted AI provider only; keep the real model backend out of launch scope.
- Do not add Supabase, authentication, CMS, analytics dashboards, or e-commerce.
- Do not expose employer-confidential implementation details.

---

### Task 1: Scaffold and quality baseline

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/page.tsx`
- Create: `src/test/setup.ts`
- Modify: `.gitignore`

**Interfaces:**
- Produces: Next.js App Router application, `@/*` path alias, `test`, `test:run`, `test:e2e`, `lint`, and `build` scripts.

- [ ] **Step 1: Scaffold the current directory**

Run:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitejs/plugin-react playwright @playwright/test
```

Expected: dependencies install and App Router files exist without replacing `.git`.

- [ ] **Step 2: Add test configuration**

Configure Vitest for `jsdom`, React, `src/test/setup.ts`, and the `@` alias. Add package scripts:

```json
{
  "test": "vitest",
  "test:run": "vitest run",
  "test:e2e": "playwright test",
  "lint": "eslint .",
  "build": "next build"
}
```

- [ ] **Step 3: Verify the baseline**

Run:

```bash
npm run lint
npm run build
```

Expected: both exit 0.

---

### Task 2: Typed content source of truth

**Files:**
- Create: `src/content/types.ts`
- Create: `src/content/site.ts`
- Create: `src/content/site.test.ts`
- Create: `public/saumil-agarwal-resume.pdf`

**Interfaces:**
- Produces: `profile`, `experience`, `education`, `projects`, `skillGroups`, `qa`, and `suggestedQuestions`.
- Produces types: `Profile`, `Experience`, `Project`, `SkillGroup`, `QuestionAnswer`.

- [ ] **Step 1: Write failing content-contract tests**

Test that slugs are unique, all featured projects have highlights, all external URLs use HTTPS, Q&A keywords are non-empty, and contact/resume fields exist.

Run:

```bash
npm run test:run -- src/content/site.test.ts
```

Expected: FAIL because the content module does not exist.

- [ ] **Step 2: Implement typed resume-backed content**

Populate the approved profile, Nutanix/Wells Fargo/Dalhousie/Twofold experience, BITS Pilani education, six projects, grouped skills, and curated Q&A. Phrase employer work at portfolio-summary level only.

- [ ] **Step 3: Verify content tests**

Run the Task 2 test command. Expected: PASS.

---

### Task 3: Design system and static portfolio sections

**Files:**
- Create: `src/components/section.tsx`
- Create: `src/components/nav.tsx`
- Create: `src/components/theme-toggle.tsx`
- Create: `src/components/hero.tsx`
- Create: `src/components/about.tsx`
- Create: `src/components/experience-timeline.tsx`
- Create: `src/components/project-card.tsx`
- Create: `src/components/projects.tsx`
- Create: `src/components/skills-grid.tsx`
- Create: `src/components/contact.tsx`
- Create: `src/components/footer.tsx`
- Create: `src/components/portfolio.test.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: all exports from `src/content/site.ts`.
- Produces: section IDs `about`, `experience`, `projects`, `skills`, `terminal`, `ask`, and `contact`.

- [ ] **Step 1: Write failing semantic-render tests**

Render the home page and assert one H1, named landmarks, all key sections, project links, contact links, and resume link.

Run:

```bash
npm run test:run -- src/components/portfolio.test.tsx
```

Expected: FAIL because portfolio components do not exist.

- [ ] **Step 2: Implement the design tokens and layout**

Define dark/light CSS custom properties, terminal grid/noise effects, responsive spacing, focus styles, reduced-motion overrides, and Geist font variables. Build server components for the static sections and a small client theme toggle that persists `saumil-theme`.

- [ ] **Step 3: Verify component tests**

Run Task 3 tests. Expected: PASS.

---

### Task 4: Terminal command engine

**Files:**
- Create: `src/features/terminal/types.ts`
- Create: `src/features/terminal/commands.ts`
- Create: `src/features/terminal/commands.test.ts`

**Interfaces:**
- Produces: `CommandResult = { kind: "text" | "navigate" | "clear" | "theme"; lines?: string[]; target?: string }`.
- Produces: `commands`, `executeCommand(input)`, and `completeCommand(input)`.

- [ ] **Step 1: Write failing pure-function tests**

Cover whitespace parsing, unknown commands, `help`, `whoami`, `projects`, `cat skills.txt`, `sudo hire-me`, `clear`, navigation targets, and unambiguous/ambiguous tab completion.

Run:

```bash
npm run test:run -- src/features/terminal/commands.test.ts
```

Expected: FAIL because the command engine does not exist.

- [ ] **Step 2: Implement the minimum command registry**

Commands must read imported content rather than duplicate biography/project text. Keep browser actions out of pure command functions.

- [ ] **Step 3: Verify command tests**

Run Task 4 tests. Expected: PASS.

---

### Task 5: Interactive terminal and command palette

**Files:**
- Create: `src/features/terminal/terminal.tsx`
- Create: `src/features/terminal/terminal.test.tsx`
- Create: `src/features/command-palette/command-palette.tsx`
- Create: `src/features/command-palette/command-palette.test.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/nav.tsx`

**Interfaces:**
- Consumes: `commands`, `executeCommand`, `completeCommand`.
- Produces: keyboard-accessible terminal and shared-registry `Cmd/Ctrl+K` palette.

- [ ] **Step 1: Write failing interaction tests**

Test command submission, output, Up/Down history, Tab completion, `clear`, click-to-focus, palette keyboard opening, filtering, Escape closing, and selection navigation.

Run:

```bash
npm run test:run -- src/features/terminal/terminal.test.tsx src/features/command-palette/command-palette.test.tsx
```

Expected: FAIL because components do not exist.

- [ ] **Step 2: Implement client interactions**

Use a form and labeled input rather than emulating raw terminal key handling. Resolve command actions in the UI with `scrollIntoView`, theme state, resume navigation, or scrollback reset.

- [ ] **Step 3: Verify terminal and palette tests**

Run Task 5 tests. Expected: PASS.

---

### Task 6: Scripted AI provider and chat

**Files:**
- Create: `src/features/ai/types.ts`
- Create: `src/features/ai/scripted-provider.ts`
- Create: `src/features/ai/scripted-provider.test.ts`
- Create: `src/features/ai/ai-chat.tsx`
- Create: `src/features/ai/ai-chat.test.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Produces: `AskProvider` with `answer(question: string): Promise<string>`.
- Produces: `scriptedProvider` and an `AiChat` that simulates streaming in the presentation layer.

- [ ] **Step 1: Write failing provider tests**

Test case-insensitive scoring, multi-keyword ranking, empty input rejection, known project answers, and safe fallback.

- [ ] **Step 2: Verify provider tests fail**

Run:

```bash
npm run test:run -- src/features/ai/scripted-provider.test.ts
```

Expected: FAIL because the provider does not exist.

- [ ] **Step 3: Implement deterministic matching**

Normalize words, score Q&A keyword intersections, choose the highest score, and return the fallback when all scores are zero.

- [ ] **Step 4: Write failing chat interaction tests**

Test suggested prompts, user submission, disabled state while responding, streamed final output, empty input, and repeated questions.

- [ ] **Step 5: Implement accessible chat UI**

Use an `aria-live="polite"` transcript, labeled form input, abortable timers, and immediate output when reduced motion is enabled.

- [ ] **Step 6: Verify AI tests**

Run both Task 6 test files. Expected: PASS.

---

### Task 7: Project detail pages and metadata

**Files:**
- Create: `src/app/projects/[slug]/page.tsx`
- Create: `src/app/projects/[slug]/not-found.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/opengraph-image.tsx`
- Create: `src/components/json-ld.tsx`
- Create: `src/app/projects/project-pages.test.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: project slugs and profile metadata.
- Produces: static project routes via `generateStaticParams`, per-project `generateMetadata`, Person JSON-LD, sitemap, robots, and generated OG image.

- [ ] **Step 1: Write failing route-data tests**

Assert each content slug maps to static params and metadata, and invalid slugs are rejected.

- [ ] **Step 2: Verify failure**

Run:

```bash
npm run test:run -- src/app/projects/project-pages.test.ts
```

Expected: FAIL because project route helpers do not exist.

- [ ] **Step 3: Implement project routes and SEO**

Use async `params` compatible with Next.js 16, `notFound()` for invalid slugs, canonical metadata, and no client JavaScript on project pages.

- [ ] **Step 4: Verify route tests and build**

Run:

```bash
npm run test:run -- src/app/projects/project-pages.test.ts
npm run build
```

Expected: PASS and static project pages listed in build output.

---

### Task 8: End-to-end accessibility and responsive verification

**Files:**
- Create: `e2e/portfolio.spec.ts`
- Create: `e2e/terminal.spec.ts`
- Create: `e2e/ai.spec.ts`

**Interfaces:**
- Consumes: the complete deployed-equivalent app.

- [ ] **Step 1: Write Playwright journeys**

Cover desktop/mobile navigation, theme persistence, all CTA targets, terminal commands/history/completion, command palette, scripted AI, project pages, contact links, and resume response.

- [ ] **Step 2: Install the test browser and run against production build**

Run:

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

Expected: all tests PASS at desktop and mobile viewport projects.

- [ ] **Step 3: Run complete local quality gate**

Run:

```bash
npm run lint
npm run test:run
npm run build
npm run test:e2e
```

Expected: all commands exit 0 without warnings attributable to the application.

---

### Task 9: Documentation, GitHub, and Vercel deployment

**Files:**
- Modify: `README.md`
- Create: `.env.example`

**Interfaces:**
- Produces: documented local setup, content editing guide, architecture notes, test commands, and Vercel deployment.

- [ ] **Step 1: Document the project**

Document Node requirements, `npm install`, `npm run dev`, all verification commands, the content module, why Supabase is intentionally unused, and how a future provider can implement `AskProvider`.

- [ ] **Step 2: Verify repository and remote safety**

Run:

```bash
git status --short
git diff --check
git remote -v
```

Expected: no secrets, generated build output, or `.env.local` staged.

- [ ] **Step 3: Commit only after explicit user authorization**

Stage application files and commit with the repository’s message style. Do not include credential files.

- [ ] **Step 4: Push only after explicit user authorization**

Push the current branch to its configured GitHub remote; do not force push.

- [ ] **Step 5: Link and deploy with Vercel**

Confirm Vercel authentication, link/create the Vercel project, deploy a preview, inspect build/runtime logs, test the preview URL, then deploy production.

- [ ] **Step 6: Final deployed smoke test**

Check the production homepage, one project route, sitemap, robots, resume, terminal command, and AI answer. Record the production URL.

