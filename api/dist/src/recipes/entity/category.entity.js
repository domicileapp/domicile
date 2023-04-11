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
exports.RecipeCategory = void 0;
const base_entity_entity_1 = require("../../common/entities/base-entity.entity");
const core_1 = require("@mikro-orm/core");
const swagger_1 = require("@nestjs/swagger");
const recipe_entity_1 = require("./recipe.entity");
let RecipeCategory = class RecipeCategory extends base_entity_entity_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.recipes = new core_1.Collection(this);
    }
};
__decorate([
    (0, core_1.Property)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RecipeCategory.prototype, "name", void 0);
__decorate([
    (0, core_1.ManyToMany)(() => recipe_entity_1.Recipe, (recipe) => recipe.categories),
    __metadata("design:type", Object)
], RecipeCategory.prototype, "recipes", void 0);
RecipeCategory = __decorate([
    (0, core_1.Entity)({ tableName: 'category' })
], RecipeCategory);
exports.RecipeCategory = RecipeCategory;
//# sourceMappingURL=category.entity.js.map