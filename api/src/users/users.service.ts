import { EntityRepository, expr } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { User } from './user.entity'

interface FindAllArgs {
  relations?: string[]
}

interface FindOneArgs extends FindAllArgs {
  id?: number
  username?: string
  postId?: number
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: EntityRepository<User>,
  ) {}

  async create(createUserInput: Partial<User>) {
    const user = this.usersRepository.create(createUserInput)
    await this.usersRepository.persistAndFlush(user)
    return user
  }

  findAll() {
    return this.usersRepository.find({})
  }

  findOne({ id, username, postId }: FindOneArgs) {
    if (id) {
      return this.usersRepository.findOne({ id })
    } else if (username) {
      return this.usersRepository.findOne({
        [expr('lower(username)')]: username.toLowerCase(),
      })
    } else if (postId) {
      return this.usersRepository.findOne({ lists: { id: postId } })
    } else {
      throw new Error('One of ID, username or post ID must be provided.')
    }
  }

  async update(id: number, updateUserInput: UpdateProfileDto) {
    const user = await this.usersRepository.findOneOrFail(id)
    this.usersRepository.assign(user, updateUserInput)
    await this.usersRepository.flush()
    return user
  }

  async remove(id: number) {
    await this.usersRepository.removeAndFlush({ id })
    return true
  }
}
