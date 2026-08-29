FROM ghcr.io/pnpm/pnpm:12@sha256:bce5ae25ef95edd79e696d7fa8489b80561ef660100fd35bd0286d0f90db3dcc

RUN pnpm runtime set node 26 -g

WORKDIR /app

COPY ./web/package.json .
COPY ./web/pnpm-lock.yaml .
COPY ./web/pnpm-workspace.yaml .
