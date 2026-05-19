FROM node:20-alpine AS builder
WORKDIR /build
COPY package.json ./
RUN npm install
COPY src ./src
COPY tsconfig.json vite.config.ts ./
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:alpine
COPY --from=builder /build/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 4173