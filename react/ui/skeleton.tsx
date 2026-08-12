import { cn } from "@/lib/utils";

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"relative overflow-hidden rounded-sm bg-glass-strong",
				"after:absolute after:inset-0 after:bg-[linear-gradient(110deg,transparent,oklch(1_0_0/0.08),transparent)] after:bg-[length:200%_100%] after:animate-nf-shimmer",
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
