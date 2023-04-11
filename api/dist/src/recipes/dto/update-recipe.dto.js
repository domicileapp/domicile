"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRecipeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_recipe_dto_1 = require("./create-recipe.dto");
class UpdateRecipeDto extends (0, swagger_1.PartialType)(create_recipe_dto_1.CreateRecipeDto) {
}
exports.UpdateRecipeDto = UpdateRecipeDto;
//# sourceMappingURL=update-recipe.dto.js.map