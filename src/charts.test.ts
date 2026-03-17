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
});
