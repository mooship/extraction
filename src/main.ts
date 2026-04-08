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
import { initCitations } from "./citations";
import { initCounters } from "./counters";
import { initLines } from "./lines";

document.addEventListener("DOMContentLoaded", () => {
	initCharts();
	initCitations();
	initTickerPause();
	initNavToggle();
	initAnimations();
	initChartVisibility();
	initShareButtons();
	initActiveNav();
	initStatBoxLabels();
	initChartTableLinks();
	initBackToTop();
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
			links[0]?.focus();
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

const SHARE_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`;

export function initShareButtons(): void {
	const sections = document.querySelectorAll<HTMLElement>(
		"#wealth, #history, #tax, #labor, #housing, #imperialism, #ecology, #public",
	);

	for (const section of sections) {
		const btn = document.createElement("button");
		btn.className = "share-btn";
		btn.setAttribute("aria-label", "Share this section");
		btn.innerHTML = `${SHARE_SVG} <span role="status" aria-live="polite">Share</span>`;

		btn.addEventListener("click", async () => {
			const url = `${window.location.origin}${window.location.pathname}#${section.id}`;
			const title =
				section.querySelector("h2")?.textContent?.trim() ?? "Extraction";

			if (navigator.share) {
				try {
					await navigator.share({ title: `Extraction — ${title}`, url });
					return;
				} catch {
					/* user cancelled or API failed, fall through to clipboard */
				}
			}

			try {
				await navigator.clipboard.writeText(url);
				const span = btn.querySelector("span");
				if (span) {
					span.textContent = "Copied!";
					setTimeout(() => {
						span.textContent = "Share";
					}, 2000);
				}
			} catch {
				/* clipboard unavailable */
			}
		});

		section.appendChild(btn);
	}
}

export function initChartVisibility(): void {
	const mq = window.matchMedia("(max-width: 900px)");
	const desktopCharts =
		document.querySelectorAll<HTMLElement>(".desktop-chart");
	const mobileCharts = document.querySelectorAll<HTMLElement>(".mobile-chart");

	function update(mobile: boolean) {
		for (const el of desktopCharts) {
			el.setAttribute("aria-hidden", String(mobile));
		}
		for (const el of mobileCharts) {
			el.setAttribute("aria-hidden", String(!mobile));
		}
	}

	update(mq.matches);
	mq.addEventListener("change", (e) => update(e.matches));
}

export function initActiveNav(): void {
	const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-links a");
	const sections = document.querySelectorAll<HTMLElement>("section[id]");

	if (!navLinks.length || !sections.length) {
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					const id = entry.target.id;
					for (const link of navLinks) {
						const href = link.getAttribute("href");
						if (href === `#${id}`) {
							link.classList.add("nav-active");
						} else {
							link.classList.remove("nav-active");
						}
					}
				}
			}
		},
		{ rootMargin: "-20% 0px -60% 0px" },
	);

	for (const section of sections) {
		observer.observe(section);
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

	document.addEventListener("visibilitychange", () => {
		if (paused) {
			return;
		}
		ticker.style.animationPlayState = document.hidden ? "paused" : "running";
	});
}

export function initStatBoxLabels(): void {
	const boxes = document.querySelectorAll<HTMLElement>(".stat-box");
	let i = 0;
	for (const box of boxes) {
		const label = box.querySelector<HTMLElement>(".label");
		if (label) {
			const id = `stat-label-${i++}`;
			label.id = id;
			box.setAttribute("role", "group");
			box.setAttribute("aria-labelledby", id);
		}
	}
}

export function initChartTableLinks(): void {
	const tables = document.querySelectorAll<HTMLTableElement>("table.sr-only");
	let i = 0;
	for (const table of tables) {
		const id = `sr-table-${i++}`;
		table.id = id;
		const figure = table.closest("figure");
		if (figure) {
			const chartDiv = figure.querySelector<HTMLElement>("[role='img']");
			if (chartDiv) {
				const existing = chartDiv.getAttribute("aria-describedby");
				chartDiv.setAttribute(
					"aria-describedby",
					existing ? `${existing} ${id}` : id,
				);
			}
		}
	}
}

export function initBackToTop(): void {
	const btn = document.querySelector<HTMLButtonElement>(".back-to-top");
	const hero = document.querySelector<HTMLElement>("#hero");
	if (!btn || !hero) {
		return;
	}

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				btn.hidden = true;
				btn.classList.remove("visible");
			} else {
				btn.hidden = false;
				requestAnimationFrame(() => btn.classList.add("visible"));
			}
		},
		{ threshold: 0 },
	);

	observer.observe(hero);

	btn.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
}
