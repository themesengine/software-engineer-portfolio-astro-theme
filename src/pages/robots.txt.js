import {
    absoluteUrl,
    site
} from "@/data/site";

// Generated at build time. PUBLIC_SITE_NOINDEX=true (staging) blocks all
// crawling.
export function GET() {
    const lines = site.noIndex
        ? [
            "User-agent: *",
            "Disallow: /"
        ]
        : [
            "User-agent: *",
            "Allow: /",
            "Disallow: /api/",
            "",
            `Sitemap: ${absoluteUrl("/sitemap.xml")}`
        ];

    return new Response(`${lines.join("\n")}\n`, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8"
        }
    });
}
