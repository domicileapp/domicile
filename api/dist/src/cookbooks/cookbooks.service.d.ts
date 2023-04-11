import { CreateCookbookDto } from './dto/create-cookbook.dto';
import { UpdateCookbookDto } from './dto/update-cookbook.dto';
export declare class CookbooksService {
    create(createCookbookDto: CreateCookbookDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCookbookDto: UpdateCookbookDto): string;
    remove(id: number): string;
}
