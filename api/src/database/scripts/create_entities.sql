set names 'utf8';
set session_replication_role = 'replica';

create table "recipes" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "prep_time" int null, "cook_time" int null, "serving_size" int null, "ingredients" text null, "directions" text null);

create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "password" varchar(255) not null, "first_name" varchar(255) null, "last_name" varchar(255) null);
alter table "users" add constraint "users_username_unique" unique ("username");

create table "rooms" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "created_by_id" int not null);

create table "refresh_tokens" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" int not null, "is_revoked" boolean not null default false, "expires" timestamptz(0) not null);

create table "lists" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "description" varchar(255) null, "created_by_id" int not null);

create table "tasks" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "description" varchar(255) null, "created_by_id" int not null, "list_id" int not null, "complete" boolean not null default false);

alter table "rooms" add constraint "rooms_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on update cascade;

alter table "refresh_tokens" add constraint "refresh_tokens_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete CASCADE;

alter table "lists" add constraint "lists_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on update cascade;

alter table "tasks" add constraint "tasks_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on update cascade;
alter table "tasks" add constraint "tasks_list_id_foreign" foreign key ("list_id") references "lists" ("id") on update cascade;

set session_replication_role = 'origin';
