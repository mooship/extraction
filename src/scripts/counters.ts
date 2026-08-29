/**
 * Animates each `.stat-box .num` element from 0 to its `data-target` value
 * (with `data-prefix`/`data-suffix`) once the containing `.stat-box`
 * scrolls into view. Under `prefers-reduced-motion` the target value is
 * set immediately with no count-up.
 */
export function initCounters(): void {
	const reducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	/**
	 * Counts `el`'s text content up to `data-target` over 1.5s using an
	 * ease-out-cubic curve. Decimal precision is inferred from the number
	 * of digits after the `.` in `data-target` (e.g. "0.89" animates with
	 * 2 decimal places).
	 */
	function animateCounter(el: HTMLElement): void {
		const targetStr = el.dataset.target ?? "0";
		const target = Number.parseFloat(targetStr);
		const decimals = targetStr.includes(".")
			? targetStr.split(".")[1].length
			: 0;
		const prefix = el.dataset.prefix ?? "";
		const suffix = el.dataset.suffix ?? "";

		el.classList.add("is-counting");

		if (reducedMotion) {
			el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
			return;
		}

		const duration = 1500;
		const startTime = performance.now();

		function tick(now: number): void {
			const elapsed = now - startTime;
			const t = Math.min(elapsed / duration, 1);
			const progress = 1 - (1 - t) ** 3;
			const current = progress * target;
			el.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;
			if (t < 1) {
				requestAnimationFrame(tick);
			}
		}

		requestAnimationFrame(tick);
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) {
					continue;
				}
				const num = entry.target.querySelector<HTMLElement>(".num");
				if (num) {
					animateCounter(num);
				}
				observer.unobserve(entry.target);
			}
		},
		{ threshold: 0.15 },
	);

	for (const box of document.querySelectorAll<HTMLElement>(".stat-box")) {
		observer.observe(box);
	}
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initCounters);
} else {
	initCounters();
}
