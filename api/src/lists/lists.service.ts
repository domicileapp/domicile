import { EntityRepository, NotFoundError } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CreateListDto } from './dto/create-list.dto'
import { UpdateListDto } from './dto/update-list.dto'
import { List } from './list.entity'

interface FindAllArgs {
  relations?: string[]
  authorId?: number
}

interface FindOneArgs extends FindAllArgs {
  id: number
}

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List)
    private listsRepository: EntityRepository<List>,
  ) {}

  async create(createdById: number, createListInput: CreateListDto) {
    const list = this.listsRepository.create({
      createdBy: {
        id: createdById,
      },
      ...createListInput,
    })
    await this.listsRepository.persistAndFlush(list)
    return list
  }

  findAll() {
    return this.listsRepository.findAll({ populate: ['createdBy'] })
  }

  async findOne({ id }: FindOneArgs) {
    try {
      const list = this.listsRepository.findOneOrFail(
        { id },
        { populate: ['createdBy'] },
      )
      return list
    } catch (e) {
      return new NotFoundError(`Not found`, List)
    }
  }

  async update(id: number, updateListInput: UpdateListDto) {
    const post = await this.listsRepository.findOne(id)
    this.listsRepository.assign(post, updateListInput)
    await this.listsRepository.flush()
    return post
  }

  async remove(id: number) {
    await this.listsRepository.removeAndFlush({ id })
    return true
  }
}
