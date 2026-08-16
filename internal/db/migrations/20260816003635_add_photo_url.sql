-- +goose Up
SELECT 'up SQL query';
alter table recipes
    add column photo_url text;

-- +goose Down
SELECT 'down SQL query';
alter table recipes
    drop column photo_url;
