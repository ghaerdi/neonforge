/**
 * Theme preset data + resolvers — single source for the Create page.
 * Mirrors styles/theme.css :root[data-nf-*] presets exactly.
 *
 * Fonts are TWO independent axes:
 *   fontBody     → data-nf-font-body    (EVERYTHING: body, ui, controls)
 *   fontHeading  → data-nf-font-heading (headings only)
 * (ThemeCustomizer.tsx carries its own inline copy; keep in sync.)
 */

export type Axis =
  | "style"
  | "semantic"
  | "base"
  | "accent"
  | "chart"
  | "fontBody"
  | "fontHeading"
  | "shape";

/** Not every axis participates in the per-axis OPTIONS map. */
export type TweakableAxis = Exclude<Axis, "style">;

export type StyleMode = "streetkid" | "nomad" | "corpo";


export interface AxisMeta {
  id: Axis;
  title: string;
  sub: string;
  attr: string;
}

export const AXES: AxisMeta[] = [
  {
    id: "style",
    title: "Genre",
    sub: "streetkid · nomad · corpo",
    attr: "nfStyle",
  },
  {
    id: "semantic",
    title: "Feedback colors",
    sub: "badges · buttons · alerts",
    attr: "nfSemantic",
  },
  {
    id: "base",
    title: "Base surface",
    sub: "page bg / card carbon",
    attr: "nfBase",
  },
  {
    id: "accent",
    title: "Theme accent",
    sub: "primary · ring · glow · hud",
    attr: "nfAccent",
  },
  {
    id: "chart",
    title: "Chart palette",
    sub: "--chart-1 … --chart-5",
    attr: "nfChart",
  },
  {
    id: "fontBody",
    title: "Font — everything",
    sub: "body · ui · controls",
    attr: "nfFontBody",
  },
  {
    id: "fontHeading",
    title: "Font — headings",
    sub: "h1 … h6 only",
    attr: "nfFontHeading",
  },
  {
    id: "shape",
    title: "Corner shape",
    sub: "diagonals always chamfered",
    attr: "nfShape",
  },
];

export interface Option {
  value: string;
  label: string;
  colors?: string[];
  note?: string;
  fontStack?: string;
  shape?: "rect" | "round";
}

/** Shared font choices (body + heading each pick one of these). */
const FONT_OPTIONS = [
  {
    value: "chakra",
    label: "Chakra Petch",
    note: "terminal",
    fontStack: "'Chakra Petch', sans-serif",
  },
  {
    value: "rajdhani",
    label: "Rajdhani",
    note: "hud · condensed",
    fontStack: "'Rajdhani', sans-serif",
  },
  {
    value: "inter",
    label: "Inter",
    note: "neutral",
    fontStack: "'Inter', sans-serif",
  },
  {
    value: "space-grotesk",
    label: "Space Grotesk",
    note: "geometric",
    fontStack: "'Space Grotesk', sans-serif",
  },
  {
    value: "orbitron",
    label: "Orbitron",
    note: "display",
    fontStack: "'Orbitron', sans-serif",
  },
  {
    value: "instrument-serif",
    label: "Instrument Serif",
    note: "editorial",
    fontStack: "'Instrument Serif', serif",
  },
] as const satisfies readonly Option[];

export const OPTIONS = {
  style: [
    {
      value: "streetkid",
      label: "Streetkid",
      colors: ["#00f0ff", "#ff4dd8", "#ff2a4d"],
      note: "glitch · cyberpunk overdrive",
    },
    {
      value: "nomad",
      label: "Nomad",
      colors: ["#fcee0a", "#00f0ff", "#ff2a4d"],
      note: "industrial-glass · balanced",
    },
    {
      value: "corpo",
      label: "Corpo",
      colors: ["#4d7cff", "#7d9bd4", "#dbe2ee"],
      note: "enterprise · restrained",
    },
  ],
  semantic: [
    { value: "default", label: "Default", colors: ["#ff2a4d", "#edff45", "#ffc832", "#00f0ff"], note: "fixed readable red·lime·amber·cyan" },
    { value: "hazard", label: "Hazard", colors: ["#5b52a3", "#00f0ff", "#ff2a4d", "#edff45"] },
    { value: "cyber", label: "Cyber", colors: ["#00f0ff", "#a855f7", "#4d7cff", "#ff4dd8"] },
    { value: "acid", label: "Acid", colors: ["#8dff9e", "#00f0ff", "#fcee0a", "#edff45"] },
    { value: "ember", label: "Ember", colors: ["#c94f2b", "#ffc832", "#ff2a4d", "#ff8a3c"] },
    { value: "neon", label: "Neon", colors: ["#ff4dd8", "#00f0ff", "#fcee0a", "#8dff9e"] },
  ],
  base: [
    { value: "carbon", label: "Carbon", colors: ["#12141a"] },
    { value: "void", label: "Void", colors: ["#141b2b"] },
    { value: "steel", label: "Steel", colors: ["#131722"] },
    { value: "graphite", label: "Graphite", colors: ["#161616"] },
    { value: "smoke", label: "Smoke", colors: ["#1e2126"] },
    { value: "obsidian", label: "Obsidian", colors: ["#16181f"] },
  ],
  accent: [
    { value: "hazard", label: "Hazard", colors: ["#fcee0a"] },
    { value: "cyan", label: "Cyan", colors: ["#00f0ff"] },
    { value: "blue", label: "Blue", colors: ["#4d7cff"] },
    { value: "red", label: "Red", colors: ["#ff2a4d"] },
    { value: "acid", label: "Acid", colors: ["#edff45"] },
    { value: "violet", label: "Violet", colors: ["#a855f7"] },
    { value: "amber", label: "Amber", colors: ["#ffc832"] },
    { value: "signal", label: "Signal", colors: ["#f0f2f5"] },
  ],
  chart: [
    {
      value: "hazard",
      label: "Hazard",
      colors: ["#fcee0a", "#00f0ff", "#ff2a4d", "#edff45", "#4d7cff"],
    },
    {
      value: "cyber",
      label: "Cyber",
      colors: ["#00f0ff", "#a855f7", "#4d7cff", "#ff4dd8", "#6ee7a0"],
    },
    {
      value: "reactor",
      label: "Reactor",
      colors: ["#ff2a4d", "#ffc832", "#fcee0a", "#ff9a3c", "#ff6b7a"],
    },
    {
      value: "acid",
      label: "Acid",
      colors: ["#edff45", "#00f0ff", "#fcee0a", "#8dff9e", "#f0f2f5"],
    },
    {
      value: "mono",
      label: "Mono",
      colors: ["#e6e9ee", "#bfc6d0", "#99a1ae", "#737c8c", "#4d5562"],
    },
    {
      value: "ember",
      label: "Ember",
      colors: ["#ff8a3c", "#ffc832", "#ff2a4d", "#ffb35c", "#c94f2b"],
    },
    {
      value: "neon",
      label: "Neon",
      colors: ["#ff4dd8", "#00f0ff", "#fcee0a", "#f0f2f5", "#8dff9e"],
    },
    {
      value: "ghost",
      label: "Ghost",
      colors: ["#7d9bd4", "#b9c8e8", "#4a567a", "#dfe7f5", "#3b4a66"],
    },
  ],
  fontBody: FONT_OPTIONS,
  fontHeading: FONT_OPTIONS,
  shape: [
    { value: "rect", label: "Rect", note: "diagonals only", shape: "rect" },
    {
      value: "round",
      label: "Round",
      note: "diagonals + rounded",
      shape: "round",
    },
  ],
} as const satisfies Record<Axis, readonly Option[]>;

/** Value union of the options a single axis can hold — derived, not duplicated. */
export type OptionValue<K extends Axis> = (typeof OPTIONS)[K][number]["value"];

/**
 * A selection with every axis filled in (defaults where absent).
 * Keyed per-axis so lookups into the *_VALUES tables are total — a missing
 * map entry is a compile error, never a runtime `undefined!`.
 */
export type ResolvedSelection = { [K in Axis]: OptionValue<K> };

export const DEFAULTS: ResolvedSelection = {
  style: "streetkid",
  semantic: "ember",
  base: "void",
  accent: "cyan",
  chart: "ember",
  fontBody: "inter",
  fontHeading: "chakra",
  shape: "rect",
};


/** Resolved oklch triplets per preset (L C H) — mirrors theme.css. */
const BASE_VALUES: Record<OptionValue<"base">, { l: number; c: number; h: number }> = {
  carbon: { l: 0.11, c: 0.012, h: 250 },
  void: { l: 0.12, c: 0.02, h: 262 },
  steel: { l: 0.115, c: 0.012, h: 230 },
  graphite: { l: 0.11, c: 0.004, h: 0 },
  smoke: { l: 0.13, c: 0.008, h: 250 },
  obsidian: { l: 0.13, c: 0.02, h: 258 },
};

const ACCENT_VALUES: Record<
  OptionValue<"accent">,
  { l: number; c: number; h: number; fg: number }
> = {
  hazard: { l: 0.93, c: 0.19, h: 110, fg: 0.16 },
  cyan: { l: 0.87, c: 0.14, h: 230, fg: 0.16 },
  blue: { l: 0.45, c: 0.29, h: 262, fg: 0.95 },
  red: { l: 0.62, c: 0.26, h: 25, fg: 0.985 },
  acid: { l: 0.95, c: 0.21, h: 118, fg: 0.17 },
  violet: { l: 0.7, c: 0.2, h: 300, fg: 0.16 },
  amber: { l: 0.82, c: 0.15, h: 70, fg: 0.16 },
  signal: { l: 0.95, c: 0.005, h: 250, fg: 0.16 },
};

const CHART_VALUES: Record<OptionValue<"chart">, [number, number, number][]> = {
  hazard: [
    [0.93, 0.19, 110],
    [0.87, 0.14, 230],
    [0.62, 0.26, 25],
    [0.95, 0.21, 118],
    [0.45, 0.29, 262],
  ],
  cyber: [
    [0.87, 0.14, 230],
    [0.7, 0.2, 300],
    [0.45, 0.29, 262],
    [0.75, 0.25, 330],
    [0.75, 0.15, 150],
  ],
  reactor: [
    [0.62, 0.26, 25],
    [0.82, 0.15, 70],
    [0.93, 0.19, 110],
    [0.75, 0.2, 55],
    [0.7, 0.2, 10],
  ],
  acid: [
    [0.95, 0.21, 118],
    [0.87, 0.14, 230],
    [0.93, 0.19, 110],
    [0.8, 0.18, 145],
    [0.95, 0.005, 250],
  ],
  mono: [
    [0.9, 0.005, 250],
    [0.75, 0.005, 250],
    [0.6, 0.005, 250],
    [0.45, 0.005, 250],
    [0.3, 0.005, 250],
  ],
  ember: [
    [0.72, 0.19, 40],
    [0.8, 0.15, 80],
    [0.62, 0.26, 25],
    [0.75, 0.2, 65],
    [0.5, 0.18, 20],
  ],
  neon: [
    [0.75, 0.25, 330],
    [0.87, 0.14, 230],
    [0.93, 0.19, 110],
    [0.95, 0.005, 250],
    [0.8, 0.18, 145],
  ],
  ghost: [
    [0.55, 0.1, 250],
    [0.75, 0.07, 250],
    [0.4, 0.06, 260],
    [0.85, 0.03, 250],
    [0.3, 0.05, 255],
  ],
};

/** Resolved CSS font-family per choice (body = everything). */
/** Resolved CSS font-family per choice — shared by body AND heading. */
const FONT_BODY_VALUES: Record<OptionValue<"fontBody">, string> = {
  inter: '"Inter", ui-sans-serif, system-ui, sans-serif',
  rajdhani: '"Rajdhani", ui-sans-serif, system-ui, sans-serif',
  chakra: '"Chakra Petch", ui-sans-serif, system-ui, sans-serif',
  "space-grotesk": '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
  orbitron: '"Orbitron", ui-sans-serif, system-ui, sans-serif',
  "instrument-serif": '"Instrument Serif", ui-serif, Georgia, serif',
};


const SHAPE_VALUES: Record<OptionValue<"shape">, string> = {
  rect:
    "\t--nf-corner-tr: 0;\n\t--nf-corner-bl: 0;\n\t--nf-radius-tr: 0;\n\t--nf-radius-bl: 0;",
  round:
    "\t--nf-corner-tr: 0;\n\t--nf-corner-bl: 0;\n\t--nf-radius-tr: var(--nf-round-radius);\n\t--nf-radius-bl: var(--nf-round-radius);",
};

/* ────────────────────────────────────────────────────────────────────────────
 * GENRE / archetype bundles (streetkid · nomad · corpo)
 *
 * The `style` axis is the top-ticket selector. Each archetype bundles:
 *   axis    — default per-tweakable-axis values the archetype implies
 *   css     — NON-tweakable design tokens (glow · glass · chamfer · corners ·
 *             radius · mono font) that no Create-page picker exposes today.
 *             Rendered as the body of `:root[data-nf-style="…"]` in CSS export.
 *
 * The CSS layer is what makes the three archetypes FEEL different — not just a
 * color swap. Mirror these blocks in styles/theme.css.
 * ──────────────────────────────────────────────────────────────────────────── */

export interface StyleBundle {
  label: string;
  tagline: string;
  /** per-tweakable-axis defaults implied by this archetype */
  axis: Partial<Record<TweakableAxis, string>>;
  /** non-tweakable token overrides for the style selector body */
  css: string;
}

export const STYLE_BUNDLES: Record<StyleMode, StyleBundle> = {
  /* streetkid — currently identical to nomad (default industrial-glass). */
  streetkid: {
    label: "Streetkid",
    tagline: "cyberpunk · sharp · cyan",
    axis: { semantic: "ember", accent: "cyan", base: "void", chart: "ember", fontBody: "inter", fontHeading: "chakra", shape: "rect" },
    css: `/* streetkid — tuned up from nomad: crisper blur, slightly stronger glow */
\t--nf-blur: 12px;
\t--radius: 0rem;
\t--nf-round-radius: 0;
\t--background: color-mix(in srgb, var(--primary) 10%, oklch(var(--nf-bg-l) var(--nf-bg-c) var(--nf-hue)));
\t--nf-glass: color-mix(in srgb, var(--primary) 13%, oklch(1 0 0 / 0.04));
\t--nf-glass-strong: color-mix(in srgb, var(--primary) 18%, oklch(1 0 0 / 0.07));
\t--nf-glass-hover: color-mix(in srgb, var(--primary) 22%, oklch(1 0 0 / 0.1));
\t--nf-panel-shadow: 0 2px 8px oklch(0 0 0 / 0.15);
\t--nf-glass-highlight: oklch(1 0 0 / 0.1);
\t--nf-glass-border: color-mix(in srgb, var(--primary) 18%, oklch(1 0 0 / 0.12));
\t--border: color-mix(in srgb, var(--primary) 12%, oklch(var(--nf-bg-l) var(--nf-bg-c) var(--nf-hue) / 0.22));
\t--input: color-mix(in srgb, var(--primary) 15%, oklch(var(--nf-bg-l) var(--nf-bg-c) var(--nf-hue) / 0.28));
\t--card: color-mix(in srgb, var(--primary) 7%, oklch(calc(var(--nf-bg-l) + 0.032) var(--nf-bg-c) var(--nf-hue)));
\t--popover: color-mix(in srgb, var(--primary) 7%, oklch(calc(var(--nf-bg-l) + 0.022) var(--nf-bg-c) var(--nf-hue)));
\t--secondary: color-mix(in srgb, var(--primary) 9%, oklch(calc(var(--nf-bg-l) + 0.09) var(--nf-bg-c) var(--nf-hue)));
\t--muted: color-mix(in srgb, var(--primary) 7%, oklch(calc(var(--nf-bg-l) + 0.07) var(--nf-bg-c) var(--nf-hue)));
\t--accent: color-mix(in srgb, var(--primary) 9%, oklch(calc(var(--nf-bg-l) + 0.1) var(--nf-bg-c) var(--nf-hue)));
\t--nf-glow-primary: 0 0 12px oklch(var(--nf-accent-l) var(--nf-accent-c) var(--nf-accent-h) / 0.26);
\t--nf-glow-destructive: 0 0 12px oklch(0.62 0.26 25 / 0.3);
\t--nf-glow-success: 0 0 12px oklch(0.95 0.21 118 / 0.26);
\t--nf-glow-warning: 0 0 12px oklch(0.82 0.15 70 / 0.26);
\t--nf-glow-info: 0 0 12px oklch(0.87 0.14 230 / 0.3);
\t--nf-chamfer-sm: 0.35rem;
\t--nf-chamfer-md: 0.6rem;
\t--nf-chamfer-lg: 0.9rem;
\t--nf-round-radius: 0.5rem;
\t--nf-font-mono: "Share Tech Mono", ui-monospace, "SFMono-Regular", monospace;`,
  },

  /* nomad — the current industrial-glass default */
  nomad: {
    label: "Nomad",
    tagline: "warehouse · industrial · amber",
    axis: { semantic: "acid", accent: "amber", base: "graphite", chart: "acid", fontBody: "space-grotesk", fontHeading: "rajdhani", shape: "round" },
    css: `/* nomad — the default preset (no meaningful overrides) */
\t--nf-blur: 18px;
\t--background: color-mix(in srgb, var(--primary) 9%, oklch(var(--nf-bg-l) var(--nf-bg-c) var(--nf-hue)));
\t--nf-glass: color-mix(in srgb, var(--primary) 10%, oklch(1 0 0 / 0.03));
\t--nf-glass-strong: color-mix(in srgb, var(--primary) 16%, oklch(1 0 0 / 0.06));
\t--nf-glass-hover: color-mix(in srgb, var(--primary) 20%, oklch(1 0 0 / 0.09));
\t--card: color-mix(in srgb, var(--primary) 6%, oklch(calc(var(--nf-bg-l) + 0.032) var(--nf-bg-c) var(--nf-hue)));
\t--popover: color-mix(in srgb, var(--primary) 6%, oklch(calc(var(--nf-bg-l) + 0.022) var(--nf-bg-c) var(--nf-hue)));
\t--secondary: color-mix(in srgb, var(--primary) 7%, oklch(calc(var(--nf-bg-l) + 0.09) var(--nf-bg-c) var(--nf-hue)));
\t--muted: color-mix(in srgb, var(--primary) 6%, oklch(calc(var(--nf-bg-l) + 0.07) var(--nf-bg-c) var(--nf-hue)));
\t--accent: color-mix(in srgb, var(--primary) 7%, oklch(calc(var(--nf-bg-l) + 0.1) var(--nf-bg-c) var(--nf-hue)));
\t--nf-panel-shadow: 0 2px 8px oklch(0 0 0 / 0.15);
\t--nf-glass-highlight: oklch(1 0 0 / 0.1);
\t--nf-glow-primary: 0 0 10px oklch(var(--nf-accent-l) var(--nf-accent-c) var(--nf-accent-h) / 0.18);
\t--nf-glow-destructive: 0 0 10px oklch(0.62 0.26 25 / 0.22);
\t--nf-glow-success: 0 0 10px oklch(0.95 0.21 118 / 0.18);
\t--nf-glow-warning: 0 0 10px oklch(0.82 0.15 70 / 0.18);
\t--nf-glow-info: 0 0 10px oklch(0.87 0.14 230 / 0.22);
\t--nf-chamfer-sm: 0.35rem;
\t--nf-chamfer-md: 0.6rem;
\t--nf-chamfer-lg: 0.9rem;
\t--nf-round-radius: 0.5rem;
\t--nf-font-mono: "Share Tech Mono", ui-monospace, "SFMono-Regular", monospace;`,
  },

  /* corpo — enterprise · restrained · professional */
  corpo: {
    label: "Corpo",
    tagline: "executive · grid · signal",
    axis: { semantic: "default", accent: "signal", base: "carbon", chart: "reactor", fontBody: "orbitron", fontHeading: "inter", shape: "rect" },
    css: `/* corpo — soft glassy, receding borders */
\t--nf-blur: 20px;
\t--nf-panel-shadow: 0 20px 60px oklch(0 0 0 / 0.4);
\t--nf-bg-l: 0.14;
\t--nf-bg-c: 0.008;
\t--background: color-mix(in srgb, var(--primary) 4%, oklch(0.14 0.008 var(--nf-hue)));
\t--nf-glass: color-mix(in srgb, var(--primary) 5%, oklch(1 0 0 / 0.03));
\t--nf-glass-strong: color-mix(in srgb, var(--primary) 7%, oklch(1 0 0 / 0.05));
\t--nf-glass-hover: color-mix(in srgb, var(--primary) 9%, oklch(1 0 0 / 0.07));
\t--card: color-mix(in srgb, var(--primary) 2%, oklch(0.17 0.01 var(--nf-hue)));
\t--popover: color-mix(in srgb, var(--primary) 2%, oklch(0.16 0.01 var(--nf-hue)));
\t--secondary: color-mix(in srgb, var(--primary) 3%, oklch(0.22 0.012 var(--nf-hue)));
\t--muted: color-mix(in srgb, var(--primary) 2%, oklch(0.2 0.012 var(--nf-hue)));
\t--accent: color-mix(in srgb, var(--primary) 3%, oklch(0.23 0.012 var(--nf-hue)));
\t--nf-glass-border: oklch(1 0 0 / 0.07);
\t--nf-glass-highlight: oklch(1 0 0 / 0.06);
\t--border: oklch(0.93 0.01 var(--nf-hue) / 0.07);
\t--input: oklch(0.93 0.01 var(--nf-hue) / 0.09);
\t--nf-glow-primary: 0 0 8px oklch(var(--nf-accent-l) var(--nf-accent-c) var(--nf-accent-h) / 0.16);
\t--nf-glow-destructive: 0 0 8px oklch(0.62 0.26 25 / 0.18);
\t--nf-glow-success: 0 0 8px oklch(0.95 0.21 118 / 0.16);
\t--nf-glow-warning: 0 0 8px oklch(0.82 0.15 70 / 0.16);
\t--nf-glow-info: 0 0 8px oklch(0.87 0.14 230 / 0.18);
\t--nf-chamfer-sm: 0.2rem;
\t--nf-chamfer-md: 0.35rem;
\t--nf-chamfer-lg: 0.5rem;
\t--nf-round-radius: 0.5rem;
\t--radius: 0.375rem;
\t--ring: oklch(var(--nf-accent-l) var(--nf-accent-c) var(--nf-accent-h) / 0.3);
\t--nf-font-mono: "Share Tech Mono", ui-monospace, "SFMono-Regular", monospace;`,
  },
};

export type PresetSelection = Partial<Record<Axis, string>>;

/** Resolve a full selection with the current default (streetkid) filling gaps. */
export function resolvedSelection(sel: PresetSelection): ResolvedSelection {
  // Single default-fill boundary: everything downstream reads a total selection.
  return Object.fromEntries(
    AXES.map((a) => [a.id, sel[a.id] ?? DEFAULTS[a.id]]),
  ) as ResolvedSelection;
}

/**
 * Apply a selection to <html> data-nf-* attrs. Always writes every resolved
 * axis value (defaults included) so the base :root (nomad) is fully overridden
 * and streetkid-on-default still renders correctly. No persistence.
 */
export function applyTheme(sel: PresetSelection) {
  const el = document.documentElement;
  const resolved = resolvedSelection(sel);
  for (const a of AXES) el.dataset[a.attr] = resolved[a.id];
}

/** Full flat selection a genre implies (bundle axis defaults) — drops style overrides. */
export function bundledSelection(mode: StyleMode): PresetSelection {
  const bundle = STYLE_BUNDLES[mode];
  const out: PresetSelection = {};
  for (const [axis, value] of Object.entries(bundle.axis) as [TweakableAxis, string][]) {
    out[axis] = value;
  }
  out.style = mode;
  return out;
}

/** The non-tweakable token CSS block for the resolved genre (always emitted for
 *  self-contained exports). */
function styleBlock(sel: PresetSelection): string {
  return STYLE_BUNDLES[resolvedSelection(sel).style].css;
}

/** Copy-pasteable CSS block for a selection (self-contained, no theme.css needed). */
export function selectionToCss(sel: PresetSelection): string {
  const r = resolvedSelection(sel);
  const base = BASE_VALUES[r.base];
  const accent = ACCENT_VALUES[r.accent];
  const chart = CHART_VALUES[r.chart];
  const body = FONT_BODY_VALUES[r.fontBody];
  const heading = FONT_BODY_VALUES[r.fontHeading];
  const shape = SHAPE_VALUES[r.shape];
  return `:root {
\t/* genre · non-tweakable tokens */
\t--nf-genre: ${r.style};
${styleBlock(sel)}

\t/* base surface — carbon */
\t--nf-hue: ${base.h};
\t--nf-bg-l: ${base.l};
\t--nf-bg-c: ${base.c};

\t/* accent */
\t--nf-accent-l: ${accent.l};
\t--nf-accent-c: ${accent.c};
\t--nf-accent-h: ${accent.h};
\t--nf-accent-fg-l: ${accent.fg};

\t/* chart palette */
\t--chart-1: oklch(${chart[0].join(" ")});
\t--chart-2: oklch(${chart[1].join(" ")});
\t--chart-3: oklch(${chart[2].join(" ")});
\t--chart-4: oklch(${chart[3].join(" ")});
\t--chart-5: oklch(${chart[4].join(" ")});

\t/* fonts */
\t--nf-font-heading: ${heading};
\t--nf-font-body: ${body};

\t/* corner shape */
${shape}
}`;
}
