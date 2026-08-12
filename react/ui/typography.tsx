import type * as React from "react";
import { cn } from "@/lib/utils";

/**
 * NEONFORGE typography — HUD-styled text primitives.
 * Headings: mono, uppercase, tracked (Chakra Petch / Share Tech Mono identity).
 * Body: readable sans with themed inline-code and table styles.
 */

function TypographyH1({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h1
			className={cn(
				"scroll-m-20 font-mono text-4xl font-bold uppercase tracking-[0.08em] text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function TypographyH2({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h2
			className={cn(
				"scroll-m-20 border-b border-glass-border pb-2 font-mono text-3xl font-bold uppercase tracking-[0.08em] text-foreground first:mt-0",
				className,
			)}
			{...props}
		/>
	);
}

function TypographyH3({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h3
			className={cn(
				"scroll-m-20 font-mono text-2xl font-bold uppercase tracking-[0.08em] text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function TypographyH4({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h4
			className={cn(
				"scroll-m-20 font-mono text-xl font-semibold uppercase tracking-[0.08em] text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function TypographyP({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn(
				"leading-7 text-foreground/90 [&:not(:first-child)]:mt-6",
				className,
			)}
			{...props}
		/>
	);
}

function TypographyBlockquote({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	return (
		<blockquote
			className={cn(
				"mt-6 border-l-2 border-primary/60 pl-6 font-mono text-sm italic tracking-wide text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function TypographyList({
	className,
	...props
}: React.HTMLAttributes<HTMLUListElement>) {
	return (
		<ul
			className={cn(
				"my-6 ml-6 list-disc space-y-2 text-foreground/90 [&>li]:mt-2 marker:text-primary",
				className,
			)}
			{...props}
		/>
	);
}

function TypographyInlineCode({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	return (
		<code
			className={cn(
				"relative rounded-sm border border-glass-border bg-glass px-[0.3rem] py-[0.2rem] font-mono text-[0.8125rem] font-medium text-primary",
				className,
			)}
			{...props}
		/>
	);
}

function TypographyLead({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p className={cn("text-xl text-muted-foreground", className)} {...props} />
	);
}

function TypographyLarge({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("text-lg font-semibold text-foreground", className)}
			{...props}
		/>
	);
}

function TypographySmall({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	return (
		<small
			className={cn(
				"font-mono text-sm font-medium leading-none text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function TypographyMuted({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p className={cn("text-sm text-muted-foreground", className)} {...props} />
	);
}

function TypographyTable({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"my-6 w-full overflow-y-auto rounded-md border border-glass-border",
				className,
			)}
			{...props}
		/>
	);
}

export {
	TypographyH1,
	TypographyH2,
	TypographyH3,
	TypographyH4,
	TypographyP,
	TypographyBlockquote,
	TypographyList,
	TypographyInlineCode,
	TypographyLead,
	TypographyLarge,
	TypographySmall,
	TypographyMuted,
	TypographyTable,
};
