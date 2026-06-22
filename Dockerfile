FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder

WORKDIR /app

ARG DATABASE_URL=postgresql://postgres:postgres@postgres:5432/paruscan_ai?schema=public
ARG NEXT_PUBLIC_AI_SERVICE_URL=http://127.0.0.1:8000
ARG NEXT_PUBLIC_APP_NAME=ParuScan_AI

ENV DATABASE_URL=${DATABASE_URL} \
    NEXT_PUBLIC_AI_SERVICE_URL=${NEXT_PUBLIC_AI_SERVICE_URL} \
    NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME} \
    NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

COPY --from=builder /app ./

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run auth:bootstrap && npm run start -- --hostname 0.0.0.0"]
