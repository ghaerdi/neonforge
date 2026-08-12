{
  pkgs,
  config,
  ...
}: {
  # ── Toolchain ──────────────────────────────────────────────────────────────
  # This repo drives everything through the root `deno.json` task runner, but
  # the actual package manager is bun (bun.lock) and Next.js runs on Node.
  # Dev servers + builds go through `deno task`, not raw bun/npm.

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_24;
    bun.enable = true; # package manager (bun.lock)
    npm.enable = false;
  };

  languages.typescript.enable = true;

  languages.deno.enable = true;

  languages.nix = {
    enable = true;
    lsp.enable = true;
    lsp.package = pkgs.nil;
  };
  packages = [pkgs.lolcat pkgs.git];

  # ── Scripts (mirror deno.json tasks) ───────────────────────────────────────
  scripts = {
    dev.exec = "deno task dev"; # Next.js site on :3000
    "registry:build".exec = "deno task registry:build";
    "registry:serve".exec = "deno task registry:serve"; # registry on :4173
    check.exec = "deno task registry:build";
  };

  git-hooks.hooks = {
    alejandra.enable = true;
    deadnix.enable = true;
    denofmt = {
      enable = true;
      # Only the registry server is Deno. Next/React source (react, lib,
      # nextjs) and the bun build script are checked by their own toolchains
      # (Next tsc / bun), so Deno's formatter+ linter must not touch them.
      files = "scripts/.*\\.ts$";
      excludes = [".agents" "node_modules"];
    };
    denolint = {
      enable = true;
      # Only the registry server is Deno. Next/React source (react, lib,
      # nextjs) and the bun build script are linted by their own toolchains
      # (Next tsc / bun), never by deno (which can't resolve @/ aliases or
      # extensionless imports and flags web `window` usage).
      files = "scripts/.*\\.ts$";
      excludes = [".agents" "node_modules"];
    };
    deno-check = {
      enable = true;
      name = "deno-check";
      # Deno scripts are typechecked by `deno check`; the root tsc excludes them.
      entry = "${config.languages.deno.package}/bin/deno check scripts/serve-deno.ts";
      files = "\\.ts$";
      pass_filenames = false;
      excludes = [".agents" "node_modules" "nextjs/.next"];
    };
  };

  enterShell = ''
    echo "Welcome to Neonforge!" | ${pkgs.lolcat}/bin/lolcat
    echo
    echo "  Next.js site : deno task dev   (:3000)"
    echo "  Registry build: deno task registry:build"
    echo "  Registry serve: deno task registry:serve (:4173)"
  '';

  enterTest = ''
    echo "Running Neonforge checks"
    deno task registry:build
  '';
}
