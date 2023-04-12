import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CookbooksService } from './cookbooks.service';
import { CreateCookbookDto } from './dto/create-cookbook.dto';
import { UpdateCookbookDto } from './dto/update-cookbook.dto';

@Controller('cookbooks')
export class CookbooksController {
  constructor(private readonly cookbooksService: CookbooksService) {}

  @Post()
  create(@Body() createCookbookDto: CreateCookbookDto) {
    return this.cookbooksService.create(createCookbookDto);
  }

  @Get()
  findAll() {
    return this.cookbooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cookbooksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCookbookDto: UpdateCookbookDto) {
    return this.cookbooksService.update(+id, updateCookbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cookbooksService.remove(+id);
  }
}
