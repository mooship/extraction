const PAUSE_SVG = `<svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor" aria-hidden="true"><rect x="0" y="0" width="3.5" height="14"/><rect x="6.5" y="0" width="3.5" height="14"/></svg>`;
const PLAY_SVG = `<svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor" aria-hidden="true"><polygon points="0,0 10,7 0,14"/></svg>`;

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

document.addEventListener("DOMContentLoaded", initTickerPause);
