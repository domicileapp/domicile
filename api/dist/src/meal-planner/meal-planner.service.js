"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealPlannerService = void 0;
const common_1 = require("@nestjs/common");
let MealPlannerService = class MealPlannerService {
    create(createMealPlannerDto) {
        return 'This action adds a new mealPlanner';
    }
    findAll() {
        return `This action returns all mealPlanner`;
    }
    findOne(id) {
        return `This action returns a #${id} mealPlanner`;
    }
    update(id, updateMealPlannerDto) {
        return `This action updates a #${id} mealPlanner`;
    }
    remove(id) {
        return `This action removes a #${id} mealPlanner`;
    }
};
MealPlannerService = __decorate([
    (0, common_1.Injectable)()
], MealPlannerService);
exports.MealPlannerService = MealPlannerService;
//# sourceMappingURL=meal-planner.service.js.map