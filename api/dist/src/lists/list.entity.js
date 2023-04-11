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
exports.List = void 0;
const core_1 = require("@mikro-orm/core");
const base_entity_entity_1 = require("../common/entities/base-entity.entity");
const user_entity_1 = require("../users/user.entity");
let List = class List extends base_entity_entity_1.BaseEntity {
};
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], List.prototype, "title", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], List.prototype, "description", void 0);
__decorate([
    (0, core_1.ManyToOne)(),
    __metadata("design:type", user_entity_1.User)
], List.prototype, "createdBy", void 0);
List = __decorate([
    (0, core_1.Entity)({ tableName: 'lists' })
], List);
exports.List = List;
//# sourceMappingURL=list.entity.js.map