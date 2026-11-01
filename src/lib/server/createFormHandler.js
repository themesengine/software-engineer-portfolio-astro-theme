import {
    randomUUID
} from "node:crypto";

import {
    site
} from "@/data/site";
import {
    deliverSubmission
} from "@/lib/server/formDelivery";
import {
    consumeRateLimit
} from "@/lib/server/rateLimit";

const RATE_LIMIT = {
    limit: 5,
    windowInMilliseconds: 10 * 60 * 1000
};

function createReference(prefix) {
    return `${prefix}-${randomUUID()
        .replace(/-/g, "")
        .slice(0, 10)
        .toUpperCase()}`;
}

function json(body, status = 200, headers = {}) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
            ...headers
        }
    });
}

// Accepts JSON (enhanceForm.js) and regular form posts (JavaScript off).
async function readPayload(request) {
    const contentType =
        request.headers.get("content-type") || "";

    try {
        if (contentType.includes("application/json")) {
            const body = await request.json();

            return body && typeof body === "object" ? body : {};
        }

        if (
            contentType.includes("application/x-www-form-urlencoded") ||
            contentType.includes("multipart/form-data")
        ) {
            return Object.fromEntries(await request.formData());
        }
    } catch {
        // Malformed body: validation reports the missing fields.
    }

    return {};
}

// Export as `ALL` next to `POST` so other methods get a 405.
export function methodNotAllowed() {
    return json(
        {
            message: "Method not allowed."
        },
        405,
        {
            Allow: "POST"
        }
    );
}

/*
 * Builds the POST handler of a form API route. `normalize` and
 * `validate` come from the shared form module in src/lib/forms, so the
 * browser and server use the same rules. Routes must also export
 * `prerender = false` so they run on the server.
 *
 * buildSubmission(request) may be async and returns
 * { title, replyTo, fields: [{ label, value }] }.
 */
export function createFormHandler({
                                      type,
                                      referencePrefix,
                                      normalize,
                                      validate,
                                      buildSubmission,
                                      successMessage
                                  }) {
    return async function POST({
                                   request: httpRequest,
                                   clientAddress
                               }) {
        const rateLimit = consumeRateLimit(
            `${type}:${clientAddress || "unknown"}`,
            RATE_LIMIT
        );

        if (!rateLimit.allowed) {
            return json(
                {
                    message: `Too many requests. Please wait a few minutes or call us on ${site.phone.display}.`
                },
                429,
                {
                    "Retry-After": String(rateLimit.retryAfterInSeconds)
                }
            );
        }

        const payload = await readPayload(httpRequest);
        const id = createReference(referencePrefix);
        const submittedAt = new Date().toISOString();

        // Honeypot: real visitors never fill the hidden "website" field.
        // Pretend success so bots learn nothing.
        if (payload.website) {
            return json({
                id,
                message: successMessage
            });
        }

        const request = normalize(payload);
        const errors = validate(request);

        if (Object.keys(errors).length > 0) {
            return json(
                {
                    message: "Please correct the highlighted fields.",
                    errors
                },
                400
            );
        }

        try {
            const details =
                await buildSubmission(request);

            await deliverSubmission({
                id,
                type,
                submittedAt,
                ...details,
                data: request
            });
        } catch (error) {
            console.error(`[forms] Could not process ${type} ${id}:`, error);

            return json(
                {
                    message: `We could not send your request right now. Please call us on ${site.phone.display} or email ${site.email}.`
                },
                503
            );
        }

        return json({
            id,
            message: successMessage
        });
    };
}
