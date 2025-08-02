FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@8.15.4

# Copy package.json and other configuration files
COPY package.json ./
COPY .npmrc ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy all files
COPY . .

# Build the app
RUN pnpm run build

# Expose the custom port
EXPOSE 3055

# Start the app
CMD ["pnpm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3055"]