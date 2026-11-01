/*
 * Navigation. Edit the labels and links here; the header, mobile menu
 * and footer read from this file. `primary` is the main menu, `cta` the
 * highlighted button, `footer` the footer columns and `legal` the
 * links in the footer's bottom row.
 */

export const announcement = {
    // Set to true to show a thin bar above the header.
    enabled: false,
    text: "Booking new projects from January 2027.",
    href: "/hire",
    linkLabel: "Start an enquiry"
};

export const primaryNavigation = [
    {
        label: "Work",
        href: "/projects"
    },
    {
        label: "Services",
        href: "/services"
    },
    {
        label: "About",
        href: "/about"
    },
    {
        label: "Writing",
        href: "/journal"
    },
    {
        label: "Contact",
        href: "/contact"
    }
];

export const headerCta = {
    label: "Hire me",
    href: "/hire"
};

export const footerNavigation = [
    {
        title: "Work",
        links: [
            {
                label: "Selected projects",
                href: "/projects"
            },
            {
                label: "Services",
                href: "/services"
            },
            {
                label: "Start a project",
                href: "/hire"
            }
        ]
    },
    {
        title: "More",
        links: [
            {
                label: "About",
                href: "/about"
            },
            {
                label: "Writing",
                href: "/journal"
            },
            {
                label: "Contact",
                href: "/contact"
            }
        ]
    }
];

export const legalNavigation = [
    {
        label: "Privacy",
        href: "/privacy"
    },
    {
        label: "Terms",
        href: "/terms"
    }
];
