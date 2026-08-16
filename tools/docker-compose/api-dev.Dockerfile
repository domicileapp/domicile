FROM golang:1.26.6

WORKDIR /app

RUN go install github.com/air-verse/air@latest \
    && go install github.com/go-delve/delve/cmd/dlv@v1.26.1 \
    && go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest \
    && go install github.com/swaggo/swag/v2/cmd/swag@latest \
    && go install github.com/pressly/goose/v3/cmd/goose@latest

EXPOSE 8080 2345
