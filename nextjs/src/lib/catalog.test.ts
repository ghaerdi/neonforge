import { describe, it, expect } from "vitest";

import { groupOf } from "./catalog";

describe("catalog.groupOf", () => {
	it("returns the group label for a known component", () => {
		expect(groupOf("button")).toBe("Core");
		expect(groupOf("input")).toBe("Forms");
		expect(groupOf("accordion")).toBe("Disclosure");
		expect(groupOf("chart")).toBe("Charts");
	});

	it("falls back to Core for an unknown component", () => {
		expect(groupOf("::not-a-component::")).toBe("Core");
		expect(groupOf("")).toBe("Core");
	});
});
