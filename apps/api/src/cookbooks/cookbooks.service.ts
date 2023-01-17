import { Injectable } from '@nestjs/common';
import { CreateCookbookDto } from './dto/create-cookbook.dto';
import { UpdateCookbookDto } from './dto/update-cookbook.dto';

@Injectable()
export class CookbooksService {
  create(createCookbookDto: CreateCookbookDto) {
    return 'This action adds a new cookbook';
  }

  findAll() {
    return `This action returns all cookbooks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cookbook`;
  }

  update(id: number, updateCookbookDto: UpdateCookbookDto) {
    return `This action updates a #${id} cookbook`;
  }

  remove(id: number) {
    return `This action removes a #${id} cookbook`;
  }
}
