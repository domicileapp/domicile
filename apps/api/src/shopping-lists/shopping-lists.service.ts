import { Injectable } from '@nestjs/common';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';

@Injectable()
export class ShoppingListsService {
  create(createShoppingListDto: CreateShoppingListDto) {
    return 'This action adds a new shoppingList';
  }

  findAll() {
    return `This action returns all shoppingLists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shoppingList`;
  }

  update(id: number, updateShoppingListDto: UpdateShoppingListDto) {
    return `This action updates a #${id} shoppingList`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingList`;
  }
}
