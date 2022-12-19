import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CreateRoomDto } from './dto/create-room.dto'
import { UpdateRoomDto } from './dto/update-room.dto'
import { Room } from './room.entity'

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: EntityRepository<Room>,
  ) {}

  async create(createdById: number, createRoomDto: CreateRoomDto) {
    const room = this.roomsRepository.create({
      createdBy: {
        id: createdById,
      },
      ...createRoomDto,
    })
    await this.roomsRepository.persistAndFlush(room)
    return room
  }

  findAll() {
    return `This action returns all rooms`
  }

  findOne(id: number) {
    return `This action returns a #${id} room`
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`
  }

  remove(id: number) {
    return `This action removes a #${id} room`
  }
}
