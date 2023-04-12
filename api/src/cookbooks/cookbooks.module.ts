import { Module } from '@nestjs/common';
import { CookbooksService } from './cookbooks.service';
import { CookbooksController } from './cookbooks.controller';

@Module({
  controllers: [CookbooksController],
  providers: [CookbooksService]
})
export class CookbooksModule {}
