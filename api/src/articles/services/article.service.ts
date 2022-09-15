import { Injectable, UnauthorizedException } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { Repository } from 'typeorm'

import { Action } from '../../shared/acl/action.constant'
import { Actor } from '../../shared/acl/actor.constant'
import { AppLogger } from '../../shared/logger/logger.service'
import { RequestContext } from '../../shared/request-context/request-context.dto'
import { User } from '../../users/entities/user.entity'
import { UserService } from '../../users/services/user.service'
import {
  CreateArticleInput,
  UpdateArticleInput,
} from '../dtos/article-input.dto'
import { ArticleOutput } from '../dtos/article-output.dto'
import { Article } from '../entities/article.entity'
import { ArticleAclService } from './article-acl.service'

@Injectable()
export class ArticleService {
  constructor(
    private articleRepository: Repository<Article>,
    private userService: UserService,
    private aclService: ArticleAclService,
    private readonly logger: AppLogger
  ) {
    this.logger.setContext(ArticleService.name)
  }

  async createArticle(
    ctx: RequestContext,
    input: CreateArticleInput
  ): Promise<ArticleOutput> {
    this.logger.log(ctx, `${this.createArticle.name} was called`)

    const article = plainToClass(Article, input)

    const actor: Actor = ctx.user

    const user = await this.userService.getUserById(ctx, actor.id)

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Create, article)
    if (!isAllowed) {
      throw new UnauthorizedException()
    }

    article.author = plainToClass(User, user)

    const savedArticle = await this.articleRepository.save(article)

    return plainToClass(ArticleOutput, savedArticle, {
      excludeExtraneousValues: true,
    })
  }

  async getArticles(
    ctx: RequestContext,
    limit: number,
    offset: number
  ): Promise<{ articles: ArticleOutput[]; count: number }> {
    this.logger.log(ctx, `${this.getArticles.name} was called`)

    const actor: Actor = ctx.user

    const isAllowed = this.aclService.forActor(actor).canDoAction(Action.List)
    if (!isAllowed) {
      throw new UnauthorizedException()
    }

    const [articles, count] = await this.articleRepository.findAndCount({
      where: {},
      take: limit,
      skip: offset,
    })

    const articlesOutput = plainToClass(ArticleOutput, articles, {
      excludeExtraneousValues: true,
    })

    return { articles: articlesOutput, count }
  }

  async getArticleById(
    ctx: RequestContext,
    id: number
  ): Promise<ArticleOutput> {
    this.logger.log(ctx, `${this.getArticleById.name} was called`)

    const actor: Actor = ctx.user

    const article = await this.articleRepository.findOneBy({ id })

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Read, article)
    if (!isAllowed) {
      throw new UnauthorizedException()
    }

    return plainToClass(ArticleOutput, article, {
      excludeExtraneousValues: true,
    })
  }

  async updateArticle(
    ctx: RequestContext,
    articleId: number,
    input: UpdateArticleInput
  ): Promise<ArticleOutput> {
    this.logger.log(ctx, `${this.updateArticle.name} was called`)

    const article = await this.articleRepository.findOneBy({ id: articleId })

    const actor: Actor = ctx.user

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Update, article)
    if (!isAllowed) {
      throw new UnauthorizedException()
    }

    const updatedArticle: Article = {
      ...article,
      ...plainToClass(Article, input),
    }

    const savedArticle = await this.articleRepository.save(updatedArticle)

    return plainToClass(ArticleOutput, savedArticle, {
      excludeExtraneousValues: true,
    })
  }

  async deleteArticle(ctx: RequestContext, id: number): Promise<void> {
    this.logger.log(ctx, `${this.deleteArticle.name} was called`)

    const article = await this.articleRepository.findOneBy({ id })

    const actor: Actor = ctx.user

    const isAllowed = this.aclService
      .forActor(actor)
      .canDoAction(Action.Delete, article)
    if (!isAllowed) {
      throw new UnauthorizedException()
    }

    await this.articleRepository.remove(article)
  }
}
