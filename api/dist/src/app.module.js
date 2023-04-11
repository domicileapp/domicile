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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_1 = require("@mikro-orm/nestjs");
const auth_module_1 = require("./auth/auth.module");
const configuration_1 = require("./config/configuration");
const users_module_1 = require("./users/users.module");
const lists_module_1 = require("./lists/lists.module");
const core_1 = require("@mikro-orm/core");
const tasks_module_1 = require("./tasks/tasks.module");
const chores_module_1 = require("./chores/chores.module");
const rooms_module_1 = require("./rooms/rooms.module");
const health_module_1 = require("./health/health.module");
const recipes_module_1 = require("./recipes/recipes.module");
const shopping_lists_module_1 = require("./shopping-lists/shopping-lists.module");
const meal_planner_module_1 = require("./meal-planner/meal-planner.module");
const cookbooks_module_1 = require("./cookbooks/cookbooks.module");
const mikro_orm_test_config_1 = require("../mikro-orm-test.config");
let AppModule = class AppModule {
    constructor(orm) {
        this.orm = orm;
    }
    async onModuleInit() {
        await this.orm.getMigrator().up();
    }
    configure(consumer) {
        consumer.apply(nestjs_1.MikroOrmMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            nestjs_1.MikroOrmModule.forRoot(),
            nestjs_1.MikroOrmModule.forRoot(mikro_orm_test_config_1.default),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            lists_module_1.ListsModule,
            tasks_module_1.TasksModule,
            chores_module_1.ChoresModule,
            rooms_module_1.RoomsModule,
            health_module_1.HealthModule,
            recipes_module_1.RecipesModule,
            shopping_lists_module_1.ShoppingListsModule,
            meal_planner_module_1.MealPlannerModule,
            cookbooks_module_1.CookbooksModule,
        ],
        controllers: [],
        providers: [],
    }),
    __metadata("design:paramtypes", [core_1.MikroORM])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map