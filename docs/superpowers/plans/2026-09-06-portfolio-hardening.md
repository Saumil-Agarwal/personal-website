# Portfolio Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the approved accessibility, SEO, content, performance, security, and operational improvements and push the verified result to `main`.

**Architecture:** Keep the static-first Next.js App Router structure, add one reusable accessible dialog primitive, make project routes authoritative, and restrict client boundaries to interactions. Configuration remains dependency-light.

**Tech Stack:** Next.js 16.3.3, React 19, TypeScript, Tailwind CSS 4, Vitest, Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-09-06-portfolio-hardening-design.md`

## Global Constraints

- Preserve the terminal-inspired identity and existing content confidentiality level.
- Do not add a live LLM, database, authentication system, or fabricated proof.
- Implement behavior changes test-first.
- Require lint, typecheck, unit/component tests, production build, and desktop/mobile E2E verification before push.

---

### Task 1: Accessibility and navigation

**Files:** `src/components/*`, `src/features/command-palette/*`, `src/features/ai/*`, `src/app/globals.css`

- [ ] Add failing tests for focus containment/restoration, global Escape, mobile navigation, stable animated content, and theme state.
- [ ] Add a reusable accessible dialog and adopt it for project quick views and the palette.
- [ ] Add skip navigation, mobile navigation, target sizing, scroll offsets, safe live-region behavior, and accessible light-theme tokens.
- [ ] Run focused and full unit tests.

### Task 2: Canonical project experience and content

**Files:** `src/content/*`, `src/components/*`, `src/app/page.tsx`, `src/app/projects/[slug]/*`

- [ ] Add failing tests for project links, full case-study content, education, proof points, and honest portfolio-guide copy.
- [ ] Add full project routes, related navigation, project art, contact CTA, and route links from cards.
- [ ] Separate concurrent founder work and render education compactly.
- [ ] Run focused and full unit tests.

### Task 3: Metadata, robustness, and operations

**Files:** `src/app/*`, `next.config.ts`, `package.json`, `.github/workflows/ci.yml`, documentation and public assets.

- [ ] Add failing metadata and interaction regression tests.
- [ ] Correct title composition, canonical/social metadata, schema, sitemap dates, command search, theme storage, and router navigation boundaries.
- [ ] Add security headers, branded error pages, runtime pins, scripts, CI, and clean stale assets/docs.
- [ ] Run all quality gates and inspect the final diff.

### Task 4: Integrate

- [ ] Commit the verified implementation on `main`.
- [ ] Push `main` to `origin` without force.
