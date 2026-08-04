FROM node:22-alpine3.24 AS builder

RUN apk add --no-cache pnpm

WORKDIR /app

COPY package.json pnpm-workspace.yaml ./

# зависимости
RUN --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
  pnpm install --frozen-lockfile

COPY src ./src
COPY public ./public
COPY eslint.config.mjs tsconfig.json next.config.ts ./

RUN pnpm build


# ---------- stage 2: production ----------
FROM node:22-alpine3.24

RUN apk add --no-cache pnpm

WORKDIR /app

ENV NODE_ENV=production

COPY pnpm-workspace.yaml ./

RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
  pnpm install --prod --frozen-lockfile

COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

CMD ["pnpm", "start"]