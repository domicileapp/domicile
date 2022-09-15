import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
// import { ArticleModule } from './article/article.module'
import { AuthModule } from './auth/auth.module'
import { SharedModule } from './shared/shared.module'
import { UserModule } from '@/users/user.module'

@Module({
  imports: [SharedModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
