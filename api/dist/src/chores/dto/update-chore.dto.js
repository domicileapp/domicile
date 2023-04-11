"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChoreDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_chore_dto_1 = require("./create-chore.dto");
class UpdateChoreDto extends (0, swagger_1.PartialType)(create_chore_dto_1.CreateChoreDto) {
}
exports.UpdateChoreDto = UpdateChoreDto;
//# sourceMappingURL=update-chore.dto.js.map