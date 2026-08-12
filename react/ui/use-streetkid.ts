"use client";

import * as React from "react";

/**
 * True when the active genre is "streetkid". SSR-safe (defaults false on the
 * server/before hydration) AND reactive — watches the <html data-nf-style>
 * attribute so switching genres live-updates consumers without a remount.
 */
export function useStreetkid(): boolean {
	const [streetkid, setStreetkid] = React.useState(false);

	React.useEffect(() => {
		const read = () =>
			setStreetkid(document.documentElement.dataset.nfStyle === "streetkid");
		read();
		// Re-evaluate whenever data-nf-style changes (genre switch, reset, load).
		const mo = new MutationObserver(read);
		mo.observe(document.documentElement, { attributes: true });
		window.addEventListener("storage", read);
		return () => {
			mo.disconnect();
			window.removeEventListener("storage", read);
		};
	}, []);

	return streetkid;
}
