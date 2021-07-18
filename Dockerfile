FROM node:14
WORKDIR /workspace
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm@6.10.2 && \
  pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build && \
  rm -rf node_modules && \
  pnpm install --prod --frozen-lockfile && \
  rm -rf node_modules/prisma

FROM gcr.io/distroless/nodejs:14
WORKDIR /workspace
ENV NODE_ENV production
COPY --from=0 /workspace/dist . 
COPY --from=0 /workspace/node_modules ./node_modules/
ENTRYPOINT node dist