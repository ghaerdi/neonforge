import Link from "next/link";
import { Code, Term, Card, Section, DocsPageHeader } from "./docs-ui";

/** Overview + prerequisites. */
export function OverviewPage() {
	return (
		<div className="mx-auto max-w-3xl">
			<DocsPageHeader code="DOCUMENTATION / OVERVIEW" title="Getting started">
				Neonforge is a drop-in registry for shadcn/ui. Two ways to use it:
				install components with the shadcn CLI, or copy the source by hand.
				Either way the theme (design tokens) is required — it carries the whole
				cyberpunk glass language.
			</DocsPageHeader>
			<div className="flex flex-col gap-12">
				<Section num="01" title="Prerequisites">
					<Card icon="▦" title="Toolchain">
						You need a project running{" "}
						<strong className="text-foreground">Tailwind CSS v4</strong>{" "}
						(CSS-first config) and{" "}
						<strong className="text-foreground">React 19</strong> with a{" "}
						<Code>components.json</Code> file. If you don&apos;t have one yet,
						scaffold it with the shadcn CLI:
						<Term
							title="terminal · init"
							lines={[
								"npx shadcn@latest init",
								"",
								"# creates tailwind config + components.json + lib/utils",
							]}
						/>
					</Card>
					<Card icon="◈" title="Then pick a path">
						<div className="grid gap-3 sm:grid-cols-2">
							<Link href="/docs/cli" className="group block">
								<div className="h-full rounded-md border border-glass-border bg-secondary/10 p-4 transition-colors hover:border-primary/50 hover:shadow-[var(--nf-glow-primary)]">
									<p className="font-mono text-[0.6875rem] uppercase tracking-widest text-primary">
										01 · CLI
									</p>
									<p className="mt-1 text-sm text-foreground">
										Fastest — <Code>npx shadcn</Code> resolves deps for you.
									</p>
								</div>
							</Link>
							<Link href="/docs/manual" className="group block">
								<div className="h-full rounded-md border border-glass-border bg-secondary/10 p-4 transition-colors hover:border-primary/50 hover:shadow-[var(--nf-glow-primary)]">
									<p className="font-mono text-[0.6875rem] uppercase tracking-widest text-primary">
										02 · Manual
									</p>
									<p className="mt-1 text-sm text-foreground">
										No CLI — copy <Code>ui/*.tsx</Code> straight into your
										project.
									</p>
								</div>
							</Link>
						</div>
					</Card>
				</Section>
			</div>
		</div>
	);
}

/** CLI installation guide. */
export function CliPage() {
	return (
		<div className="mx-auto max-w-3xl">
			<DocsPageHeader code="DOCUMENTATION / CLI" title="Install with the CLI">
				The shadcn CLI pulls each neonforge component into your project and
				resolves its dependencies automatically. Grab everything in one line, or
				install the theme first then just the components you need.
			</DocsPageHeader>
			<div className="flex flex-col gap-12">
				<Section num="00" title="Install everything">
					<Card icon="▦" title="The whole suite, one command">
						<div className="flex flex-col gap-3">
							<Term
								title="terminal · everything"
								lines={["npx shadcn@latest add ghaerdi/neonforge/all"]}
							/>
							<p className="mt-3">
								The <Code>all</Code> umbrella item installs every neonforge
								component + the theme + <Code>lib-utils</Code>. Picking{" "}
								<strong>Radix UI</strong> at the library prompt keeps everything
								consistent (Neonforge is built on Radix).
							</p>
						</div>
					</Card>
				</Section>
				<Section num="01" title="1. Install the theme">
					<Card icon="◈" title="Theme first">
						The theme ships as a registry item named <Code>neonforge</Code>. It
						installs the design tokens (<Code>styles/theme.css</Code>) and the{" "}
						<Code>lib-utils</Code> helper every component depends on:
						<Term
							title="terminal · theme"
							lines={["npx shadcn@latest add ghaerdi/neonforge/neonforge"]}
						/>
						<p className="mt-3">
							Ensure <Code>@import "tailwindcss"</Code> is followed by the theme
							import in your global CSS.
						</p>
					</Card>
				</Section>
				<Section num="02" title="2. Add components">
					<Card icon="❯" title="Components">
						Install individual components by name. Pull as many as you need in
						one command:
						<Term
							title="terminal · components"
							lines={[
								"npx shadcn@latest add ghaerdi/neonforge/button",
								"npx shadcn@latest add ghaerdi/neonforge/card ghaerdi/neonforge/dialog",
								"npx shadcn@latest add ghaerdi/neonforge/tabs",
							]}
						/>
						<p className="mt-3">
							Every component is listed in{" "}
							<Link
								href="/components"
								className="font-mono text-primary hover:underline"
							>
								the catalog
							</Link>{" "}
							with a ready-to-paste command.
						</p>
					</Card>
				</Section>
				<Section num="03" title="3. Apply your preset">
					<Card icon="◈" title="Keep the look you configured">
						<p>
							The installed theme defaults to streetkid. To render components with
							the exact preset you built on the{" "}
							<Link
								href="/create"
								className="font-mono text-primary hover:underline"
							>
								Create page
							</Link>
							, the <Code>Get components</Code> dialog (or <em>Download theme</em>)
							gives you a <Code>:root {`{ … }`}</Code> block of tokens.
						</p>
						<p className="mt-3 text-amber-300/90">
							That block is an <strong>override</strong> — it only retunes the
							tokens. It must <strong>sit inside your full theme</strong>, not
							replace it: keep the <Code>@theme inline</Code>,{" "}
							<Code>@utility</Code> and <Code>@layer base</Code> rules from{" "}
							<Code>styles/theme.css</Code>, and <strong>append</strong> the
							block at the end of it so the overrides win.
						</p>
						<Term
							title="theme.css · preset override appended"
							lines={[
								"/* … the full neonforge theme stays above: @theme inline, @utility, @layer base … */",
								"",
								"/* your preset from the Create page — appended last so it wins */",
								":root {",
								"  /* genre + base + accent + chart + font + shape tokens */",
								"}",
							]}
						/>
						<p className="mt-3">
							If you replace the whole file with only the <Code>:root</Code>{" "}
							block, the utility classes (<Code>glass-panel</Code>,{" "}
							<Code>neon-glow</Code>, <Code>text-glow</Code>) and the theme→class
							shorthand vanish and components render unstyled.
						</p>
					</Card>
				</Section>
			</div>
		</div>
	);
}

/** Manual copy-paste guide (no shadcn CLI). */
export function ManualPage() {
	return (
		<div className="mx-auto max-w-3xl">
			<DocsPageHeader code="DOCUMENTATION / MANUAL" title="Manual setup">
				No shadcn CLI, no registry resolution — copy the files and wire it
				yourself. Every component is a single standalone source file, so manual
				install is just copy + deps.
			</DocsPageHeader>
			<div className="flex flex-col gap-12">
				<Section num="01" title="Copy the theme">
					<Card icon="◈" title="Design tokens first">
						The whole visual language — glass, chamfer, glow, genre — lives in{" "}
						<Code>styles/theme.css</Code>. Copy it into your project and import
						it right after Tailwind in your global CSS:
						<Term
							title="manual · theme"
							lines={[
								"cp styles/theme.css  ./src/styles/theme.css",
								"",
								"// src/app/globals.css",
								'@import "tailwindcss";',
								'@import "./styles/theme.css";',
							]}
						/>
						<p className="mt-3">
							To start from your configured preset instead of the default,{" "}
							<strong>append</strong> the <Code>:root {"{ … }"}</Code> block from
							the Create page&apos;s <Code>Get components</Code> dialog to{" "}
							<em>the end of</em> <Code>theme.css</Code>. It&apos;s a token{" "}
							<strong>override</strong> — it layers on top of the file&apos;s{" "}
							<Code>@theme inline</Code> / <Code>@utility</Code> /{" "}
							<Code>@layer base</Code> rules, so keep those intact. Don&apos;t
							replace the file with just the block, or components render unstyled.
						</p>
					</Card>
				</Section>
				<Section num="02" title="Copy a component">
					<Card icon="⧉" title="Copy the source files">
						Each component lives in <Code>react/ui/*.tsx</Code>. Copy the ones
						you need, plus any co-located helper they import:
						<Term
							title="manual · copy"
							lines={[
								"# 1. copy the component source into your ui folder",
								"cp react/ui/tabs.tsx            ./src/components/ui/",
								"cp react/ui/carve-br.tsx        ./src/components/ui/",
								"# 2. add the npm deps the component needs",
								"npm i @radix-ui/react-tabs @radix-ui/react-slot class-variance-authority",
								"# 3. make sure lib/utils exists (imported by all components)",
								"cp react/lib/utils.ts           ./src/lib/  # if absent",
							]}
						/>
					</Card>
					<Card icon="⊙" title="Note on the theme">
						Without the theme, components fall back to plain shadcn styling. The
						neon glass, chamfered corners and glow all come from{" "}
						<Code>styles/theme.css</Code> — install it once and it applies
						project-wide.
					</Card>
				</Section>
				<Section num="03" title="Checklist">
					<Card icon="✓" title="Before you ship">
						<ul className="grid gap-1.5 text-sm text-muted-foreground">
							<li className="flex gap-2">
								<span className="text-primary/70">·</span> Copy{" "}
								<Code>ui/{`*.tsx`}</Code> from the registry into{" "}
								<Code>components/ui/</Code>.
							</li>
							<li className="flex gap-2">
								<span className="text-primary/70">·</span> Bring any co-located
								helper files the component imports (e.g.{" "}
								<Code>carve-br.tsx</Code>).
							</li>
							<li className="flex gap-2">
								<span className="text-primary/70">·</span> Install the npm
								dependencies listed in that component&apos;s registry entry.
							</li>
							<li className="flex gap-2">
								<span className="text-primary/70">·</span> Import{" "}
								<Code>styles/theme.css</Code> after Tailwind.
							</li>
							<li className="flex gap-2">
								<span className="text-primary/70">·</span> (Optional) apply your
								preset <Code>:root</Code> block.
							</li>
						</ul>
					</Card>
				</Section>
			</div>
		</div>
	);
}

/** Theming & presets reference. */
export function ThemingPage() {
	return (
		<div className="mx-auto max-w-3xl">
			<DocsPageHeader code="DOCUMENTATION / THEMING" title="Theme & presets">
				Neonforge themes live as <Code>data-nf-*</Code> attributes on{" "}
				<Code>{"<html>"}</Code>. Genres and presets are just different
				combinations of those attributes; the same tokens apply in dark or light
				mode.
			</DocsPageHeader>
			<div className="flex flex-col gap-12">
				<Section num="01" title="Genre archetypes">
					<Card icon="◈" title="streetkid · nomad · corpo">
						The genre axis re-tunes non-tweakable tokens (glass strength, glow,
						chamfer, corner shape, blur). Build yours on the{" "}
						<Link
							href="/create"
							className="font-mono text-primary hover:underline"
						>
							Create page
						</Link>
						, then copy the generated CSS or share a{" "}
						<Code>?preset=&lt;key&gt;</Code> link.
					</Card>
				</Section>
				<Section num="02" title="Share a preset">
					<Card icon="⧉" title="Preset codes">
						A preset code is a compact token encoding the full 8-axis selection.
						Open any page with <Code>?preset=&lt;key&gt;</Code> and it applies.
						Theming is strictly URL-driven — no <Code>?preset=</Code> in the URL
						means the streetkid default, and nothing is persisted in the browser.
					</Card>
				</Section>
				<Section num="03" title="Light / dark mode">
					<Card icon="☾" title="Both modes work">
						Neonforge ships the default dark theme and a light industrial-glass
						variant behind <Code>:root[data-nf-mode="light"]</Code>. Flip the
						toggle in the top bar — the preference is remembered and applied
						before first paint so there&apos;s no flash. Genres and presets
						apply in both modes.
					</Card>
				</Section>
			</div>
		</div>
	);
}
