export function initLines(): void {
	const laborSvg = document.getElementById("labor-svg");
	const historySvg = document.getElementById("history-svg");

	if (laborSvg) {
		const laborObserver = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const laborLine = document.getElementById(
							"labor-line",
						) as SVGPolylineElement | null;
						const capitalLine = document.getElementById(
							"capital-line",
						) as SVGPolylineElement | null;
						if (laborLine) laborLine.style.strokeDashoffset = "0";
						if (capitalLine) capitalLine.style.strokeDashoffset = "0";
						laborObserver.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.3 },
		);
		laborObserver.observe(laborSvg);
	}

	if (historySvg) {
		const historyObserver = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const histLine = document.getElementById(
							"hist-line",
						) as SVGPolylineElement | null;
						if (histLine) histLine.style.strokeDashoffset = "0";
						historyObserver.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.2 },
		);
		historyObserver.observe(historySvg);
	}
}
