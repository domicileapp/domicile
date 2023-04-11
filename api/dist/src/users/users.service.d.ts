import { EntityRepository } from '@mikro-orm/core';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from './user.entity';
interface FindAllArgs {
    relations?: string[];
}
interface FindOneArgs extends FindAllArgs {
    id?: number;
    username?: string;
    postId?: number;
}
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: EntityRepository<User>);
    create(createUserInput: Partial<User>): Promise<User>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<User, never>[]>;
    findOne({ id, username, postId }: FindOneArgs): Promise<import("@mikro-orm/core").Loaded<User, never>>;
    update(id: number, updateUserInput: UpdateProfileDto): Promise<import("@mikro-orm/core").Loaded<User, never>>;
    remove(id: number): Promise<boolean>;
}
export {};
