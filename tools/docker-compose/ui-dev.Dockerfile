FROM ghcr.io/pnpm/pnpm:11@sha256:f6614f68a90569f9d336f9f92ca15536a1e2f205b53391c0ee561dd0b1ddd746

RUN pnpm runtime set node 26 -g

WORKDIR /app

COPY ./web/package.json .
COPY ./web/pnpm-lock.yaml .
COPY ./web/pnpm-workspace.yaml .
