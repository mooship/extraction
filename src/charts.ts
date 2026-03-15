export function initCharts(): void {
	let barsTriggered = false;

	const barFills = document.querySelectorAll<HTMLElement>(".bar-fill");
	for (const fill of barFills) {
		fill.style.width = "0";
		fill.style.transition = "width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
	}

	const giniSvg = document.getElementById("gini-svg");
	const giniBars = document.querySelectorAll<SVGRectElement>(".gini-bar");
	for (const bar of giniBars) {
		bar.setAttribute("y", "170");
		bar.setAttribute("height", "0");
		bar.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
	}

	const chartBoxObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting && !barsTriggered) {
					barsTriggered = true;
					for (const fill of barFills) {
						const w = fill.dataset.width ?? "0";
						fill.style.width = `${w}%`;
					}
					chartBoxObserver.disconnect();
				}
			}
		},
		{ threshold: 0.3 },
	);

	const firstChartBox = document.querySelector<HTMLElement>(".chart-box");
	if (firstChartBox) {
		chartBoxObserver.observe(firstChartBox);
	}

	if (giniSvg) {
		const giniObserver = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						giniBars.forEach((bar, i) => {
							setTimeout(() => {
								const fullY = bar.dataset.fullY ?? "170";
								const fullH = bar.dataset.fullH ?? "0";
								bar.setAttribute("y", fullY);
								bar.setAttribute("height", fullH);
							}, i * 120);
						});
						giniObserver.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.4 },
		);
		giniObserver.observe(giniSvg);
	}
}
