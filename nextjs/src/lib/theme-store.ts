/**
 * theme-store.ts — theme export helpers.
 *
 * Theme application is strictly URL-driven: a `?preset=<code>` query on any
 * page applies that preset; no code means the streetkid default. Nothing is
 * persisted in the browser. This module produces the token <override> block
 * for a selection so a user can theme a project by hand.
 */
import { selectionToCss, type PresetSelection } from "./presets";

/**
 * Build + download a CSS token block for the given selection.
 *
 * This is an <override>, not a full theme: it only redeclares custom
 * properties. To use it in a project, APPEND the block to an already-working
 * neonforge theme.css (the one that carries @theme inline, @utility and
 * @layer base). Replacing the theme file with just this block strips the
 * utility classes and leaves components unstyled.
 */
/** Trigger a browser download of the CSS file. Failures are ignorable by design. */
function saveCssFile(content: string): void {
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
}

export function downloadThemeCss(sel: PresetSelection): string {
	const css = selectionToCss(sel);
	const content = `/* neonforge preset token override — generated from the Create page. */
/* NOT a standalone theme: it only retunes custom properties. */
/*
 * To apply it:
 *   keep your full neonforge theme.css (the file with @theme inline,
 *   @utility, @layer base rules) and APPEND this block at the end so the
 *   overrides win. Do NOT replace theme.css with just this block — the
 *   glass-panel / neon-glow / text-glow / grid-bg utilities would vanish.
 */
${css}
`;
	saveCssFile(content);
	return content;
}
