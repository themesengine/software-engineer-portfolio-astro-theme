import {
    site
} from "@/data/site";

// "en_GB" (Open Graph format) -> "en-GB" (Intl format).
const locale =
    site.locale.replace("_", "-");

// Accepts a Date (content collections) or a YYYY-MM-DD string, and
// formats in UTC so the build server's time zone can never shift it.
export function formatDate(date, month = "long") {
    const value =
        date instanceof Date ? date : new Date(`${date}T00:00:00Z`);

    return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month,
        timeZone: "UTC",
        year: "numeric"
    }).format(value);
}

// For <time datetime="...">, sitemap lastmod and structured data.
export function toIsoDate(date) {
    return date instanceof Date ? date.toISOString().slice(0, 10) : date;
}

export function formatPrice(amount, currency = site.currency || "GBP") {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: Number.isInteger(amount) ? 0 : 2
    }).format(amount);
}
