"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const base_entity_entity_1 = require("../common/entities/base-entity.entity");
const user_entity_1 = require("../users/user.entity");
const core_1 = require("@mikro-orm/core");
const swagger_1 = require("@nestjs/swagger");
let Room = class Room extends base_entity_entity_1.BaseEntity {
};
__decorate([
    (0, core_1.Property)(),
    (0, swagger_1.ApiProperty)({
        example: 'Main bedroom',
        description: 'Name of the room',
    }),
    __metadata("design:type", String)
], Room.prototype, "name", void 0);
__decorate([
    (0, core_1.ManyToOne)(),
    (0, swagger_1.ApiProperty)({
        description: 'User. Creator of the task.',
    }),
    __metadata("design:type", user_entity_1.User)
], Room.prototype, "createdBy", void 0);
Room = __decorate([
    (0, core_1.Entity)({ tableName: 'rooms' })
], Room);
exports.Room = Room;
//# sourceMappingURL=room.entity.js.map