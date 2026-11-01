import {
    absoluteUrl,
    site
} from "@/data/site";
import {
    toIsoDate
} from "@/lib/format";

// Escapes "<" so values such as "</script>" cannot close the tag early.
export function serializeJsonLd(data) {
    return JSON.stringify(data)
        .replace(/</g, "\\u003c");
}

/*
 * Site-wide structured data, rendered on every page by SEO.astro.
 * Add topic-specific properties here (openingHoursSpecification,
 * servesCuisine, medicalSpecialty, priceRange, ...).
 */
export function createSiteSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": site.schemaType,
        // A person is named as themselves; a business by its legal name.
        name: site.schemaType === "Person" ? site.name : site.legalName || site.name,
        description: site.description,
        url: site.url,
        image: absoluteUrl(site.defaultImage),
        email: site.email,
        telephone: site.phone.value
    };

    // Portfolio specifics: what the person does, knows and trades as.
    if (site.jobTitle) {
        schema.jobTitle = site.jobTitle;
    }

    if (site.schemaType === "Person" && site.legalName) {
        schema.worksFor = {
            "@type": "Organization",
            name: site.legalName
        };
    }

    if (site.expertise?.length > 0) {
        schema.knowsAbout = site.expertise;
    }

    // A city is enough for a freelancer; the street is optional.
    if (site.address.street || site.address.city) {
        schema.address = {
            "@type": "PostalAddress",
            streetAddress: site.address.street || undefined,
            addressLocality: site.address.city,
            addressRegion: site.address.region || undefined,
            postalCode: site.address.postalCode || undefined,
            addressCountry: site.address.countryCode
        };
    }

    const socialProfiles =
        Object.values(site.social || {})
            .filter(Boolean);

    if (socialProfiles.length > 0) {
        schema.sameAs = socialProfiles;
    }

    return schema;
}

// `article` is an entry from getArticles() (src/lib/articles.js).
export function createArticleSchema(article, path) {
    const {
        data
    } = article;

    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: data.title,
        description: data.excerpt,
        datePublished: toIsoDate(data.publishedAt),
        dateModified: toIsoDate(data.updatedAt || data.publishedAt),
        image: absoluteUrl(data.image.src),
        mainEntityOfPage: absoluteUrl(path),
        author: {
            "@type": data.author ? "Person" : "Organization",
            name: data.author || site.name
        },
        publisher: {
            "@type": "Organization",
            name: site.legalName || site.name,
            url: site.url
        }
    };
}

export function createBreadcrumbSchema(items) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: item.href ? absoluteUrl(item.href) : undefined
        }))
    };
}
