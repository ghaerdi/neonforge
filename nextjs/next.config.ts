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
      // Pin libs imported by BOTH the aliased ../react/ui sources (which would
      // resolve node_modules from the repo ROOT) and nextjs/src. Duplicated
      // sonner = two module-scope toast stores = dead toasts; duplicated
      // react/lucide/recharts = silent cross-copy state bugs.
      sonner: path.resolve(here, "node_modules/sonner"),
      "lucide-react": path.resolve(here, "node_modules/lucide-react"),
      recharts: path.resolve(here, "node_modules/recharts"),
      "@tanstack/react-table": path.resolve(here, "node_modules/@tanstack/react-table"),
    },
  },
  webpack: (config) => {
    config.resolve.alias["@/components/ui"] = path.resolve(here, "../react/ui");
    // Pin ALL bare imports (from both the app src and the aliased ../react/ui
    // + ../lib sources) to the NEXTJS node_modules. Without this, files under
    // ../react/ui resolve node_modules from the repo ROOT (ancestor walk)
    // while app src resolves from nextjs/ — every shared lib (sonner, radix,
    // react-dom…) gets TWO bundled copies. sonner's toast()/<Toaster> talk via
    // a module-scope singleton, so a second copy silently breaks toasts.
    config.resolve.modules = [
      path.resolve(here, "node_modules"),
      "node_modules",
    ];
    // sonner uses a module-scope singleton store — the toast() helper and
    // <Toaster> only talk to each other through that shared instance. Without
    // forcing sonner into ONE chunk, the layout chunk (Toaster) and each page
    // chunk (widget toast() calls) each get their own copy of the module, so
    // toasts never render. Hoist it into a single named chunk for everyone.
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      cacheGroups: {
        ...(config.optimization.splitChunks?.cacheGroups ?? {}),
        sonner: {
          test: /[\\/]node_modules[\\/]sonner[\\/]/,
          name: "sonner",
          chunks: "all",
          enforce: true,
        },
      },
    };
    return config;
  },
};

export default nextConfig;
