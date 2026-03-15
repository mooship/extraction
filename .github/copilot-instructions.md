# Project Guidelines

## Build & Validate

```bash
npm run dev          # Vite dev server
npm run build        # tsc type-check + vite build
npm run biome:fix    # Auto-fix formatting and lint
npx biome check src/ index.html  # Pre-commit check
```

No test framework. Validate changes with `npm run build` (catches type errors) and `npx biome check src/ index.html`.

## Architecture

Single-page vanilla TypeScript site built with Vite. No framework.

- `index.html` — all page structure and chart mount points; chart markup is injected at runtime
- `src/main.ts` — entry point; imports CSS and initialises all modules
- `src/animations.ts` — IntersectionObserver scroll reveals (`.reveal`, `.reveal-left`)
- `src/counters.ts` — RAF-based counter animation on `.stat-box .num` elements
- `src/charts.ts` — chart datasets plus runtime rendering for desktop SVG and mobile bar variants; also handles bar-fill and Gini bar animations
- `src/lines.ts` — SVG polyline stroke-draw animations
- `src/style.css` — all styles; CSS custom properties in `:root`

### Animation contract

CSS transitions/keyframes drive all motion. JS only toggles classes (`.visible`) or sets properties; timing lives in CSS. Every animation module must check `prefers-reduced-motion` and skip setup when set.

### SVG charts

Desktop SVG chart geometry is generated in `src/charts.ts` from in-file datasets and mounted into container elements in `index.html`. Never replace this with a charting library (no D3, Chart.js, etc.).

### Fonts

Served from `@fontsource` npm packages (not CDN). Fontaine plugin in `vite.config.ts` injects fallback `@font-face` rules at build time.

- Bebas Neue — headings (h1, h2)
- Special Elite — body text
- Roboto Condensed Variable — labels/UI

## Code Style

- **Tabs** for indentation, **double quotes** in JS/TS — enforced by Biome
- **No comments** in HTML, CSS, or TypeScript
- Use CSS custom properties (`var(--red)`, `var(--white)`, etc.) — never hardcode palette colours
- Core palette: `--black #0a0a0a`, `--white #f0ece0`, `--red #cc1111`, `--red-dark #8b0000`, `--gray #2a2a2a`, `--accent-yellow #e8c84a`

## Conventions

- **British English** in all user-visible copy (`labour`, `organised`, `programme`). Technical identifiers remain American English.
- All scroll animations use `IntersectionObserver` — no scroll event listeners.
- Ticker uses duplicated HTML content for seamless CSS loop; don't generate items dynamically.
