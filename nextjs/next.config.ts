import path from "node:path";
import type { NextConfig } from "next";

// The app dir for this NextJS package. Monorepo sources (react/ui, lib) live
// one level up at the repo root.
const here = process.cwd();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Alias monorepo sources (react/ui, lib) that live one level up. Both
  // tsconfig `paths` AND these resolve aliases point at the same dirs, so the
  // aliases work under Turbopack (dev) and webpack (build/start) alike.
  turbopack: {
    root: path.resolve(here, ".."),
    resolveAlias: {
      "@/components/ui": path.resolve(here, "../react/ui"),
      "@/lib": path.resolve(here, "../lib"),
    },
  },
  webpack: (config) => {
    config.resolve.alias["@/components/ui"] = path.resolve(here, "../react/ui");
    config.resolve.alias["@/lib"] = path.resolve(here, "../lib");
    return config;
  },
};

export default nextConfig;
