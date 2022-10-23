import { Migration } from '@mikro-orm/migrations';

export class Migration20221023001353 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tasks" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "description" varchar(255) null, "created_by_id" int not null, "list_id" int not null);');

    this.addSql('alter table "tasks" add constraint "tasks_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "tasks" add constraint "tasks_list_id_foreign" foreign key ("list_id") references "lists" ("id") on update cascade;');

    this.addSql('drop table if exists "todos" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "todos" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "description" varchar(255) null, "created_by_id" int not null, "list_id" int not null);');

    this.addSql('alter table "todos" add constraint "todos_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "todos" add constraint "todos_list_id_foreign" foreign key ("list_id") references "lists" ("id") on update cascade;');

    this.addSql('drop table if exists "tasks" cascade;');
  }

}
