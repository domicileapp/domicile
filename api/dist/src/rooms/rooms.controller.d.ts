import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { User } from '@/users/user.entity';
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    create(user: User, createRoomDto: CreateRoomDto): Promise<import("./room.entity").Room>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("./room.entity").Room, "createdBy">[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<import("./room.entity").Room, "createdBy"> | import("@mikro-orm/core").NotFoundError<typeof import("./room.entity").Room>>;
    update(id: string, updateRoomDto: UpdateRoomDto): Promise<import("@mikro-orm/core").Loaded<import("./room.entity").Room, never>>;
    remove(id: string): Promise<boolean>;
}
