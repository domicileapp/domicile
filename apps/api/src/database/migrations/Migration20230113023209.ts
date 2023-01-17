import { Migration } from '@mikro-orm/migrations'

export class Migration20230113023209 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "recipe" alter column "ingredients" type text using ("ingredients"::text);',
    )
    this.addSql(
      'alter table "recipe" alter column "directions" type text using ("directions"::text);',
    )
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "recipe" alter column "ingredients" type varchar(255) using ("ingredients"::varchar(255));',
    )
    this.addSql(
      'alter table "recipe" alter column "directions" type varchar(255) using ("directions"::varchar(255));',
    )
  }
}
