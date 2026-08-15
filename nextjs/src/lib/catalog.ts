import registryData from "../../../react/registry.json" with { type: "json" };

export interface CatalogItem {
	name: string;
	title: string;
	description: string;
	type?: string;
	dependencies?: string[];
	registryDependencies?: string[];
}

const raw = (registryData as { items?: CatalogItem[] }).items ?? [];

export const COMPONENTS: CatalogItem[] = raw
	.filter((i) => i.type === "registry:ui")
	.map((i) => ({
		name: i.name,
		title: i.title ?? i.name,
		description: i.description ?? "",
		dependencies: i.dependencies ?? [],
		registryDependencies: i.registryDependencies ?? [],
	}))
	.sort((a, b) => a.name.localeCompare(b.name));

export const GROUPS: { label: string; items: string[] }[] = [
	{
		label: "Core",
		items: [
			"badge",
			"button",
			"card",
			"direction",
			"empty",
			"frame",
			"item",
			"kbd",
			"separator",
			"skeleton",
			"spinner",
			"typography",
		],
	},
	{
		label: "Forms",
		items: [
			"checkbox",
			"combobox",
			"date-picker",
			"field",
			"form",
			"input",
			"input-group",
			"input-otp",
			"label",
			"native-select",
			"radio-group",
			"select",
			"slider",
			"switch",
			"textarea",
		],
	},
	{ label: "Data", items: ["calendar", "data-table", "table"] },
	{
		label: "Navigation",
		items: [
			"breadcrumb",
			"dropdown-menu",
			"menubar",
			"navigation-menu",
			"pagination",
			"sidebar",
			"tabs",
		],
	},
	{
		label: "Overlays",
		items: [
			"alert-dialog",
			"command",
			"context-menu",
			"dialog",
			"drawer",
			"hover-card",
			"popover",
			"sheet",
			"tooltip",
		],
	},
	{ label: "Feedback", items: ["alert", "progress", "sonner", "toast"] },
	{ label: "Disclosure", items: ["accordion", "collapsible"] },
	{
		label: "Media & Layout",
		items: ["aspect-ratio", "avatar", "carousel", "resizable", "scroll-area"],
	},
	{
		label: "Buttons & Actions",
		items: ["button-group", "toggle", "toggle-group"],
	},
	{ label: "Charts", items: ["chart"] },
];

/** Component names in sidebar (GROUPS) order — drives prev/next, not alphabetical. */
export const CATALOG_ORDER: string[] = GROUPS.flatMap((g) => g.items);

const INDEX = new Map(GROUPS.flatMap((g) => g.items.map((n) => [n, g.label])));

export function groupOf(name: string): string {
	return INDEX.get(name) ?? "Core";
}

export const INSTALL_CMD = (name: string) =>
	`npx shadcn@latest add ghaerdi/neonforge/${name}`;
