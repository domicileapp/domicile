import { EntityRepository, NotFoundError } from '@mikro-orm/core'
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
    return this.roomsRepository.findAll({ populate: ['createdBy'] })
  }

  async findOne(id: number) {
    try {
      const list = this.roomsRepository.findOneOrFail(
        { id },
        { populate: ['createdBy'] },
      )
      return list
    } catch (e) {
      return new NotFoundError(`Not found`, Room)
    }
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomsRepository.findOne(id)
    this.roomsRepository.assign(room, updateRoomDto)
    await this.roomsRepository.flush()
    return room
  }

  async remove(id: number) {
    await this.roomsRepository.removeAndFlush({ id })
    return true
  }
}
