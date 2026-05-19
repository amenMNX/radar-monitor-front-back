# Stage 1: Build the React application with TanStack
FROM node:20-alpine AS builder

WORKDIR /build

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src ./src
COPY tsconfig.json vite.config.ts ./

# Build the application
RUN npm run build

# Stage 2: Run with Node
FROM node:20-alpine

WORKDIR /app

# Copy package files from builder
COPY package.json ./

# Install production dependencies only
RUN npm install --production

# Copy built files from builder
COPY --from=builder /build/dist ./dist

# Expose port 3000 (or whatever port TanStack Start uses)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Start the application
CMD ["npm", "run", "start"]
