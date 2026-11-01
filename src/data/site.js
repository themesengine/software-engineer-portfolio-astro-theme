/*
 * Central site configuration.
 *
 * Most buyers only need to edit this file to rebrand the theme: the
 * name, contact details, SEO defaults, and structured data (Schema.org
 * JSON-LD) are all generated from these values.
 */

const siteUrl =
    (import.meta.env.PUBLIC_SITE_URL || "http://localhost:4321")
        .replace(/\/+$/, "");

export const site = {
    url: siteUrl,
    // Set PUBLIC_SITE_NOINDEX=true to keep staging sites out of search engines.
    noIndex: import.meta.env.PUBLIC_SITE_NOINDEX === "true",

    name: "Mira Castell",
    legalName: "Mira Castell Engineering Ltd",
    descriptor: "Independent Software Engineer",
    title: "Mira Castell | Independent Software Engineer",
    description: "Mira Castell is an independent software engineer in Bristol who designs, builds and rescues web platforms, APIs and developer tools for product teams.",
    tagline: "I build reliable software for teams that ship.",
    locale: "en_GB",
    language: "en",
    currency: "GBP",
    defaultImage: "/images/og-default.jpg",
    themeColor: "#0b0d10",

    // Schema.org type. "Person" suits a solo portfolio; use
    // "ProfessionalService" if you present a studio instead.
    schemaType: "Person",
    jobTitle: "Software Engineer",
    // Shown in the site schema (knowsAbout) and the about page.
    expertise: [
        "TypeScript",
        "Go",
        "PostgreSQL",
        "Distributed systems",
        "Developer tooling",
        "Web performance"
    ],

    email: "hello@miracastell.example",
    phone: {
        display: "+44 117 496 0123",
        value: "+441174960123"
    },
    address: {
        street: "",
        city: "Bristol",
        region: "",
        postalCode: "",
        country: "United Kingdom",
        countryCode: "GB"
    },

    // Availability badge on the home and hire pages. Set `open` to false
    // when you are fully booked; `note` explains what happens next.
    availability: {
        open: true,
        label: "Available for new projects from January 2027",
        note: "I take on two client engagements at a time. Enquiries are answered within two working days."
    },

    // Where the "Download CV" link points. Put the file in public/ or
    // leave empty to hide the link.
    cvUrl: "",

    // Profile URLs are added to structured data (sameAs) and the footer.
    // Leave a value empty to hide it.
    social: {
        github: "https://github.com/",
        linkedin: "https://www.linkedin.com/",
        mastodon: ""
    },

    // Shows a "demonstration content" notice on the legal pages. Set to
    // false once your legal content has been reviewed.
    showDemoContentNotice: true,

    // Date shown on the privacy, terms and cookie pages (YYYY-MM-DD).
    legalUpdatedAt: "2026-11-01"
};

export function absoluteUrl(path = "/") {
    if (/^https?:\/\//.test(path)) {
        return path;
    }

    return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
