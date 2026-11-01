import {
    projects
} from "@/data/projects";
import {
    services
} from "@/data/services";
import {
    absoluteUrl
} from "@/data/site";
import {
    getArticles
} from "@/lib/articles";
import {
    toIsoDate
} from "@/lib/format";

// Add new pages here so search engines can discover them. Leave out
// noindex pages (search, 404).
const staticRoutes = [
    "/",
    "/projects",
    "/services",
    "/about",
    "/journal",
    "/hire",
    "/contact",
    "/privacy",
    "/terms"
];

function escapeXml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

// Generated at build time.
export async function GET() {
    const articles = await getArticles();

    const urls = [
        ...staticRoutes.map((path) => ({
            loc: absoluteUrl(path)
        })),
        ...projects.map((project) => ({
            loc: absoluteUrl(`/projects/${project.slug}`)
        })),
        ...services.map((service) => ({
            loc: absoluteUrl(`/services/${service.slug}`)
        })),
        ...articles.map((article) => ({
            loc: absoluteUrl(`/journal/${article.id}`),
            lastmod: toIsoDate(article.data.updatedAt || article.data.publishedAt)
        }))
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({loc, lastmod}) => (
        `  <url><loc>${escapeXml(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`
    )).join("\n")}
</urlset>
`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8"
        }
    });
}
