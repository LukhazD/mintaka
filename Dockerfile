FROM oven/bun:1.0 as base

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
COPY bun.lock ./

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