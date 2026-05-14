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
	sourceY: number;
	targetY: number;
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
};

export type HistoryPoint = {
	year: number;
	share: number;
};

export const giniDesktopData: GiniItem[] = [
	{ label: "FR", value: 0.7, color: "#444" },
	{ label: "UK", value: 0.71, color: "#444" },
	{ label: "DE", value: 0.79, color: "#888" },
	{ label: "USA", value: 0.85, color: "#666" },
	{ label: "SE", value: 0.88, color: "#0a8f8f" },
	{ label: "BR", value: 0.89, color: "#0d6e6e" },
	{ label: "ZA", value: 0.89, color: "var(--accent)", highlight: true },
];

export const laborSeriesData: LaborPoint[] = [
	{ year: 1990, labor: 55, capital: 45 },
	{ year: 1994, labor: 54, capital: 46 },
	{ year: 2000, labor: 52, capital: 48 },
	{ year: 2008, labor: 51, capital: 49 },
	{ year: 2015, labor: 49, capital: 51 },
	{ year: 2020, labor: 47, capital: 53 },
	{ year: 2025, labor: 46, capital: 54 },
];

export const historySeriesData: HistoryPoint[] = [
	{ year: 1914, share: 22 },
	{ year: 1948, share: 27 },
	{ year: 1970, share: 24 },
	{ year: 1985, share: 22 },
	{ year: 1994, share: 20 },
	{ year: 2000, share: 21 },
	{ year: 2010, share: 20 },
	{ year: 2018, share: 19 },
	{ year: 2023, share: 20 },
	{ year: 2025, share: 20 },
];

export const wealthDistributionData: BarChartItem[] = [
	{ label: "Top 1%", width: 55, value: "55%", color: "var(--accent)" },
	{ label: "Next 9%", width: 35, value: "35%", color: "#444" },
	{ label: "Next 40%", width: 9, value: "9%", color: "#2a2a2a" },
	{ label: "Bottom 50%", width: 1, value: "~1%", color: "#222" },
];

export const ceoPayData: BarChartItem[] = [
	{ label: "1994", width: 16, value: "~85:1", color: "#333" },
	{ label: "2005", width: 37, value: "~200:1", color: "#3a3a3a" },
	{ label: "2015", width: 74, value: "~400:1", color: "#0a8f8f" },
	{ label: "2022", width: 100, value: "541:1", color: "var(--accent)" },
];

export const donutData: DonutSegment[] = [
	{ label: "UK Dependencies", percent: 23, color: "var(--accent)" },
	{ label: "Netherlands", percent: 22, color: "#0a8f8f" },
	{ label: "Bermuda & Cayman", percent: 18, color: "#0d7676" },
	{ label: "Luxembourg", percent: 15, color: "#0a5e5e" },
	{ label: "Ireland", percent: 12, color: "#444" },
	{ label: "Other", percent: 10, color: "#2a2a2a" },
];

export const treemapData: TreemapItem[] = [
	{
		label: "Real Estate",
		value: 393,
		displayValue: "$393T",
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
		sourceY: 70,
		targetY: 55,
		direction: "left",
	},
	{
		label: "Debt Service",
		displayValue: "$443B",
		color: "#0a8f8f",
		strokeWidth: 12,
		sourceY: 130,
		targetY: 120,
		direction: "left",
	},
	{
		label: "Illicit Flows",
		displayValue: "$89B",
		color: "#0d7676",
		strokeWidth: 6,
		sourceY: 165,
		targetY: 155,
		direction: "left",
	},
	{
		label: "Aid",
		displayValue: "$200B",
		color: "#4caf4c",
		strokeWidth: 8,
		sourceY: 220,
		targetY: 235,
		direction: "right",
	},
];

export const taxRatesData: BarChartItem[] = [
	{
		label: "Top personal rate",
		width: 100,
		value: "45%",
		color: "#2a2a2a",
	},
	{
		label: "Statutory corporate",
		width: 60,
		value: "27%",
		color: "#444",
	},
	{
		label: "MNC effective (est.)",
		width: 40,
		value: "~18%",
		color: "var(--accent)",
	},
];

export const homeownershipData: BarChartItem[] = [
	{ label: "1994", width: 63, value: "~1.5M", color: "#888" },
	{ label: "2004", width: 79, value: "~1.9M", color: "#666" },
	{ label: "2014", width: 96, value: "~2.3M", color: "#0a8f8f" },
	{ label: "2024", width: 100, value: "~2.4M", color: "var(--accent)" },
];

export const debtServiceData: BarChartItem[] = [
	{ label: "Sri Lanka", width: 100, value: "73%", color: "var(--accent)" },
	{ label: "Ghana", width: 64, value: "47%", color: "#0a8f8f" },
	{ label: "Pakistan", width: 55, value: "40%", color: "#0d7676" },
	{ label: "Kenya", width: 41, value: "30%", color: "#444" },
	{ label: "S. Africa", width: 29, value: "~21%", color: "#0a5e5e" },
	{ label: "USA", width: 12, value: "9%", color: "#2a2a2a" },
	{ label: "UK", width: 10, value: "7%", color: "#222" },
];

export const emissionsData: BarChartItem[] = [
	{ label: "Top 1%", width: 16, value: "16%", color: "var(--accent)" },
	{ label: "Next 9%", width: 34, value: "34%", color: "#0a8f8f" },
	{ label: "Middle 40%", width: 42, value: "42%", color: "#444" },
	{ label: "Bottom 50%", width: 8, value: "8%", color: "#2a2a2a" },
];

const HISTORY_SHARE_MAX = 30;
const DONUT_MAX_PERCENT = 23;

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
			color: "#0a7575",
		},
		{
			label: `Capital ${lastLabor.year}`,
			width: lastLabor.capital,
			value: `${lastLabor.capital}%`,
			color: "var(--accent)",
		},
	];

	const historyYears = [1914, 1948, 1994, 2025];
	const history = historySeriesData
		.filter((point) => historyYears.includes(point.year))
		.map((point) => {
			const width = Math.round((point.share / HISTORY_SHARE_MAX) * 100);
			const colorMap: Record<number, string> = {
				1914: "#0a7575",
				1948: "var(--accent)",
				1994: "#4caf4c",
				2025: "#0a8f8f",
			};
			const color = colorMap[point.year] ?? "var(--accent)";
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

export const mobileData = buildMobileData();
