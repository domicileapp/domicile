import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { JwtAuthStrategy } from '../auth/strategies/jwt-auth.strategy'
import { SharedModule } from '../shared/shared.module'
import { UserModule } from '../users/user.module'
import { ArticleController } from './controllers/article.controller'
import { ArticleService } from './services/article.service'
import { ArticleAclService } from './services/article-acl.service'
import { Article } from './entities/article.entity'

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([Article]), UserModule],
  providers: [ArticleService, JwtAuthStrategy, ArticleAclService],
  controllers: [ArticleController],
  exports: [ArticleService],
})
export class ArticleModule {}
