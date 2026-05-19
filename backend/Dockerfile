FROM node:20-alpine AS builder
WORKDIR /build

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /build ./

EXPOSE 4173

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4173 || exit 1

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]