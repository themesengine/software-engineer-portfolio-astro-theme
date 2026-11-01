import node from "@astrojs/node";
import {
    defineConfig,
    fontProviders
} from "astro/config";
import {
    loadEnv
} from "vite";

// astro.config.mjs runs before .env files are loaded, so read them here.
const env = {
    ...loadEnv("production", process.cwd(), "PUBLIC_"),
    ...process.env
};

const siteUrl =
    (env.PUBLIC_SITE_URL || "http://localhost:4321").replace(/\/+$/, "");

// Pages are prerendered to static HTML at build time. Only routes that
// export `prerender = false` (the form APIs) run on the Node server.
export default defineConfig({
    site: siteUrl,
    output: "static",
    trailingSlash: "never",
    build: {
        format: "file"
    },

    adapter: node({
        mode: "standalone",
        // Form submissions are small; reject anything larger.
        bodySizeLimit: 64 * 1024
    }),

    // The template keeps no server-side sessions.
    session: false,

    security: {
        // Trust X-Forwarded-* headers (client IP for rate limiting, HTTPS
        // behind a proxy) only for the public domain.
        allowedDomains: siteUrl.startsWith("https://")
            ? [{
                hostname: new URL(siteUrl).hostname,
                protocol: "https"
            }]
            : []
    },

    // Fonts are downloaded at build time and served from this site, so
    // visitors make no requests to Google. Change the families here.
    fonts: [
        {
            provider: fontProviders.google(),
            name: "Space Grotesk",
            cssVariable: "--font-display-family",
            weights: [500, 600, 700],
            fallbacks: ["system-ui", "sans-serif"]
        },
        {
            provider: fontProviders.google(),
            name: "Inter",
            cssVariable: "--font-body-family",
            weights: [400, 500, 600],
            fallbacks: ["system-ui", "sans-serif"]
        }
    ],

    integrations: [
        {
            name: "site-url-warning",
            hooks: {
                "astro:build:start": ({logger}) => {
                    if (!env.PUBLIC_SITE_URL) {
                        logger.warn(
                            "PUBLIC_SITE_URL is not set. Canonical links, Open Graph tags and " +
                            "sitemap.xml will point to http://localhost:4321. Set it in .env or " +
                            "your hosting provider before deploying."
                        );
                    }
                }
            }
        }
    ]
});
