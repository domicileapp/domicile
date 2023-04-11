import { EntityRepository, NotFoundError } from '@mikro-orm/core';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './list.entity';
interface FindAllArgs {
    relations?: string[];
    authorId?: number;
}
interface FindOneArgs extends FindAllArgs {
    id: number;
}
export declare class ListsService {
    private listsRepository;
    constructor(listsRepository: EntityRepository<List>);
    create(createdById: number, createListInput: CreateListDto): Promise<List>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<List, "createdBy">[]>;
    findOne({ id }: FindOneArgs): Promise<import("@mikro-orm/core").Loaded<List, "createdBy"> | NotFoundError<typeof List>>;
    update(id: number, updateListInput: UpdateListDto): Promise<import("@mikro-orm/core").Loaded<List, never>>;
    remove(id: number): Promise<boolean>;
}
export {};
