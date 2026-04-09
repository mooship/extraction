const SHARE_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`;

function initShareButtons(): void {
	const sections = document.querySelectorAll<HTMLElement>(
		"#wealth, #tax, #labor, #imperialism, #ecology, #public",
	);

	for (const section of sections) {
		const btn = document.createElement("button");
		btn.className = "share-btn";
		btn.setAttribute("aria-label", "Share this section");
		btn.innerHTML = `${SHARE_SVG} <span role="status" aria-live="polite">Share</span>`;

		let resetTimer: ReturnType<typeof setTimeout> | undefined;

		btn.addEventListener("click", async () => {
			const url = `${window.location.origin}${window.location.pathname}#${section.id}`;
			const title =
				section.querySelector("h2")?.textContent?.trim() ?? "Extraction";

			if (navigator.share) {
				try {
					await navigator.share({ title: `Extraction — ${title}`, url });
					return;
				} catch {
					/* user cancelled or API failed, fall through to clipboard */
				}
			}

			const span = btn.querySelector("span");

			try {
				await navigator.clipboard.writeText(url);
				if (span) span.textContent = "Copied!";
			} catch {
				if (span) span.textContent = "Copy failed";
			}

			if (span) {
				clearTimeout(resetTimer);
				resetTimer = setTimeout(() => {
					span.textContent = "Share";
				}, 2000);
			}
		});

		section.appendChild(btn);
	}
}

document.addEventListener("DOMContentLoaded", initShareButtons);
