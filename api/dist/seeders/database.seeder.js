"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSeeder = void 0;
const seeder_1 = require("@mikro-orm/seeder");
const list_factory_1 = require("../src/database/factories/list.factory");
const task_factory_1 = require("../src/database/factories/task.factory");
const user_factory_1 = require("../src/database/factories/user.factory");
const room_factory_1 = require("../src/database/factories/room.factory");
const bcrypt = require("bcrypt");
const recipe_factory_1 = require("../src/database/factories/recipe.factory");
class DatabaseSeeder extends seeder_1.Seeder {
    async run(em) {
        const hashed = await bcrypt.hash('P@ssw0rd', 10);
        const user = new user_factory_1.UserFactory(em)
            .each((user) => {
            user.password = hashed;
        })
            .makeOne();
        new task_factory_1.TaskFactory(em)
            .each((task) => {
            task.createdBy = user;
            task.list = new list_factory_1.ListFactory(em)
                .each((list) => {
                list.createdBy = user;
            })
                .makeOne();
        })
            .make(5);
        new room_factory_1.RoomFactory(em)
            .each((room) => {
            room.createdBy = user;
        })
            .make(3);
        new recipe_factory_1.RecipeFactory(em).make(3);
    }
}
exports.DatabaseSeeder = DatabaseSeeder;
//# sourceMappingURL=database.seeder.js.map