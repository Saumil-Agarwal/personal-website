# Editorial Visual Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a colored glass header, abstract AI hero artwork, project imagery, and restrained motion without compromising accessibility or performance.

**Architecture:** Introduce two decorative, data-driven visual components: `HeroArtwork` for the hero and `ProjectVisual` keyed by existing project slugs. Keep the page statically rendered and implement visual effects with semantic SVG/CSS rather than animation libraries or runtime canvas.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4/CSS, Vitest, Testing Library, Playwright, Vercel.

## Global Constraints

- Keep `#0a0a0a` as the dark background and `#00e5a0` as the only accent.
- Use a deep-emerald full-width header background.
- Use no stock photos, WebGL, autoplay video, canvas animation, or new animation dependency.
- Decorative artwork must use `aria-hidden="true"` and must not duplicate semantic content.
- Honor `prefers-reduced-motion: reduce` with static artwork and no smooth reveal motion.
- Preserve the existing terminal, command palette, scripted AI, routes, and content APIs.
- Prevent horizontal overflow and layout shift at all viewport sizes.

---

### Task 1: Colored header and editorial hero composition

**Files:**
- Create: `src/components/hero-artwork.tsx`
- Create: `src/components/hero-artwork.test.tsx`
- Modify: `src/components/nav.tsx`
- Modify: `src/components/hero.tsx`
- Modify: `src/components/portfolio.test.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: `HeroArtwork(): JSX.Element`, a decorative SVG/CSS visual.
- Preserves: `Hero` typewriter behavior and all CTA hrefs.

- [ ] **Step 1: Write failing tests**

Add assertions that the page has a full-width `site-header` wrapper, the hero contains one `aria-hidden` artwork with `data-testid="hero-artwork"`, all three existing CTAs remain, and the semantic H1 remains `Saumil Agarwal`.

Run:

```bash
npm run test:run -- src/components/portfolio.test.tsx src/components/hero-artwork.test.tsx
```

Expected: FAIL because `HeroArtwork` and `site-header` do not exist.

- [ ] **Step 2: Implement the markup**

Create `HeroArtwork` as one decorative SVG/CSS composition containing an organic core, three orbit rings, connecting paths, five nodes, and a mono caption. Wrap `Nav` in:

```tsx
<header className="site-header">
  <nav aria-label="Primary" className="nav shell">...</nav>
</header>
```

Change `Hero` to:

```tsx
<header id="top" className="hero shell">
  <div className="hero-copy">{/* existing prompt, H1, tagline, summary, CTAs */}</div>
  <HeroArtwork />
</header>
```

- [ ] **Step 3: Add layout and visual styling**

Style `.site-header` as sticky, full-width, deep emerald, translucent, blurred, and bordered. Style `.hero` as a two-column grid and stack it below 760px. Ensure `.hero-copy` remains above artwork and CTA focus states are unchanged.

- [ ] **Step 4: Verify**

Run the Task 1 test command. Expected: PASS.

---

### Task 2: Data-driven project imagery

**Files:**
- Create: `src/components/project-visual.tsx`
- Create: `src/components/project-visual.test.tsx`
- Modify: `src/components/project-card.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `Project["slug"]`.
- Produces: `ProjectVisual({ slug }: { slug: Project["slug"] }): JSX.Element`.

- [ ] **Step 1: Write failing visual-selection tests**

Render every current project slug and assert a decorative visual exists with `data-project-visual={slug}`. Assert an unknown slug renders the neutral fallback rather than throwing.

Run:

```bash
npm run test:run -- src/components/project-visual.test.tsx
```

Expected: FAIL because `ProjectVisual` does not exist.

- [ ] **Step 2: Implement one reusable component**

Create a visual configuration map:

```ts
const visualKinds = {
  "jira-github-autopilot": "workflow",
  "rdma-qos": "network",
  "go-security-microservice": "services",
  "tenant-isolation": "layers",
  "nats-jetstream-telemetry": "stream",
  "twofold-editions": "object",
} as const;
```

Render lightweight SVG shapes for each kind inside one component. Set `aria-hidden="true"` and `focusable="false"`.

- [ ] **Step 3: Integrate into cards**

Place `<ProjectVisual slug={project.slug} />` before card text. Preserve existing links, headings, and project content.

- [ ] **Step 4: Verify**

Run Task 2 tests and the existing portfolio tests. Expected: PASS.

---

### Task 3: Restrained motion and responsive polish

**Files:**
- Modify: `src/app/globals.css`
- Modify: `e2e/portfolio.spec.ts`

**Interfaces:**
- Consumes: class names from Tasks 1–2.
- Produces: static reduced-motion state and responsive visual layout.

- [ ] **Step 1: Extend Playwright assertions**

Assert at desktop and mobile that:

```ts
await expect(page.locator(".site-header")).toBeVisible();
await expect(page.getByTestId("hero-artwork")).toBeVisible();
await expect(page.locator("[data-project-visual]")).toHaveCount(6);
expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
```

- [ ] **Step 2: Implement CSS-only motion**

Add keyframes for slow core drift, ring rotation, node pulse, scan sweep, and subtle project-card visual movement. Keep durations between 6 and 24 seconds, avoid large translation, and animate only `transform` and `opacity`.

- [ ] **Step 3: Implement reduced-motion override**

Inside the existing reduced-motion media query, set all artwork animation names to `none`, remove hover transforms, and retain static visibility.

- [ ] **Step 4: Verify responsive behavior**

Run:

```bash
npm run test:e2e -- e2e/portfolio.spec.ts
```

Expected: desktop and mobile projects PASS with no overflow.

---

### Task 4: Full verification and deployment

**Files:**
- Modify: `.gitignore`
- Modify: `README.md`

**Interfaces:**
- Produces: documented visual architecture and a clean deployable repository.

- [ ] **Step 1: Ignore brainstorming scratch data**

Add:

```gitignore
/.superpowers/
```

- [ ] **Step 2: Document visual components**

Add `HeroArtwork` and `ProjectVisual` to the README architecture section, including the reduced-motion behavior and the absence of image/animation runtime dependencies.

- [ ] **Step 3: Run the complete quality gate**

Run:

```bash
npm run lint
npm run test:run
npm run build
npm run test:e2e
git diff --check
```

Expected: all commands exit 0.

- [ ] **Step 4: Deploy preview and smoke test**

Deploy to the linked Vercel project as preview. Verify `/`, one project route, `/sitemap.xml`, `/robots.txt`, and `/saumil-agarwal-resume.pdf` return 200.

- [ ] **Step 5: Commit, push, and promote only with explicit authorization**

Do not commit, push, or modify production aliases unless the user explicitly requests those actions after reviewing the preview.

