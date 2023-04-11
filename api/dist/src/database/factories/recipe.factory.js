"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeFactory = void 0;
const recipe_entity_1 = require("../../recipes/entity/recipe.entity");
const seeder_1 = require("@mikro-orm/seeder");
class RecipeFactory extends seeder_1.Factory {
    constructor() {
        super(...arguments);
        this.model = recipe_entity_1.Recipe;
    }
    definition(faker) {
        return {
            title: faker.random.words(3),
            prepTime: parseInt(faker.random.numeric()),
            cookTime: parseInt(faker.random.numeric()),
            servingSize: parseInt(faker.random.numeric(1)),
            ingredients: faker.lorem.lines(5),
            directions: faker.lorem.paragraph(10),
        };
    }
}
exports.RecipeFactory = RecipeFactory;
//# sourceMappingURL=recipe.factory.js.map