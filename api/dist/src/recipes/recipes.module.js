"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesModule = void 0;
const common_1 = require("@nestjs/common");
const recipes_service_1 = require("./recipes.service");
const recipes_controller_1 = require("./recipes.controller");
const nestjs_1 = require("@mikro-orm/nestjs");
const recipe_entity_1 = require("./entity/recipe.entity");
const users_module_1 = require("../users/users.module");
let RecipesModule = class RecipesModule {
};
RecipesModule = __decorate([
    (0, common_1.Module)({
        imports: [nestjs_1.MikroOrmModule.forFeature([recipe_entity_1.Recipe]), (0, common_1.forwardRef)(() => users_module_1.UsersModule)],
        controllers: [recipes_controller_1.RecipesController],
        providers: [recipes_service_1.RecipesService],
    })
], RecipesModule);
exports.RecipesModule = RecipesModule;
//# sourceMappingURL=recipes.module.js.map