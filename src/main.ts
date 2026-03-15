import "./styles/base.css";
import "./styles/typography.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/charts.css";
import "./styles/animations.css";
import "./styles/accessibility.css";
import "./styles/responsive.css";
import { initAnimations } from "./animations";
import { initCharts } from "./charts";
import { initCounters } from "./counters";
import { initLines } from "./lines";

document.addEventListener("DOMContentLoaded", () => {
	initAnimations();
	initCharts();
	initLines();
	initTickerPause();
});

window.addEventListener("load", () => {
	initCounters();
});

const PAUSE_SVG = `<svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor" aria-hidden="true"><rect x="0" y="0" width="3.5" height="14"/><rect x="6.5" y="0" width="3.5" height="14"/></svg>`;
const PLAY_SVG = `<svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor" aria-hidden="true"><polygon points="0,0 10,7 0,14"/></svg>`;

function initTickerPause(): void {
	const btn = document.querySelector<HTMLButtonElement>(".ticker-pause");
	const ticker = document.querySelector<HTMLElement>(".ticker");
	if (!btn || !ticker) return;

	btn.addEventListener("click", () => {
		const paused = btn.getAttribute("aria-pressed") === "true";
		if (paused) {
			ticker.style.animationPlayState = "running";
			btn.setAttribute("aria-pressed", "false");
			btn.innerHTML = PAUSE_SVG;
			btn.setAttribute("aria-label", "Pause ticker");
		} else {
			ticker.style.animationPlayState = "paused";
			btn.setAttribute("aria-pressed", "true");
			btn.innerHTML = PLAY_SVG;
			btn.setAttribute("aria-label", "Play ticker");
		}
	});
}
