import { Migration } from '@mikro-orm/migrations'

export class Migration20221013014335 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "todos" drop constraint "todos_todo_id_foreign";')

    this.addSql('alter table "todos" rename column "todo_id" to "list_id";')
    this.addSql(
      'alter table "todos" add constraint "todos_list_id_foreign" foreign key ("list_id") references "lists" ("id") on update cascade;',
    )
  }

  async down(): Promise<void> {
    this.addSql('alter table "todos" drop constraint "todos_list_id_foreign";')

    this.addSql('alter table "todos" rename column "list_id" to "todo_id";')
    this.addSql(
      'alter table "todos" add constraint "todos_todo_id_foreign" foreign key ("todo_id") references "lists" ("id") on update cascade;',
    )
  }
}
