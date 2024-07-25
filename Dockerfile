FROM node:21

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm install

RUN pnpm dlx prisma generate

CMD pnpm dlx prisma migrate deploy && pnpm build && node .output/server/index.mjs
