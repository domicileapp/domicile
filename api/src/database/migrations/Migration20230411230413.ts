import { Migration } from '@mikro-orm/migrations';

export class Migration20230411230413 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "recipes" alter column "ingredients" type text using ("ingredients"::text);');
    this.addSql('alter table "recipes" alter column "ingredients" set not null;');
    this.addSql('alter table "recipes" alter column "directions" type text using ("directions"::text);');
    this.addSql('alter table "recipes" alter column "directions" set not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "recipes" alter column "ingredients" type text using ("ingredients"::text);');
    this.addSql('alter table "recipes" alter column "ingredients" drop not null;');
    this.addSql('alter table "recipes" alter column "directions" type text using ("directions"::text);');
    this.addSql('alter table "recipes" alter column "directions" drop not null;');
  }

}
