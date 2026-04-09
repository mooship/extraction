function initChartAnimations(): void {
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	if (reduced) {
		return;
	}

	document.documentElement.classList.add("js-animate");

	const barObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) {
					continue;
				}
				for (const fill of entry.target.querySelectorAll<HTMLElement>(
					".bar-fill",
				)) {
					fill.style.width = `${fill.dataset.width ?? "0"}%`;
				}
				barObserver.unobserve(entry.target);
			}
		},
		{ threshold: 0.2 },
	);

	for (const box of document.querySelectorAll<HTMLElement>(".chart-box")) {
		barObserver.observe(box);
	}

	function makeStaggerObserver(
		selector: string,
		delayPerItem: number,
	): IntersectionObserver {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) {
						continue;
					}
					for (const el of entry.target.querySelectorAll<SVGElement>(
						selector,
					)) {
						const i = Number(el.dataset.index ?? 0);
						el.style.transitionDelay = `${i * delayPerItem}ms`;
						el.style.transform = "scaleY(1)";
					}
					observer.unobserve(entry.target);
				}
			},
			{ threshold: 0.2 },
		);
		return observer;
	}

	const giniObserver = makeStaggerObserver(".gini-bar", 120);
	const giniSvg = document.getElementById("gini-svg");
	if (giniSvg) {
		giniObserver.observe(giniSvg);
	}

	const treemapObserver = makeStaggerObserver(".treemap-rect", 150);
	const treemapSvg = document.getElementById("treemap-svg");
	if (treemapSvg) {
		treemapObserver.observe(treemapSvg);
	}

	const circumference = 2 * Math.PI * 100;
	for (const seg of document.querySelectorAll<SVGCircleElement>(
		".donut-segment",
	)) {
		seg.style.strokeDasharray = `0 ${circumference}`;
	}

	const donutObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) {
					continue;
				}
				for (const seg of entry.target.querySelectorAll<SVGCircleElement>(
					".donut-segment",
				)) {
					seg.style.strokeDasharray = seg.dataset.dasharray ?? "";
				}
				donutObserver.unobserve(entry.target);
			}
		},
		{ threshold: 0.2 },
	);

	const donutSvg = document.getElementById("tax-donut-svg");
	if (donutSvg) {
		donutObserver.observe(donutSvg);
	}
}

document.addEventListener("DOMContentLoaded", initChartAnimations);
