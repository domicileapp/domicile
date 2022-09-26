import { Migration } from '@mikro-orm/migrations';

export class Migration20220926214650 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "lists" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "description" varchar(255) null, "created_by_id" int not null);');

    this.addSql('alter table "lists" add constraint "lists_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on update cascade on delete CASCADE;');

    this.addSql('drop table if exists "posts" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "posts" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "description" varchar(255) null, "author_id" int not null);');

    this.addSql('alter table "posts" add constraint "posts_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade on delete CASCADE;');

    this.addSql('drop table if exists "lists" cascade;');
  }

}
