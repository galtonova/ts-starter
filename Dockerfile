FROM node:14-alpine as builder
WORKDIR /app

RUN npm i -g npm@7

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --------------------------------
# --------------------------------

FROM node:14-alpine
WORKDIR /channelmanager
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 8000

ENTRYPOINT node dist/src/main.js
