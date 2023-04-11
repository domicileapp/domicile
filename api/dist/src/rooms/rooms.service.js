"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = void 0;
const core_1 = require("@mikro-orm/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const common_1 = require("@nestjs/common");
const room_entity_1 = require("./room.entity");
let RoomsService = class RoomsService {
    constructor(roomsRepository) {
        this.roomsRepository = roomsRepository;
    }
    async create(createdById, createRoomDto) {
        const room = this.roomsRepository.create(Object.assign({ createdBy: {
                id: createdById,
            } }, createRoomDto));
        await this.roomsRepository.persistAndFlush(room);
        return room;
    }
    findAll() {
        return this.roomsRepository.findAll({ populate: ['createdBy'] });
    }
    async findOne(id) {
        try {
            const list = this.roomsRepository.findOneOrFail({ id }, { populate: ['createdBy'] });
            return list;
        }
        catch (e) {
            return new core_1.NotFoundError(`Not found`, room_entity_1.Room);
        }
    }
    async update(id, updateRoomDto) {
        const room = await this.roomsRepository.findOne(id);
        this.roomsRepository.assign(room, updateRoomDto);
        await this.roomsRepository.flush();
        return room;
    }
    async remove(id) {
        await this.roomsRepository.removeAndFlush({ id });
        return true;
    }
};
RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(room_entity_1.Room)),
    __metadata("design:paramtypes", [core_1.EntityRepository])
], RoomsService);
exports.RoomsService = RoomsService;
//# sourceMappingURL=rooms.service.js.map