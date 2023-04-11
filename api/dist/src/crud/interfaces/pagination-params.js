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
exports.parseObject = exports.ObjectSelect = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const shared_1 = require("../../common/utils/shared");
class ObjectSelect {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: 'object' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseObject(value, shared_1.parseToBoolean)),
    __metadata("design:type", Object)
], ObjectSelect.prototype, "select", void 0);
exports.ObjectSelect = ObjectSelect;
function parseObject(source, callback) {
    if ((0, shared_1.isObject)(source)) {
        for (const key in source) {
            if ((0, shared_1.isObject)(source[key])) {
                if (!(0, shared_1.isClassInstance)(source[key])) {
                    parseObject(source[key], callback);
                }
            }
            else {
                Object.assign(source, { [key]: callback(source[key]) });
            }
        }
    }
    return source;
}
exports.parseObject = parseObject;
//# sourceMappingURL=pagination-params.js.map