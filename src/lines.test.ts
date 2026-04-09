import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	clearObservers,
	getObservers,
	mockMatchMedia,
	triggerIntersection,
} from "./__mocks__/setup";
import { initLines } from "./scripts/lines";

const SVG_NS = "http://www.w3.org/2000/svg";

function buildLinesFixture() {
	document.body.textContent = "";

	const laborSvg = document.createElementNS(SVG_NS, "svg");
	laborSvg.id = "labor-svg";
	laborSvg.setAttribute("viewBox", "0 0 460 220");
	const laborLine = document.createElementNS(SVG_NS, "polyline");
	laborLine.id = "labor-line";
	laborLine.setAttribute("points", "50,100 430,150");
	const capitalLine = document.createElementNS(SVG_NS, "polyline");
	capitalLine.id = "capital-line";
	capitalLine.setAttribute("points", "50,150 430,100");
	laborSvg.appendChild(laborLine);
	laborSvg.appendChild(capitalLine);
	document.body.appendChild(laborSvg);

	const historySvg = document.createElementNS(SVG_NS, "svg");
	historySvg.id = "history-svg";
	historySvg.setAttribute("viewBox", "0 0 800 260");
	const histLine = document.createElementNS(SVG_NS, "polyline");
	histLine.id = "hist-line";
	histLine.setAttribute("points", "50,200 780,100");
	historySvg.appendChild(histLine);
	document.body.appendChild(historySvg);

	const sankeySvg = document.createElementNS(SVG_NS, "svg");
	sankeySvg.id = "sankey-svg";
	sankeySvg.setAttribute("viewBox", "0 0 600 280");
	for (const id of [
		"sankey-unequal-exchange",
		"sankey-debt-service",
		"sankey-illicit-flows",
		"sankey-aid",
	]) {
		const path = document.createElementNS(SVG_NS, "path");
		path.id = id;
		path.setAttribute("d", "M 80,60 C 250,60 350,40 520,40");
		sankeySvg.appendChild(path);
	}
	document.body.appendChild(sankeySvg);
}

describe("initLines", () => {
	beforeEach(() => {
		mockMatchMedia(false);
		clearObservers();
		buildLinesFixture();
		for (const el of document.querySelectorAll("polyline, path")) {
			Object.defineProperty(el, "getTotalLength", {
				configurable: true,
				value: vi.fn(() => 500),
			});
		}
	});

	it("sets strokeDasharray and strokeDashoffset on all polylines and sankey paths", () => {
		initLines();
		for (const id of [
			"labor-line",
			"capital-line",
			"hist-line",
			"sankey-unequal-exchange",
			"sankey-debt-service",
			"sankey-illicit-flows",
			"sankey-aid",
		]) {
			const el = document.getElementById(id) as unknown as SVGElement;
			expect(el.style.strokeDasharray).toBe("500");
			expect(el.style.strokeDashoffset).toBe("500");
		}
	});

	it("registers #labor-svg, #history-svg, and #sankey-svg with the IntersectionObserver", () => {
		initLines();
		const targets = getObservers().flatMap((obs) => obs.targets);
		expect(targets).toContain(document.getElementById("labor-svg"));
		expect(targets).toContain(document.getElementById("history-svg"));
		expect(targets).toContain(document.getElementById("sankey-svg"));
	});

	it("sets strokeDashoffset to 0 on labor polylines when observer fires on #labor-svg", () => {
		initLines();
		const laborSvg = document.getElementById("labor-svg") as Element;
		const obs = getObservers().find((o) => o.targets.includes(laborSvg));
		triggerIntersection(obs as NonNullable<typeof obs>, laborSvg);
		expect(
			(document.getElementById("labor-line") as unknown as SVGElement).style
				.strokeDashoffset,
		).toBe("0");
		expect(
			(document.getElementById("capital-line") as unknown as SVGElement).style
				.strokeDashoffset,
		).toBe("0");
	});

	it("sets strokeDashoffset to 0 on #hist-line when observer fires on #history-svg", () => {
		initLines();
		const historySvg = document.getElementById("history-svg") as Element;
		const obs = getObservers().find((o) => o.targets.includes(historySvg));
		triggerIntersection(obs as NonNullable<typeof obs>, historySvg);
		expect(
			(document.getElementById("hist-line") as unknown as SVGElement).style
				.strokeDashoffset,
		).toBe("0");
	});

	it("sets strokeDashoffset to 0 on sankey paths when observer fires on #sankey-svg", () => {
		initLines();
		const sankeySvg = document.getElementById("sankey-svg") as Element;
		const obs = getObservers().find((o) => o.targets.includes(sankeySvg));
		triggerIntersection(obs as NonNullable<typeof obs>, sankeySvg);
		for (const id of [
			"sankey-unequal-exchange",
			"sankey-debt-service",
			"sankey-illicit-flows",
			"sankey-aid",
		]) {
			expect(
				(document.getElementById(id) as unknown as SVGElement).style
					.strokeDashoffset,
			).toBe("0");
		}
	});

	it("unobserves the SVG after the animation fires", () => {
		initLines();
		const laborSvg = document.getElementById("labor-svg") as Element;
		const obs = getObservers().find((o) => o.targets.includes(laborSvg));
		triggerIntersection(obs as NonNullable<typeof obs>, laborSvg);
		expect(obs?.targets).not.toContain(laborSvg);
	});

	it("does nothing when prefers-reduced-motion is set", () => {
		mockMatchMedia(true);
		initLines();
		const line = document.getElementById("labor-line") as unknown as SVGElement;
		expect(line.style.strokeDasharray).toBe("");
		expect(getObservers()).toHaveLength(0);
	});
});
