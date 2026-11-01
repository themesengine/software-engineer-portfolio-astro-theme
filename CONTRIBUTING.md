# Contributing

Thanks for helping improve the theme. Bug reports, fixes, accessibility and performance improvements, and documentation changes are all welcome.

## Before you start

- **Bugs:** open an issue with the steps to reproduce, unless the fix is small enough to explain in a pull request.
- **New features or larger design changes:** open an issue first, so we can agree on the approach before you spend time on it.

## Local setup

You need a supported Node.js version (see `engines` in `package.json`; 24 is recommended) and Yarn 1.

```sh
corepack enable
yarn install --frozen-lockfile
cp .env.example .env
yarn dev
```

## Pull requests

1. Create a branch from `main` and keep the change focused on one thing.
2. Run `yarn run check`, which lints and builds the site. `yarn check` is a different, built-in Yarn command.
3. Check your change at mobile and desktop widths, and with keyboard navigation if it affects the UI.
4. Add a line under `[Unreleased]` in `CHANGELOG.md` if people using the theme would notice the change.
5. Open the pull request and describe what changed and why. Include screenshots for visual changes.

## Guidelines

- Keep the theme easy to rebrand: content belongs in `src/data/` and `src/content/`, design values in `src/styles/tokens.css`.
- Avoid adding dependencies, trackers or third-party requests unless there's a strong reason.
- Keep the demo content fictional, and only add assets you have the right to share under the MIT License.

By contributing, you agree that your contribution is licensed under the [MIT License](LICENSE.md).
