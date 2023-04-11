"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskFactory = void 0;
const seeder_1 = require("@mikro-orm/seeder");
const task_entity_1 = require("../../tasks/task.entity");
class TaskFactory extends seeder_1.Factory {
    constructor() {
        super(...arguments);
        this.model = task_entity_1.Task;
    }
    definition(faker) {
        return {
            title: faker.name.fullName(),
            description: faker.hacker.phrase(),
        };
    }
}
exports.TaskFactory = TaskFactory;
//# sourceMappingURL=task.factory.js.map