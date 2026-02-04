# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY package*.json ./
COPY prisma ./prisma
COPY .env .env

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build


# ---------- Production Stage ----------
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# Copy all node_modules
COPY --from=builder /app/node_modules ./node_modules

# Copy compiled code
COPY --from=builder /app/dist ./dist

# Copy prisma client if you use custom output
COPY --from=builder /app/generated ./generated

RUN apk add --no-cache openssl

EXPOSE 4000

CMD ["node", "dist/src/main.js"]


