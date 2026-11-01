/*
 * Personal content for the home and about pages: the portrait, the
 * short bio, the experience timeline, the tools you use and the
 * "how I work" principles. Replace everything with your own story.
 */

import portraitImage from "@/assets/images/portrait.jpg";

export const portrait = {
    image: portraitImage,
    // Describe your real photo here, e.g. "Mira smiling at her desk".
    alt: "Placeholder portrait of Mira Castell"
};

export const intro = {
    eyebrow: "Software engineer · Bristol, UK",
    heading: "I build reliable software for teams that ship.",
    text: "I'm Mira, an independent engineer with twelve years of experience in web platforms, APIs and developer tools. I join product teams for a few months, deliver the hard parts and leave the code better documented than I found it."
};

export const bio = [
    "I started out writing PHP for a local newspaper and have since worked in fintech, healthcare and developer tooling, at companies from four people to four thousand.",
    "These days I work independently with a small number of clients at a time. Most engagements involve a system that has to be dependable: money moving between accounts, patients booking appointments, researchers trusting their data.",
    "I care about clear writing as much as clear code. Every engagement ends with documentation, a recorded walkthrough and a team that is confident running what we built together.",
    "Outside work I maintain a couple of small open-source tools, mentor career changers through a local bootcamp and spend too much time cycling up hills around Bristol."
];

// Trust figures on the home page. Demo content: replace with your own.
export const highlights = [
    {
        value: "12 years",
        label: "building for the web"
    },
    {
        value: "30+",
        label: "projects shipped"
    },
    {
        value: "2",
        label: "clients at a time, at most"
    }
];

// Shown on the home page as a scrolling row of names. Leave empty to hide.
export const clientNames = [
    "Ledgerline",
    "Harbour Health",
    "Fieldkit",
    "Quarry Analytics",
    "Northgate Labs",
    "Kestrel Insurance"
];

export const principles = [
    {
        title: "Small, reversible steps",
        text: "Feature flags, shadow modes and gradual roll-outs. Big-bang releases are where projects go to die."
    },
    {
        title: "Write it down",
        text: "Design notes, decision records and runbooks are part of the work, not an afterthought."
    },
    {
        title: "Measure first",
        text: "Performance, reliability and cost are measured before they're optimised."
    },
    {
        title: "Leave a team behind",
        text: "Success is your engineers owning the system confidently after I've gone."
    }
];

export const experience = [
    {
        period: "2022 to now",
        role: "Independent software engineer",
        company: "Mira Castell Engineering Ltd",
        text: "Product, platform and audit engagements for fintech, healthcare and SaaS teams."
    },
    {
        period: "2018 to 2022",
        role: "Staff engineer",
        company: "Northgate Labs",
        text: "Led the payments platform team and introduced the company's design-review process."
    },
    {
        period: "2015 to 2018",
        role: "Senior engineer",
        company: "Kestrel Insurance",
        text: "Moved the quote engine from a monolith to services and built the internal developer portal."
    },
    {
        period: "2013 to 2015",
        role: "Web developer",
        company: "Avon Courier Digital",
        text: "Built the newsroom's publishing tools and the paper's first responsive website."
    }
];

export const toolbox = [
    {
        title: "Languages",
        items: ["TypeScript", "Go", "SQL", "Python", "Bash"]
    },
    {
        title: "Front end",
        items: ["Astro", "React", "Web Components", "CSS", "Playwright"]
    },
    {
        title: "Back end and data",
        items: ["Node.js", "PostgreSQL", "Kafka", "Redis", "ClickHouse"]
    },
    {
        title: "Infrastructure",
        items: ["AWS", "Google Cloud", "Terraform", "Docker", "OpenTelemetry"]
    }
];
