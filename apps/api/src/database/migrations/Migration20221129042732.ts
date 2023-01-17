import { Migration } from '@mikro-orm/migrations'

export class Migration20221129042732 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "rooms" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "created_by_id" int not null);',
    )

    this.addSql(
      'alter table "rooms" add constraint "rooms_created_by_id_foreign" foreign key ("created_by_id") references "users" ("id") on update cascade;',
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "rooms" cascade;')
  }
}
