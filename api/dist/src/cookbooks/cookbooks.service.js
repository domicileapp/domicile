"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookbooksService = void 0;
const common_1 = require("@nestjs/common");
let CookbooksService = class CookbooksService {
    create(createCookbookDto) {
        return 'This action adds a new cookbook';
    }
    findAll() {
        return `This action returns all cookbooks`;
    }
    findOne(id) {
        return `This action returns a #${id} cookbook`;
    }
    update(id, updateCookbookDto) {
        return `This action updates a #${id} cookbook`;
    }
    remove(id) {
        return `This action removes a #${id} cookbook`;
    }
};
CookbooksService = __decorate([
    (0, common_1.Injectable)()
], CookbooksService);
exports.CookbooksService = CookbooksService;
//# sourceMappingURL=cookbooks.service.js.map