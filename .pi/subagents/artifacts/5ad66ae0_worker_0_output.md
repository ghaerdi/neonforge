All verified. The refactor is complete:
- `CreateShowcase.tsx`: 1502 lines → 50 lines (thin aggregator).
- 4 group files: atmosphere (6 widgets), telemetry (6), social (4), economy (5) = 21 widgets + LoginShowcase.
- Shared primitives in `card-ui.tsx`.
- tsc clean, render verified (Cyberpunk widgets + Sleep tracker present on /create).

The `@/` "not a dependency" warnings are the documented false positives (deno-linter doesn't resolve the Next.js path alias) — every pre-existing file in the repo has the same pattern; tsc is the gate and it passes. The formatter reformatted some files after my writes, but they still typecheck and render.