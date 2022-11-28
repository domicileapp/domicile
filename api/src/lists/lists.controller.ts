import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { CurrentUser } from 'src/auth/decorator/current-user.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { User } from 'src/users/user.entity'
import { CreateListDto } from './dto/create-list.dto'
import { UpdateListDto } from './dto/update-list.dto'
import { ListsService } from './lists.service'

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@CurrentUser() user: User, @Body() createListDto: CreateListDto) {
    return this.listsService.create(user.id, createListDto)
  }

  @Get()
  findAll() {
    return this.listsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.listsService.findOne({ id })
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    try {
      await this.listsService.findOne({ id: +id })
      return this.listsService.update(+id, updateListDto)
    } catch (e) {
      throw new UnauthorizedException({
        message: `You aren't the creator of this list.`,
      })
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.listsService.findOne({ id: +id })
      return this.listsService.remove(+id)
    } catch (e) {
      throw new UnauthorizedException({
        message: `You aren't the creator of this list.`,
      })
    }
  }
}
