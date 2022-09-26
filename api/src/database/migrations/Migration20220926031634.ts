import { Migration } from '@mikro-orm/migrations'

export class Migration20220926031634 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "password" varchar(255) not null, "first_name" varchar(255) null, "last_name" varchar(255) null);',
    )

    this.addSql(
      'create table "refresh_tokens" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" int not null, "is_revoked" boolean not null, "expires" timestamptz(0) not null);',
    )

    this.addSql(
      'create table "posts" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "body" varchar(255) not null, "author_id" int not null);',
    )

    this.addSql(
      'alter table "refresh_tokens" add constraint "refresh_tokens_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete CASCADE;',
    )

    this.addSql(
      'alter table "posts" add constraint "posts_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade on delete CASCADE;',
    )
  }
}
