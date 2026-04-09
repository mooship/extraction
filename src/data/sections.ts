export interface Citation {
	ariaLabel: string;
	source: string;
	url: string;
}

export interface StatBoxData {
	target: number;
	prefix: string;
	suffix: string;
	label: string;
	citation?: Citation;
	full?: boolean;
}

export interface PullQuoteData {
	quote: string;
	attribution: string;
}

export interface SourceItem {
	label: string;
	url?: string;
}

export const heroSection = {
	statIdPrefix: "stat-label",
	stats: [
		{
			target: 1,
			prefix: "",
			suffix: "%",
			label: "Own more wealth than the bottom 50% combined",
		},
		{
			target: 82,
			prefix: "",
			suffix: "%",
			label:
				"Of new wealth generated in 2017 went to the top 1% \u2014 Oxfam, 2018",
			citation: {
				ariaLabel: "View source: Oxfam 2018",
				source: "Oxfam, Reward Work Not Wealth, 2018",
				url: "https://www.oxfam.org/en/research/reward-work-not-wealth",
			},
		},
		{
			target: 700,
			prefix: "",
			suffix: "M",
			label:
				"people trapped in extreme poverty under decades of capitalist \u2018development\u2019",
		},
		{
			target: 5,
			prefix: "$",
			suffix: "T",
			label: "gained by global billionaires during COVID-19 (2020\u20132022)",
			citation: {
				ariaLabel: "View source: Oxfam 2022",
				source: "Oxfam, Profiting from Pain, 2022",
				url: "https://www.oxfam.org/en/research/profiting-pain",
			},
		},
		{
			target: 1,
			prefix: "Top ",
			suffix: "%",
			label:
				"Emit more CO\u2082 than the poorest 50% of humanity combined \u2014 the same class that owns half the world\u2019s wealth",
			full: true,
		},
	] satisfies StatBoxData[],
};

export const wealthSection = {
	pullQuote: {
		quote:
			"To allow the market mechanism to be the sole director of the fate of human beings and their natural environment\u2026 would result in the demolition of society.",
		attribution: "\u2014 Karl Polanyi, <em>The Great Transformation</em>, 1944",
	} satisfies PullQuoteData,
	sources: [
		{ label: "World Inequality Database", url: "https://wid.world" },
		{ label: "(Piketty, Saez, Zucman)" },
	] satisfies SourceItem[],
	additionalSources: [
		{
			label: "US Federal Reserve SCF",
			url: "https://www.federalreserve.gov/econres/scfindex.htm",
		},
		{
			label: "Oxfam Inequality Report 2025",
			url: "https://www.oxfam.org/en/research/inequality-inc",
		},
	] satisfies SourceItem[],
	chartCitations: {
		history: {
			ariaLabel: "View source: World Inequality Database",
			source: "World Inequality Database / Piketty, Saez & Zucman",
			url: "https://wid.world/country/usa/",
		},
		distribution: {
			ariaLabel: "View source: US Federal Reserve 2024",
			source: "US Federal Reserve DFA, Q1 2024",
			url: "https://www.federalreserve.gov/releases/z1/dataviz/dfa/distribute/chart/",
		},
	},
};

export const taxSection = {
	statIdPrefix: "stat-label-tax",
	stats: [
		{
			target: 32,
			prefix: "$",
			suffix: "T",
			label:
				"Estimated global offshore wealth (2012 estimate, Tax Justice Network)",
			citation: {
				ariaLabel: "View source: Tax Justice Network 2012",
				source: "Tax Justice Network, The Price of Offshore Revisited, 2012",
				url: "https://taxjustice.net/reports/the-price-of-offshore-revisited/",
			},
		},
		{
			target: 1,
			prefix: "$",
			suffix: "T",
			label: "In corporate profits shifted to tax havens annually",
		},
		{
			target: 23,
			prefix: "",
			suffix: "%",
			label:
				"Effective tax rate paid by the richest 400 US families (all taxes, Saez & Zucman 2019)",
			citation: {
				ariaLabel: "View source: Saez & Zucman 2019",
				source: "Saez & Zucman, The Triumph of Injustice, 2019",
				url: "https://gabriel-zucman.eu/uktaxes/",
			},
		},
		{
			target: 88,
			prefix: "$",
			suffix: "B",
			label:
				"Annual illicit financial flows from Africa \u2014 more than total aid received (UNCTAD 2020)",
			citation: {
				ariaLabel: "View source: UNCTAD 2020",
				source: "UNCTAD, Economic Development in Africa Report, 2020",
				url: "https://unctad.org/publication/economic-development-africa-report-2020",
			},
		},
	] satisfies StatBoxData[],
	pullQuote: {
		quote:
			"The tax system has been turned against the very people it is supposed to serve. When billionaires pay lower tax rates than their secretaries, it is not a loophole \u2014 it is the design.",
		attribution:
			"\u2014 Gabriel Zucman, <em>The Hidden Wealth of Nations</em>, 2015",
	},
	sources: [
		{
			label: "Tax Justice Network State of Tax Justice 2024",
			url: "https://taxjustice.net/reports/the-state-of-tax-justice-2024/",
		},
		{ label: "Saez & Zucman" },
		{ label: "UNCTAD", url: "https://unctad.org" },
		{
			label: "Global Financial Integrity",
			url: "https://gfintegrity.org",
		},
	],
};

export const laborSection = {
	statIdPrefix: "stat-label-housing",
	stats: [
		{
			target: 50,
			prefix: "",
			suffix: "%",
			label:
				"Of US renters spend 30%+ of income on rent \u2014 Harvard JCHS 2025",
			citation: {
				ariaLabel: "View source: Harvard JCHS 2025",
				source: "Harvard JCHS, State of the Nation's Housing, 2025",
				url: "https://www.jchs.harvard.edu/state-nations-housing-2025",
			},
		},
		{
			target: 13,
			prefix: "",
			suffix: ":1",
			label:
				"London house price to earnings ratio \u2014 was around 4:1 in 1997",
		},
		{
			target: 380,
			prefix: "$",
			suffix: "T",
			label:
				"Global real estate value \u2014 the largest asset class on earth (2021, Savills)",
			citation: {
				ariaLabel: "View source: Savills 2021",
				source: "Savills, Around the World in Dollars and Cents, 2021",
				url: "https://www.savills.com/impacts/market-trends/the-total-value-of-global-real-estate.html",
			},
		},
		{
			target: 1,
			prefix: "",
			suffix: "M",
			label:
				"Nearly 1 million empty homes in England while over 350,000 are homeless (Action on Empty Homes 2024; Shelter 2024)",
		},
	] satisfies StatBoxData[],
	pullQuote: {
		quote:
			"The share of income going to labour has declined in most economies since the 1980s, while returns to capital have risen correspondingly.",
		attribution: "\u2014 ILO World Employment and Social Outlook, 2024",
	},
	sources: [
		{ label: "BLS / BEA", url: "https://www.bls.gov" },
		{
			label: "Economic Policy Institute",
			url: "https://www.epi.org",
		},
		{
			label: "ILO World Employment and Social Outlook 2024",
			url: "https://www.ilo.org/global/research/global-reports/weso/lang--en/index.htm",
		},
		{ label: "Harvard JCHS", url: "https://www.jchs.harvard.edu" },
		{ label: "ONS", url: "https://www.ons.gov.uk" },
		{
			label: "Savills Global Research",
			url: "https://www.savills.com/research_articles/255800/334844-0",
		},
	],
	chartCitations: {
		ceoPay: {
			ariaLabel: "View source: EPI 2024",
			source: "Economic Policy Institute, CEO Pay in 2023, 2024",
			url: "https://www.epi.org/publication/ceo-pay-in-2023/",
		},
	},
};

export const ecologySection = {
	statIdPrefix: "stat-label-eco",
	stats: [
		{
			target: 71,
			prefix: "",
			suffix: "%",
			label:
				"Of global emissions since 1988 traced to just 100 corporations \u2014 including downstream combustion of their products",
			citation: {
				ariaLabel: "View source: CDP 2017",
				source: "CDP, Carbon Majors Database Report, 2017",
				url: "https://www.cdp.net/en/articles/media/new-report-shows-just-100-companies-responsible-for-71-of-global-emissions",
			},
		},
		{
			target: 7,
			prefix: "$",
			suffix: "T",
			label:
				"In annual fossil fuel subsidies \u2014 more than global spending on education",
			citation: {
				ariaLabel: "View source: IMF 2025",
				source: "IMF, Fossil Fuel Subsidies 2025 Update",
				url: "https://www.imf.org/en/Topics/climate-change/energy-subsidies",
			},
		},
		{
			target: 400,
			prefix: "$",
			suffix: "B",
			label: "Estimated annual cost of climate damage to the Global South",
		},
		{
			target: 1,
			prefix: "",
			suffix: "M+",
			label:
				"Species facing extinction driven by corporate agribusiness and extractive industry",
		},
	] satisfies StatBoxData[],
	pullQuote: {
		quote:
			"There is no such thing as sustainable capitalism. The system is built on the infinite expansion of production on a finite planet. Eco-socialism is not a branch of environmentalism \u2014 it is the recognition that the ecological and social crises share a root.",
		attribution:
			"\u2014 Michael L\u00f6wy, <em>Ecosocialism: A Radical Alternative to Capitalist Catastrophe</em>, 2015",
	},
	sources: [
		{
			label: "Oxfam Carbon Inequality Report 2025",
			url: "https://www.oxfam.org/en/research/carbon-inequality-era-climate-breakdown",
		},
		{
			label: "Carbon Disclosure Project 2017",
			url: "https://www.cdp.net",
		},
		{
			label: "IMF Fossil Fuel Subsidies 2025",
			url: "https://www.imf.org/en/Topics/climate-change/energy-subsidies",
		},
		{
			label: "IPBES Global Assessment 2019",
			url: "https://ipbes.net/global-assessment",
		},
		{ label: "Loss and Damage Collaboration 2024" },
	],
	chartCitations: {
		emissions: {
			ariaLabel: "View source: Oxfam 2025",
			source: "Oxfam, Carbon Inequality Kills, 2025",
			url: "https://www.oxfam.org/en/research/carbon-inequality-kills",
		},
	},
};

export const imperialismSection = {
	statIdPrefix: "stat-label-imp",
	stats: [
		{
			target: 2,
			prefix: "$",
			suffix: "T",
			label:
				"Net annual resource flows from South to North \u2014 Hickel et al. 2022",
			citation: {
				ariaLabel: "View source: Hickel et al. 2021",
				source: "Hickel, Sullivan & Zoomkawala, New Political Economy, 2021",
				url: "https://doi.org/10.1080/13563467.2021.1899153",
			},
		},
		{
			target: 11,
			prefix: "$",
			suffix: "T",
			label:
				"Total external debt of developing countries \u2014 World Bank 2024",
		},
		{
			target: 54,
			prefix: "",
			suffix: "",
			label: "Countries in debt crisis or at high risk \u2014 UN 2025",
		},
		{
			target: 443,
			prefix: "$",
			suffix: "B",
			label:
				"Annual debt service payments by developing countries \u2014 2022 (World Bank)",
			citation: {
				ariaLabel: "View source: World Bank 2023",
				source: "World Bank, International Debt Report, 2023",
				url: "https://www.worldbank.org/en/publication/international-debt-report",
			},
		},
	] satisfies StatBoxData[],
	pullQuote: {
		quote: "Europe is literally the creation of the Third World.",
		attribution:
			"\u2014 Frantz Fanon, <em>The Wretched of the Earth</em>, 1961",
	},
	sources: [
		{
			label: "Jason Hickel, <em>The Divide</em>",
		},
		{
			label: "Global Financial Integrity",
			url: "https://gfintegrity.org",
		},
		{
			label: "Jubilee Debt Campaign",
			url: "https://jubileedebt.org.uk",
		},
		{ label: "World Bank", url: "https://data.worldbank.org" },
		{ label: "UNCTAD", url: "https://unctad.org" },
	],
};

export const publicSection = {
	pullQuote: {
		quote:
			"Neocolonialism is the worst form of imperialism. For those who practise it, it means power without responsibility; and for those who suffer from it, it means exploitation without redress.",
		attribution:
			"\u2014 Kwame Nkrumah, <em>Neo-Colonialism: The Last Stage of Imperialism</em>, 1965",
	},
	sources: [
		{
			label: "UNDP Human Development Report",
			url: "https://hdr.undp.org",
		},
		{ label: "WHO", url: "https://www.who.int" },
		{ label: "World Bank", url: "https://data.worldbank.org" },
		{ label: "OECD", url: "https://data.oecd.org" },
		{ label: "UNICEF", url: "https://data.unicef.org" },
		{ label: "Statistics South Africa" },
		{ label: "National Bureau of Statistics of China" },
	],
};
