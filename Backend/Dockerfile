# build dependencies
FROM node:22-alpine AS builder

WORKDIR /app

# Build tools for Alpine
RUN apk add --no-cache python3 g++ make

COPY package*.json ./

# Use install instead of ci
RUN npm install --omit=dev

COPY . .

# run lightweight app
FROM node:22-alpine

WORKDIR /app
COPY --from=builder /app /app

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "./src/server.js"]
