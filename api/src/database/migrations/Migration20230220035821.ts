import { Migration } from '@mikro-orm/migrations'

export class Migration20230220035821 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "recipes" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "prep_time" int null, "cook_time" int null, "serving_size" int null, "ingredients" text null, "directions" text null);',
    )

    this.addSql(
      'create table "category" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);',
    )

    this.addSql(
      'create table "recipes_categories" ("recipe_id" int not null, "recipe_category_id" int not null, constraint "recipes_categories_pkey" primary key ("recipe_id", "recipe_category_id"));',
    )

    this.addSql(
      'create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "password" varchar(255) not null, "first_name" varchar(255) null, "last_name" varchar(255) null);',
    )
    this.addSql(
      'alter table "users" add constraint "users_username_unique" unique ("username");',
    )

    this.addSql(
      'create table "rooms" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "created_by_id" int not null);',
    )

    this.addSql(
      'create table "refresh_tokens" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" int not null, "is_revoked" boolean not null default false, "expires" timestamptz(0) not null);',
    )

    this.addSql(
      'create table "lists" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "description" varchar(255) null, "created_by_id" int not null);',
    )

    this.addSql(
      'create table "tasks" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "description" varchar(255) null, "created_by_id" int not null, "list_id" int not null, "complete" boolean not null default false);',
    )

    this.addSql(
      'alter table "recipes_categories" add constraint "recipes_categories_recipe_id_foreign" foreign key ("recipe_id") references "recipes" ("id") on update cascade on delete cascade;',
    )
    this.addSql(
      'alter table "recipes_categories" add constraint "recipes_categories_recipe_category_id_foreign" foreign key ("recipe_category_id") references "category" ("id") on update cascade on delete cascade;',
    )

    this.addSql(
      'alter table "rooms" add constraint "rooms_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on update cascade;',
    )

    this.addSql(
      'alter table "refresh_tokens" add constraint "refresh_tokens_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete CASCADE;',
    )

    this.addSql(
      'alter table "lists" add constraint "lists_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on update cascade;',
    )

    this.addSql(
      'alter table "tasks" add constraint "tasks_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on update cascade;',
    )
    this.addSql(
      'alter table "tasks" add constraint "tasks_list_id_foreign" foreign key ("list_id") references "lists" ("id") on update cascade;',
    )

    this.addSql('drop table if exists "recipe" cascade;')
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "recipes_categories" drop constraint "recipes_categories_recipe_id_foreign";',
    )

    this.addSql(
      'alter table "recipes_categories" drop constraint "recipes_categories_recipe_category_id_foreign";',
    )

    this.addSql(
      'alter table "rooms" drop constraint "rooms_created_by_id_foreign";',
    )

    this.addSql(
      'alter table "refresh_tokens" drop constraint "refresh_tokens_user_id_foreign";',
    )

    this.addSql(
      'alter table "lists" drop constraint "lists_created_by_id_foreign";',
    )

    this.addSql(
      'alter table "tasks" drop constraint "tasks_created_by_id_foreign";',
    )

    this.addSql('alter table "tasks" drop constraint "tasks_list_id_foreign";')

    this.addSql(
      'create table "recipe" ("id" serial primary key, "created_at" timestamptz not null default null, "updated_at" timestamptz not null default null, "title" varchar not null default null, "prep_time" int4 null default null, "cook_time" int4 null default null, "serving_size" int4 null default null, "ingredients" text null default null, "directions" text null default null);',
    )

    this.addSql('drop table if exists "recipes" cascade;')

    this.addSql('drop table if exists "category" cascade;')

    this.addSql('drop table if exists "recipes_categories" cascade;')

    this.addSql('drop table if exists "users" cascade;')

    this.addSql('drop table if exists "rooms" cascade;')

    this.addSql('drop table if exists "refresh_tokens" cascade;')

    this.addSql('drop table if exists "lists" cascade;')

    this.addSql('drop table if exists "tasks" cascade;')
  }
}
