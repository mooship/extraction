import { beforeEach, describe, expect, it } from "vitest";
import {
	clearObservers,
	getObservers,
	type MockObserver,
	mockMatchMedia,
	triggerIntersection,
} from "./__mocks__/setup";
import { initChartAnimations } from "./scripts/chart-animations";

function buildBarFixture() {
	const box = document.createElement("div");
	box.className = "chart-box";
	const fill1 = document.createElement("div");
	fill1.className = "bar-fill";
	fill1.dataset.width = "75";
	const fill2 = document.createElement("div");
	fill2.className = "bar-fill";
	fill2.dataset.width = "40";
	box.appendChild(fill1);
	box.appendChild(fill2);
	document.body.appendChild(box);
	return { box, fill1, fill2 };
}

function buildSvgFixture(
	id: string,
	childClass: string,
	count: number,
): { svg: HTMLElement; children: SVGElement[] } {
	const svg = document.createElement("div");
	svg.id = id;
	const children: SVGElement[] = [];
	for (let i = 0; i < count; i++) {
		const el = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		el.classList.add(childClass);
		el.dataset.index = String(i);
		svg.appendChild(el);
		children.push(el);
	}
	document.body.appendChild(svg);
	return { svg, children };
}

function buildDonutFixture(): {
	svg: HTMLElement;
	segments: SVGElement[];
} {
	const svg = document.createElement("div");
	svg.id = "tax-donut-svg";
	const segments: SVGElement[] = [];
	for (let i = 0; i < 3; i++) {
		const seg = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"circle",
		);
		seg.classList.add("donut-segment");
		seg.dataset.dasharray = `${100 * (i + 1)} ${628.3185307179587 - 100 * (i + 1)}`;
		svg.appendChild(seg);
		segments.push(seg);
	}
	document.body.appendChild(svg);
	return { svg, segments };
}

function findObserver(target: Element): MockObserver {
	const observer = getObservers().find((o) => o.targets.includes(target));
	expect(observer).toBeDefined();
	return observer as MockObserver;
}

describe("initChartAnimations", () => {
	beforeEach(() => {
		document.body.textContent = "";
		document.documentElement.classList.remove("js-animate");
		mockMatchMedia(false);
		clearObservers();
	});

	it("does nothing when prefers-reduced-motion is set", () => {
		mockMatchMedia(true);
		buildBarFixture();
		initChartAnimations();
		expect(document.documentElement.classList.contains("js-animate")).toBe(
			false,
		);
		expect(getObservers()).toHaveLength(0);
	});

	it("adds js-animate class to documentElement", () => {
		initChartAnimations();
		expect(document.documentElement.classList.contains("js-animate")).toBe(
			true,
		);
	});

	it("sets bar fill widths on intersection and unobserves", () => {
		const { box, fill1, fill2 } = buildBarFixture();
		initChartAnimations();
		const barObserver = findObserver(box);
		triggerIntersection(barObserver, box, true);
		expect(fill1.style.width).toBe("75%");
		expect(fill2.style.width).toBe("40%");
		expect(barObserver.targets).not.toContain(box);
	});

	it("does not animate bars when not intersecting", () => {
		const { box, fill1 } = buildBarFixture();
		initChartAnimations();
		const barObserver = findObserver(box);
		triggerIntersection(barObserver, box, false);
		expect(fill1.style.width).toBe("");
	});

	it("staggers gini bars with 120ms delay per index", () => {
		const { svg, children } = buildSvgFixture("gini-svg", "gini-bar", 3);
		initChartAnimations();
		const observer = findObserver(svg);
		triggerIntersection(observer, svg, true);
		expect(children[0].style.transitionDelay).toBe("0ms");
		expect(children[1].style.transitionDelay).toBe("120ms");
		expect(children[2].style.transitionDelay).toBe("240ms");
		for (const child of children) {
			expect(child.style.transform).toBe("scaleY(1)");
		}
	});

	it("staggers treemap rects with 150ms delay per index", () => {
		const { svg, children } = buildSvgFixture("treemap-svg", "treemap-rect", 2);
		initChartAnimations();
		const observer = findObserver(svg);
		triggerIntersection(observer, svg, true);
		expect(children[0].style.transitionDelay).toBe("0ms");
		expect(children[1].style.transitionDelay).toBe("150ms");
	});

	it("initialises donut segments with zero-length dasharray", () => {
		const circumference = 2 * Math.PI * 100;
		buildDonutFixture();
		initChartAnimations();
		for (const seg of document.querySelectorAll<SVGElement>(".donut-segment")) {
			expect(seg.style.strokeDasharray).toBe(`0 ${circumference}`);
		}
	});

	it("sets donut dasharray from data attribute on intersection", () => {
		const { svg, segments } = buildDonutFixture();
		initChartAnimations();
		const observer = findObserver(svg);
		triggerIntersection(observer, svg, true);
		for (const seg of segments) {
			expect(seg.style.strokeDasharray).toBe(seg.dataset.dasharray);
		}
	});

	it("does not throw when SVG elements are absent", () => {
		expect(() => initChartAnimations()).not.toThrow();
	});
});
