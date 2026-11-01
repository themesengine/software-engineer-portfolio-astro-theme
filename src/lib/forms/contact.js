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
 * Contact form: options, normalization and validation shared by
 * src/components/ContactForm.astro (instant feedback in the browser) and
 * src/pages/api/contact.js (authoritative check). Edit the options here
 * and both stay in sync.
 */

export const enquiryOptions = [
    {
        value: "general",
        label: "General question"
    },
    {
        value: "speaking",
        label: "Speaking, podcasts and writing"
    },
    {
        value: "open-source",
        label: "Open-source projects"
    },
    {
        value: "mentoring",
        label: "Mentoring"
    }
];

export function normalizeContactRequest(payload = {}) {
    return {
        name: toText(payload.name),
        email: toText(payload.email).toLowerCase(),
        phone: toText(payload.phone),
        enquiryType: toText(payload.enquiryType) || "general",
        message: toText(payload.message)
    };
}

export function validateContactRequest(request) {
    return collectErrors(request, {
        name: [
            required("Enter your name."),
            maxLength(100)
        ],
        email: [
            required("Enter your email address."),
            email()
        ],
        phone: [
            maxLength(40)
        ],
        enquiryType: [
            oneOf(enquiryOptions.map((option) => option.value), "Select a valid enquiry type.")
        ],
        message: [
            required("Enter your message."),
            minLength(20, "Your message must contain at least 20 characters."),
            maxLength(5000)
        ]
    });
}

export function getEnquiryLabel(value) {
    return enquiryOptions.find((option) => option.value === value)?.label || value;
}
