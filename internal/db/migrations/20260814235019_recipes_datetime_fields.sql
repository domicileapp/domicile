-- +goose Up
SELECT 'up SQL query';
alter table recipes
    add column created_at timestamptz not null default now(),
    add column updated_at timestamptz not null default now(),
    add column deleted_at timestamptz;

-- +goose Down
SELECT 'down SQL query';
