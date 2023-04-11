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
exports.User = void 0;
const core_1 = require("@mikro-orm/core");
const swagger_1 = require("@nestjs/swagger");
const refresh_token_entity_1 = require("../auth/entities/refresh-token.entity");
const base_entity_entity_1 = require("../common/entities/base-entity.entity");
const list_entity_1 = require("../lists/list.entity");
let User = class User extends base_entity_entity_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.lists = new core_1.Collection(this);
        this.refreshTokens = new core_1.Collection(this);
    }
};
__decorate([
    (0, core_1.Property)(),
    (0, core_1.Unique)(),
    (0, swagger_1.ApiProperty)({
        example: 'patrick',
        description: 'Username. Alphanumeric, 2-24 characters.',
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, core_1.Property)({ hidden: true }),
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    (0, swagger_1.ApiProperty)({
        example: 'John',
        description: "User's first name",
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    (0, swagger_1.ApiProperty)({
        example: 'Smith',
        description: "User's last name",
    }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, core_1.OneToMany)(() => list_entity_1.List, (list) => list.createdBy, {
        cascade: [core_1.Cascade.REMOVE],
    }),
    (0, swagger_1.ApiProperty)({
        description: 'Lists created by user.',
    }),
    __metadata("design:type", Object)
], User.prototype, "lists", void 0);
__decorate([
    (0, core_1.OneToMany)(() => refresh_token_entity_1.RefreshToken, (refreshToken) => refreshToken.user, {
        cascade: [core_1.Cascade.REMOVE],
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], User.prototype, "refreshTokens", void 0);
User = __decorate([
    (0, core_1.Entity)({ tableName: 'users' })
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map