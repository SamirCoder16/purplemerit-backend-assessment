# build dependencies

FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

# run lightweight app

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app /app

ENV NODE_ENV=production

ENV PORT=5000

EXPOSE 5000

CMD [ "npm", "start" ]