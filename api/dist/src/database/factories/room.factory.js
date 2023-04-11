"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomFactory = void 0;
const room_entity_1 = require("../../rooms/room.entity");
const seeder_1 = require("@mikro-orm/seeder");
class RoomFactory extends seeder_1.Factory {
    constructor() {
        super(...arguments);
        this.model = room_entity_1.Room;
    }
    definition(faker) {
        return {
            name: faker.random.word(),
        };
    }
}
exports.RoomFactory = RoomFactory;
//# sourceMappingURL=room.factory.js.map