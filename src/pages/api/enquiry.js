import {
    budgetOptions,
    getOptionLabel,
    normalizeEnquiryRequest,
    projectTypeOptions,
    timelineOptions,
    validateEnquiryRequest
} from "@/lib/forms/enquiry";
import {
    createFormHandler,
    methodNotAllowed
} from "@/lib/server/createFormHandler";

export const prerender = false;

export const POST = createFormHandler({
    type: "enquiry",
    referencePrefix: "PRJ",
    normalize: normalizeEnquiryRequest,
    validate: validateEnquiryRequest,
    successMessage: "Thank you. Your project enquiry has been received and I'll reply within two working days.",
    buildSubmission: (request) => ({
        title: `Project enquiry from ${request.name}${request.company ? ` (${request.company})` : ""}`,
        replyTo: request.email,
        fields: [
            {label: "Project type", value: getOptionLabel(projectTypeOptions, request.projectType)},
            {label: "Name", value: request.name},
            {label: "Email", value: request.email},
            {label: "Company", value: request.company},
            {label: "Budget", value: getOptionLabel(budgetOptions, request.budget)},
            {label: "Timeline", value: getOptionLabel(timelineOptions, request.timeline)},
            {label: "Project details", value: request.message}
        ]
    })
});

export const ALL = methodNotAllowed;
