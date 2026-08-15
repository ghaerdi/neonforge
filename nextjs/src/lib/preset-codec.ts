/**
 * preset-codec.ts — compact obfuscated preset codec.
 *
 * Packs the full 8-axis selection (defaults filled in) into a short opaque
 * code, encodes it in a fixed scrambled base-62 alphabet and appends a
 * checksum so a garbled/edited code is rejected cleanly on import.
 *
 * The "encryption" here is a substitution cipher over the packed payload —
 * enough to hide the axis names/values at a glance and keep the share token
 * tiny, not a security boundary. Nothing sensitive is inside (only theme
 * choices).
 */
import { Err, Ok, type Result } from "@ghaerdi/rustify";
import { AXES, DEFAULTS, OPTIONS, resolvedSelection, type PresetSelection } from "./presets";

/** Why a preset code failed to parse — explicit, discriminated failure. */
export type PresetParseError =
	| { kind: "not-preset" }
	| { kind: "too-short" }
	| { kind: "checksum-mismatch" }
	| { kind: "invalid-character" }
	| { kind: "decode-failed" };

/* Radix positions, one per axis, in AXES order. */
const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

/* Fixed scrambled alphabet (deterministic substitution for obfuscation). */
const SCRAMBLE =
	"7k0cLOf326NvZ81owlmgnsyYbpGXJF5qIQuxdKetj4APzSarTVhRHUM9CDWBiE";
const MAGIC = "N"; // version / format marker
const CSUM_LEN = 1;

function digit(char: string): number {
	return SCRAMBLE.indexOf(char);
}

/** Pack axis value indexes into a single BigInt via mixed radix (AXES order). */
function pack(sel: PresetSelection): bigint {
	const r = resolvedSelection(sel);
	let n = 0n;
	for (const a of AXES) {
		const opts = OPTIONS[a.id];
		const idx = opts.findIndex((o) => o.value === r[a.id]);
		n = n * BigInt(opts.length) + BigInt(idx < 0 ? 0 : idx);
	}
	return n;
}

function unpack(n: bigint): PresetSelection {
	const out: PresetSelection = {};
	// iterate AXES in reverse, extracting least-significant digit
	for (let i = AXES.length - 1; i >= 0; i--) {
		const a = AXES[i];
		const opts = OPTIONS[a.id];
		const idx = Number(n % BigInt(opts.length));
		out[a.id] = opts[idx]?.value ?? DEFAULTS[a.id];
		n /= BigInt(opts.length);
	}
	return out;
}

function toBase62(n: bigint): string {
	if (n === 0n) return "0";
	let s = "";
	while (n > 0n) {
		s = BASE62[Number(n % 62n)] + s;
		n /= 62n;
	}
	return s;
}

function fromBase62(s: string): bigint {
	let n = 0n;
	for (const c of s) {
		n = n * 62n + BigInt(BASE62.indexOf(c));
	}
	return n;
}

/** Scramble a standard-base62 string through the substitution alphabet. */
function cipher(s: string): string {
	return s
		.split("")
		.map((c) => SCRAMBLE[BASE62.indexOf(c)])
		.join("");
}

function decipher(s: string): string {
	return s
		.split("")
		.map((c) => BASE62[digit(c)])
		.join("");
}

function checksum(s: string): string {
	const sum = s.split("").reduce((acc, c) => acc + BASE62.indexOf(c), 0);
	return BASE62[sum % 62];
}

/**
 * Encode a selection into a short encrypted code, e.g. `N3xvKQ2a`.
 * Defaults are filled in, so any full selection encodes deterministically.
 */
export function encodePreset(sel: PresetSelection): string {
	const body = cipher(toBase62(pack(sel)));
	return MAGIC + body + checksum(body);
}

/**
 * Decode an encrypted code back into a selection. Returns `Ok` on success or
 * an explicit `Err{ kind }` describing why the malformed code was rejected
 * (wrong format, too short, bad checksum, invalid alphabet char, or a decode
 * failure).
 */
export function decodePreset(code: string): Result<PresetSelection, PresetParseError> {
	const clean = code.trim();
	if (!clean.startsWith(MAGIC)) return Err({ kind: "not-preset" });
	const body = clean.slice(1);
	if (body.length < CSUM_LEN + 1) return Err({ kind: "too-short" });
	const payload = body.slice(0, body.length - CSUM_LEN);
	const csum = body.slice(body.length - CSUM_LEN);
	if (checksum(payload) !== csum) return Err({ kind: "checksum-mismatch" });
	// validate every char is in the alphabet
	for (const c of payload) if (SCRAMBLE.indexOf(c) < 0) return Err({ kind: "invalid-character" });
	try {
		return Ok(unpack(fromBase62(decipher(payload))));
	} catch {
		return Err({ kind: "decode-failed" });
	}
}

/**
 * Pull a preset code out of a raw import string — accepts a bare code or a
 * full share URL whose query holds `?preset=<code>`. Returns `Ok(code)` or an
 * explicit `Err{ kind: "not-preset" }` when nothing usable is present.
 */
export function codeFromImport(raw: string): Result<string, PresetParseError> {
	const t = raw.trim();
	if (!t) return Err({ kind: "not-preset" });
	if (t.includes("?")) {
		const match = t.match(/[?&]preset=([^&]+)/);
		return match && match[1] ? Ok(match[1]) : Err({ kind: "not-preset" });
	}
	return Ok(t);
}
