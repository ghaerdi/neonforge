// Deno std file server for the shadcn registry payloads (public/r).
// Replaces the python3 http.server serve-local.sh — pure Deno, no python.
import { serveDir } from "@std/http";

const ROOT = new URL("../public", import.meta.url).pathname;
const PORT = Number(Deno.env.get("PORT") ?? 4173);

Deno.serve({ port: PORT, hostname: "0.0.0.0" }, (req) =>
  serveDir(req, {
    fsRoot: ROOT,
    showDirListing: false,
    enableCors: false,
  }));
