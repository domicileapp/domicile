CREATE TABLE "users" (
  "id" bigserial PRIMARY KEY,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now()),
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "username" varchar NOT NULL,
  "password" varchar NOT NULL,
  "recipes" bigint
);

CREATE TABLE "recipes" (
  "id" bigserial PRIMARY KEY,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now()),
  "title" varchar NOT NULL,
  "description" varchar,
  "instructions" text NOT NULL,
  "ingredients" text NOT NULL,
  "source" varchar,
  "creator_id" bigint
);

ALTER TABLE "recipes" ADD FOREIGN KEY ("creator_id") REFERENCES "users" ("id");
