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
exports.UsersService = void 0;
const core_1 = require("@mikro-orm/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserInput) {
        const user = this.usersRepository.create(createUserInput);
        await this.usersRepository.persistAndFlush(user);
        return user;
    }
    findAll() {
        return this.usersRepository.find({});
    }
    findOne({ id, username, postId }) {
        if (id) {
            return this.usersRepository.findOne({ id });
        }
        else if (username) {
            return this.usersRepository.findOne({
                [(0, core_1.expr)('lower(username)')]: username.toLowerCase(),
            });
        }
        else if (postId) {
            return this.usersRepository.findOne({ lists: { id: postId } });
        }
        else {
            throw new Error('One of ID, username or post ID must be provided.');
        }
    }
    async update(id, updateUserInput) {
        const user = await this.usersRepository.findOneOrFail(id);
        this.usersRepository.assign(user, updateUserInput);
        await this.usersRepository.flush();
        return user;
    }
    async remove(id) {
        await this.usersRepository.removeAndFlush({ id });
        return true;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [core_1.EntityRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map