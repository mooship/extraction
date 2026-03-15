import "./style.css";
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

function initTickerPause(): void {
	const btn = document.querySelector<HTMLButtonElement>(".ticker-pause");
	const ticker = document.querySelector<HTMLElement>(".ticker");
	if (!btn || !ticker) return;

	btn.addEventListener("click", () => {
		const paused = btn.getAttribute("aria-pressed") === "true";
		if (paused) {
			ticker.style.animationPlayState = "running";
			btn.setAttribute("aria-pressed", "false");
			btn.textContent = "⏸";
			btn.setAttribute("aria-label", "Pause ticker");
		} else {
			ticker.style.animationPlayState = "paused";
			btn.setAttribute("aria-pressed", "true");
			btn.textContent = "▶";
			btn.setAttribute("aria-label", "Play ticker");
		}
	});
}
