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
exports.Recipe = void 0;
const base_entity_entity_1 = require("../../common/entities/base-entity.entity");
const core_1 = require("@mikro-orm/core");
let Recipe = class Recipe extends base_entity_entity_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.categories = new core_1.Collection(this);
    }
};
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Recipe.prototype, "title", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Recipe.prototype, "prepTime", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Recipe.prototype, "cookTime", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], Recipe.prototype, "servingSize", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'text' }),
    __metadata("design:type", String)
], Recipe.prototype, "ingredients", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'text' }),
    __metadata("design:type", String)
], Recipe.prototype, "directions", void 0);
__decorate([
    (0, core_1.ManyToMany)(),
    __metadata("design:type", Object)
], Recipe.prototype, "categories", void 0);
Recipe = __decorate([
    (0, core_1.Entity)({ tableName: 'recipes' })
], Recipe);
exports.Recipe = Recipe;
//# sourceMappingURL=recipe.entity.js.map