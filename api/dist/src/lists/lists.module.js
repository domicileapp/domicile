"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListsModule = void 0;
const users_module_1 = require("../users/users.module");
const nestjs_1 = require("@mikro-orm/nestjs");
const common_1 = require("@nestjs/common");
const list_entity_1 = require("./list.entity");
const lists_controller_1 = require("./lists.controller");
const lists_service_1 = require("./lists.service");
let ListsModule = class ListsModule {
};
ListsModule = __decorate([
    (0, common_1.Module)({
        controllers: [lists_controller_1.ListsController],
        imports: [nestjs_1.MikroOrmModule.forFeature([list_entity_1.List]), (0, common_1.forwardRef)(() => users_module_1.UsersModule)],
        providers: [lists_service_1.ListsService],
        exports: [lists_service_1.ListsService],
    })
], ListsModule);
exports.ListsModule = ListsModule;
//# sourceMappingURL=lists.module.js.map