import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
	site: "https://extraction.timothybrits.co.za",
	integrations: [sitemap()],
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: "Fraunces",
			cssVariable: "--font-display",
			fallbacks: ["Georgia", "Times New Roman"],
		},
		{
			provider: fontProviders.fontsource(),
			name: "Inter",
			cssVariable: "--font-body",
			fallbacks: ["Arial", "Helvetica Neue"],
		},
	],
	build: {
		format: "file",
	},
});
