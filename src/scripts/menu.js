/*
 * Mobile menu: toggles the panel, locks page scroll while it is open,
 * closes on Escape, on a link click or when the screen gets wide, and
 * returns focus to the toggle button.
 */
export function setupMenu() {
    const toggle =
        document.querySelector("[data-menu-toggle]");

    const menu =
        document.querySelector("[data-mobile-menu]");

    if (!toggle || !menu) {
        return;
    }

    const label =
        toggle.querySelector(".visually-hidden");

    const desktop =
        window.matchMedia("(min-width: 64.0625rem)");

    function setOpen(open, {returnFocus = false} = {}) {
        toggle.setAttribute("aria-expanded", String(open));
        label.textContent = open ? "Close menu" : "Open menu";
        menu.hidden = !open;
        document.body.classList.toggle("is-menu-open", open);

        if (open) {
            menu.querySelector("a")?.focus();
        } else if (returnFocus) {
            toggle.focus();
        }
    }

    toggle.addEventListener("click", () => {
        setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !menu.hidden) {
            setOpen(false, {returnFocus: true});
        }
    });

    menu.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            setOpen(false);
        }
    });

    desktop.addEventListener("change", (event) => {
        if (event.matches) {
            setOpen(false);
        }
    });
}
