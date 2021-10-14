FROM node:16.11.1-alpine as base


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

RUN apk add curl=7.77.0-r1 --no-cache

HEALTHCHECK CMD curl --fail http://localhost:5000/healthcheck || exit 1

WORKDIR /app

COPY . .

LABEL maintainer=willis.rh@gmail.com
LABEL org.opencontainers.image.source=https://github.com/badsyntax/strapi-webhook-actions-proxy

COPY --from=builder --chown=node:node /app/node_modules /app/node_modules
COPY --from=builder --chown=node:node /app/build /app/build

ENV NODE_ENV production

USER node

CMD ["npm", "start"]
