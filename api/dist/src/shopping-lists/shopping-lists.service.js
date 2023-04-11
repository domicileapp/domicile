"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingListsService = void 0;
const common_1 = require("@nestjs/common");
let ShoppingListsService = class ShoppingListsService {
    create(createShoppingListDto) {
        return 'This action adds a new shoppingList';
    }
    findAll() {
        return `This action returns all shoppingLists`;
    }
    findOne(id) {
        return `This action returns a #${id} shoppingList`;
    }
    update(id, updateShoppingListDto) {
        return `This action updates a #${id} shoppingList`;
    }
    remove(id) {
        return `This action removes a #${id} shoppingList`;
    }
};
ShoppingListsService = __decorate([
    (0, common_1.Injectable)()
], ShoppingListsService);
exports.ShoppingListsService = ShoppingListsService;
//# sourceMappingURL=shopping-lists.service.js.map