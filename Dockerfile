# syntax=docker/dockerfile:1

FROM node:24-alpine AS dependencies

WORKDIR /app

COPY package.json yarn.lock ./

RUN corepack enable \
    && yarn install --frozen-lockfile


FROM node:24-alpine AS production-dependencies

WORKDIR /app

COPY package.json yarn.lock ./

RUN corepack enable \
    && yarn install --frozen-lockfile --production \
    && yarn cache clean


FROM node:24-alpine AS builder

WORKDIR /app

# PUBLIC_* values are inlined into the build, so they must be known here
# and a rebuild is needed to change them, e.g.
#   docker build --build-arg PUBLIC_SITE_URL=https://www.example.com .
ARG PUBLIC_SITE_URL=http://localhost:3000
ARG PUBLIC_SITE_NOINDEX=false
ENV PUBLIC_SITE_URL=${PUBLIC_SITE_URL}
ENV PUBLIC_SITE_NOINDEX=${PUBLIC_SITE_NOINDEX}
ENV ASTRO_TELEMETRY_DISABLED=1

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN corepack enable \
    && yarn build


FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=production-dependencies --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --chown=node:node package.json server.mjs ./

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD wget -qO- "http://127.0.0.1:${PORT}/api/health" > /dev/null || exit 1

CMD ["node", "server.mjs"]
