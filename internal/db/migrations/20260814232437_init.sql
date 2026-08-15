-- +goose Up
SELECT 'up SQL query';
create table recipes (
  id BIGSERIAL primary key,
  title text not null,
  short_description text
);

-- +goose Down
SELECT 'down SQL query';
drop table recipes;
