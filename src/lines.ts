export function initLines(): void {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		return;
	}

	for (const id of ["labor-line", "capital-line", "hist-line"]) {
		const line = document.getElementById(id) as SVGGeometryElement | null;
		if (!line) {
			continue;
		}
		const length = line.getTotalLength();
		line.style.strokeDasharray = String(length);
		line.style.strokeDashoffset = String(length);
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) {
					continue;
				}
				for (const line of entry.target.querySelectorAll<SVGGeometryElement>(
					"polyline",
				)) {
					line.style.strokeDashoffset = "0";
				}
				observer.unobserve(entry.target);
			}
		},
		{ threshold: 0.2 },
	);

	for (const id of ["labor-svg", "history-svg"]) {
		const svg = document.getElementById(id);
		if (svg) {
			observer.observe(svg);
		}
	}
}
