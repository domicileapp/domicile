import { EntityRepository, NotFoundError } from '@mikro-orm/core';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './room.entity';
export declare class RoomsService {
    private roomsRepository;
    constructor(roomsRepository: EntityRepository<Room>);
    create(createdById: number, createRoomDto: CreateRoomDto): Promise<Room>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<Room, "createdBy">[]>;
    findOne(id: number): Promise<import("@mikro-orm/core").Loaded<Room, "createdBy"> | NotFoundError<typeof Room>>;
    update(id: number, updateRoomDto: UpdateRoomDto): Promise<import("@mikro-orm/core").Loaded<Room, never>>;
    remove(id: number): Promise<boolean>;
}
