type MobileBarItem = {
	label: string;
	width: number;
	value: string;
	color: string;
};

type BarChartItem = {
	label: string;
	width: number;
	value: string;
	color: string;
};

type BarChartRenderOptions = {
	outsideValueThreshold?: number;
};

type GiniItem = {
	label: string;
	value: number;
	color: string;
	highlight?: boolean;
};

type LaborPoint = {
	year: number;
	labor: number;
	capital: number;
	x: number;
};

type HistoryPoint = {
	year: number;
	share: number;
	x: number;
};

const giniDesktopData: GiniItem[] = [
	{ label: "DE", value: 0.67, color: "#444" },
	{ label: "FR", value: 0.7, color: "#444" },
	{ label: "SE", value: 0.74, color: "#888" },
	{ label: "BR", value: 0.78, color: "#883333" },
	{ label: "UK", value: 0.81, color: "#aa2222" },
	{ label: "USA", value: 0.85, color: "var(--red)", highlight: true },
	{ label: "ZA", value: 0.91, color: "#ff6b6b", highlight: true },
];

const laborSeriesData: LaborPoint[] = [
	{ year: 1950, labor: 67, capital: 53, x: 50 },
	{ year: 1970, labor: 67, capital: 53, x: 154 },
	{ year: 1985, labor: 65, capital: 55, x: 232 },
	{ year: 2000, labor: 63, capital: 57, x: 310 },
	{ year: 2015, labor: 61, capital: 59, x: 388 },
	{ year: 2023, labor: 58, capital: 62, x: 430 },
];

const historySeriesData: HistoryPoint[] = [
	{ year: 1913, share: 18, x: 50 },
	{ year: 1929, share: 24, x: 156 },
	{ year: 1945, share: 13, x: 262 },
	{ year: 1970, share: 10, x: 428 },
	{ year: 1980, share: 11, x: 495 },
	{ year: 2000, share: 21, x: 627 },
	{ year: 2007, share: 24, x: 674 },
	{ year: 2018, share: 19, x: 760 },
	{ year: 2023, share: 22, x: 780 },
];

const wealthDistributionData: BarChartItem[] = [
	{ label: "Top 1%", width: 38, value: "38%", color: "var(--red)" },
	{ label: "Next 9%", width: 37, value: "37%", color: "#444" },
	{ label: "Next 40%", width: 21, value: "21%", color: "#2a2a2a" },
	{ label: "Bottom 50%", width: 3, value: "3%", color: "#222" },
];

const ceoPayData: BarChartItem[] = [
	{ label: "1965", width: 5.3, value: "21:1", color: "#333" },
	{ label: "1989", width: 15.3, value: "61:1", color: "#3a3a3a" },
	{ label: "2000", width: 91.7, value: "366:1", color: "#aa2222" },
	{ label: "2023", width: 100, value: "399:1", color: "var(--red)" },
];

const emissionsData: BarChartItem[] = [
	{ label: "Top 1%", width: 16, value: "16%", color: "var(--red)" },
	{ label: "Next 9%", width: 34, value: "34%", color: "#aa2222" },
	{ label: "Middle 40%", width: 42, value: "42%", color: "#444" },
	{ label: "Bottom 50%", width: 8, value: "8%", color: "#2a2a2a" },
];

function renderBarChart(
	containerId: string,
	items: BarChartItem[],
	options: BarChartRenderOptions = {},
): void {
	const container = document.getElementById(containerId);
	if (!container) {
		return;
	}

	const outsideValueThreshold = options.outsideValueThreshold ?? 0;

	const rows = items
		.map((item) => {
			const showOutsideValue = item.width <= outsideValueThreshold;
			const inlineValue = showOutsideValue ? "" : item.value;
			const outsideValue = showOutsideValue
				? `<span class="bar-val-outside">${item.value}</span>`
				: "";

			return `<div class="bar-row"><span class="bar-label">${item.label}</span><div class="bar-track"><div class="bar-fill" data-width="${item.width}" data-val="${inlineValue}" style="background: ${item.color}"></div></div>${outsideValue}</div>`;
		})
		.join("");

	container.innerHTML = `<div class="bar-chart">${rows}</div>`;
}

function renderMobileBarChart(
	containerId: string,
	items: MobileBarItem[],
): void {
	const container = document.getElementById(containerId);
	if (!container) {
		return;
	}

	const rows = items
		.map(
			(item) =>
				`<div class="bar-row"><span class="bar-label">${item.label}</span><div class="bar-track"><div class="bar-fill" data-width="${item.width}" data-val="${item.value}" style="background: ${item.color}"></div></div></div>`,
		)
		.join("");

	container.innerHTML = `<div class="bar-chart">${rows}</div>`;
}

function renderGiniDesktopChart(): void {
	const container = document.getElementById("gini-desktop-chart");
	if (!container) {
		return;
	}

	const yTop = 10;
	const yBase = 170;
	const min = 0.6;
	const max = 1;
	const range = max - min;

	const bars = giniDesktopData
		.map((item, i) => {
			const x = 20 + i * 60;
			const width = 38;
			const height = ((item.value - min) / range) * (yBase - yTop);
			const fullY = Math.round(yBase - height);
			const fullH = Math.round(height);
			const labelX = x + width / 2;
			const labelColor = item.highlight ? "var(--red)" : "#888";
			const fontWeight = item.highlight ? ' font-weight="bold"' : "";

			return `<rect class="gini-bar" data-index="${i}" x="${x}" y="${fullY}" width="${width}" height="${fullH}" style="fill: ${item.color}"/><text x="${labelX}" y="185" style="fill: ${labelColor}" font-size="7"${fontWeight} text-anchor="middle">${item.label}</text>`;
		})
		.join("");

	container.innerHTML = `<svg id="gini-svg" viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg"><title>Wealth Gini Coefficient by Country</title><line x1="18" y1="10" x2="450" y2="10" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,3"/><line x1="18" y1="50" x2="450" y2="50" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,3"/><line x1="18" y1="90" x2="450" y2="90" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,3"/><line x1="18" y1="130" x2="450" y2="130" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,3"/><line x1="18" y1="170" x2="450" y2="170" stroke="#333" stroke-width="1"/><text x="14" y="13" fill="#888" font-size="8" text-anchor="end">1.0</text><text x="14" y="53" fill="#888" font-size="8" text-anchor="end">0.9</text><text x="14" y="93" fill="#888" font-size="8" text-anchor="end">0.8</text><text x="14" y="133" fill="#888" font-size="8" text-anchor="end">0.7</text><text x="14" y="173" fill="#888" font-size="8" text-anchor="end">0.6</text>${bars}</svg>`;
}

function laborY(percent: number): number {
	return Math.round(180 - (percent - 50) * 8);
}

function renderLaborDesktopChart(): void {
	const container = document.getElementById("labor-desktop-chart");
	if (!container) {
		return;
	}

	const laborPoints = laborSeriesData
		.map((point) => `${point.x},${laborY(point.labor)}`)
		.join(" ");
	const capitalPoints = laborSeriesData
		.map((point) => `${point.x},${laborY(point.capital)}`)
		.join(" ");
	const yearLabels = laborSeriesData
		.map(
			(point) =>
				`<text x="${point.x}" y="197" fill="#888" font-size="7" text-anchor="middle">${point.year}</text>`,
		)
		.join("");

	container.innerHTML = `<svg id="labor-svg" viewBox="0 0 460 220" xmlns="http://www.w3.org/2000/svg"><title>Labour vs Capital Share of GDP</title><line x1="45" y1="20" x2="440" y2="20" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,3"/><line x1="45" y1="60" x2="440" y2="60" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,3"/><line x1="45" y1="100" x2="440" y2="100" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,3"/><line x1="45" y1="140" x2="440" y2="140" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,3"/><line x1="45" y1="180" x2="440" y2="180" stroke="#333" stroke-width="1"/><text x="40" y="23" fill="#888" font-size="8" text-anchor="end">70%</text><text x="40" y="63" fill="#888" font-size="8" text-anchor="end">65%</text><text x="40" y="103" fill="#888" font-size="8" text-anchor="end">60%</text><text x="40" y="143" fill="#888" font-size="8" text-anchor="end">55%</text><text x="40" y="183" fill="#888" font-size="8" text-anchor="end">50%</text>${yearLabels}<line x1="206" y1="15" x2="206" y2="180" stroke="#444" stroke-width="1" stroke-dasharray="3,3"/><text x="208" y="28" fill="#888" font-size="7">1980</text><text x="208" y="38" fill="#888" font-size="7">Neoliberal</text><text x="208" y="48" fill="#888" font-size="7">Turn</text><polyline id="labor-line" points="${laborPoints}" fill="none" stroke="#888" stroke-width="2"/><polyline id="capital-line" points="${capitalPoints}" fill="none" stroke="#cc1111" stroke-width="2.5"/><line x1="50" y1="210" x2="70" y2="210" stroke="#888" stroke-width="2"/><text x="74" y="213" fill="#888" font-size="8">Labour Share</text><line x1="170" y1="210" x2="190" y2="210" style="stroke: var(--red)" stroke-width="2"/><text x="194" y="213" style="fill: var(--red)" font-size="8">Capital Share</text></svg>`;
}

function historyY(share: number): number {
	return Math.round(225 - (share - 10) * 9);
}

function renderHistoryDesktopChart(): void {
	const container = document.getElementById("history-desktop-chart");
	if (!container) {
		return;
	}

	const trendPoints = historySeriesData
		.map((point) => `${point.x},${historyY(point.share)}`)
		.join(" ");
	const areaPoints = `${trendPoints} 780,225 50,225`;
	const axisYears = [1913, 1929, 1945, 1970, 1980, 2000, 2023];
	const yearLabels = historySeriesData
		.filter((point) => axisYears.includes(point.year))
		.map(
			(point) =>
				`<text x="${point.x}" y="243" fill="#888" font-size="8" text-anchor="middle">${point.year}</text>`,
		)
		.join("");
	const crash = historySeriesData.find((point) => point.year === 1929);
	const peak = historySeriesData.find((point) => point.year === 1970);
	const recent = historySeriesData.find((point) => point.year === 2023);
	if (!crash || !peak || !recent) {
		return;
	}

	container.innerHTML = `<svg id="history-svg" viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg"><title>Top 1% Income Share, USA 1913-2023</title><rect x="50" y="10" width="212" height="215" fill="rgba(204,17,17,0.06)"/><rect x="262" y="10" width="233" height="215" fill="rgba(76,175,76,0.05)"/><rect x="495" y="10" width="285" height="215" fill="rgba(204,17,17,0.10)"/><text x="60" y="25" fill="rgba(204,17,17,0.4)" font-size="8">GILDED AGE</text><text x="270" y="25" fill="rgba(76,175,76,0.4)" font-size="8">POST-WAR EGALITARIAN ERA</text><text x="505" y="25" fill="rgba(204,17,17,0.5)" font-size="8">NEOLIBERAL ASCENT</text><line x1="50" y1="45" x2="780" y2="45" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,4"/><line x1="50" y1="90" x2="780" y2="90" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,4"/><line x1="50" y1="135" x2="780" y2="135" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,4"/><line x1="50" y1="180" x2="780" y2="180" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,4"/><line x1="50" y1="225" x2="780" y2="225" stroke="#333" stroke-width="1"/><text x="44" y="48" fill="#888" font-size="8" text-anchor="end">30%</text><text x="44" y="93" fill="#888" font-size="8" text-anchor="end">25%</text><text x="44" y="138" fill="#888" font-size="8" text-anchor="end">20%</text><text x="44" y="183" fill="#888" font-size="8" text-anchor="end">15%</text><text x="44" y="228" fill="#888" font-size="8" text-anchor="end">10%</text>${yearLabels}<polygon points="${areaPoints}" fill="rgba(204,17,17,0.08)"/><polyline id="hist-line" points="${trendPoints}" fill="none" stroke="#cc1111" stroke-width="2.5"/><circle cx="${crash.x}" cy="${historyY(crash.share)}" r="5" style="fill: var(--red)"/><text x="${crash.x + 6}" y="${historyY(crash.share) - 8}" style="fill: var(--red)" font-size="7">1929 Crash</text><circle cx="${peak.x}" cy="${historyY(peak.share)}" r="5" fill="#4caf4c"/><text x="${peak.x + 6}" y="${historyY(peak.share) - 7}" fill="#4caf4c" font-size="7">Peak Equality</text><circle cx="${recent.x}" cy="${historyY(recent.share)}" r="5" style="fill: var(--red)"/><text x="${recent.x - 38}" y="${historyY(recent.share) - 8}" style="fill: var(--red)" font-size="7">${recent.share}% (2023)</text></svg>`;
}

function buildMobileData(): {
	gini: MobileBarItem[];
	labor: MobileBarItem[];
	history: MobileBarItem[];
} {
	const gini = giniDesktopData.map((item) => ({
		label: item.label,
		width: Math.round(item.value * 100),
		value: item.value.toFixed(2),
		color: item.color,
	}));

	const firstLabor = laborSeriesData[0];
	const lastLabor = laborSeriesData[laborSeriesData.length - 1];
	const labor = [
		{
			label: `Labour ${firstLabor.year}`,
			width: firstLabor.labor,
			value: `${firstLabor.labor}%`,
			color: "#888",
		},
		{
			label: `Labour ${lastLabor.year}`,
			width: lastLabor.labor,
			value: `${lastLabor.labor}%`,
			color: "#666",
		},
		{
			label: `Capital ${firstLabor.year}`,
			width: firstLabor.capital,
			value: `${firstLabor.capital}%`,
			color: "#7a2a2a",
		},
		{
			label: `Capital ${lastLabor.year}`,
			width: lastLabor.capital,
			value: `${lastLabor.capital}%`,
			color: "var(--red)",
		},
	];

	const historyYears = [1913, 1929, 1970, 2023];
	const history = historySeriesData
		.filter((point) => historyYears.includes(point.year))
		.map((point) => {
			const width = Math.round((point.share / 30) * 100);
			let color = "#aa2222";
			if (point.year === 1913) color = "#7a2a2a";
			if (point.year === 1929) color = "var(--red)";
			if (point.year === 1970) color = "#4caf4c";
			return {
				label: `${point.year}`,
				width,
				value: `${point.share}%`,
				color,
			};
		});

	return { gini, labor, history };
}

export function initCharts(): void {
	renderBarChart("wealth-distribution-chart", wealthDistributionData);
	renderBarChart("ceo-pay-chart", ceoPayData, {
		outsideValueThreshold: 20,
	});
	renderBarChart("emissions-chart", emissionsData);

	renderGiniDesktopChart();
	renderLaborDesktopChart();
	renderHistoryDesktopChart();

	const mobileData = buildMobileData();
	renderMobileBarChart("gini-mobile-chart", mobileData.gini);
	renderMobileBarChart("labor-mobile-chart", mobileData.labor);
	renderMobileBarChart("history-mobile-chart", mobileData.history);

	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	if (reduced) {
		for (const fill of document.querySelectorAll<HTMLElement>(".bar-fill")) {
			fill.style.width = `${fill.dataset.width ?? "0"}%`;
		}
		for (const bar of document.querySelectorAll<SVGRectElement>(".gini-bar")) {
			bar.style.transform = "scaleY(1)";
		}
		return;
	}

	for (const bar of document.querySelectorAll<SVGRectElement>(".gini-bar")) {
		bar.style.transformBox = "fill-box";
		bar.style.transformOrigin = "center bottom";
		bar.style.transform = "scaleY(0)";
	}

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

	const giniObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) {
					continue;
				}
				for (const bar of entry.target.querySelectorAll<SVGRectElement>(
					".gini-bar",
				)) {
					const i = Number(bar.dataset.index ?? 0);
					setTimeout(() => {
						bar.style.transform = "scaleY(1)";
					}, i * 120);
				}
				giniObserver.unobserve(entry.target);
			}
		},
		{ threshold: 0.2 },
	);

	for (const box of document.querySelectorAll<HTMLElement>(".chart-box")) {
		barObserver.observe(box);
	}

	const giniSvg = document.getElementById("gini-svg");
	if (giniSvg) {
		giniObserver.observe(giniSvg);
	}
}
