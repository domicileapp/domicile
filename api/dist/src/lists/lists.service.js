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
exports.ListsService = void 0;
const core_1 = require("@mikro-orm/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const common_1 = require("@nestjs/common");
const list_entity_1 = require("./list.entity");
let ListsService = class ListsService {
    constructor(listsRepository) {
        this.listsRepository = listsRepository;
    }
    async create(createdById, createListInput) {
        const list = this.listsRepository.create(Object.assign({ createdBy: {
                id: createdById,
            } }, createListInput));
        await this.listsRepository.persistAndFlush(list);
        return list;
    }
    findAll() {
        return this.listsRepository.findAll({ populate: ['createdBy'] });
    }
    async findOne({ id }) {
        try {
            const list = this.listsRepository.findOneOrFail({ id }, { populate: ['createdBy'] });
            return list;
        }
        catch (e) {
            return new core_1.NotFoundError(`Not found`, list_entity_1.List);
        }
    }
    async update(id, updateListInput) {
        const post = await this.listsRepository.findOne(id);
        this.listsRepository.assign(post, updateListInput);
        await this.listsRepository.flush();
        return post;
    }
    async remove(id) {
        await this.listsRepository.removeAndFlush({ id });
        return true;
    }
};
ListsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(list_entity_1.List)),
    __metadata("design:paramtypes", [core_1.EntityRepository])
], ListsService);
exports.ListsService = ListsService;
//# sourceMappingURL=lists.service.js.map