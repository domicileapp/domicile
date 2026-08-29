FROM golang:1.27.0@sha256:0ecdc2a9f6156af6451080bfe3d8382a662fcc4e209608c6f919e643453514c1

WORKDIR /app

RUN go install github.com/air-verse/air@latest \
    && go install github.com/go-delve/delve/cmd/dlv@v1.26.1 \
    && go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest \
    && go install github.com/swaggo/swag/v2/cmd/swag@latest \
    && go install github.com/pressly/goose/v3/cmd/goose@latest

EXPOSE 8080 2345
