/*
 * Server-only delivery of validated form submissions.
 *
 * Configure one or both transports with environment variables
 * (see .env.example):
 *
 *   FORM_WEBHOOK_URL      POST the submission as JSON to any endpoint
 *                         (Zapier, Make, n8n, Slack workflow, your CRM…).
 *   FORM_WEBHOOK_SECRET   Optional bearer token sent with webhook requests.
 *
 *   RESEND_API_KEY        Send the submission by email through Resend.
 *   FORM_EMAIL_TO         Comma-separated recipient addresses.
 *   FORM_EMAIL_FROM       Verified sender, e.g. "Brand <web@domain.com>".
 *
 * When no transport is configured, submissions are logged to the server
 * console in `astro dev` and when DEMO_MODE=true. A production build
 * rejects them instead, so real requests are never silently lost.
 */

import {
    site
} from "@/data/site";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const REQUEST_TIMEOUT_IN_MILLISECONDS = 10000;

export class FormDeliveryError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = "FormDeliveryError";
    }
}

export function isDemoMode() {
    return process.env.DEMO_MODE === "true";
}

function getWebhookConfig() {
    const url = process.env.FORM_WEBHOOK_URL;

    return url
        ? {
            url,
            secret: process.env.FORM_WEBHOOK_SECRET || ""
        }
        : null;
}

function getEmailConfig() {
    const apiKey = process.env.RESEND_API_KEY;
    const to = String(process.env.FORM_EMAIL_TO || "")
        .split(",")
        .map((address) => address.trim())
        .filter(Boolean);
    const from = process.env.FORM_EMAIL_FROM;

    if (!apiKey && to.length === 0 && !from) {
        return null;
    }

    // A half-configured transport is a setup mistake: fail loudly.
    if (!apiKey || to.length === 0 || !from) {
        throw new FormDeliveryError(
            "Email delivery requires RESEND_API_KEY, FORM_EMAIL_TO and FORM_EMAIL_FROM."
        );
    }

    return {
        apiKey,
        to,
        from
    };
}

async function postJson(url, body, headers = {}) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_IN_MILLISECONDS)
    });

    if (!response.ok) {
        const detail = await response
            .text()
            .catch(() => "");

        throw new FormDeliveryError(
            `${new URL(url).host} responded with ${response.status}. ${detail}`.trim()
        );
    }
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function displayValue(value) {
    return value === "" || value === null || value === undefined ? "—" : value;
}

function formatPlainText(submission) {
    return [
        submission.title,
        "",
        ...submission.fields.map(({label, value}) => `${label}: ${displayValue(value)}`),
        "",
        `Reference: ${submission.id}`,
        `Submitted: ${submission.submittedAt}`
    ].join("\n");
}

function formatHtml(submission) {
    const rows = [
        ...submission.fields,
        {label: "Reference", value: submission.id},
        {label: "Submitted", value: submission.submittedAt}
    ]
        .map(({label, value}) => (
            `<tr><th align="left" style="padding:6px 12px 6px 0;vertical-align:top">${escapeHtml(label)}</th>` +
            `<td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(displayValue(value))}</td></tr>`
        ))
        .join("");

    return `<h2 style="font-family:sans-serif">${escapeHtml(submission.title)}</h2>` +
        `<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>`;
}

async function sendWebhook(config, submission) {
    await postJson(
        config.url,
        {
            ...submission,
            site: site.name,
            // Pre-formatted text for chat tools such as Slack.
            text: formatPlainText(submission)
        },
        config.secret
            ? {
                Authorization: `Bearer ${config.secret}`
            }
            : {}
    );
}

async function sendEmail(config, submission) {
    await postJson(
        RESEND_ENDPOINT,
        {
            from: config.from,
            to: config.to,
            subject: submission.title,
            text: formatPlainText(submission),
            html: formatHtml(submission),
            reply_to: submission.replyTo || undefined
        },
        {
            Authorization: `Bearer ${config.apiKey}`
        }
    );
}

/*
 * submission: {
 *   id, type, title, submittedAt, replyTo,
 *   data:   the normalized request object,
 *   fields: [{ label, value }] for human-readable output
 * }
 */
export async function deliverSubmission(submission) {
    const webhook = getWebhookConfig();
    const email = getEmailConfig();

    if (!webhook && !email) {
        // import.meta.env.DEV is true only under `astro dev`. NODE_ENV is not
        // used because `node server.mjs` may run without it.
        if (import.meta.env.DEV || isDemoMode()) {
            console.info(
                `[forms] ${submission.type} ${submission.id} not delivered: no transport configured.\n` +
                formatPlainText(submission)
            );

            return {
                delivered: false
            };
        }

        throw new FormDeliveryError(
            "No form delivery transport is configured. Set FORM_WEBHOOK_URL or the RESEND_* variables."
        );
    }

    const deliveries = [];

    if (webhook) {
        deliveries.push(sendWebhook(webhook, submission));
    }

    if (email) {
        deliveries.push(sendEmail(email, submission));
    }

    const results =
        await Promise.allSettled(deliveries);

    const failures =
        results.filter((result) => result.status === "rejected");

    failures.forEach((failure) => {
        console.error(
            `[forms] Delivery failed for ${submission.type} ${submission.id}:`,
            failure.reason
        );
    });

    // Succeed if at least one transport accepted the submission.
    if (failures.length === results.length) {
        throw new FormDeliveryError(
            "All configured form delivery transports failed.",
            {
                cause: failures[0].reason
            }
        );
    }

    return {
        delivered: true
    };
}
