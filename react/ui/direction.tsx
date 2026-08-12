"use client";

import type * as React from "react";
import {
	DirectionProvider as RadixDirectionProvider,
	useDirection,
} from "@radix-ui/react-direction";

type DirectionProviderProps = Omit<
	React.ComponentProps<typeof RadixDirectionProvider>,
	"dir"
> & {
	dir?: React.ComponentProps<typeof RadixDirectionProvider>["dir"];
	direction?: React.ComponentProps<typeof RadixDirectionProvider>["dir"];
};

function DirectionProvider({
	dir = "ltr",
	direction,
	children,
}: DirectionProviderProps) {
	return (
		<RadixDirectionProvider dir={direction ?? dir}>
			{children}
		</RadixDirectionProvider>
	);
}

export { DirectionProvider, useDirection };
