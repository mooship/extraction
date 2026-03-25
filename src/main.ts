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
	initCharts();
	initTickerPause();
	initNavToggle();
	initAnimations();
});

window.addEventListener("load", () => {
	initCounters();
	initLines();
});

const PAUSE_SVG = `<svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor" aria-hidden="true"><rect x="0" y="0" width="3.5" height="14"/><rect x="6.5" y="0" width="3.5" height="14"/></svg>`;
const PLAY_SVG = `<svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor" aria-hidden="true"><polygon points="0,0 10,7 0,14"/></svg>`;

export function initNavToggle(): void {
	const nav = document.querySelector<HTMLElement>("nav");
	const btn = document.querySelector<HTMLButtonElement>(".nav-toggle");
	if (!nav || !btn) {
		return;
	}

	let keydownHandler: ((e: KeyboardEvent) => void) | null = null;
	const links = Array.from(
		nav.querySelectorAll<HTMLAnchorElement>(".nav-links a"),
	);
	const lastLink = links[links.length - 1];

	const closeNav = () => {
		nav.classList.remove("nav-open");
		btn.setAttribute("aria-expanded", "false");
		btn.setAttribute("aria-label", "Open navigation");
		if (keydownHandler) {
			document.removeEventListener("keydown", keydownHandler);
			keydownHandler = null;
		}
	};

	btn.addEventListener("click", () => {
		const open = nav.classList.toggle("nav-open");
		btn.setAttribute("aria-expanded", String(open));
		btn.setAttribute(
			"aria-label",
			open ? "Close navigation" : "Open navigation",
		);
		if (open) {
			keydownHandler = (e: KeyboardEvent) => {
				if (e.key === "Escape") {
					closeNav();
					btn.focus();
				} else if (
					e.key === "Tab" &&
					!e.shiftKey &&
					document.activeElement === lastLink
				) {
					e.preventDefault();
					btn.focus();
				} else if (
					e.key === "Tab" &&
					e.shiftKey &&
					document.activeElement === btn
				) {
					e.preventDefault();
					lastLink?.focus();
				}
			};
			document.addEventListener("keydown", keydownHandler);
		} else if (keydownHandler) {
			document.removeEventListener("keydown", keydownHandler);
			keydownHandler = null;
		}
	});

	for (const link of links) {
		link.addEventListener("click", closeNav);
	}
}

export function initTickerPause(): void {
	const btn = document.querySelector<HTMLButtonElement>(".ticker-pause");
	const ticker = document.querySelector<HTMLElement>(".ticker");
	if (!btn || !ticker) {
		return;
	}

	let paused = false;
	btn.addEventListener("click", () => {
		paused = !paused;
		if (paused) {
			ticker.style.animationPlayState = "paused";
			btn.setAttribute("aria-pressed", "true");
			btn.innerHTML = PLAY_SVG;
			btn.setAttribute("aria-label", "Play ticker");
		} else {
			ticker.style.animationPlayState = "running";
			btn.setAttribute("aria-pressed", "false");
			btn.innerHTML = PAUSE_SVG;
			btn.setAttribute("aria-label", "Pause ticker");
		}
	});
}
