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
exports.CookbooksController = void 0;
const common_1 = require("@nestjs/common");
const cookbooks_service_1 = require("./cookbooks.service");
const create_cookbook_dto_1 = require("./dto/create-cookbook.dto");
const update_cookbook_dto_1 = require("./dto/update-cookbook.dto");
let CookbooksController = class CookbooksController {
    constructor(cookbooksService) {
        this.cookbooksService = cookbooksService;
    }
    create(createCookbookDto) {
        return this.cookbooksService.create(createCookbookDto);
    }
    findAll() {
        return this.cookbooksService.findAll();
    }
    findOne(id) {
        return this.cookbooksService.findOne(+id);
    }
    update(id, updateCookbookDto) {
        return this.cookbooksService.update(+id, updateCookbookDto);
    }
    remove(id) {
        return this.cookbooksService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cookbook_dto_1.CreateCookbookDto]),
    __metadata("design:returntype", void 0)
], CookbooksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CookbooksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CookbooksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cookbook_dto_1.UpdateCookbookDto]),
    __metadata("design:returntype", void 0)
], CookbooksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CookbooksController.prototype, "remove", null);
CookbooksController = __decorate([
    (0, common_1.Controller)('cookbooks'),
    __metadata("design:paramtypes", [cookbooks_service_1.CookbooksService])
], CookbooksController);
exports.CookbooksController = CookbooksController;
//# sourceMappingURL=cookbooks.controller.js.map