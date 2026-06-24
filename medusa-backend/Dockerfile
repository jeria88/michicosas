FROM node:20

WORKDIR /app

COPY package.json package-lock.json turbo.json ./
COPY apps/backend/package.json ./apps/backend/

RUN npm ci

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=3072"
ENV TURBO_CONCURRENCY=1
RUN npm run build

ENV NODE_ENV=production
ENV PORT=9000
EXPOSE 9000

CMD ["npm", "run", "start"]
