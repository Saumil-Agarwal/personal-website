# Portfolio Hardening Design

## Goal

Turn the current portfolio into an accessible, discoverable, evidence-led hiring site while preserving its terminal-inspired visual identity and static-first architecture.

## Architecture

Canonical project routes become the complete, shareable source of truth. Homepage cards retain a lightweight quick-view dialog and add ordinary links to the full case studies. Interactive behavior remains isolated in small client components; core content stays server-rendered.

Reusable accessibility behavior will live in a focused dialog component that provides focus containment, Escape handling, background isolation, scroll locking, and focus restoration. The header gains conventional mobile navigation and larger targets. Motion becomes decorative rather than the sole source of meaningful text.

Metadata will use the root title template correctly and emit route-specific canonical and social fields. Security headers, CI, runtime pinning, branded error states, and privacy-conscious measurement hooks will make deployment behavior explicit.

## User Experience

- Preserve dark-first styling and technical artwork.
- Give light mode its own accessible accent palette.
- Show a stable role proposition and concise proof points above the fold.
- Provide conventional navigation at every viewport, including a skip link.
- Feature three projects first and keep all six available.
- Label scripted Q&A honestly as a portfolio guide.
- Make contact intent and opportunity preferences explicit without inventing facts.

## Content

Project pages render artwork, problem, approach, architecture, impact, role/scope context where the existing source supports it, related navigation, and a contact CTA. Employer-confidential work remains at summary level. Education appears compactly near experience. Concurrent founder work is separated from chronological employment.

## Quality and Safety

Behavior changes are covered test-first. Required gates are lint, TypeScript, unit/component tests, production build, and existing desktop/mobile E2E tests. Repository-configured headers include CSP, nosniff, referrer, permissions, and framing protections compatible with the inline theme bootstrap and JSON-LD.

## Scope Boundaries

No live LLM, database, authentication, testimonial fabrication, or third-party analytics dependency is introduced. Analytics hooks may be added only when they remain inert without a configured provider.
