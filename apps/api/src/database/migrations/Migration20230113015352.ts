import { Migration } from '@mikro-orm/migrations'

export class Migration20230113015352 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "recipes" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "directions" varchar(255) null, "ingredients" text[] null, "title" varchar(255) not null, "serving_size" int null, "preparation_time" int null, "cooking_time" int null);',
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "recipes" cascade;')
  }
}
