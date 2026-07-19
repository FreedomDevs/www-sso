FROM node:22-alpine3.24 AS builder
RUN apk add --no-cache pnpm

WORKDIR /app

COPY package.json ./

# зависимости
RUN --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
  pnpm install --frozen-lockfile --ignore-workspace

COPY src ./src
COPY test ./test
COPY eslint.config.mjs tsconfig.build.json tsconfig.json nest-cli.json ./
RUN pnpm build


# ---------- stage 2: production ----------
FROM node:22-alpine3.24
RUN apk add --no-cache pnpm

WORKDIR /app

ENV NODE_ENV=production

RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
  pnpm install --prod --frozen-lockfile --ignore-workspace

COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./.next/static
CMD pnpm start
