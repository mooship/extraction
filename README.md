# Extraction — The System Is Rigged

A data-driven, interactive web experience making a visual case against wealth concentration and structural economic inequality. Built with a brutalist, high-impact aesthetic.

## Features

- Scroll-triggered animations revealing statistics and data visualisations
- Animated counters for key inequality metrics
- Interactive bar charts, SVG line graphs, donut chart, treemap, and Sankey flow diagram — all hand-built SVG, no charting libraries
- Marquee ticker cycling through key economic facts
- Sections covering Wealth, Tax Avoidance, Labour, Housing, Public Services, Global South & Imperialism, Ecology, History, Policy Demands, and Action
- Fully responsive layout

## Tech Stack

| Tool | Role |
|---|---|
| [Vite](https://vite.dev/) | Build tool and dev server |
| TypeScript | Application logic |
| CSS | Styling (no framework) |
| [Biome](https://biomejs.dev/) | Linting and formatting |
| [Lefthook](https://github.com/evilmartians/lefthook) | Git hooks (runs Biome on pre-commit) |
| [Fontaine](https://github.com/unjs/fontaine) | Font fallback metrics (reduces CLS) |

## Getting Started

**Prerequisites:** Node.js 22+

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
  main.ts              # Entry point — wires up all modules
  animations.ts        # Intersection Observer-based scroll reveals
  charts.ts            # All chart types: bar, Gini, donut, treemap, Sankey
  counters.ts          # Animated stat counters on page load
  lines.ts             # Animated SVG polylines and paths (labour, history, Sankey)
  styles/
    base.css           # CSS custom properties, reset, fonts
    typography.css     # Headings, body text, section labels
    layout.css         # Section layout, two-column grids
    components.css     # Nav, hero, stat boxes, ticker, cards
    charts.css         # Bar chart and chart-box styles
    animations.css     # Reveal transitions, keyframes, reduced-motion
    accessibility.css  # Focus styles, skip link
    responsive.css     # Breakpoint overrides
```

## Code Quality

Biome runs automatically on staged files via Lefthook before every commit. To run manually:

```bash
# Auto-fix formatting and lint issues
npm run biome:fix
```

## License

[CC0 1.0 Universal](LICENSE) — public domain.
