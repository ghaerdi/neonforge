import { describe, it, expect } from "vitest";

import { decodePreset, encodePreset, codeFromImport } from "./preset-codec";
import { bundledSelection } from "./presets";
import type { PresetSelection } from "./presets";

/** Extract Ok, or fail the test on an unexpected Err — no unwrap(). */
function okValue<T>(result: {
	match: (m: { Ok: (v: T) => T; Err: (e: unknown) => T }) => T;
}): T {
	return result.match({
		Ok: (v) => v,
		Err: (e) => {
			throw new Error(`unexpected Err: ${JSON.stringify(e)}`);
		},
	});
}

/** Extract the Err kind, or fail the test on an unexpected Ok — no unwrapErr(). */
function errKind<T extends { kind: string }>(result: {
	match: (m: { Ok: (v: unknown) => T; Err: (e: T) => T }) => T;
}): T {
	return result.match({
		Ok: (v) => {
			throw new Error(`unexpected Ok: ${JSON.stringify(v)}`);
		},
		Err: (e) => e,
	});
}

describe("preset-codec", () => {
	it("round-trips every genre bundle (encode → decode returns identical axes)", () => {
		for (const mode of ["streetkid", "nomad", "corpo"] as const) {
			const selection = bundledSelection(mode);
			const code = encodePreset(selection);
			const decoded = decodePreset(code);
			expect(decoded.isOk()).toBe(true);
			expect(okValue(decoded)).toEqual(selection);
		}
	});

	it("round-trips an arbitrary custom selection", () => {
		const selection: PresetSelection = {
			style: "corpo",
			semantic: "cyber",
			base: "steel",
			accent: "acid",
			chart: "reactor",
			fontBody: "space-grotesk",
			fontHeading: "orbitron",
			shape: "round",
		};
		const code = encodePreset(selection);
		expect(okValue(decodePreset(code))).toEqual(selection);
	});

	it("rejects a tampered code (checksum mismatch)", () => {
		const code = encodePreset(bundledSelection("nomad"));
		// Flip the last payload char — the checksum should fail.
		const tampered = code[0] + (code[1] === "A" ? "B" : "A") + code.slice(2);
		expect(errKind(decodePreset(tampered)).kind).toBe("checksum-mismatch");
	});

	it("rejects malformed input with the right failure kind", () => {
		expect(errKind(decodePreset("")).kind).toBe("not-preset");
		expect(errKind(decodePreset("x")).kind).toBe("not-preset");
		expect(errKind(decodePreset("N")).kind).toBe("too-short");
		expect(errKind(decodePreset("N!@#$")).kind).toBe("checksum-mismatch");
	});

	it("codeFromImport parses a bare code or a share URL", () => {
		expect(okValue(codeFromImport("N3xvKQ2a"))).toBe("N3xvKQ2a");
		expect(okValue(codeFromImport("  N58uH  "))).toBe("N58uH");
		expect(okValue(codeFromImport("https://x.example/?preset=N3xvKQ2a"))).toBe(
			"N3xvKQ2a",
		);
		expect(okValue(codeFromImport("no code here"))).toBe("no code here");
		expect(codeFromImport("   ").isErr()).toBe(true);
		expect(codeFromImport("?foo=1").isErr()).toBe(true);
	});
});
