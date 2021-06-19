FROM node:16.3.0-alpine as base


FROM base AS deps

WORKDIR /app

ENV NPM_CONFIG_LOGLEVEL warn
ENV NPM_CONFIG_FUND false
ENV NPM_CONFIG_AUDIT false
ENV CI true

COPY package.json package-lock.json ./

RUN npm ci


FROM base AS builder

WORKDIR /app

COPY . .

COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

RUN npm prune --production


FROM base AS runner

WORKDIR /app

COPY . .

LABEL maintainer=willis.rh@gmail.com
LABEL org.opencontainers.image.source=https://github.com/badsyntax/strapi-webhook-actions-proxy
LABEL org.label-schema.name="strapi-webhook-actions-proxy"
LABEL org.label-schema.description="Strapi webhook proxy to trigger a GitHub repository_dispatch event"
LABEL org.label-schema.vcs-url="https://github.com/badsyntax/strapi-webhook-actions-proxy"
LABEL org.label-schema.usage="README.md"
LABEL org.label-schema.vendor="badsyntax"

COPY --from=builder --chown=node:node /app/node_modules /app/node_modules
COPY --from=builder --chown=node:node /app/build /app/build

USER node

CMD ["npm", "start"]
