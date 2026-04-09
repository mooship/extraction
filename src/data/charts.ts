export type DonutSegment = {
	label: string;
	percent: number;
	color: string;
};

export type TreemapItem = {
	label: string;
	value: number;
	displayValue: string;
	color: string;
};

export type SankeyFlow = {
	label: string;
	displayValue: string;
	color: string;
	strokeWidth: number;
	path: string;
	direction: "left" | "right";
};

export type BarChartItem = {
	label: string;
	width: number;
	value: string;
	color: string;
};

export type GiniItem = {
	label: string;
	value: number;
	color: string;
	highlight?: boolean;
};

export type LaborPoint = {
	year: number;
	labor: number;
	capital: number;
	x: number;
};

export type HistoryPoint = {
	year: number;
	share: number;
	x: number;
};

export const giniDesktopData: GiniItem[] = [
	{ label: "FR", value: 0.7, color: "#444" },
	{ label: "UK", value: 0.706, color: "#444" },
	{ label: "DE", value: 0.788, color: "#888" },
	{ label: "USA", value: 0.85, color: "var(--accent)", highlight: true },
	{ label: "SE", value: 0.881, color: "#0a8f8f" },
	{ label: "ZA", value: 0.886, color: "#0a7676", highlight: true },
	{ label: "BR", value: 0.892, color: "#0d6e6e" },
];

export const laborSeriesData: LaborPoint[] = [
	{ year: 1950, labor: 67, capital: 33, x: 50 },
	{ year: 1970, labor: 67, capital: 33, x: 154 },
	{ year: 1985, labor: 65, capital: 35, x: 232 },
	{ year: 2000, labor: 63, capital: 37, x: 310 },
	{ year: 2015, labor: 61, capital: 39, x: 388 },
	{ year: 2023, labor: 58, capital: 42, x: 430 },
	{ year: 2025, labor: 54, capital: 46, x: 445 },
];

export const historySeriesData: HistoryPoint[] = [
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

export const wealthDistributionData: BarChartItem[] = [
	{ label: "Top 1%", width: 31, value: "31%", color: "var(--accent)" },
	{ label: "Next 9%", width: 37, value: "37%", color: "#444" },
	{ label: "Next 40%", width: 30, value: "30%", color: "#2a2a2a" },
	{ label: "Bottom 50%", width: 2, value: "2%", color: "#222" },
];

export const ceoPayData: BarChartItem[] = [
	{ label: "1965", width: 5.5, value: "21:1", color: "#333" },
	{ label: "1989", width: 16.1, value: "61:1", color: "#3a3a3a" },
	{ label: "2000", width: 100, value: "380:1", color: "#0a8f8f" },
	{ label: "2023", width: 76.3, value: "290:1", color: "var(--accent)" },
];

export const donutData: DonutSegment[] = [
	{ label: "UK Dependencies", percent: 23, color: "var(--accent)" },
	{ label: "Netherlands", percent: 22, color: "#0a8f8f" },
	{ label: "Bermuda / Cayman", percent: 18, color: "#0d7676" },
	{ label: "Luxembourg", percent: 15, color: "#0a5e5e" },
	{ label: "Ireland", percent: 12, color: "#444" },
	{ label: "Other", percent: 10, color: "#2a2a2a" },
];

export const treemapData: TreemapItem[] = [
	{
		label: "Real Estate",
		value: 380,
		displayValue: "$380T",
		color: "var(--accent)",
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

export const sankeyFlows: SankeyFlow[] = [
	{
		label: "Unequal Exchange",
		displayValue: "$10.8T",
		color: "var(--accent)",
		strokeWidth: 44,
		path: "M 80,70 C 250,70 350,55 520,55",
		direction: "left",
	},
	{
		label: "Debt Service",
		displayValue: "$443B",
		color: "#0a8f8f",
		strokeWidth: 12,
		path: "M 80,130 C 250,130 350,125 520,120",
		direction: "left",
	},
	{
		label: "Illicit Flows",
		displayValue: "$89B",
		color: "#0d7676",
		strokeWidth: 6,
		path: "M 80,165 C 250,165 350,160 520,155",
		direction: "left",
	},
	{
		label: "Aid",
		displayValue: "$200B",
		color: "#4caf4c",
		strokeWidth: 8,
		path: "M 520,220 C 350,225 250,230 80,235",
		direction: "right",
	},
];

export const taxRatesData: BarChartItem[] = [
	{
		label: "Richest 400",
		width: 62,
		value: "23%",
		color: "var(--accent)",
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

export const homeownershipData: BarChartItem[] = [
	{ label: "25–34 (c.2000)", width: 59, value: "~59%", color: "#888" },
	{ label: "25–34 (2025)", width: 28, value: "28%", color: "var(--accent)" },
	{ label: "35–44 (1997)", width: 68, value: "68%", color: "#888" },
	{ label: "35–44 (2025)", width: 51, value: "51%", color: "#0a8f8f" },
	{ label: "45–54 (1997)", width: 75, value: "75%", color: "#888" },
	{ label: "45–54 (2025)", width: 65, value: "65%", color: "#444" },
	{ label: "55–64 (1997)", width: 78, value: "78%", color: "#888" },
	{ label: "55–64 (2025)", width: 74, value: "74%", color: "#333" },
];

export const debtServiceData: BarChartItem[] = [
	{ label: "Sri Lanka", width: 100, value: "73%", color: "var(--accent)" },
	{ label: "Ghana", width: 64, value: "47%", color: "#0a8f8f" },
	{ label: "Pakistan", width: 55, value: "40%", color: "#0d7676" },
	{ label: "Kenya", width: 41, value: "30%", color: "#444" },
	{ label: "USA", width: 12, value: "9%", color: "#2a2a2a" },
	{ label: "UK", width: 10, value: "7%", color: "#222" },
];

export const emissionsData: BarChartItem[] = [
	{ label: "Top 1%", width: 16, value: "16%", color: "var(--accent)" },
	{ label: "Next 9%", width: 34, value: "34%", color: "#0a8f8f" },
	{ label: "Middle 40%", width: 42, value: "42%", color: "#444" },
	{ label: "Bottom 50%", width: 8, value: "8%", color: "#2a2a2a" },
];

function createYScale(
	base: number,
	min: number,
	pxPerUnit: number,
): (v: number) => number {
	return (v) => Math.round(base - (v - min) * pxPerUnit);
}

export const laborY = createYScale(180, 30, 4);
export const historyY = createYScale(225, 10, 9);

const HISTORY_SHARE_MAX = 30;
const DONUT_MAX_PERCENT = 23;

export function buildMobileData(): {
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
			color: "#0a7575",
		},
		{
			label: `Capital ${lastLabor.year}`,
			width: lastLabor.capital,
			value: `${lastLabor.capital}%`,
			color: "var(--accent)",
		},
	];

	const historyYears = [1913, 1929, 1970, 2025];
	const history = historySeriesData
		.filter((point) => historyYears.includes(point.year))
		.map((point) => {
			const width = Math.round((point.share / HISTORY_SHARE_MAX) * 100);
			const colorMap: Record<number, string> = {
				1913: "#0a7575",
				1929: "var(--accent)",
				1970: "#4caf4c",
				2025: "#0a8f8f",
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
		width: Math.round(seg.percent * (100 / DONUT_MAX_PERCENT)),
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
			color: "var(--accent)",
		},
		{
			label: "Debt Service",
			width: 12,
			value: "$443B",
			color: "#0a8f8f",
		},
		{
			label: "Illicit Flows",
			width: 4,
			value: "$89B",
			color: "#0d7676",
		},
		{ label: "Aid Received", width: 7, value: "$200B", color: "#4caf4c" },
	];

	return { gini, labor, history, donut, treemap, sankey };
}
