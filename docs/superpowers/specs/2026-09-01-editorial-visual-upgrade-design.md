# Editorial Visual Upgrade Design

**Owner:** Saumil Agarwal  
**Date:** 2026-09-01  
**Status:** Approved for implementation

## Goal

Upgrade the portfolio from a text-heavy terminal page into a more visually memorable personal site while preserving its minimalist, technical character.

## Approved direction

Use the **Editorial × Abstract AI** direction:

- Preserve the existing dark-first palette, terminal green accent, content, terminal, command palette, and scripted AI.
- Give the global header a clearly visible full-width deep-emerald glass background with a subtle lower border and blur.
- Recompose the hero as an editorial two-column layout:
  - Left: identity, strong headline, concise systems/AI positioning, and existing calls to action.
  - Right: original abstract AI/network artwork, not a human portrait or generic stock image.
- On mobile, stack text above artwork without hiding essential content.

## Hero artwork

The artwork is a layered generative-system object:

- Emerald gradient core with an organic geometric silhouette.
- Fine orbital rings, network nodes, and connecting paths.
- Soft radial glow and faint technical grid behind it.
- Small mono caption such as `GENERATIVE SYSTEM / 01`.
- Decorative artwork is hidden from assistive technology.

The artwork may be implemented with optimized SVG/CSS rather than a bitmap. This keeps it crisp, fast, themeable, and original while still functioning as visual imagery.

## Project imagery

Each project card receives a compact diagram-style thumbnail derived from its subject:

- Agentic workflow: issue → agents → tests → pull request.
- RDMA QoS: connected network paths and prioritized traffic lanes.
- Go microservice: service nodes and concurrent requests.
- Tenant isolation: separated security layers.
- NATS telemetry: streamed events and consumers.
- Twofold Editions: layered collectible/form silhouette.

Thumbnails share a restrained monochrome-green system and must not resemble unrelated stock photos. They are decorative and use existing project content as their data key.

## Motion

Use subtle, low-frequency animation:

- Slow hero core drift/rotation.
- Orbiting or pulsing network nodes.
- Occasional scanning highlight across the artwork.
- Gentle hero-grid movement.
- Project thumbnails reveal or shift slightly on hover.
- Sticky header becomes marginally more opaque over content.

No cursor-following effect, code rain, heavy canvas/WebGL, autoplay video, or large animation dependency.

When `prefers-reduced-motion: reduce` is active, all artwork and reveal animation becomes static immediately. Existing hero typewriter behavior remains reduced-motion safe.

## Visual constraints

- Background remains near-black `#0a0a0a`.
- Primary accent remains `#00e5a0`.
- Header uses a deep emerald derived from the accent, not a new competing hue.
- Body text contrast remains WCAG AA.
- Artwork must not overlap copy or reduce CTA readability.
- Keep runtime JavaScript minimal; CSS/SVG animation is preferred.
- Avoid layout shift and keep the homepage production build statically renderable.

## Architecture

- `Nav` remains the navigation content component and is placed inside a full-width header wrapper.
- `HeroArtwork` is an isolated decorative component.
- `ProjectVisual` is a single reusable component keyed by project slug, not six unrelated components.
- Existing content remains the source of truth.
- Tests cover semantic rendering, project visual selection, and reduced-motion-safe structure.
- Playwright verifies desktop/mobile hero layout, public navigation, and no horizontal overflow.

## Validation

- Unit/component tests, ESLint, Next.js production build, and Playwright must pass.
- Visually inspect desktop and mobile screenshots.
- Deploy a preview and smoke-test the homepage, project route, sitemap, robots, and resume before production promotion.

