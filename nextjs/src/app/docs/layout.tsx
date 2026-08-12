"use client";

import { usePathname } from "next/navigation";

import { Shell } from "@/components/docs/shell";
import { DocsSidebar } from "@/components/docs/DocsSidebar";

/** Shared layout for all /docs pages — persists the Shell + docs sidebar so
 *  the section nav stays mounted during navigation. */
export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<Shell active={pathname} sidebar={<DocsSidebar active={pathname} />}>
			{children}
		</Shell>
	);
}
