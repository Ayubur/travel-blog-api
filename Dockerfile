# ------------------------
# Stage 1: Build
# ------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# ------------------------
# Stage 2: Production
# ------------------------
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S nodegroup && \
  adduser -S nestuser -G nodegroup

# Copy only required files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

RUN npm ci --omit=dev

# Change ownership
RUN chown -R nestuser:nodegroup /app

USER nestuser

EXPOSE 3000

CMD ["node", "dist/main.js"]