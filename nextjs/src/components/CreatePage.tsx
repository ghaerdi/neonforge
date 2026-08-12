"use client";

import * as React from "react";

import { Separator } from "@/components/ui/separator";

import { CreateSidebar } from "@/components/docs/CreateSidebar";
import { Shell } from "@/components/docs/shell";

import { CreateShowcase } from "@/components/create/CreateShowcase";


import {
	applyTheme,
	AXES,
	bundledSelection,
	OPTIONS,
	STYLE_BUNDLES,
	DEFAULTS,
	type Axis,
	type PresetSelection,
	type StyleMode,
} from "../lib/presets";
import {
	codeFromImport,
	decodePreset,
	encodePreset,
} from "../lib/preset-codec";
import { Option, match, Result } from "@ghaerdi/rustify";

export function CreatePage() {
	// Default theme is streetkid; a ?preset= code overrides it.
	const [selection, setSelection] = React.useState<PresetSelection>(
		() => bundledSelection("streetkid"),
	);
	/** Axes excluded from Shuffle. */
	const [lockedAxes, setLockedAxes] = React.useState<Record<Axis, boolean>>(
		() =>
			AXES.reduce<Record<Axis, boolean>>(
				(acc, a) => {
					acc[a.id] = false;
					return acc;
				},
				{} as Record<Axis, boolean>,
			),
	);

	// Hydrate the selection from ?preset= on mount. Strictly URL-driven: the
	// theme comes only from the URL code; no code → the streetkid default.
	React.useEffect(() => {
		const code = Option.fromNullable(() =>
			new URLSearchParams(window.location.search).get("preset"),
		);
		match(code)
			.with(Option.some, (c) =>
				match(decodePreset(c))
					.with(Result.ok, (p) => setSelection(p))
					.with(Result.err, () => undefined)
					.exhaustive(),
			)
			.with(Option.none, () => undefined)
			.exhaustive();
	}, []);


	// Apply the theme to <html data-nf-*> every time the selection changes so
	// every update path (axis pick, genre, import, shuffle) re-themes live.
	React.useEffect(() => {
		applyTheme(selection);
	}, [selection]);

	// Keep the shareable ?preset= code in the URL as the theme changes so the
	// current selection is always shareable. Strictly URL-driven — no storage.
	const skipFirstWrite = React.useRef(true);
	React.useEffect(() => {
		if (skipFirstWrite.current) {
			skipFirstWrite.current = false;
			return;
		}
		if (typeof window === "undefined") return;
		if (Object.keys(selection).length === 0) return;
		const code = encodePreset(selection);
		const url = new URL(window.location.href);
		url.searchParams.set("preset", code);
		window.history.replaceState({}, "", url);
	}, [selection]);

	const [importKey, setImportKey] = React.useState("");
	const [importMsg, setImportMsg] = React.useState<string | null>(null);

	const select = (axis: Axis, value: string) => {
		const next = { ...selection, [axis]: value };
		setSelection(next);
		setImportMsg(null);
	};

	/** Pick a genre → apply its full bundle (axis defaults + non-tweakable tokens). */
	const selectStyle = (mode: StyleMode) => {
		const next = bundledSelection(mode);
		setSelection(next);
		setImportMsg(`${mode} genre applied — tunes below override live`);
	};

	const toggleLock = (axis: Axis) => {
		setLockedAxes((prev) => ({ ...prev, [axis]: !prev[axis] }));
	};

	const applyKey = (raw: string) => {
		// Parse at the boundary: import string → code → validated selection.
		match(codeFromImport(raw).andThen(decodePreset))
			.with(Result.ok, (parsed) => {
				setSelection(parsed);
				setImportMsg("preset imported ✓ applied live");
			})
			.with(Result.err, () =>
				setImportMsg("invalid preset code — paste a code or ?preset=… link"),
			)
			.exhaustive();
	};

	/** Copy the current theme's encrypted code to the clipboard. */
	const copyCode = () => {
		navigator.clipboard
			.writeText(encodePreset(selection))
			.catch(() => undefined);
	};

	/** Shuffle unlocked axes (locked axes keep their value). */
	const shuffle = () => {
		const next: PresetSelection = {};
		for (const a of AXES) {
			if (lockedAxes[a.id]) {
				// keep current value — fall back to the genre bundle or axis default
				const bundle = STYLE_BUNDLES[(selection.style ?? "streetkid") as StyleMode];
				next[a.id] =
					selection[a.id] ??
					bundle.axis[a.id as Exclude<Axis, "style">] ??
					DEFAULTS[a.id];
				continue;
			}
			const opts = OPTIONS[a.id];
			next[a.id] = opts[Math.floor(Math.random() * opts.length)].value;
		}
		setSelection(next);
		setImportMsg(null);
	};

	return (
		<Shell
			active="/create"
			sidebar={
				<CreateSidebar
					selection={selection}
					lockedAxes={lockedAxes}
					onSelectStyle={selectStyle}
					onSelect={select}
					onToggleLock={toggleLock}
					onFactory={copyCode}
					onShuffle={shuffle}
					importKey={importKey}
					setImportKey={setImportKey}
					onImport={applyKey}
					importMsg={importMsg}
				/>
			}
		>
			<div className="w-full">
				<header className="mb-10">
					<p className="font-mono text-[0.6875rem] uppercase tracking-[0.28em] text-primary/90">
						<span className="text-muted-foreground">[</span>CREATE
						<span className="text-muted-foreground">]</span>
					</p>
					<h1 className="mt-3 text-3xl font-bold uppercase leading-none tracking-tight sm:text-4xl">
						Theme{" "}
						<span className="font-serif lowercase italic text-primary">
							builder
						</span>
					</h1>
					<p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
						Pick a preset per axis on the left — changes apply live to the
						previews. Lock an axis to keep it while shuffling; import or share a{" "}
						<code className="font-mono text-xs">?preset=</code> code via the sidebar.
					</p>
					<Separator className="mt-4 !border-primary/30" />
				</header>

				<CreateShowcase />

			</div>
		</Shell>
	);
}
