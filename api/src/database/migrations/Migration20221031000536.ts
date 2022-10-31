import { Migration } from '@mikro-orm/migrations'

export class Migration20221031000536 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "refresh_tokens" alter column "is_revoked" type boolean using ("is_revoked"::boolean);',
    )
    this.addSql(
      'alter table "refresh_tokens" alter column "is_revoked" set default false;',
    )

    this.addSql(
      'alter table "tasks" add column "complete" boolean not null default false',
    )
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "refresh_tokens" alter column "is_revoked" drop default;',
    )
    this.addSql(
      'alter table "refresh_tokens" alter column "is_revoked" type boolean using ("is_revoked"::boolean);',
    )

    this.addSql('alter table "tasks" drop column "complete";')
  }
}
