"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShoppingListDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_shopping_list_dto_1 = require("./create-shopping-list.dto");
class UpdateShoppingListDto extends (0, swagger_1.PartialType)(create_shopping_list_dto_1.CreateShoppingListDto) {
}
exports.UpdateShoppingListDto = UpdateShoppingListDto;
//# sourceMappingURL=update-shopping-list.dto.js.map