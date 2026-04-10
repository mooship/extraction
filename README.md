# Extraction — The System Is Rigged

A data-driven, interactive web experience making a visual case against wealth concentration and structural economic inequality. Built with a civic advocacy aesthetic.

## Features

- Charts pre-rendered as SVG at build time — visible without JavaScript
- Scroll-triggered animations revealing statistics and data visualisations
- Animated counters for key inequality metrics
- Interactive bar charts, SVG line graphs, donut chart, treemap, and Sankey flow diagram — all hand-built SVG, no charting libraries
- Sections covering Wealth, Tax Avoidance, Labour & Housing, Global South & Imperialism, Ecology, Public Services, Policy Demands, and Action
- Fully responsive layout with CSS-based desktop/mobile chart swap

## Tech Stack

| Tool | Role |
|---|---|
| [Astro](https://astro.build/) v6 | Static site framework (build-time rendering) |
| TypeScript | Application logic and chart data |
| CSS | Styling (no framework) |
| [Biome](https://biomejs.dev/) | Linting and formatting |
| [Lefthook](https://github.com/evilmartians/lefthook) | Git hooks (runs Biome on pre-commit) |

## Getting Started

**Prerequisites:** Bun 1.3+

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Project Structure

```
src/
  pages/
    index.astro            # Main page — composes all sections
    privacy.astro          # Privacy policy page
  layouts/
    Base.astro             # Shared HTML shell (head, meta, styles, scripts)
  components/
    sections/              # One component per page section (Hero, Wealth, Tax, etc.)
    charts/                # Build-time SVG chart components (BarChart, GiniChart, etc.)
    Nav.astro              # Navigation bar
    Footer.astro           # Footer
  data/
    charts.ts              # All chart data constants, types, and helpers
  scripts/
    animations.ts          # Scroll reveals (IntersectionObserver)
    counters.ts            # Animated stat counters
    lines.ts               # SVG polyline/path draw animations
    chart-animations.ts    # Bar, Gini, treemap, donut entrance animations
    citations.ts           # Citation popover tooltips
    nav.ts                 # Mobile nav toggle and active nav highlighting
    share.ts               # Per-section share buttons
    back-to-top.ts         # Back-to-top button
  styles/
    base.css               # CSS custom properties, reset
    typography.css         # Headings, body text, section labels
    layout.css             # Section layout, two-column grids
    components.css         # Nav, hero, stat boxes, cards
    charts.css             # Bar chart and chart-box styles
    animations.css         # Reveal transitions, keyframes, reduced-motion
    accessibility.css      # Focus styles, skip link
    responsive.css         # Breakpoint overrides
```

## Code Quality

Biome runs automatically on staged files via Lefthook before every commit. To run manually:

```bash
# Auto-fix formatting and lint issues
bun run biome:fix
```

## License

[CC0 1.0 Universal](LICENSE) — public domain.
