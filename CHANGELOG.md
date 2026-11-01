# Changelog

All notable changes to this theme are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Optional "Built with" footer credit, controlled by `showThemeCredit` in `src/data/site.js`.
- Contributing guide, security policy, and issue and pull request templates.

### Changed

- Released the theme as open source under the MIT License.
- Narrowed the supported Node.js versions to `^22.23.4 || ^24.16.0 || >=26.3.0`, matching `eslint-plugin-astro`.
- The demo image workflow now only runs in the main repository, not in forks.

## [1.0.0] - 2026-11-01

### Added

- Landing page with availability badge, terminal hero, selected work, services, principles, testimonials and latest articles.
- Case study list and detail pages with outcomes, challenge, approach, result and related projects.
- Services list and detail pages with inclusions, process steps, FAQs and related case studies.
- About page with bio, experience timeline, toolbox and principles.
- Writing section with Markdown articles, reading time, related articles and `BlogPosting` schema.
- Project enquiry form (`/hire`) and contact form (`/contact`) with shared validation, honeypot, rate limiting and webhook/Resend delivery.
- Privacy, terms, 404 and 500 pages.
- SEO: canonical URLs, Open Graph, `Person` JSON-LD, breadcrumbs schema, sitemap and robots, staging noindex.
- Self-hosted Space Grotesk and Inter fonts, dark design tokens, responsive layouts from 320px.
- Node production server with security headers, health endpoint, Dockerfile, Compose file, CI workflow and release packaging.
- Documentation in `documentation/index.html`.
