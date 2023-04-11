"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const seeder_1 = require("@mikro-orm/seeder");
const user_entity_1 = require("../../users/user.entity");
class UserFactory extends seeder_1.Factory {
    constructor() {
        super(...arguments);
        this.model = user_entity_1.User;
    }
    definition(faker) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        return {
            firstName,
            lastName,
            username: faker.internet.userName(firstName, lastName),
        };
    }
}
exports.UserFactory = UserFactory;
//# sourceMappingURL=user.factory.js.map