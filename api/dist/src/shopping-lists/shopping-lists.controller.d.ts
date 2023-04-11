import { ShoppingListsService } from './shopping-lists.service';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
export declare class ShoppingListsController {
    private readonly shoppingListsService;
    constructor(shoppingListsService: ShoppingListsService);
    create(createShoppingListDto: CreateShoppingListDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateShoppingListDto: UpdateShoppingListDto): string;
    remove(id: string): string;
}
