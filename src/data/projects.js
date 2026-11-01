/*
 * Case studies shown on /projects and /projects/<slug>.
 *
 * Add a project by copying an entry. `slug` must be unique and becomes
 * the URL. Put the cover image in src/assets/images/projects/ and import
 * it at the top. `services` lists slugs from src/data/services.js.
 * `outcomes` are short figures shown as highlights: use real, checkable
 * numbers only (the demo ones are invented and labelled as such).
 */

import fieldkitImage from "@/assets/images/projects/fieldkit.jpg";
import harbourHealthImage from "@/assets/images/projects/harbour-health.jpg";
import ledgerlineImage from "@/assets/images/projects/ledgerline.jpg";
import quarryImage from "@/assets/images/projects/quarry.jpg";

export const projects = [
    {
        slug: "ledgerline-reconciliation-api",
        title: "A reconciliation API that finance teams trust",
        shortTitle: "Ledgerline reconciliation API",
        client: "Ledgerline",
        sector: "Fintech",
        year: "2026",
        duration: "7 months",
        role: "Lead backend engineer",
        featured: true,
        image: ledgerlineImage,
        imageAlt: "Diagram of connected services with one highlighted node, representing the reconciliation pipeline",
        summary: "Replaced a nightly batch job with an event-driven reconciliation service that matches bank transactions to invoices within minutes.",
        stack: ["Go", "PostgreSQL", "Kafka", "OpenTelemetry", "Terraform"],
        services: ["platform-and-apis", "fractional-tech-lead"],
        outcomes: [
            {
                value: "Minutes",
                label: "from bank feed to matched invoice, down from next morning"
            },
            {
                value: "0",
                label: "double-booked payments since launch"
            },
            {
                value: "3",
                label: "engineers onboarded to own the service"
            }
        ],
        challenge: [
            "Ledgerline's customers reconciled payments with a batch job that ran overnight. When it failed, finance teams started the day with stale numbers and a support queue full of \"where is my payment?\" tickets.",
            "The job had grown over five years into a single 4,000-line script. Nobody wanted to touch it, and every bank added a new edge case."
        ],
        approach: [
            "Mapped every bank feed format and failure mode with the support team before writing any code.",
            "Split ingestion, matching and posting into small Go services connected by Kafka topics, each with an idempotency key so retries never double-post.",
            "Kept PostgreSQL as the single source of truth and used an outbox table instead of distributed transactions.",
            "Ran the new pipeline in shadow mode for six weeks, comparing results with the old job every night before switching over."
        ],
        result: "The overnight job was switched off in a single release with no customer-facing incident. The in-house team now owns the service, with runbooks and dashboards written alongside the code.",
        testimonial: {
            quote: "Mira didn't just rebuild the system, she left us a team that understands it. The handover was the best I've seen from a contractor.",
            author: "Head of Engineering, Ledgerline"
        },
        url: ""
    },
    {
        slug: "harbour-health-booking-platform",
        title: "Rebuilding patient booking for a growing clinic group",
        shortTitle: "Harbour Health booking",
        client: "Harbour Health",
        sector: "Healthcare",
        year: "2025",
        duration: "5 months",
        role: "Full-stack engineer",
        featured: true,
        image: harbourHealthImage,
        imageAlt: "Code editor window with highlighted lines, representing the booking platform's source",
        summary: "A fast, accessible booking flow and staff calendar that replaced three separate scheduling tools across nine clinics.",
        stack: ["TypeScript", "Astro", "Node.js", "PostgreSQL", "Playwright"],
        services: ["product-engineering"],
        outcomes: [
            {
                value: "1",
                label: "booking system instead of three"
            },
            {
                value: "WCAG 2.2 AA",
                label: "audited booking flow"
            },
            {
                value: "9",
                label: "clinics moved over without downtime"
            }
        ],
        challenge: [
            "Each clinic in the group had picked its own booking tool. Patients saw different flows depending on which clinic they chose, and reception staff copied appointments between systems by hand.",
            "Many patients book on older phones and assistive technology, so accessibility and page weight mattered as much as features."
        ],
        approach: [
            "Ran short sessions with reception staff at two clinics to learn how bookings really happen, including the phone calls.",
            "Built a server-rendered booking flow with progressive enhancement, so it works without JavaScript and on slow connections.",
            "Designed the availability model around clinicians rather than rooms, which removed most of the double-booking edge cases.",
            "Moved clinics over one at a time behind a feature flag, with end-to-end tests covering every appointment type."
        ],
        result: "All nine clinics run on one system. Reception teams stopped re-keying appointments, and the booking flow passed an external accessibility audit before launch.",
        testimonial: {
            quote: "Calm, clear and thorough. Our receptionists actually asked to keep the weekly demos going after launch.",
            author: "Operations Director, Harbour Health"
        },
        url: ""
    },
    {
        slug: "fieldkit-offline-survey-app",
        title: "Offline-first data collection for field ecologists",
        shortTitle: "Fieldkit offline app",
        client: "Fieldkit",
        sector: "Environmental research",
        year: "2025",
        duration: "4 months",
        role: "Engineer and technical adviser",
        featured: true,
        image: fieldkitImage,
        imageAlt: "Concentric rings with scattered points, representing survey locations syncing to a central store",
        summary: "A survey app that keeps working in valleys without signal and syncs safely when researchers get back in range.",
        stack: ["TypeScript", "SQLite", "Service Workers", "Go", "CRDTs"],
        services: ["product-engineering", "technical-audits"],
        outcomes: [
            {
                value: "Offline",
                label: "by default, with no lost surveys during field trials"
            },
            {
                value: "2",
                label: "researchers editing the same site record without conflicts"
            },
            {
                value: "1 week",
                label: "to add a new survey type, down from a full release cycle"
            }
        ],
        challenge: [
            "Researchers recorded species counts on paper because the previous app lost data when it went offline mid-survey.",
            "Surveys change every season, and each change used to need a developer and a new app release."
        ],
        approach: [
            "Audited the old app and wrote up why it lost data before proposing a rebuild.",
            "Stored every survey locally in SQLite and synced with a simple, append-only change log instead of last-write-wins.",
            "Defined survey forms as versioned JSON schemas so the research team can add questions without a release.",
            "Tested sync on throttled and flaky networks in CI, not just on the office Wi-Fi."
        ],
        result: "The team ran a full season of field work on the new app. Survey types are now edited by the researchers themselves and reviewed in a pull request.",
        testimonial: null,
        url: ""
    },
    {
        slug: "quarry-analytics-performance",
        title: "Making a slow analytics dashboard feel instant",
        shortTitle: "Quarry performance rescue",
        client: "Quarry Analytics",
        sector: "B2B SaaS",
        year: "2024",
        duration: "8 weeks",
        role: "Performance consultant",
        featured: false,
        image: quarryImage,
        imageAlt: "Bar chart with a rising trend line, representing improved dashboard performance",
        summary: "A focused performance engagement on a dashboard that customers described as \"the loading spinner\".",
        stack: ["React", "TypeScript", "PostgreSQL", "ClickHouse", "Grafana"],
        services: ["technical-audits"],
        outcomes: [
            {
                value: "Seconds",
                label: "to first chart, down from tens of seconds on large accounts"
            },
            {
                value: "12",
                label: "slow queries rewritten or pre-aggregated"
            },
            {
                value: "1",
                label: "performance budget enforced in CI"
            }
        ],
        challenge: [
            "Quarry's largest customers waited the longest, which is the opposite of what a growing SaaS business wants.",
            "Previous attempts had focused on the front end, but nobody had measured where the time actually went."
        ],
        approach: [
            "Added tracing from the browser to the database so every slow request could be explained.",
            "Moved heavy aggregations to ClickHouse materialised views and kept PostgreSQL for transactional data.",
            "Streamed the first chart while the rest loaded, and removed two large client-side dependencies.",
            "Added a performance budget to CI so the gains don't quietly erode."
        ],
        result: "The dashboard loads its first chart in seconds for every account size, and the team has the tracing and budgets to keep it that way.",
        testimonial: {
            quote: "Eight weeks, a clear report and a measurably faster product. Exactly what we hired for.",
            author: "CTO, Quarry Analytics"
        },
        url: ""
    }
];

export function getProject(slug) {
    return projects.find((project) => project.slug === slug);
}

export function getProjectsForService(serviceSlug) {
    return projects.filter((project) => project.services.includes(serviceSlug));
}
