import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<UserDto[]>;
    findOne(username: string): Promise<UserDto>;
    update(user: User, updateUserDto: UpdateProfileDto): Promise<UserDto>;
    getProfile(user: User): UserDto;
}
