"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCookbookDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_cookbook_dto_1 = require("./create-cookbook.dto");
class UpdateCookbookDto extends (0, swagger_1.PartialType)(create_cookbook_dto_1.CreateCookbookDto) {
}
exports.UpdateCookbookDto = UpdateCookbookDto;
//# sourceMappingURL=update-cookbook.dto.js.map