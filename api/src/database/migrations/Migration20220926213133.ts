import { Migration } from '@mikro-orm/migrations'

export class Migration20220926213133 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "users" add constraint "users_username_unique" unique ("username");',
    )

    this.addSql(
      'alter table "posts" add column "description" varchar(255) null;',
    )
    this.addSql('alter table "posts" drop column "body";')
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop constraint "users_username_unique";')

    this.addSql('alter table "posts" add column "body" varchar(255) not null;')
    this.addSql('alter table "posts" drop column "description";')
  }
}
