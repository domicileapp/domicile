import { PartialType } from '@nestjs/swagger';
import { CreateCookbookDto } from './create-cookbook.dto';

export class UpdateCookbookDto extends PartialType(CreateCookbookDto) {}
