#!/bin/sh
#
# Builds the buyer download: dist/<name>-v<version>.zip
#
# The archive is created from the committed HEAD with `git archive`, so
# uncommitted changes and git-ignored files are never shipped. Demo-only
# files are marked `export-ignore` in .gitattributes.
#
# Usage: yarn package   (runs lint + build first to verify the release)

set -eu

cd "$(dirname "$0")/.."

if [ -n "$(git status --porcelain)" ]; then
    echo "Commit or stash your changes before packaging." >&2
    exit 1
fi

name="$(node -p "require('./package.json').name")"
version="$(node -p "require('./package.json').version")"
output="dist/${name}-v${version}.zip"

echo "Verifying ${name} v${version}..."
yarn lint
yarn build

mkdir -p dist
rm -f "${output}"

git archive \
    --format=zip \
    --prefix="${name}/" \
    --output="${output}" \
    HEAD

echo "Created ${output} ($(du -h "${output}" | cut -f1))"
