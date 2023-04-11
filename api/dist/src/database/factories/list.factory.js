"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFactory = void 0;
const seeder_1 = require("@mikro-orm/seeder");
const list_entity_1 = require("../../lists/list.entity");
class ListFactory extends seeder_1.Factory {
    constructor() {
        super(...arguments);
        this.model = list_entity_1.List;
    }
    definition(faker) {
        return {
            title: faker.name.fullName(),
            description: faker.hacker.phrase(),
        };
    }
}
exports.ListFactory = ListFactory;
//# sourceMappingURL=list.factory.js.map