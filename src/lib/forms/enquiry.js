import {
    collectErrors,
    email,
    maxLength,
    minLength,
    oneOf,
    required,
    toText
} from "@/lib/forms/rules";

/*
 * Project enquiry form (/hire): options, normalization and validation
 * shared by src/components/EnquiryForm.astro (instant feedback in the
 * browser) and src/pages/api/enquiry.js (authoritative check). Edit the
 * options here and both stay in sync.
 */

export const projectTypeOptions = [
    {
        value: "product",
        label: "New product or feature"
    },
    {
        value: "platform",
        label: "Back end, APIs or integrations"
    },
    {
        value: "audit",
        label: "Technical audit or performance rescue"
    },
    {
        value: "lead",
        label: "Fractional tech lead"
    },
    {
        value: "other",
        label: "Something else"
    }
];

export const budgetOptions = [
    {
        value: "",
        label: "Select a range"
    },
    {
        value: "under-10k",
        label: "Under £10,000"
    },
    {
        value: "10k-25k",
        label: "£10,000 to £25,000"
    },
    {
        value: "25k-50k",
        label: "£25,000 to £50,000"
    },
    {
        value: "over-50k",
        label: "Over £50,000"
    },
    {
        value: "unsure",
        label: "Not sure yet"
    }
];

export const timelineOptions = [
    {
        value: "",
        label: "Select a timeline"
    },
    {
        value: "asap",
        label: "As soon as possible"
    },
    {
        value: "1-3-months",
        label: "In the next 1 to 3 months"
    },
    {
        value: "3-6-months",
        label: "In 3 to 6 months"
    },
    {
        value: "flexible",
        label: "Flexible"
    }
];

const values = (options) =>
    options.map((option) => option.value).filter(Boolean);

export function normalizeEnquiryRequest(payload = {}) {
    return {
        name: toText(payload.name),
        email: toText(payload.email).toLowerCase(),
        company: toText(payload.company),
        projectType: toText(payload.projectType) || "product",
        budget: toText(payload.budget),
        timeline: toText(payload.timeline),
        message: toText(payload.message)
    };
}

export function validateEnquiryRequest(request) {
    return collectErrors(request, {
        name: [
            required("Enter your name."),
            maxLength(100)
        ],
        email: [
            required("Enter your email address."),
            email()
        ],
        company: [
            maxLength(120)
        ],
        projectType: [
            oneOf(values(projectTypeOptions), "Select a valid project type.")
        ],
        budget: [
            required("Select a budget range, or \"Not sure yet\"."),
            oneOf(values(budgetOptions), "Select a valid budget range.")
        ],
        timeline: [
            required("Select a timeline."),
            oneOf(values(timelineOptions), "Select a valid timeline.")
        ],
        message: [
            required("Tell me a little about the project."),
            minLength(40, "Please add a bit more detail (at least 40 characters)."),
            maxLength(5000)
        ]
    });
}

export function getOptionLabel(options, value) {
    return options.find((option) => option.value === value)?.label || value;
}
