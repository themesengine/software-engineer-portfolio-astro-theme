/*
 * Services shown on the home page, /services and /services/<slug>.
 *
 * `slug` must be unique and becomes the URL. `icon` picks one of the
 * small inline icons in src/components/ServiceIcon.astro ("build",
 * "api", "audit", "lead"). `priceFrom` is shown as "From £..." and is
 * optional: set it to null to hide prices.
 */

export const services = [
    {
        slug: "product-engineering",
        title: "Product engineering",
        icon: "build",
        summary: "From a validated idea to a production web product your team can keep building on.",
        intro: "For founders and product teams who need a new product, or a major new feature, designed and built properly the first time.",
        priceFrom: 9500,
        priceUnit: "per month",
        idealFor: "Seed to Series B teams without a large in-house engineering group.",
        includes: [
            "Discovery workshop and a written technical plan",
            "Architecture, data model and API design",
            "Accessible, fast front end and a well-tested back end",
            "CI/CD, monitoring and error tracking from day one",
            "Fortnightly demos and a written weekly update",
            "Handover documentation and pairing with your team"
        ],
        process: [
            {
                title: "Discover",
                text: "One or two weeks to understand the users, the constraints and what \"done\" means."
            },
            {
                title: "Build",
                text: "Short iterations with working software in a staging environment every fortnight."
            },
            {
                title: "Launch",
                text: "A gradual roll-out with monitoring, then a quiet period to fix what real users find."
            },
            {
                title: "Hand over",
                text: "Runbooks, architecture notes and pairing sessions so your team owns it."
            }
        ],
        faqs: [
            {
                question: "Do you work with designers?",
                answer: "Yes. I work happily from your designer's files, and I can recommend designers I trust if you don't have one yet."
            },
            {
                question: "Which stack do you use?",
                answer: "Usually TypeScript on the front end and TypeScript or Go on the back end, with PostgreSQL. I'll use your existing stack if it serves the product."
            }
        ]
    },
    {
        slug: "platform-and-apis",
        title: "Platform and API engineering",
        icon: "api",
        summary: "Back-end services, integrations and data pipelines that stay boring under load.",
        intro: "For teams whose product depends on payments, integrations or data moving reliably between systems.",
        priceFrom: 10500,
        priceUnit: "per month",
        idealFor: "Products with growing traffic, third-party integrations or financial data.",
        includes: [
            "API design reviews and OpenAPI specifications",
            "Event-driven and queue-based architectures",
            "Database design, migrations and query tuning",
            "Observability: tracing, metrics and useful alerts",
            "Infrastructure as code for repeatable environments",
            "Load and failure testing before launch"
        ],
        process: [
            {
                title: "Map",
                text: "Trace how data flows today, including the failure modes nobody wrote down."
            },
            {
                title: "Design",
                text: "A short design document reviewed with your team before code is written."
            },
            {
                title: "Build",
                text: "Incremental delivery, often in shadow mode next to the existing system."
            },
            {
                title: "Operate",
                text: "Dashboards, alerts and runbooks so on-call is calm rather than heroic."
            }
        ],
        faqs: [
            {
                question: "Can you work inside our existing team?",
                answer: "Yes. Most platform work happens in your repositories, with your reviews and your on-call rotation."
            },
            {
                question: "Do you handle cloud infrastructure?",
                answer: "I write Terraform for AWS and Google Cloud and keep infrastructure changes in pull requests like any other code."
            }
        ]
    },
    {
        slug: "technical-audits",
        title: "Technical audits and rescues",
        icon: "audit",
        summary: "A clear, prioritised view of what's slowing your product or your team down, and how to fix it.",
        intro: "For teams facing slow pages, fragile releases or a codebase they've inherited and don't yet trust.",
        priceFrom: 4800,
        priceUnit: "fixed price",
        idealFor: "Before a funding round, a re-platform or a big hiring push.",
        includes: [
            "Codebase, architecture and dependency review",
            "Performance profiling from browser to database",
            "Security basics: secrets, authentication, dependencies",
            "Delivery review: CI, tests, environments and releases",
            "A written report ranked by impact and effort",
            "A walkthrough session with your team and leadership"
        ],
        process: [
            {
                title: "Scope",
                text: "Agree the questions the audit must answer and who needs the report."
            },
            {
                title: "Investigate",
                text: "Two to three weeks of reading code, measuring and talking to the team."
            },
            {
                title: "Report",
                text: "A plain-English report with a prioritised plan, not a list of complaints."
            },
            {
                title: "Follow up",
                text: "Optional hands-on help to deliver the first, highest-impact fixes."
            }
        ],
        faqs: [
            {
                question: "Will the report blame the previous team?",
                answer: "No. Every codebase reflects the constraints it was built under. The report explains what to change next and why."
            },
            {
                question: "Do you sign NDAs?",
                answer: "Yes, before any access to code or data is shared."
            }
        ]
    },
    {
        slug: "fractional-tech-lead",
        title: "Fractional tech lead",
        icon: "lead",
        summary: "Senior technical leadership two days a week, until you're ready to hire full time.",
        intro: "For early teams that need architecture decisions, code review and hiring help without a full-time CTO.",
        priceFrom: 4200,
        priceUnit: "per month",
        idealFor: "Teams of two to eight engineers, or founders hiring their first engineers.",
        includes: [
            "Architecture decisions recorded and explained",
            "Code review and pairing with your engineers",
            "Engineering process: planning, releases, incidents",
            "Hiring support: role design, interviews, take-home reviews",
            "A technical voice in board and investor conversations",
            "A plan for handing over to a permanent lead"
        ],
        process: [
            {
                title: "Listen",
                text: "Two weeks of one-to-ones, code reading and sitting in on your rituals."
            },
            {
                title: "Prioritise",
                text: "A short list of the decisions and habits that matter most right now."
            },
            {
                title: "Lead",
                text: "Regular days each week, plus async review and an agreed response time."
            },
            {
                title: "Step back",
                text: "Help hire and onboard your permanent lead, then hand over cleanly."
            }
        ],
        faqs: [
            {
                question: "How many days a week?",
                answer: "Usually two fixed days, agreed in advance, with async availability in between."
            },
            {
                question: "Is there a minimum term?",
                answer: "Three months, then month to month with four weeks' notice on either side."
            }
        ]
    }
];

export function getService(slug) {
    return services.find((service) => service.slug === slug);
}
