import {
    site
} from "@/data/site";

/*
 * Browser side of a form. Validates with the same rules as the API route
 * for instant feedback, posts JSON to the form's `action`, maps server
 * errors back onto fields and swaps the form for its success panel.
 *
 * Markup it expects (see ContactForm.astro):
 *   <form id="x" action="/api/x" novalidate>
 *     <input name="field" aria-describedby="x-field-error">
 *     <p id="x-field-error" hidden></p>
 *     <p data-form-message role="alert" hidden></p>
 *     <button type="submit">
 *   </form>
 *   <div id="x-success" tabindex="-1" hidden></div>
 */
export function enhanceForm(form, {
    normalize,
    validate
}) {
    const message =
        form.querySelector("[data-form-message]");

    const submitButton =
        form.querySelector("[type='submit']");

    const success =
        document.getElementById(`${form.id}-success`);

    const fallbackMessage =
        `Something went wrong. Please call us on ${site.phone.display} or email ${site.email}.`;

    function setFieldError(name, error) {
        const field = form.elements.namedItem(name);
        const errorElement = document.getElementById(`${form.id}-${name}-error`);

        if (field && "setAttribute" in field) {
            if (error) {
                field.setAttribute("aria-invalid", "true");
            } else {
                field.removeAttribute("aria-invalid");
            }
        }

        if (errorElement) {
            errorElement.textContent = error || "";
            errorElement.hidden = !error;
        }
    }

    function showErrors(errors) {
        for (const element of form.elements) {
            if (element.name) {
                setFieldError(element.name, errors[element.name]);
            }
        }

        const firstInvalid =
            form.querySelector("[aria-invalid='true']");

        firstInvalid?.focus();
    }

    function showMessage(text) {
        message.textContent = text;
        message.hidden = !text;
    }

    form.addEventListener("input", (event) => {
        if (event.target.name) {
            setFieldError(event.target.name, null);
        }
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const values = Object.fromEntries(new FormData(form));
        const request = normalize(values);
        const errors = validate(request);

        if (Object.keys(errors).length > 0) {
            showErrors(errors);
            showMessage("Please correct the highlighted fields.");
            return;
        }

        showErrors({});
        showMessage("");
        submitButton.disabled = true;
        form.setAttribute("aria-busy", "true");

        try {
            const response = await fetch(form.action, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...request,
                    website: values.website || ""
                })
            });

            const body =
                await response.json().catch(() => ({}));

            if (!response.ok) {
                showErrors(body.errors || {});
                showMessage(body.message || fallbackMessage);
                return;
            }

            form.reset();
            form.hidden = true;

            if (success) {
                success.querySelector("[data-form-success-message]").textContent =
                    body.message || "Thank you.";
                success.hidden = false;
                success.focus();
            }
        } catch {
            showMessage(fallbackMessage);
        } finally {
            submitButton.disabled = false;
            form.removeAttribute("aria-busy");
        }
    });
}
