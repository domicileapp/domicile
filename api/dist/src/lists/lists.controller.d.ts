import { User } from 'src/users/user.entity';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListsService } from './lists.service';
export declare class ListsController {
    private readonly listsService;
    constructor(listsService: ListsService);
    create(user: User, createListDto: CreateListDto): Promise<import("./list.entity").List>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("./list.entity").List, "createdBy">[]>;
    findOne(id: number): Promise<import("@mikro-orm/core").Loaded<import("./list.entity").List, "createdBy"> | import("@mikro-orm/core").NotFoundError<typeof import("./list.entity").List>>;
    update(id: string, updateListDto: UpdateListDto): Promise<import("@mikro-orm/core").Loaded<import("./list.entity").List, never>>;
    remove(id: string): Promise<boolean>;
}
