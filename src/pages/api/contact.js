import {
    getEnquiryLabel,
    normalizeContactRequest,
    validateContactRequest
} from "@/lib/forms/contact";
import {
    createFormHandler,
    methodNotAllowed
} from "@/lib/server/createFormHandler";

export const prerender = false;

export const POST = createFormHandler({
    type: "contact",
    referencePrefix: "CT",
    normalize: normalizeContactRequest,
    validate: validateContactRequest,
    successMessage: "Thank you. Your message has been received and I'll reply as soon as I can.",
    buildSubmission: (request) => ({
        title: `${getEnquiryLabel(request.enquiryType)} from ${request.name}`,
        replyTo: request.email,
        fields: [
            {label: "Enquiry", value: getEnquiryLabel(request.enquiryType)},
            {label: "Name", value: request.name},
            {label: "Email", value: request.email},
            {label: "Phone", value: request.phone},
            {label: "Message", value: request.message}
        ]
    })
});

export const ALL = methodNotAllowed;
