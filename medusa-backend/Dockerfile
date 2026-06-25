FROM node:20

WORKDIR /app

COPY package.json package-lock.json turbo.json ./
COPY apps/backend/package.json ./apps/backend/

RUN npm ci

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=3072"
ENV TURBO_CONCURRENCY=1
RUN npm run build && \
    mkdir -p apps/backend/public/admin && \
    cp -r apps/backend/.medusa/client/* apps/backend/public/admin/

ENV NODE_ENV=production
ENV PORT=9000
EXPOSE 9000

WORKDIR /app/apps/backend
CMD ["npm", "run", "start"]
