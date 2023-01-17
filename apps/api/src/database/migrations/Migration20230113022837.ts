import { Migration } from '@mikro-orm/migrations'

export class Migration20230113022837 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "recipe" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "prep_time" int null, "cook_time" int null, "serving_size" int null, "ingredients" varchar(255) null, "directions" varchar(255) null);',
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "recipe" cascade;')
  }
}
