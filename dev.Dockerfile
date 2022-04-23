FROM node:16-alpine

ENV NODE_ENV development

# Set working directory
WORKDIR /app

RUN npm install -g pnpm

COPY ./pnpm-lock.yaml .
RUN pnpm fetch
COPY . .
RUN pnpm install --frozen-lockfile --unsafe-perm

EXPOSE 3001 3001
EXPOSE 3002 3002
EXPOSE 3003 3003

CMD ["pnpm", "run", "dev"]
