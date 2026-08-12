import type { Metadata } from "next";
import Script from "next/script";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neonforge — cyberpunk glass registry",
  description:
    "Cyberpunk · industrial · glass — a component registry for shadcn CLI.",
};

// Static pre-paint script (constant string, no user input): applies the theme
// Applied before first paint so there's no theme flash (FOUC). Runs inline,
// so it must stay dependency-free and self-contained — but the codec logic
// mirrors nextjs/src/lib/preset-codec.ts exactly and uses modern syntax.
// Precedence: URL ?preset= > saved localStorage preset > streetkid default.
const THEME_PREPAINT = `(() => {
	const documentEl = document.documentElement;
	const ATTRIBUTE_NAMES = ["nfStyle", "nfSemantic", "nfBase", "nfAccent", "nfChart", "nfFontBody", "nfFontHeading", "nfShape"];
	const AXIS_OPTIONS = [
		["streetkid", "nomad", "corpo"],
		["default", "hazard", "cyber", "acid", "ember", "neon"],
		["carbon", "void", "steel", "graphite", "smoke", "obsidian"],
		["hazard", "cyan", "blue", "red", "acid", "violet", "amber", "signal"],
		["hazard", "cyber", "reactor", "acid", "mono", "ember", "neon", "ghost"],
		["chakra", "rajdhani", "inter", "space-grotesk", "orbitron", "instrument-serif"],
		["chakra", "rajdhani", "inter", "space-grotesk", "orbitron", "instrument-serif"],
		["rect", "round"],
	];
	const DEFAULTS = ["streetkid", "ember", "void", "cyan", "ember", "inter", "chakra", "rect"];

	const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const SCRAMBLE = "7k0cLOf326NvZ81owlmgnsyYbpGXJF5qIQuxdKetj4APzSarTVhRHUM9CDWBiE";

	const applyValues = (values) => {
		for (let j = 0; j < ATTRIBUTE_NAMES.length; j++) documentEl.dataset[ATTRIBUTE_NAMES[j]] = values[j];
	};
	const applyDefault = () => applyValues(DEFAULTS);

	// Light/dark preference — default dark (data-nf-mode unset = dark).
	try {
		const savedMode = localStorage.getItem("nf-mode");
		if (savedMode === "light" || savedMode === "dark") documentEl.dataset.nfMode = savedMode;
	} catch {
		/* ignore storage failures */
	}

	// Resolve the preset code strictly from the URL. No code → streetkid default.
	const query = new URLSearchParams(location.search);
	const code = query.get("preset");
	if (!code) {
		applyDefault();
		return;
	}

	// Decode the obfuscated preset code (mirror of preset-codec.ts).
	const scrambleIndexOf = (c) => SCRAMBLE.indexOf(c);
	const decipher = (str) => [...str].map((c) => BASE62[scrambleIndexOf(c)]).join("");
	const fromBase62 = (str) => [...str].reduce((n, c) => n * 62 + BASE62.indexOf(c), 0);
	const checksumOf = (str) => BASE62[[...str].reduce((sum, c) => sum + BASE62.indexOf(c), 0) % 62];

	try {
		if (code[0] === "N") {
			const body = code.slice(1);
			if (body.length >= 2) {
				const payload = body.slice(0, -1);
				if (checksumOf(payload) === body[body.length - 1]) {
					let num = fromBase62(decipher(payload));
					const values = [];
					for (let i = ATTRIBUTE_NAMES.length - 1; i >= 0; i--) {
						const size = AXIS_OPTIONS[i].length;
						const index = num % size;
						num = (num - index) / size;
						values[i] = AXIS_OPTIONS[i][index] !== undefined ? AXIS_OPTIONS[i][index] : DEFAULTS[i];
					}
					applyValues(values);
					return;
				}
			}
		}
	} catch {
		/* fall through to default on any decode error */
	}
	applyDefault();
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Share+Tech+Mono&family=Instrument+Serif:ital@0;1&family=Orbitron:wght@500;700;800&family=Rajdhani:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-svh bg-background text-foreground antialiased">
        {children}
        <Toaster richColors position="bottom-right" />
        <Script id="neonforge-theme" strategy="beforeInteractive">
          {THEME_PREPAINT}
        </Script>
      </body>
    </html>
  );
}
