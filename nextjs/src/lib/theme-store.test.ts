import { describe, it, expect } from "vitest";

import { bundledSelection } from "./presets";
import { downloadThemeCss } from "./theme-store";

// `document` + `URL` are only used by downloadThemeCss.
Object.defineProperty(globalThis, "document", {
	value: {
		createElement: () => ({}),
		body: { appendChild: () => undefined },
	},
	configurable: true,
	writable: true,
});
Object.defineProperty(globalThis, "URL", {
	value: class URL {
		static createObjectURL(_b: unknown): string {
			return "blob:test";
		}
		static revokeObjectURL(_u: string): void {
			/* no-op */
		}
	},
	configurable: true,
	writable: true,
});

describe("theme-store", () => {
	it("downloadThemeCss emits a standalone @import + :root block", () => {
		const css = downloadThemeCss(bundledSelection("nomad"));
		expect(css).toContain('@import "tailwindcss"');
		expect(css).toContain(":root {");
		expect(css).toContain("--nf-hue:");
	});
});
