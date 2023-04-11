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
exports.Task = void 0;
const core_1 = require("@mikro-orm/core");
const list_entity_1 = require("../lists/list.entity");
const base_entity_entity_1 = require("../common/entities/base-entity.entity");
const user_entity_1 = require("../users/user.entity");
const swagger_1 = require("@nestjs/swagger");
let Task = class Task extends base_entity_entity_1.BaseEntity {
};
__decorate([
    (0, core_1.Property)(),
    (0, swagger_1.ApiProperty)({
        example: 'Clean out the fridge',
        description: 'Title of the task',
    }),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    (0, swagger_1.ApiProperty)({
        example: 'Be sure to remove all the shelving and scrub it.',
        description: 'Optional. Description of the task',
    }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, core_1.ManyToOne)(),
    (0, swagger_1.ApiProperty)({
        description: 'User. Creator of the task.',
    }),
    __metadata("design:type", user_entity_1.User)
], Task.prototype, "createdBy", void 0);
__decorate([
    (0, core_1.ManyToOne)(),
    (0, swagger_1.ApiProperty)({
        description: 'List the task belongs to.',
    }),
    __metadata("design:type", list_entity_1.List)
], Task.prototype, "list", void 0);
__decorate([
    (0, core_1.Property)({ default: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], Task.prototype, "complete", void 0);
Task = __decorate([
    (0, core_1.Entity)({ tableName: 'tasks' })
], Task);
exports.Task = Task;
//# sourceMappingURL=task.entity.js.map