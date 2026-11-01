/*
 * Small, dependency-free validation helpers shared by the browser and
 * the API routes. Each form module in this folder exports
 * normalize(payload) and validate(request) built from these.
 */

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function toText(value) {
    return typeof value === "string" ? value.trim() : "";
}

/*
 * rules: { field: [check, check, ...] } where each check is
 * (value, request) => error message | null. The first failing check
 * per field wins. Returns { field: message } (empty when valid).
 */
export function collectErrors(request, rules) {
    const errors = {};

    for (const [field, checks] of Object.entries(rules)) {
        for (const check of checks) {
            const error = check(request[field], request);

            if (error) {
                errors[field] = error;
                break;
            }
        }
    }

    return errors;
}

export const required = (message) => (value) =>
    value === "" || value === null || value === undefined || value === false
        ? message
        : null;

export const maxLength = (max) => (value) =>
    typeof value === "string" && value.length > max
        ? `Use ${max} characters or fewer.`
        : null;

export const minLength = (min, message) => (value) =>
    typeof value === "string" && value && value.length < min
        ? message
        : null;

export const email = (message = "Enter a valid email address.") => (value) =>
    value && (!EMAIL_PATTERN.test(value) || value.length > 254)
        ? message
        : null;

export const oneOf = (options, message) => (value) =>
    value && !options.includes(value)
        ? message
        : null;
