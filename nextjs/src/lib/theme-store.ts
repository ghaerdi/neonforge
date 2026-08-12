/**
 * theme-store.ts — theme export helpers.
 *
 * Theme application is strictly URL-driven: a `?preset=<code>` query on any
 * page applies that preset; no code means the streetkid default. Nothing is
 * persisted in the browser. This module only builds a standalone theme file for
 * manual/CLI projects.
 */
import { selectionToCss, type PresetSelection } from "./presets";

/**
 * Build + download a standalone `theme.css` for the given selection so a user
 * can drop it straight into a manual or CLI project and have components render
 * with exactly their configured preset (no shadcn CLI required).
 */
export function downloadThemeCss(sel: PresetSelection): string {
	const css = selectionToCss(sel);
	const content = `/* neonforge preset theme — generated from the Create page. */
/* 1) ensure your global CSS imports Tailwind first, then this file. */
@import "tailwindcss";
@source "./node_modules/neonforge/ui";

${css}
`;
	try {
		const blob = new Blob([content], { type: "text/css" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "theme-neonforge.css";
		document.body.appendChild(a);
		a.click();
		a.remove();
		URL.revokeObjectURL(url);
	} catch {
		/* ignore download failures */
	}
	return content;
}
