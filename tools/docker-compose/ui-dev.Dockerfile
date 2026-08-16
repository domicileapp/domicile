FROM ghcr.io/pnpm/pnpm:11

RUN pnpm runtime set node 26 -g

WORKDIR /app

COPY ./web/package.json .
COPY ./web/pnpm-lock.yaml .
COPY ./web/pnpm-workspace.yaml .
