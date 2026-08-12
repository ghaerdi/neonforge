#!/usr/bin/env node
/**
 * neonforge registry build
 *
 * 1. Parses styles/theme.css (single source of truth) into the
 *    registry:style item payload: cssVars.theme (the @theme inline block)
 *    + css (the @layer base / @utility / @keyframes rules as nested JSON).
 * 2. Writes styles/registry.json.
 * 3. Runs `shadcn build` to emit flattened payloads to public/r/.
 * 4. With --local, rewrites ghaerdi/neonforge/* registryDependencies to
 *    relative ./ forms so the served output works without a GitHub push.
 *
 * Usage:
 *   bun run scripts/build-registry.mjs [--local]
 */

import {
	readFileSync,
	writeFileSync,
	mkdirSync,
	rmSync,
	readdirSync,
	statSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const THEME = join(ROOT, "styles", "theme.css");
const LOCAL = process.argv.includes("--local");
const baseArg = process.argv.find((a) => a.startsWith("--base-url="));
const BASE_URL = baseArg ? baseArg.split("=")[1] : null;

/* ── tiny CSS → nested-JSON parser ─────────────────────────────────────────── */

/**
 * Tokenize CSS source. Each token carries `wsBefore` (true when whitespace
 * preceded it in the source) so selectors/at-rule headers can be rebuilt
 * byte-exact: adjacent tokens glue without a space, whitespace-separated
 * tokens join with a single space.
 */
function tokenize(src) {
	const tokens = [];
	let i = 0;
	let wsBefore = true;
	while (i < src.length) {
		const ch = src[i];
		if (ch === "/" && src[i + 1] === "*") {
			const end = src.indexOf("*/", i + 2);
			i = end === -1 ? src.length : end + 2;
			continue;
		}
		if (ch === '"' || ch === "'") {
			const quote = ch;
			let j = i + 1;
			while (j < src.length && src[j] !== quote) j++;
			tokens.push({ type: "string", value: src.slice(i, j + 1), wsBefore });
			i = j + 1;
			wsBefore = false;
			continue;
		}
		if (ch === "{") {
			tokens.push({ type: "{", value: "{", wsBefore });
			i++;
			wsBefore = false;
			continue;
		}
		if (ch === "}") {
			tokens.push({ type: "}", value: "}", wsBefore });
			i++;
			wsBefore = false;
			continue;
		}
		if (ch === ";" && !(src[i - 1] === "\\")) {
			tokens.push({ type: ";", value: ";", wsBefore });
			i++;
			wsBefore = false;
			continue;
		}
		if (ch === ":") {
			tokens.push({ type: ":", value: ":", wsBefore });
			i++;
			wsBefore = false;
			continue;
		}
		if (/\s/.test(ch)) {
			i++;
			wsBefore = true;
			continue;
		}
		let j = i;
		while (j < src.length && !/[{};:]/.test(src[j]) && !/\s/.test(src[j])) {
			j++;
		}
		tokens.push({ type: "word", value: src.slice(i, j), wsBefore });
		i = j;
		wsBefore = false;
	}
	return tokens;
}

/**
 * Parse a `{ ... }` block starting at tokens[index] ("{").
 * Returns [node, nextIndex]. Declarations become string values; nested
 * blocks (selectors / at-rules / keyframe steps) become nested objects.
 */
function parseBlock(tokens, index) {
	// tokens[index] must be "{"
	const node = {};
	const flat = {};
	let pending = [];
	let i = index + 1;

	const flushDecl = () => {
		if (!pending.length) return;
		let seg = [];
		for (const p of pending) {
			if (p === ";") {
				const { prop, value } = parseDecl(seg);
				if (prop) flat[prop] = value;
				seg = [];
			} else {
				seg.push(p);
			}
		}
		if (seg.length) {
			const { prop, value } = parseDecl(seg);
			if (prop) flat[prop] = value;
		}
		pending = [];
	};
	const mergeFlat = () => {
		for (const [k, v] of Object.entries(flat)) node[k] = v;
		Object.keys(flat).forEach((k) => delete flat[k]);
	};

	while (i < tokens.length) {
		const t = tokens[i];
		if (t.type === "{") {
			const [header, n] = buildHeader(tokens, i);
			pending.length = Math.max(0, pending.length - n);
			const [child, next] = parseBlock(tokens, i);
			flushDecl();
			mergeFlat();
			// merge: same header appearing twice (e.g. two @layer base blocks)
			node[header] = mergeNodes(node[header], child);
			i = next;
			continue;
		}
		if (t.type === "}") {
			flushDecl();
			mergeFlat();
			return [node, i + 1];
		}
		pending.push(t.value);
		i++;
	}
	throw new Error("unbalanced braces");
}
/** Rebuild a selector/at-rule header from the tokens before the opening brace.
 * Returns [header, consumed] — consumed = number of tokens walked back. */
function buildHeader(tokens, openIndex) {
	const parts = [];
	let i = openIndex - 1;
	while (i >= 0) {
		const t = tokens[i];
		if (t.type === "{" || t.type === "}") break;
		parts.unshift(t);
		i--;
	}
	let out = "";
	for (const t of parts) {
		if (!out || t.wsBefore) out += t.wsBefore && out ? " " : "";
		out += t.value;
	}
	return [out.trim(), parts.length];
}

/** Parse one declaration segment [prop, ":", value..., ";"]. */
function parseDecl(parts) {
	const prop = parts[0];
	let value = "";
	let i = 1;
	while (i < parts.length && parts[i] !== ";") {
		if (parts[i] === ":") {
			i++;
			continue;
		}
		value += (value ? " " : "") + parts[i];
		i++;
	}
	return { prop, value: value.trim() };
}

function mergeNodes(a, b) {
	if (a && typeof a === "object" && b && typeof b === "object") {
		return { ...a, ...b };
	}
	return b;
}

/* ── extract @theme inline block as cssVars.theme ──────────────────────────── */

function extractThemeVars(css) {
	const tokens = tokenize(css);
	const vars = {};
	for (let i = 0; i < tokens.length; i++) {
		if (tokens[i].type === "word" && tokens[i].value === "@theme") {
			let j = i + 1;
			while (j < tokens.length && tokens[j].type !== "{") j++;
			if (tokens[j].type !== "{") continue;
			const [node, next] = parseBlock(tokens, j);
			for (const [k, v] of Object.entries(node)) {
				if (k.startsWith("--")) vars[k.slice(2)] = v;
			}
			i = next;
		}
	}
	return vars;
}

/* ── extract everything else as css (layers/utilities/keyframes) ───────────── */

function extractCssRules(css) {
	const tokens = tokenize(css);
	const rules = {};
	let i = 0;
	while (i < tokens.length) {
		if (tokens[i].type === "word" && tokens[i].value.startsWith("@")) {
			let j = i;
			while (j < tokens.length && tokens[j].type !== "{") j++;
			if (tokens[j].type !== "{") {
				i++;
				continue;
			}
			const [header] = buildHeader(tokens, j);
			if (header.startsWith("@theme")) {
				const [, next] = parseBlock(tokens, j);
				i = next;
				continue;
			}
			const [node, next] = parseBlock(tokens, j);
			rules[header] = mergeNodes(rules[header], node);
			i = next;
			continue;
		}
		i++;
	}
	return rules;
}

/* ── main ──────────────────────────────────────────────────────────────────── */

const css = readFileSync(THEME, "utf8");

const theme = extractThemeVars(css);
const cssRules = extractCssRules(css);

const styleItem = {
	name: "neonforge",
	type: "registry:style",
	title: "Neonforge",
	description:
		"Neonforge design system: cyberpunk · industrial · glass. Theme tokens, glass surfaces, neon glows, chamfered corners, scanlines and animations for Tailwind CSS v4.",
	extends: "none",
	cssVars: { theme },
	css: cssRules,
	files: [{ path: "theme.css", type: "registry:style" }],
};

writeFileSync(
	join(ROOT, "styles", "registry.json"),
	JSON.stringify(
		{
			$schema: "https://ui.shadcn.com/schema/registry.json",
			items: [styleItem],
		},
		null,
		2,
	) + "\n",
);

console.log("✓ styles/registry.json written");
console.log(`  cssVars.theme: ${Object.keys(theme).length} vars`);
console.log(`  css rules: ${Object.keys(cssRules).length} @rules`);

/* ── build flattened output with the shadcn CLI ────────────────────────────── */

rmSync(join(ROOT, "public", "r"), { recursive: true, force: true });
mkdirSync(join(ROOT, "public", "r"), { recursive: true });

console.log("\nRunning shadcn build…");
execSync("bunx shadcn@latest build", { cwd: ROOT, stdio: "inherit" });

if (LOCAL) {
	const outDir = join(ROOT, "public", "r");
	const files = [];
	const walk = (dir) => {
		for (const f of readdirSync(dir)) {
			const p = join(dir, f);
			if (statSync(p).isDirectory()) walk(p);
			else if (p.endsWith(".json")) files.push(p);
		}
	};
	walk(outDir);
	let rewrites = 0;
	const rewrite = (deps) =>
		deps.map((d) => {
			if (d.startsWith("ghaerdi/neonforge/")) {
				rewrites++;
				if (BASE_URL) return BASE_URL.replace(/\/+$/, "") + "/" + d.split("/").pop() + ".json";
				return "./" + d.split("/").pop() + ".json";
			}
			return d;
		});
	for (const f of files) {
		const data = JSON.parse(readFileSync(f, "utf8"));
		if (Array.isArray(data.registryDependencies)) {
			data.registryDependencies = rewrite(data.registryDependencies);
			writeFileSync(f, JSON.stringify(data, null, 2) + "\n");
		} else if (Array.isArray(data.items)) {
			// catalog payload (public/r/registry.json) nests deps per item
			let changed = false;
			for (const item of data.items) {
				if (Array.isArray(item.registryDependencies)) {
					const next = rewrite(item.registryDependencies);
					if (
						JSON.stringify(next) !== JSON.stringify(item.registryDependencies)
					) {
						item.registryDependencies = next;
						changed = true;
					}
				}
			}
			if (changed) writeFileSync(f, JSON.stringify(data, null, 2) + "\n");
		}
	}
	console.log(`✓ local rewrite: ${rewrites} dependencies → local URLs`);
}

console.log("✓ done — registry payloads in public/r/");
