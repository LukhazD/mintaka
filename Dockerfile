FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
COPY bun.lock ./

# Install bun
RUN apk add --no-cache unzip
RUN wget -q https://github.com/oven-sh/bun/releases/download/bun-v1.0.25/bun-linux-x64.zip
RUN unzip bun-linux-x64.zip && chmod +x ./bun-linux-x64/bun && mv ./bun-linux-x64/bun /usr/local/bin && rm -rf bun-linux-x64*

# Install dependencies
RUN bun install

# Copy all files
COPY . .

# Build the app
RUN bun run build

# Expose the custom port
EXPOSE 3055

# Start the app - using node to serve the built app
CMD ["bun", "run", "preview", "--host", "0.0.0.0", "--port", "3055"]