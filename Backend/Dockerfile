FROM node:22-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 g++ make

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

FROM node:22-alpine

WORKDIR /app
COPY --from=builder /app /app

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "src/server.js"]
