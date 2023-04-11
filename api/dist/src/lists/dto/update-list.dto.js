"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateListDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_list_dto_1 = require("./create-list.dto");
class UpdateListDto extends (0, mapped_types_1.PartialType)(create_list_dto_1.CreateListDto) {
}
exports.UpdateListDto = UpdateListDto;
//# sourceMappingURL=update-list.dto.js.map