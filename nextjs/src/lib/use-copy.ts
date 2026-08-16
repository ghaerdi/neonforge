"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Clipboard copy with a transient "copied" marker.
 *
 * `copy(key, text)` writes to the clipboard (failures are ignored — e.g.
 * non-secure context) and marks `key` as copied for `resetMs`, so a label or
 * button can swap to a "copied ✓" state and settle back. Shared by CopyButton
 * and the Get-code dialog so the clipboard + timer logic lives in one place.
 */
export function useCopy<T extends string = string>(resetMs = 1800) {
	const [copiedKey, setCopiedKey] = useState<T | null>(null);
	const timer = useRef<number | null>(null);

	const copy = useCallback(
		(key: T, text: string) => {
			void navigator.clipboard.writeText(text).catch(() => {});
			setCopiedKey(key);
			if (timer.current !== null) window.clearTimeout(timer.current);
			timer.current = window.setTimeout(() => setCopiedKey(null), resetMs);
		},
		[resetMs],
	);

	// drop the pending reset timer on unmount
	useEffect(
		() => () => {
			if (timer.current !== null) window.clearTimeout(timer.current);
		},
		[],
	);

	return { copiedKey, copy };
}
