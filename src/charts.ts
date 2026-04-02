type DonutSegment = {
	label: string;
	percent: number;
	color: string;
};

type TreemapItem = {
	label: string;
	value: number;
	displayValue: string;
	color: string;
};

type SankeyFlow = {
	label: string;
	displayValue: string;
	color: string;
	strokeWidth: number;
	path: string;
	direction: "left" | "right";
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
	{ year: 1950, labor: 67, capital: 33, x: 50 },
	{ year: 1970, labor: 67, capital: 33, x: 154 },
	{ year: 1985, labor: 65, capital: 35, x: 232 },
	{ year: 2000, labor: 63, capital: 37, x: 310 },
	{ year: 2015, labor: 61, capital: 39, x: 388 },
	{ year: 2023, labor: 58, capital: 42, x: 430 },
	{ year: 2025, labor: 57, capital: 43, x: 445 },
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
	{ year: 2023, share: 21, x: 780 },
	{ year: 2025, share: 21, x: 795 },
];

const wealthDistributionData: BarChartItem[] = [
	{ label: "Top 1%", width: 38, value: "38%", color: "var(--red)" },
	{ label: "Next 9%", width: 36, value: "36%", color: "#444" },
	{ label: "Next 40%", width: 23, value: "23%", color: "#2a2a2a" },
	{ label: "Bottom 50%", width: 3, value: "3%", color: "#222" },
];

const ceoPayData: BarChartItem[] = [
	{ label: "1965", width: 5.3, value: "21:1", color: "#333" },
	{ label: "1989", width: 15.3, value: "61:1", color: "#3a3a3a" },
	{ label: "2000", width: 91.7, value: "366:1", color: "#aa2222" },
	{ label: "2023", width: 100, value: "399:1", color: "var(--red)" },
];

const donutData: DonutSegment[] = [
	{ label: "UK Dependencies", percent: 29, color: "var(--red)" },
	{ label: "Netherlands", percent: 22, color: "#aa2222" },
	{ label: "Bermuda / Cayman", percent: 18, color: "#883333" },
	{ label: "Luxembourg", percent: 15, color: "#664444" },
	{ label: "Ireland", percent: 12, color: "#444" },
	{ label: "Other", percent: 4, color: "#2a2a2a" },
];

const treemapData: TreemapItem[] = [
	{
		label: "Residential Real Estate",
		value: 380,
		displayValue: "$380T",
		color: "var(--red)",
	},
	{ label: "Equities", value: 109, displayValue: "$109T", color: "#444" },
	{
		label: "Govt Debt",
		value: 66,
		displayValue: "$66T",
		color: "#2a2a2a",
	},
	{ label: "Gold", value: 14, displayValue: "$14T", color: "#222" },
];

const sankeyFlows: SankeyFlow[] = [
	{
		label: "Unequal Exchange",
		displayValue: "$10.8T",
		color: "#cc1111",
		strokeWidth: 44,
		path: "M 80,55 C 250,55 350,35 520,35",
		direction: "left",
	},
	{
		label: "Debt Service",
		displayValue: "$443B",
		color: "#aa2222",
		strokeWidth: 9,
		path: "M 80,120 C 250,120 350,110 520,100",
		direction: "left",
	},
	{
		label: "Illicit Flows",
		displayValue: "$89B",
		color: "#883333",
		strokeWidth: 4,
		path: "M 80,155 C 250,155 350,145 520,140",
		direction: "left",
	},
	{
		label: "Aid",
		displayValue: "$200B",
		color: "#4caf4c",
		strokeWidth: 6,
		path: "M 520,200 C 350,200 250,210 80,215",
		direction: "right",
	},
];

const taxRatesData: BarChartItem[] = [
	{
		label: "Richest 400",
		width: 22,
		value: "8.2%",
		color: "var(--red)",
	},
	{
		label: "Median Household",
		width: 68,
		value: "25%",
		color: "#444",
	},
	{
		label: "Top Statutory",
		width: 100,
		value: "37%",
		color: "#2a2a2a",
	},
];

const homeownershipData: BarChartItem[] = [
	{ label: "25–34 (1997)", width: 59, value: "59%", color: "#888" },
	{ label: "25–34 (2025)", width: 28, value: "28%", color: "var(--red)" },
	{ label: "35–44 (1997)", width: 68, value: "68%", color: "#888" },
	{ label: "35–44 (2025)", width: 51, value: "51%", color: "#aa2222" },
	{ label: "45–54 (1997)", width: 75, value: "75%", color: "#888" },
	{ label: "45–54 (2025)", width: 65, value: "65%", color: "#444" },
	{ label: "55–64 (1997)", width: 78, value: "78%", color: "#888" },
	{ label: "55–64 (2025)", width: 74, value: "74%", color: "#333" },
];

const debtServiceData: BarChartItem[] = [
	{ label: "Sri Lanka", width: 100, value: "73%", color: "var(--red)" },
	{ label: "Ghana", width: 64, value: "47%", color: "#aa2222" },
	{ label: "Pakistan", width: 55, value: "40%", color: "#883333" },
	{ label: "Kenya", width: 41, value: "30%", color: "#444" },
	{ label: "USA", width: 12, value: "9%", color: "#2a2a2a" },
	{ label: "UK", width: 10, value: "7%", color: "#222" },
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
	items: BarChartItem[],
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

	container.innerHTML = `<svg id="gini-svg" role="img" aria-labelledby="gini-svg-title" viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg"><title id="gini-svg-title">Wealth Gini Coefficient by Country</title><desc>Bar chart comparing wealth Gini coefficients: Germany 0.67, France 0.70, Sweden 0.74, Brazil 0.78, UK 0.81, USA 0.85, South Africa 0.91. Higher values indicate greater inequality.</desc><line x1="18" y1="10" x2="450" y2="10" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,3"/><line x1="18" y1="50" x2="450" y2="50" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,3"/><line x1="18" y1="90" x2="450" y2="90" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,3"/><line x1="18" y1="130" x2="450" y2="130" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,3"/><line x1="18" y1="170" x2="450" y2="170" stroke="#333" stroke-width="1"/><text x="14" y="13" fill="#888" font-size="8" text-anchor="end">1.0</text><text x="14" y="53" fill="#888" font-size="8" text-anchor="end">0.9</text><text x="14" y="93" fill="#888" font-size="8" text-anchor="end">0.8</text><text x="14" y="133" fill="#888" font-size="8" text-anchor="end">0.7</text><text x="14" y="173" fill="#888" font-size="8" text-anchor="end">0.6</text>${bars}</svg>`;
}

function laborY(percent: number): number {
	return Math.round(180 - (percent - 30) * 4);
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

	container.innerHTML = `<svg id="labor-svg" role="img" aria-labelledby="labor-svg-title" viewBox="0 0 475 220" xmlns="http://www.w3.org/2000/svg"><title id="labor-svg-title">Labour vs Capital Share of GDP</title><desc>Line chart showing USA labour share falling from 67% in 1950 to 57% in 2025, while capital share rose from 33% to 43% over the same period. The neoliberal turn around 1980 marks the inflection point.</desc><line x1="45" y1="20" x2="455" y2="20" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,3"/><line x1="45" y1="60" x2="455" y2="60" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,3"/><line x1="45" y1="100" x2="455" y2="100" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,3"/><line x1="45" y1="140" x2="455" y2="140" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,3"/><line x1="45" y1="180" x2="455" y2="180" stroke="#333" stroke-width="1"/><text x="40" y="23" fill="#888" font-size="8" text-anchor="end">70%</text><text x="40" y="63" fill="#888" font-size="8" text-anchor="end">60%</text><text x="40" y="103" fill="#888" font-size="8" text-anchor="end">50%</text><text x="40" y="143" fill="#888" font-size="8" text-anchor="end">40%</text><text x="40" y="183" fill="#888" font-size="8" text-anchor="end">30%</text>${yearLabels}<line x1="206" y1="15" x2="206" y2="180" stroke="#444" stroke-width="1" stroke-dasharray="3,3"/><text x="208" y="28" fill="#888" font-size="7">1980</text><text x="208" y="38" fill="#888" font-size="7">Neoliberal</text><text x="208" y="48" fill="#888" font-size="7">Turn</text><polyline id="labor-line" points="${laborPoints}" fill="none" stroke="#888" stroke-width="2"/><polyline id="capital-line" points="${capitalPoints}" fill="none" stroke="#cc1111" stroke-width="2.5"/><line x1="50" y1="210" x2="70" y2="210" stroke="#888" stroke-width="2"/><text x="74" y="213" fill="#888" font-size="8">Labour Share</text><line x1="170" y1="210" x2="190" y2="210" style="stroke: var(--red)" stroke-width="2"/><text x="194" y="213" style="fill: var(--red)" font-size="8">Capital Share</text></svg>`;
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
	const lastPoint = historySeriesData[historySeriesData.length - 1];
	const areaPoints = `${trendPoints} ${lastPoint.x},225 50,225`;
	const axisYears = [1913, 1929, 1945, 1970, 1980, 2000, 2025];
	const yearLabels = historySeriesData
		.filter((point) => axisYears.includes(point.year))
		.map(
			(point) =>
				`<text x="${point.x}" y="243" fill="#888" font-size="8" text-anchor="middle">${point.year}</text>`,
		)
		.join("");
	const crash = historySeriesData.find((point) => point.year === 1929);
	const peak = historySeriesData.find((point) => point.year === 1970);
	const recent = historySeriesData.find((point) => point.year === 2025);
	if (!crash || !peak || !recent) {
		return;
	}

	container.innerHTML = `<svg id="history-svg" role="img" aria-labelledby="history-svg-title" viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg"><title id="history-svg-title">Top 1% Income Share — USA, 1913–2025</title><desc>Line chart showing the top 1% income share peaked at 24% in 1929, fell to 10% by 1970 during the post-war egalitarian era, then rose again to 21% by 2025 under neoliberal policies.</desc><rect x="50" y="10" width="212" height="215" fill="rgba(204,17,17,0.06)"/><rect x="262" y="10" width="233" height="215" fill="rgba(76,175,76,0.05)"/><rect x="495" y="10" width="305" height="215" fill="rgba(204,17,17,0.10)"/><text x="60" y="25" fill="rgba(204,17,17,0.4)" font-size="8">GILDED AGE</text><text x="270" y="25" fill="rgba(76,175,76,0.4)" font-size="8">POST-WAR EGALITARIAN ERA</text><text x="505" y="25" fill="rgba(204,17,17,0.5)" font-size="8">NEOLIBERAL ASCENT</text><line x1="50" y1="45" x2="800" y2="45" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,4"/><line x1="50" y1="90" x2="800" y2="90" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,4"/><line x1="50" y1="135" x2="800" y2="135" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,4"/><line x1="50" y1="180" x2="800" y2="180" stroke="#1a1a1a" stroke-width="1" stroke-dasharray="4,4"/><line x1="50" y1="225" x2="800" y2="225" stroke="#333" stroke-width="1"/><text x="44" y="48" fill="#888" font-size="8" text-anchor="end">30%</text><text x="44" y="93" fill="#888" font-size="8" text-anchor="end">25%</text><text x="44" y="138" fill="#888" font-size="8" text-anchor="end">20%</text><text x="44" y="183" fill="#888" font-size="8" text-anchor="end">15%</text><text x="44" y="228" fill="#888" font-size="8" text-anchor="end">10%</text>${yearLabels}<polygon points="${areaPoints}" fill="rgba(204,17,17,0.08)"/><polyline id="hist-line" points="${trendPoints}" fill="none" stroke="#cc1111" stroke-width="2.5"/><circle cx="${crash.x}" cy="${historyY(crash.share)}" r="5" style="fill: var(--red)"/><text x="${crash.x + 6}" y="${historyY(crash.share) - 8}" style="fill: var(--red)" font-size="7">1929 Crash</text><circle cx="${peak.x}" cy="${historyY(peak.share)}" r="5" fill="#4caf4c"/><text x="${peak.x + 6}" y="${historyY(peak.share) - 7}" fill="#4caf4c" font-size="7">Peak Equality</text><circle cx="${recent.x}" cy="${historyY(recent.share)}" r="5" style="fill: var(--red)"/><text x="${recent.x - 38}" y="${historyY(recent.share) - 8}" style="fill: var(--red)" font-size="7">${recent.share}% (2025)</text></svg>`;
}

function renderDonutDesktopChart(): void {
	const container = document.getElementById("tax-donut-desktop-chart");
	if (!container) {
		return;
	}

	const cx = 150;
	const cy = 150;
	const r = 100;
	const circumference = 2 * Math.PI * r;
	let offset = 0;

	const segments = donutData
		.map((seg, i) => {
			const segLen = (seg.percent / 100) * circumference;
			const dashArray = `${segLen} ${circumference - segLen}`;
			const dashOffset = -offset;
			offset += segLen;

			return `<circle class="donut-segment" data-index="${i}" data-dasharray="${dashArray}" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${seg.color}" stroke-width="60" stroke-dasharray="${dashArray}" stroke-dashoffset="${dashOffset}" transform="rotate(-90 ${cx} ${cy})"/>`;
		})
		.join("");

	let labelOffset = 0;
	const labels = donutData
		.map((seg) => {
			const midAngle = ((labelOffset + seg.percent / 2) / 100) * 360 - 90;
			labelOffset += seg.percent;
			const rad = (midAngle * Math.PI) / 180;
			const lx = cx + 165 * Math.cos(rad);
			const ly = cy + 165 * Math.sin(rad);
			const anchor = lx > cx ? "start" : "end";

			return `<text x="${Math.round(lx)}" y="${Math.round(ly)}" fill="#888" font-size="7" text-anchor="${anchor}">${seg.label} (${seg.percent}%)</text>`;
		})
		.join("");

	container.innerHTML = `<svg id="tax-donut-svg" role="img" aria-labelledby="donut-svg-title" viewBox="0 0 380 310" xmlns="http://www.w3.org/2000/svg"><title id="donut-svg-title">Where Corporate Profits Are Shifted</title><desc>Donut chart showing corporate profit shifting destinations: UK Dependencies 29%, Netherlands 22%, Bermuda/Cayman 18%, Luxembourg 15%, Ireland 12%, Other 4%.</desc>${segments}${labels}</svg>`;
}

function renderTreemapDesktopChart(): void {
	const container = document.getElementById("asset-treemap-desktop-chart");
	if (!container) {
		return;
	}

	const w = 600;
	const h = 300;
	const total = treemapData.reduce((sum, item) => sum + item.value, 0);

	const mainW = Math.round((treemapData[0].value / total) * w);
	const sideW = w - mainW;
	const remainingTotal = total - treemapData[0].value;

	let sideY = 0;
	const rects = [
		`<rect class="treemap-rect" data-index="0" x="0" y="0" width="${mainW}" height="${h}" fill="${treemapData[0].color}"/><text x="${mainW / 2}" y="${h / 2 - 10}" fill="var(--white)" font-size="11" font-weight="bold" text-anchor="middle">${treemapData[0].label}</text><text x="${mainW / 2}" y="${h / 2 + 10}" fill="var(--white)" font-size="14" font-weight="bold" text-anchor="middle">${treemapData[0].displayValue}</text>`,
	];

	for (let i = 1; i < treemapData.length; i++) {
		const item = treemapData[i];
		const rectH = Math.round((item.value / remainingTotal) * h);
		const actualH = i === treemapData.length - 1 ? h - sideY : rectH;
		rects.push(
			`<rect class="treemap-rect" data-index="${i}" x="${mainW + 1}" y="${sideY}" width="${sideW - 1}" height="${actualH}" fill="${item.color}"/><text x="${mainW + sideW / 2}" y="${sideY + actualH / 2 - 6}" fill="#ccc" font-size="8" text-anchor="middle">${item.label}</text><text x="${mainW + sideW / 2}" y="${sideY + actualH / 2 + 8}" fill="#ccc" font-size="10" font-weight="bold" text-anchor="middle">${item.displayValue}</text>`,
		);
		sideY += actualH;
	}

	container.innerHTML = `<svg id="treemap-svg" role="img" aria-labelledby="treemap-svg-title" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><title id="treemap-svg-title">Global Asset Classes by Value</title><desc>Treemap showing global asset values: Residential Real Estate $380T dominates, followed by Equities $109T, Government Debt $66T, and Gold $14T.</desc>${rects.join("")}</svg>`;
}

function renderSankeyDesktopChart(): void {
	const container = document.getElementById("flows-sankey-desktop-chart");
	if (!container) {
		return;
	}

	const paths = sankeyFlows
		.map(
			(flow) =>
				`<path id="sankey-${flow.label.toLowerCase().replace(/\s+/g, "-")}" class="sankey-path" d="${flow.path}" fill="none" stroke="${flow.color}" stroke-width="${flow.strokeWidth}" stroke-linecap="round" opacity="0.8"/>`,
		)
		.join("");

	const leftFlows = sankeyFlows.filter((f) => f.direction === "left");
	const rightFlows = sankeyFlows.filter((f) => f.direction === "right");

	const leftLabels = leftFlows
		.map((flow) => {
			const startY = Number.parseInt(flow.path.split(",")[1], 10);
			return `<text x="85" y="${startY + 4}" fill="#888" font-size="7">${flow.label}: ${flow.displayValue}</text>`;
		})
		.join("");

	const rightLabels = rightFlows
		.map((flow) => {
			const parts = flow.path.match(/(\d+),(\d+)$/);
			const y = parts ? Number.parseInt(parts[2], 10) : 235;
			return `<text x="75" y="${y + 4}" fill="#4caf4c" font-size="7">${flow.label}: ${flow.displayValue}</text>`;
		})
		.join("");

	container.innerHTML = `<svg id="sankey-svg" role="img" aria-labelledby="sankey-svg-title" viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg"><title id="sankey-svg-title">The Real Flow of Wealth: South to North</title><desc>Sankey flow diagram showing net wealth flows from the Global South to the Global North: Unequal Exchange $10.8T, Debt Service $443B, Illicit Flows $89B flowing northward, versus only $200B in Aid flowing southward.</desc><text x="40" y="20" fill="var(--red)" font-size="10" font-weight="bold" text-anchor="middle">GLOBAL</text><text x="40" y="32" fill="var(--red)" font-size="10" font-weight="bold" text-anchor="middle">SOUTH</text><text x="560" y="20" fill="#888" font-size="10" font-weight="bold" text-anchor="middle">GLOBAL</text><text x="560" y="32" fill="#888" font-size="10" font-weight="bold" text-anchor="middle">NORTH</text>${paths}${leftLabels}${rightLabels}</svg>`;
}

function buildMobileData(): {
	gini: BarChartItem[];
	labor: BarChartItem[];
	history: BarChartItem[];
	donut: BarChartItem[];
	treemap: BarChartItem[];
	sankey: BarChartItem[];
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

	const historyYears = [1913, 1929, 1970, 2025];
	const history = historySeriesData
		.filter((point) => historyYears.includes(point.year))
		.map((point) => {
			const width = Math.round((point.share / 30) * 100);
			const colorMap: Record<number, string> = {
				1913: "#7a2a2a",
				1929: "var(--red)",
				1970: "#4caf4c",
				2025: "#aa2222",
			};
			const color = colorMap[point.year];
			return {
				label: `${point.year}`,
				width,
				value: `${point.share}%`,
				color,
			};
		});

	const donut = donutData.map((seg) => ({
		label: seg.label,
		width: Math.round(seg.percent * (100 / 29)),
		value: `${seg.percent}%`,
		color: seg.color,
	}));

	const maxTreemap = treemapData[0].value;
	const treemap = treemapData.map((item) => ({
		label: item.label,
		width: Math.round((item.value / maxTreemap) * 100),
		value: item.displayValue,
		color: item.color,
	}));

	const sankey: BarChartItem[] = [
		{
			label: "Unequal Exchange",
			width: 100,
			value: "$10.8T",
			color: "#cc1111",
		},
		{
			label: "Debt Service",
			width: 8,
			value: "$443B",
			color: "#aa2222",
		},
		{
			label: "Illicit Flows",
			width: 3,
			value: "$89B",
			color: "#883333",
		},
		{ label: "Aid Received", width: 5, value: "$200B", color: "#4caf4c" },
	];

	return { gini, labor, history, donut, treemap, sankey };
}

export function initCharts(): void {
	renderBarChart("wealth-distribution-chart", wealthDistributionData);
	renderBarChart("ceo-pay-chart", ceoPayData, {
		outsideValueThreshold: 20,
	});
	renderBarChart("emissions-chart", emissionsData);
	renderBarChart("tax-rates-chart", taxRatesData);
	renderBarChart("homeownership-chart", homeownershipData);
	renderBarChart("debt-service-chart", debtServiceData);

	renderGiniDesktopChart();
	renderLaborDesktopChart();
	renderHistoryDesktopChart();
	renderDonutDesktopChart();
	renderTreemapDesktopChart();
	renderSankeyDesktopChart();

	const mobileData = buildMobileData();
	renderMobileBarChart("gini-mobile-chart", mobileData.gini);
	renderMobileBarChart("labor-mobile-chart", mobileData.labor);
	renderMobileBarChart("history-mobile-chart", mobileData.history);
	renderMobileBarChart("tax-donut-mobile-chart", mobileData.donut);
	renderMobileBarChart("asset-treemap-mobile-chart", mobileData.treemap);
	renderMobileBarChart("flows-sankey-mobile-chart", mobileData.sankey);

	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	if (reduced) {
		for (const fill of document.querySelectorAll<HTMLElement>(".bar-fill")) {
			fill.style.width = `${fill.dataset.width ?? "0"}%`;
		}
		for (const bar of document.querySelectorAll<SVGRectElement>(".gini-bar")) {
			bar.style.transform = "scaleY(1)";
		}
		for (const rect of document.querySelectorAll<SVGRectElement>(
			".treemap-rect",
		)) {
			rect.style.transform = "scaleY(1)";
		}
		for (const seg of document.querySelectorAll<SVGCircleElement>(
			".donut-segment",
		)) {
			seg.style.strokeDasharray = seg.dataset.dasharray ?? "";
		}
		return;
	}

	for (const bar of document.querySelectorAll<SVGRectElement>(".gini-bar")) {
		bar.style.transformBox = "fill-box";
		bar.style.transformOrigin = "center bottom";
		bar.style.transform = "scaleY(0)";
	}

	for (const rect of document.querySelectorAll<SVGRectElement>(
		".treemap-rect",
	)) {
		rect.style.transformBox = "fill-box";
		rect.style.transformOrigin = "center bottom";
		rect.style.transform = "scaleY(0)";
	}

	for (const seg of document.querySelectorAll<SVGCircleElement>(
		".donut-segment",
	)) {
		const circumference = 2 * Math.PI * 100;
		seg.style.strokeDasharray = `0 ${circumference}`;
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

	const treemapObserver = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) {
					continue;
				}
				for (const rect of entry.target.querySelectorAll<SVGRectElement>(
					".treemap-rect",
				)) {
					const i = Number(rect.dataset.index ?? 0);
					setTimeout(() => {
						rect.style.transform = "scaleY(1)";
					}, i * 150);
				}
				treemapObserver.unobserve(entry.target);
			}
		},
		{ threshold: 0.2 },
	);

	const treemapSvg = document.getElementById("treemap-svg");
	if (treemapSvg) {
		treemapObserver.observe(treemapSvg);
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
