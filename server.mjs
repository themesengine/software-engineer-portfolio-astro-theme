/*
 * Production server: `yarn start` (or `node server.mjs`) after `yarn build`.
 *
 * Runs the Astro Node adapter, which serves the prerendered pages, assets
 * and form APIs, and adds security headers to every response. Astro
 * middleware cannot do this for prerendered pages, hence this wrapper.
 */

import {
    existsSync,
    readdirSync
} from "node:fs";
import {
    createServer
} from "node:http";

// Stop the adapter from starting its own server when imported.
process.env.ASTRO_NODE_AUTOSTART = "disabled";

const {
    handler
} = await import("./dist/server/entry.mjs");

const securityHeaders = {
    "Strict-Transport-Security": "max-age=63072000",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), browsing-topics=()"
};

/*
 * With build.format "file", a list page and its detail pages produce both
 * "projects.html" and a "projects/" folder. The adapter treats "/projects"
 * as the folder and looks for "projects/index.html", which doesn't exist,
 * so map those URLs to the ".html" file before handing them over.
 */
const clientDirectory = new URL("./dist/client/", import.meta.url);

function findPagesWithFolders(directory, prefix = "") {
    return readdirSync(directory, {withFileTypes: true})
        .filter((entry) => entry.isDirectory() && entry.name !== "_astro")
        .flatMap((entry) => {
            const urlPath = `${prefix}/${entry.name}`;
            const folder = new URL(`${entry.name}/`, directory);
            const pages = existsSync(new URL(`${entry.name}.html`, directory)) ? [urlPath] : [];

            return [...pages, ...findPagesWithFolders(folder, urlPath)];
        });
}

const pagesWithFolders =
    new Set(findPagesWithFolders(clientDirectory));

function rewritePageUrl(url = "/") {
    const queryIndex = url.indexOf("?");
    const pathname = queryIndex >= 0 ? url.slice(0, queryIndex) : url;

    return pagesWithFolders.has(pathname)
        ? `${pathname}.html${queryIndex >= 0 ? url.slice(queryIndex) : ""}`
        : url;
}

const host = process.env.HOST || "localhost";
const port = Number(process.env.PORT || 4321);

const server = createServer((req, res) => {
    for (const [key, value] of Object.entries(securityHeaders)) {
        res.setHeader(key, value);
    }

    req.url = rewritePageUrl(req.url);

    handler(req, res);
});

server.listen(port, host, () => {
    console.info(`Listening on http://${host}:${port}`);
});

// Docker sends SIGTERM on stop; finish open requests, then exit.
for (const signal of ["SIGTERM", "SIGINT"]) {
    process.on(signal, () => {
        server.close(() => process.exit(0));
    });
}
