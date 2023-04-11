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
exports.TasksService = void 0;
const core_1 = require("@mikro-orm/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const common_1 = require("@nestjs/common");
const task_entity_1 = require("./task.entity");
let TasksService = class TasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async create(createdById, createTaskInput) {
        const task = this.tasksRepository.create(Object.assign({ createdBy: {
                id: createdById,
            } }, createTaskInput));
        await this.tasksRepository.persistAndFlush(task);
        return task;
    }
    findAll() {
        return this.tasksRepository.findAll({ populate: ['createdBy'] });
    }
    async findOne({ id }) {
        try {
            const task = this.tasksRepository.findOneOrFail({ id }, { populate: ['createdBy'] });
            return task;
        }
        catch (e) {
            return new core_1.NotFoundError(`Not found`, task_entity_1.Task);
        }
    }
    async update(id, updateTaskInput) {
        const post = await this.tasksRepository.findOne(id);
        this.tasksRepository.assign(post, updateTaskInput);
        await this.tasksRepository.flush();
        return post;
    }
    async remove(id) {
        await this.tasksRepository.removeAndFlush({ id });
        return true;
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [core_1.EntityRepository])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map