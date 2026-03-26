import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	clearObservers,
	getObservers,
	mockMatchMedia,
	triggerIntersection,
} from "./__mocks__/setup";
import { initCharts } from "./charts";

const CHART_IDS = [
	"wealth-distribution-chart",
	"gini-desktop-chart",
	"gini-mobile-chart",
	"labor-desktop-chart",
	"labor-mobile-chart",
	"ceo-pay-chart",
	"emissions-chart",
	"history-desktop-chart",
	"history-mobile-chart",
	"tax-rates-chart",
	"tax-donut-desktop-chart",
	"tax-donut-mobile-chart",
	"homeownership-chart",
	"asset-treemap-desktop-chart",
	"asset-treemap-mobile-chart",
	"debt-service-chart",
	"flows-sankey-desktop-chart",
	"flows-sankey-mobile-chart",
];

function buildChartFixture() {
	document.body.textContent = "";
	for (const id of CHART_IDS) {
		const div = document.createElement("div");
		div.id = id;
		div.className = "chart-box";
		document.body.appendChild(div);
	}
}

describe("initCharts – rendering", () => {
	beforeEach(() => {
		mockMatchMedia(false);
		clearObservers();
		buildChartFixture();
		initCharts();
	});

	it("renders .bar-fill elements with data-width into #wealth-distribution-chart", () => {
		const fills = document.querySelectorAll<HTMLElement>(
			"#wealth-distribution-chart .bar-fill",
		);
		expect(fills.length).toBeGreaterThan(0);
		expect(fills[0].dataset.width).toBeDefined();
	});

	it("renders #gini-svg into #gini-desktop-chart", () => {
		expect(document.getElementById("gini-svg")).not.toBeNull();
	});

	it("renders #labor-line and #capital-line into #labor-desktop-chart", () => {
		expect(document.getElementById("labor-line")).not.toBeNull();
		expect(document.getElementById("capital-line")).not.toBeNull();
	});

	it("renders #hist-line into #history-desktop-chart", () => {
		expect(document.getElementById("hist-line")).not.toBeNull();
	});

	it("renders .bar-fill elements into each mobile chart container", () => {
		for (const id of [
			"gini-mobile-chart",
			"labor-mobile-chart",
			"history-mobile-chart",
		]) {
			const fills = document.querySelectorAll(`#${id} .bar-fill`);
			expect(fills.length).toBeGreaterThan(0);
		}
	});

	it("renders .bar-val-outside for narrow bars in #ceo-pay-chart", () => {
		expect(
			document.querySelector("#ceo-pay-chart .bar-val-outside"),
		).not.toBeNull();
	});

	it("renders .bar-fill elements into #tax-rates-chart", () => {
		const fills = document.querySelectorAll("#tax-rates-chart .bar-fill");
		expect(fills.length).toBeGreaterThan(0);
	});

	it("renders #tax-donut-svg into #tax-donut-desktop-chart", () => {
		expect(document.getElementById("tax-donut-svg")).not.toBeNull();
	});

	it("renders .donut-segment elements inside #tax-donut-svg", () => {
		const segments = document.querySelectorAll("#tax-donut-svg .donut-segment");
		expect(segments.length).toBe(6);
	});

	it("renders .bar-fill elements into #homeownership-chart", () => {
		const fills = document.querySelectorAll("#homeownership-chart .bar-fill");
		expect(fills.length).toBeGreaterThan(0);
	});

	it("renders #treemap-svg into #asset-treemap-desktop-chart", () => {
		expect(document.getElementById("treemap-svg")).not.toBeNull();
	});

	it("renders .treemap-rect elements inside #treemap-svg", () => {
		const rects = document.querySelectorAll("#treemap-svg .treemap-rect");
		expect(rects.length).toBe(4);
	});

	it("renders #sankey-svg into #flows-sankey-desktop-chart", () => {
		expect(document.getElementById("sankey-svg")).not.toBeNull();
	});

	it("renders .sankey-path elements inside #sankey-svg", () => {
		const paths = document.querySelectorAll("#sankey-svg .sankey-path");
		expect(paths.length).toBe(4);
	});

	it("renders .bar-fill elements into #debt-service-chart", () => {
		const fills = document.querySelectorAll("#debt-service-chart .bar-fill");
		expect(fills.length).toBeGreaterThan(0);
	});

	it("renders .bar-fill elements into each new mobile chart container", () => {
		for (const id of [
			"tax-donut-mobile-chart",
			"asset-treemap-mobile-chart",
			"flows-sankey-mobile-chart",
		]) {
			const fills = document.querySelectorAll(`#${id} .bar-fill`);
			expect(fills.length).toBeGreaterThan(0);
		}
	});
});

describe("initCharts – bar animation", () => {
	beforeEach(() => {
		mockMatchMedia(false);
		clearObservers();
		buildChartFixture();
		vi.useFakeTimers();
		initCharts();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it(".gini-bar elements start with scaleY(0)", () => {
		const bars = document.querySelectorAll<HTMLElement>(".gini-bar");
		expect(bars.length).toBeGreaterThan(0);
		for (const bar of bars) {
			expect(bar.style.transform).toBe("scaleY(0)");
		}
	});

	it(".bar-fill width is unset before the barObserver fires", () => {
		const fill = document.querySelector<HTMLElement>(
			"#wealth-distribution-chart .bar-fill",
		) as HTMLElement;
		expect(fill.style.width).toBe("");
	});

	it("sets .bar-fill width when barObserver fires on a .chart-box", () => {
		const box = document.getElementById(
			"wealth-distribution-chart",
		) as HTMLElement;
		const barObserver = getObservers().find((obs) => obs.targets.includes(box));
		expect(barObserver).toBeDefined();
		triggerIntersection(barObserver as NonNullable<typeof barObserver>, box);
		const fill = document.querySelector<HTMLElement>(
			"#wealth-distribution-chart .bar-fill",
		) as HTMLElement;
		expect(fill.style.width).toMatch(/^\d+(\.\d+)?%$/);
	});

	it(".treemap-rect elements start with scaleY(0)", () => {
		const rects = document.querySelectorAll<HTMLElement>(".treemap-rect");
		expect(rects.length).toBeGreaterThan(0);
		for (const rect of rects) {
			expect(rect.style.transform).toBe("scaleY(0)");
		}
	});

	it("sets .treemap-rect to scaleY(1) after treemapObserver fires and stagger completes", () => {
		const treemapSvg = document.getElementById("treemap-svg") as Element;
		const treemapObserver = getObservers().find((obs) =>
			obs.targets.includes(treemapSvg),
		);
		expect(treemapObserver).toBeDefined();
		triggerIntersection(
			treemapObserver as NonNullable<typeof treemapObserver>,
			treemapSvg,
		);
		vi.advanceTimersByTime(4 * 150);
		const rects = document.querySelectorAll<HTMLElement>(".treemap-rect");
		for (const rect of rects) {
			expect(rect.style.transform).toBe("scaleY(1)");
		}
	});

	it("sets .donut-segment dasharray to 0 initially", () => {
		const segments =
			document.querySelectorAll<SVGCircleElement>(".donut-segment");
		expect(segments.length).toBeGreaterThan(0);
		for (const seg of segments) {
			expect(seg.style.strokeDasharray).toContain("0");
		}
	});

	it("restores .donut-segment dasharray when donutObserver fires", () => {
		const donutSvg = document.getElementById("tax-donut-svg") as Element;
		const donutObserver = getObservers().find((obs) =>
			obs.targets.includes(donutSvg),
		);
		expect(donutObserver).toBeDefined();
		triggerIntersection(
			donutObserver as NonNullable<typeof donutObserver>,
			donutSvg,
		);
		const segments =
			document.querySelectorAll<SVGCircleElement>(".donut-segment");
		for (const seg of segments) {
			expect(seg.style.strokeDasharray).not.toBe(`0 ${2 * Math.PI * 100}`);
		}
	});

	it("sets .gini-bar to scaleY(1) after giniObserver fires and stagger completes", () => {
		const giniSvg = document.getElementById("gini-svg") as Element;
		const giniObserver = getObservers().find((obs) =>
			obs.targets.includes(giniSvg),
		);
		expect(giniObserver).toBeDefined();
		triggerIntersection(
			giniObserver as NonNullable<typeof giniObserver>,
			giniSvg,
		);
		vi.advanceTimersByTime(7 * 120);
		const bars = document.querySelectorAll<HTMLElement>(".gini-bar");
		for (const bar of bars) {
			expect(bar.style.transform).toBe("scaleY(1)");
		}
	});
});

describe("initCharts – prefers-reduced-motion", () => {
	beforeEach(() => {
		mockMatchMedia(true);
		clearObservers();
		buildChartFixture();
		initCharts();
	});

	it("sets .bar-fill width immediately without waiting for an observer", () => {
		const fill = document.querySelector<HTMLElement>(
			"#wealth-distribution-chart .bar-fill",
		) as HTMLElement;
		expect(fill.style.width).toMatch(/^\d+(\.\d+)?%$/);
	});

	it("sets .gini-bar to scaleY(1) immediately without waiting for an observer", () => {
		const bars = document.querySelectorAll<HTMLElement>(".gini-bar");
		expect(bars.length).toBeGreaterThan(0);
		for (const bar of bars) {
			expect(bar.style.transform).toBe("scaleY(1)");
		}
	});

	it("sets .treemap-rect to scaleY(1) immediately without waiting for an observer", () => {
		const rects = document.querySelectorAll<HTMLElement>(".treemap-rect");
		expect(rects.length).toBeGreaterThan(0);
		for (const rect of rects) {
			expect(rect.style.transform).toBe("scaleY(1)");
		}
	});
});
