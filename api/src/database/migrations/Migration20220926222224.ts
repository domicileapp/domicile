import { Migration } from '@mikro-orm/migrations';

export class Migration20220926222224 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "lists" drop constraint "lists_created_by_id_foreign";');

    this.addSql('alter table "lists" add constraint "lists_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "lists" drop constraint "lists_created_by_id_foreign";');

    this.addSql('alter table "lists" add constraint "lists_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on update cascade on delete CASCADE;');
  }

}
