FROM node:18-alpine as builder1

# Workdir
WORKDIR /app

# Copy & install dependencies
COPY package.json yarn.lock ./
COPY workspaces/backend/package.json ./workspaces/backend/package.json
COPY workspaces/frontend/package.json ./workspaces/frontend/package.json
RUN yarn --network-timeout 1000000

# Copy source code & build
COPY workspaces ./workspaces
COPY workspaces/frontend/.env.prod ./workspaces/frontend/.env
RUN yarn api build
RUN yarn app build && yarn app export

# ===========================
FROM node:18-alpine as builder2

# Workdir
WORKDIR /app

# Copy & install dependencies
COPY workspaces/backend/package.json yarn.lock ./
RUN yarn --prod --network-timeout 1000000

# ===========================
FROM node:18-alpine
LABEL maintainer="thinh@thinhhv.com"
LABEL description="Setup server and serve static resource."

# Workdir
WORKDIR /app

# Copy source built
COPY --from=builder2 app/node_modules ./node_modules
COPY --from=builder1 app/workspaces/backend/dist ./dist
COPY --from=builder1 app/workspaces/backend/config/default.yml ./config/default.yml
COPY --from=builder1 app/workspaces/frontend/out ./client

# Env default
ENV NODE_ENV=prod \
  APP_CLIENT_DIR=/app/client

# Export port
EXPOSE 8080

# Volumn db for sqlite
VOLUME [ "/app/db_data" ]

# Start app
ENTRYPOINT ["node", "dist/main"]
