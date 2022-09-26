import { EntityRepository, FilterQuery } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Post } from './entities/post.entity'

interface FindAllArgs {
  relations?: string[]
  authorId?: number
}

interface FindOneArgs extends FindAllArgs {
  id: number
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: EntityRepository<Post>,
  ) {}

  async create(authorId: number, createPostInput: CreatePostDto) {
    const post = this.postsRepository.create({
      author: {
        id: authorId,
      },
      ...createPostInput,
    })
    await this.postsRepository.persistAndFlush(post)
    return post
  }

  findAll(args?: FindAllArgs) {
    const { authorId } = args
    let where: FilterQuery<Post> = {}
    if (authorId) {
      where = { ...where, author: { id: authorId } }
    }
    return this.postsRepository.find(where)
  }

  findOne({ id }: FindOneArgs) {
    return this.postsRepository.findOne(id)
  }

  async update(id: number, updatePostInput: UpdatePostDto) {
    const post = await this.postsRepository.findOne(id)
    this.postsRepository.assign(post, updatePostInput)
    await this.postsRepository.flush()
    return post
  }

  async remove(id: number) {
    await this.postsRepository.removeAndFlush({ id })
    return true
  }
}
