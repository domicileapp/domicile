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
exports.RefreshToken = void 0;
const core_1 = require("@mikro-orm/core");
const base_entity_entity_1 = require("../../common/entities/base-entity.entity");
const user_entity_1 = require("../../users/user.entity");
let RefreshToken = class RefreshToken extends base_entity_entity_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.revoked = false;
    }
};
__decorate([
    (0, core_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE', joinColumn: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], RefreshToken.prototype, "user", void 0);
__decorate([
    (0, core_1.Property)({ name: 'is_revoked' }),
    __metadata("design:type", Object)
], RefreshToken.prototype, "revoked", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], RefreshToken.prototype, "expires", void 0);
RefreshToken = __decorate([
    (0, core_1.Entity)({ tableName: 'refresh_tokens' })
], RefreshToken);
exports.RefreshToken = RefreshToken;
//# sourceMappingURL=refresh-token.entity.js.map