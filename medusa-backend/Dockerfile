FROM node:20

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json turbo.json ./
COPY apps/backend/package.json ./apps/backend/
RUN npm ci

# Copy source
COPY . .

# Build project
RUN npm run build

# Start the server
CMD ["npm", "run", "start"]
