import { CookbooksService } from './cookbooks.service';
import { CreateCookbookDto } from './dto/create-cookbook.dto';
import { UpdateCookbookDto } from './dto/update-cookbook.dto';
export declare class CookbooksController {
    private readonly cookbooksService;
    constructor(cookbooksService: CookbooksService);
    create(createCookbookDto: CreateCookbookDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCookbookDto: UpdateCookbookDto): string;
    remove(id: string): string;
}
