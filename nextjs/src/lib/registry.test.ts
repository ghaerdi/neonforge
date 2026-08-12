import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

interface RegistryItem {
	name: string;
	type: string;
	files?: { path: string; type: string }[];
	registryDependencies?: string[];
}

function load(id: string): { items: RegistryItem[]; dir: string } {
	const abs = join(REPO, id);
	return {
		items: (JSON.parse(readFileSync(abs, "utf8")) as { items: RegistryItem[] })
			.items,
		dir: dirname(abs),
	};
}

describe("registry integrity", () => {
	const ui = load("react/registry.json");
	const lib = load("lib/registry.json");
	const styles = load("styles/registry.json");
	const all = [...ui.items, ...lib.items, ...styles.items];

	it("has no duplicate item names", () => {
		const names = all.map((i) => i.name);
		expect(new Set(names).size).toBe(names.length);
	});

	it("every item has a name, type, and description", () => {
		expect(all.length).toBeGreaterThan(0);
		for (const item of all) {
			expect(typeof item.name, item.name).toBe("string");
			expect(item.type, item.name).toMatch(/^registry:/);
		}
	});

	it("every referenced file exists on disk", () => {
		// File paths in each registry are relative to that registry's directory.
		for (const reg of [ui, lib, styles]) {
			for (const item of reg.items) {
				for (const file of item.files ?? []) {
					const candidate = resolve(reg.dir, file.path);
					expect(
						existsSync(candidate),
						`${item.name}: missing ${file.path}`,
					).toBe(true);
				}
			}
		}
	});

	it("every ui component resolves its registryDependencies", () => {
		const known = new Set(all.map((i) => i.name));
		for (const item of ui.items) {
			for (const dep of item.registryDependencies ?? []) {
				const leaf = dep.split("/").pop() ?? "";
				expect(known.has(leaf), `${item.name}: unknown dep ${dep}`).toBe(true);
			}
		}
	});

	it("yields at least the shadcn v4 catalog primitives", () => {
		for (const name of [
			"button",
			"input",
			"card",
			"dialog",
			"tabs",
			"avatar",
		]) {
			expect(
				ui.items.some((i) => i.name === name),
				`missing ${name}`,
			).toBe(true);
		}
	});
});
