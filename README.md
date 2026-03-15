# Extraction — The System Is Rigged

A data-driven, interactive web experience making a visual case against wealth concentration and structural economic inequality. Built with a brutalist, high-impact aesthetic.

## Features

- Scroll-triggered animations revealing statistics and data visualisations
- Animated counters for key inequality metrics
- Interactive bar charts and SVG line graphs (wealth share, Gini coefficients, labour vs. capital trends)
- Marquee ticker cycling through key economic facts
- Sections covering Wealth, Labour, Public Services, and History
- Fully responsive layout

## Tech Stack

| Tool | Role |
|---|---|
| [Vite](https://vite.dev/) | Build tool and dev server |
| TypeScript | Application logic |
| CSS | Styling (no framework) |
| [Biome](https://biomejs.dev/) | Linting and formatting |
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
  main.ts         # Entry point — wires up all modules
  animations.ts   # Intersection Observer-based scroll reveals
  charts.ts       # Animated bar charts and SVG Gini chart
  counters.ts     # Animated stat counters on page load
  lines.ts        # Animated SVG polylines (labour/history graphs)
  style.css       # All styles
```

## Code Quality

```bash
# Auto-fix formatting and lint issues
npm run biome:fix
```

## License

[CC0 1.0 Universal](LICENSE) — public domain.
