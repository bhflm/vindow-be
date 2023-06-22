FROM node:18-alpine AS base

WORKDIR /usr/src/app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build
RUN pnpm prune --prod

CMD ["pnpm", "run", "start:prod"]
