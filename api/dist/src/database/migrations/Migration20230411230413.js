"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230411230413 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230411230413 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "recipes" alter column "ingredients" type text using ("ingredients"::text);');
        this.addSql('alter table "recipes" alter column "ingredients" set not null;');
        this.addSql('alter table "recipes" alter column "directions" type text using ("directions"::text);');
        this.addSql('alter table "recipes" alter column "directions" set not null;');
    }
    async down() {
        this.addSql('alter table "recipes" alter column "ingredients" type text using ("ingredients"::text);');
        this.addSql('alter table "recipes" alter column "ingredients" drop not null;');
        this.addSql('alter table "recipes" alter column "directions" type text using ("directions"::text);');
        this.addSql('alter table "recipes" alter column "directions" drop not null;');
    }
}
exports.Migration20230411230413 = Migration20230411230413;
//# sourceMappingURL=Migration20230411230413.js.map