FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV DATA_DIR=/data
ENV SEED_FILE=/app/data/site.json
ENV PORT=3000
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/data/site.json ./data/site.json
EXPOSE 3000
CMD ["node", "server/index.mjs"]
