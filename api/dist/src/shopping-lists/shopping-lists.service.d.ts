import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
export declare class ShoppingListsService {
    create(createShoppingListDto: CreateShoppingListDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateShoppingListDto: UpdateShoppingListDto): string;
    remove(id: number): string;
}
