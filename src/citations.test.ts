import { beforeEach, describe, expect, it, vi } from "vitest";
import { initCitations } from "./citations";

function buildFixture(): void {
	document.body.textContent = "";

	const btn1 = document.createElement("button");
	btn1.className = "cite-ref";
	btn1.setAttribute("aria-expanded", "false");
	btn1.setAttribute("aria-label", "View source: Test");
	btn1.dataset.source = "Test Source, 2024";
	btn1.dataset.url = "https://example.com";
	btn1.textContent = "*";
	document.body.appendChild(btn1);

	const btn2 = document.createElement("button");
	btn2.className = "cite-ref";
	btn2.setAttribute("aria-expanded", "false");
	btn2.setAttribute("aria-label", "View source: Other");
	btn2.dataset.source = "Other Source, 2023";
	btn2.dataset.url = "https://other.com";
	btn2.textContent = "*";
	document.body.appendChild(btn2);

	const popover = document.createElement("div");
	popover.id = "cite-popover";
	popover.setAttribute("hidden", "");
	popover.setAttribute("role", "tooltip");

	const sourceSpan = document.createElement("span");
	sourceSpan.className = "cite-source";
	popover.appendChild(sourceSpan);

	const link = document.createElement("a");
	link.className = "cite-link";
	link.setAttribute("target", "_blank");
	link.setAttribute("rel", "noopener noreferrer");
	link.textContent = "View source \u2197";
	popover.appendChild(link);

	document.body.appendChild(popover);
}

describe("initCitations", () => {
	beforeEach(() => {
		vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
			cb(0);
			return 0;
		});
		buildFixture();
		initCitations();
	});

	it("does not throw when #cite-popover is absent", () => {
		document.body.textContent = "";
		const btn = document.createElement("button");
		btn.className = "cite-ref";
		btn.dataset.source = "S";
		btn.dataset.url = "u";
		document.body.appendChild(btn);
		expect(() => initCitations()).not.toThrow();
	});

	it("removes hidden and adds is-visible on button click", () => {
		const btn = document.querySelectorAll<HTMLButtonElement>(".cite-ref")[0];
		btn.click();
		const popover = document.getElementById("cite-popover")!;
		expect(popover.hasAttribute("hidden")).toBe(false);
		expect(popover.classList.contains("is-visible")).toBe(true);
	});

	it("populates cite-source text and cite-link href on click", () => {
		const btn = document.querySelectorAll<HTMLButtonElement>(".cite-ref")[0];
		btn.click();
		const popover = document.getElementById("cite-popover")!;
		expect(popover.querySelector(".cite-source")?.textContent).toBe(
			"Test Source, 2024",
		);
		expect(popover.querySelector<HTMLAnchorElement>(".cite-link")?.href).toBe(
			"https://example.com/",
		);
	});

	it("sets aria-expanded to true on the clicked button", () => {
		const btn = document.querySelectorAll<HTMLButtonElement>(".cite-ref")[0];
		btn.click();
		expect(btn.getAttribute("aria-expanded")).toBe("true");
	});

	it("hides popover on second click of same button (toggle)", () => {
		const btn = document.querySelectorAll<HTMLButtonElement>(".cite-ref")[0];
		btn.click();
		btn.click();
		const popover = document.getElementById("cite-popover")!;
		expect(popover.hasAttribute("hidden")).toBe(true);
		expect(popover.classList.contains("is-visible")).toBe(false);
		expect(btn.getAttribute("aria-expanded")).toBe("false");
	});

	it("hides popover on Escape key", () => {
		const btn = document.querySelectorAll<HTMLButtonElement>(".cite-ref")[0];
		btn.click();
		document.dispatchEvent(
			new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
		);
		const popover = document.getElementById("cite-popover")!;
		expect(popover.hasAttribute("hidden")).toBe(true);
	});

	it("hides popover on document click outside a button", () => {
		const btn = document.querySelectorAll<HTMLButtonElement>(".cite-ref")[0];
		btn.click();
		document.dispatchEvent(new MouseEvent("click", { bubbles: true }));
		const popover = document.getElementById("cite-popover")!;
		expect(popover.hasAttribute("hidden")).toBe(true);
	});

	it("switches to new source when a different button is clicked", () => {
		const [btn1, btn2] =
			document.querySelectorAll<HTMLButtonElement>(".cite-ref");
		btn1.click();
		btn2.click();
		expect(btn1.getAttribute("aria-expanded")).toBe("false");
		expect(btn2.getAttribute("aria-expanded")).toBe("true");
		const popover = document.getElementById("cite-popover")!;
		expect(popover.querySelector(".cite-source")?.textContent).toBe(
			"Other Source, 2023",
		);
	});
});
