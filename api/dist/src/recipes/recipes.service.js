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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesService = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const recipe_entity_1 = require("./entity/recipe.entity");
const core_1 = require("@mikro-orm/core");
let RecipesService = class RecipesService {
    constructor(recipes) {
        this.recipes = recipes;
    }
    async create(createRecipeDto) {
        const recipe = this.recipes.create(createRecipeDto);
        await this.recipes.persist(recipe).flush();
        return recipe;
    }
    async findAll() {
        const recipes = await this.recipes.findAll();
        return recipes;
    }
    async findOne(id) {
        const recipe = await this.recipes.findOneOrFail(id);
        return recipe;
    }
    async update(id, updateRecipeDto) {
        const recipe = await this.recipes.findOne(id);
        (0, core_1.wrap)(recipe).assign(updateRecipeDto);
        await this.recipes.flush();
        return recipe;
    }
    async remove(id) {
        const recipe = await this.recipes.findOne(id);
        this.recipes.removeAndFlush(recipe);
        return { status: common_1.HttpStatus.OK, entityRemoved: recipe };
    }
};
RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(recipe_entity_1.Recipe)),
    __metadata("design:paramtypes", [postgresql_1.EntityRepository])
], RecipesService);
exports.RecipesService = RecipesService;
//# sourceMappingURL=recipes.service.js.map