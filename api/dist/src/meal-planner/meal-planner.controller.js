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
exports.MealPlannerController = void 0;
const common_1 = require("@nestjs/common");
const meal_planner_service_1 = require("./meal-planner.service");
const create_meal_planner_dto_1 = require("./dto/create-meal-planner.dto");
const update_meal_planner_dto_1 = require("./dto/update-meal-planner.dto");
let MealPlannerController = class MealPlannerController {
    constructor(mealPlannerService) {
        this.mealPlannerService = mealPlannerService;
    }
    create(createMealPlannerDto) {
        return this.mealPlannerService.create(createMealPlannerDto);
    }
    findAll() {
        return this.mealPlannerService.findAll();
    }
    findOne(id) {
        return this.mealPlannerService.findOne(+id);
    }
    update(id, updateMealPlannerDto) {
        return this.mealPlannerService.update(+id, updateMealPlannerDto);
    }
    remove(id) {
        return this.mealPlannerService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_meal_planner_dto_1.CreateMealPlannerDto]),
    __metadata("design:returntype", void 0)
], MealPlannerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MealPlannerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MealPlannerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_meal_planner_dto_1.UpdateMealPlannerDto]),
    __metadata("design:returntype", void 0)
], MealPlannerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MealPlannerController.prototype, "remove", null);
MealPlannerController = __decorate([
    (0, common_1.Controller)('meal-planner'),
    __metadata("design:paramtypes", [meal_planner_service_1.MealPlannerService])
], MealPlannerController);
exports.MealPlannerController = MealPlannerController;
//# sourceMappingURL=meal-planner.controller.js.map