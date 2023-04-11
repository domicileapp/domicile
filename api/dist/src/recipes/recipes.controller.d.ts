import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    create(createRecipeDto: CreateRecipeDto): Promise<import("./entity/recipe.entity").Recipe>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("./entity/recipe.entity").Recipe, never>[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entity/recipe.entity").Recipe, never>>;
    update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<import("@mikro-orm/core").Loaded<import("./entity/recipe.entity").Recipe, never>>;
    remove(id: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
        entityRemoved: import("@mikro-orm/core").Loaded<import("./entity/recipe.entity").Recipe, never>;
    }>;
}
