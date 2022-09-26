import { Migration } from '@mikro-orm/migrations';

export class Migration20220926231541 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "todos" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "description" varchar(255) null, "created_by_id" int not null, "todo_id" int not null);');

    this.addSql('alter table "todos" add constraint "todos_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "todos" add constraint "todos_todo_id_foreign" foreign key ("todo_id") references "lists" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "todos" cascade;');
  }

}
