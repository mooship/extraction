import "./style.css";
import { initAnimations } from "./animations";
import { initCharts } from "./charts";
import { initCounters } from "./counters";
import { initLines } from "./lines";

document.addEventListener("DOMContentLoaded", () => {
	initAnimations();
	initCharts();
	initLines();
});

window.addEventListener("load", () => {
	initCounters();
});
