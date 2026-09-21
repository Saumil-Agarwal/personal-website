# Cinematic AI Portfolio Implementation Plan

Goal: Ship the approved premium scroll experience on feat/cinematic-ai-portfolio.
Architecture: Server-rendered content and SVG art; a small client scroll controller updates decorative transforms. Existing interactive features remain intact.
Tech stack: Existing Next.js 16 / React 19 / TypeScript / CSS.
Spec: ../specs/2026-09-21-cinematic-ai-design.md
Execution: Inline, as requested by the user.

- [x] Rebuild hero.tsx and hero-artwork.tsx with static readable text, neural geometry, and editorial composition. Preserve CTA destinations and semantic name.
- [x] Add architecture-scene.tsx and motion-controls.tsx. Animate layers with native scroll; provide pause, reduced-motion and mobile fallbacks. Exercise scroll progression and fallback in browser tests.
- [x] Add cinematic.css, imported after base styles. Style gallery, timeline, skills, contact, navigation and interactive tools consistently across light/dark and mobile.
- [x] Update obsolete animation/layout tests to the new behavior. Preserve functional regression coverage. Check no-JS, reduced motion, pause, mobile overflow, dialog focus, and both themes.
- [x] Run full checks and browser screenshots; review code and update README. Commit and push the requested branch; leave main unchanged.

## Verification results

- ESLint, TypeScript and 74 unit tests pass.
- Production build passes with `npm run build -- --webpack`; Turbopack is blocked by the local environment's worker-port restriction.
- Production browser suite: 18 pass, 2 viewport-specific skips, using desktop and mobile Chromium. The existing built production server was reused through a temporary ignored Playwright config.
- Screenshots inspected: desktop hero, architecture scene, gallery, and mobile layout. No runtime page errors or horizontal overflow in the inspected journeys.
- Independent review identified a 641–760px navigation gap and paused root smooth scrolling; both fixed. Full independent review could not finish because the reviewer hit a usage limit. Author review and browser checks completed.
- Chosen implementation: deterministic SVG and native scroll keep the effect dependency-free; AI remains a visual theme with the existing clearly labeled scripted Q&A.
