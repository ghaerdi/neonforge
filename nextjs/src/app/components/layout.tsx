"use client";

import { usePathname } from "next/navigation";

import { Shell } from "@/components/docs/shell";
import { ComponentSidebar } from "@/components/docs/sidebar";

function activeOf(path: string): string {
	if (path.startsWith("/components")) return path;
	return "/";
}

/** Shared layout for all /components pages — persists the Shell + sidebar
 *  across navigation so sidebar scroll position is not reset. */
export default function ComponentsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const active = activeOf(pathname);

	return (
		<Shell active={active} sidebar={<ComponentSidebar active={active} />}>
			{children}
		</Shell>
	);
}
