#!/usr/bin/env bash
# Serve public/ (registry payloads) for local `shadcn add http://localhost:4173/r/...`
set -euo pipefail
cd "$(dirname "$0")/.."
PORT="${PORT:-4173}"
echo "Serving public/ on :${PORT} — try: npx shadcn@latest add http://localhost:${PORT}/r/button.json"
python3 -m http.server "${PORT}" --directory public
