import { describe, expect, it } from "vitest";
import {
	type BarChartItem,
	ceoPayData,
	debtServiceData,
	donutData,
	emissionsData,
	giniDesktopData,
	historySeriesData,
	homeownershipData,
	laborSeriesData,
	mobileData,
	sankeyFlows,
	taxRatesData,
	treemapData,
	wealthDistributionData,
} from "./data/charts";

describe("buildMobileData", () => {
	describe("gini", () => {
		it("scales values by 100 for width and formats to 2 decimal places", () => {
			for (const [i, item] of mobileData.gini.entries()) {
				const src = giniDesktopData[i];
				expect(item.width).toBe(Math.round(src.value * 100));
				expect(item.value).toBe(src.value.toFixed(2));
				expect(item.label).toBe(src.label);
				expect(item.color).toBe(src.color);
			}
		});

		it("has the same number of items as the desktop data", () => {
			expect(mobileData.gini).toHaveLength(giniDesktopData.length);
		});
	});

	describe("labor", () => {
		it("produces 4 bars from first and last data points", () => {
			expect(mobileData.labor).toHaveLength(4);
		});

		it("uses correct years and values", () => {
			const first = laborSeriesData[0];
			const last = laborSeriesData[laborSeriesData.length - 1];

			expect(mobileData.labor[0].label).toBe(`Labour ${first.year}`);
			expect(mobileData.labor[0].width).toBe(first.labor);
			expect(mobileData.labor[0].value).toBe(`${first.labor}%`);

			expect(mobileData.labor[1].label).toBe(`Labour ${last.year}`);
			expect(mobileData.labor[1].width).toBe(last.labor);

			expect(mobileData.labor[2].label).toBe(`Capital ${first.year}`);
			expect(mobileData.labor[2].width).toBe(first.capital);

			expect(mobileData.labor[3].label).toBe(`Capital ${last.year}`);
			expect(mobileData.labor[3].width).toBe(last.capital);
		});
	});

	describe("history", () => {
		it("filters to exactly 4 key years", () => {
			expect(mobileData.history).toHaveLength(4);
			const years = mobileData.history.map((h) => h.label);
			expect(years).toEqual(["1914", "1948", "1994", "2025"]);
		});

		it("normalises width against HISTORY_SHARE_MAX of 30", () => {
			for (const item of mobileData.history) {
				const year = Number(item.label);
				const src = historySeriesData.find((p) => p.year === year);
				expect(src).toBeDefined();
				expect(item.width).toBe(Math.round(((src?.share ?? 0) / 30) * 100));
				expect(item.value).toBe(`${src?.share}%`);
			}
		});
	});

	describe("donut", () => {
		it("normalises width against DONUT_MAX_PERCENT of 23", () => {
			for (const [i, item] of mobileData.donut.entries()) {
				const src = donutData[i];
				expect(item.width).toBe(Math.round(src.percent * (100 / 23)));
				expect(item.value).toBe(`${src.percent}%`);
				expect(item.label).toBe(src.label);
			}
		});

		it("gives the max segment a width of 100", () => {
			const maxItem = mobileData.donut.find(
				(d) => d.label === "UK Dependencies",
			);
			expect(maxItem?.width).toBe(100);
		});
	});

	describe("treemap", () => {
		it("scales relative to the largest item", () => {
			const maxValue = treemapData[0].value;
			for (const [i, item] of mobileData.treemap.entries()) {
				const src = treemapData[i];
				expect(item.width).toBe(Math.round((src.value / maxValue) * 100));
				expect(item.value).toBe(src.displayValue);
			}
		});

		it("gives the largest item a width of 100", () => {
			expect(mobileData.treemap[0].width).toBe(100);
		});
	});

	describe("sankey", () => {
		it("has 4 hardcoded entries with expected widths", () => {
			expect(mobileData.sankey).toHaveLength(4);
			const widths = mobileData.sankey.map((s) => s.width);
			expect(widths).toEqual([100, 12, 4, 7]);
		});

		it("preserves display values from source data", () => {
			expect(mobileData.sankey[0].value).toBe("$10.8T");
			expect(mobileData.sankey[1].value).toBe("$443B");
			expect(mobileData.sankey[2].value).toBe("$89B");
			expect(mobileData.sankey[3].value).toBe("$200B");
		});
	});
});

describe("data integrity", () => {
	it("donut percentages sum to 100", () => {
		const sum = donutData.reduce((acc, seg) => acc + seg.percent, 0);
		expect(sum).toBe(100);
	});

	it("gini values are between 0 and 1", () => {
		for (const item of giniDesktopData) {
			expect(item.value).toBeGreaterThan(0);
			expect(item.value).toBeLessThanOrEqual(1);
		}
	});

	it("labor points have labor + capital = 100", () => {
		for (const point of laborSeriesData) {
			expect(point.labor + point.capital).toBe(100);
		}
	});

	it("emissions percentages sum to 100", () => {
		const sum = emissionsData.reduce((acc, d) => acc + d.width, 0);
		expect(sum).toBe(100);
	});

	it("wealth distribution widths sum to 100", () => {
		const sum = wealthDistributionData.reduce((acc, d) => acc + d.width, 0);
		expect(sum).toBe(100);
	});

	it("all bar chart data arrays have non-negative widths", () => {
		const allBars: BarChartItem[][] = [
			wealthDistributionData,
			ceoPayData,
			taxRatesData,
			homeownershipData,
			debtServiceData,
			emissionsData,
		];
		for (const dataset of allBars) {
			for (const item of dataset) {
				expect(item.width).toBeGreaterThanOrEqual(0);
			}
		}
	});

	it("history series has non-negative share values", () => {
		for (const point of historySeriesData) {
			expect(point.share).toBeGreaterThanOrEqual(0);
		}
	});

	it("sankey flows have valid directions", () => {
		for (const flow of sankeyFlows) {
			expect(["left", "right"]).toContain(flow.direction);
		}
	});

	it("all data arrays are non-empty", () => {
		expect(giniDesktopData.length).toBeGreaterThan(0);
		expect(laborSeriesData.length).toBeGreaterThan(0);
		expect(historySeriesData.length).toBeGreaterThan(0);
		expect(donutData.length).toBeGreaterThan(0);
		expect(treemapData.length).toBeGreaterThan(0);
		expect(sankeyFlows.length).toBeGreaterThan(0);
	});
});
