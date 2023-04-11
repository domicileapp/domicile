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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const core_1 = require("@mikro-orm/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const users_service_1 = require("../users/users.service");
const refresh_token_entity_1 = require("./entities/refresh-token.entity");
let AuthService = AuthService_1 = class AuthService {
    constructor(usersService, jwtService, refreshTokenRepository) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async validateUser(username, plainTextPassword) {
        const user = await this.usersService.findOne({
            username,
        });
        if (user) {
            const match = await bcrypt.compare(plainTextPassword, user.password);
            if (match) {
                return user;
            }
        }
        return null;
    }
    async generateAccessToken(user) {
        const payload = { sub: String(user.id) };
        return await this.jwtService.signAsync(payload);
    }
    async createRefreshToken(user, ttl) {
        const expiration = new Date();
        expiration.setTime(expiration.getTime() + ttl);
        const token = this.refreshTokenRepository.create({
            user,
            expires: expiration,
        });
        await this.refreshTokenRepository.persistAndFlush(token);
        return token;
    }
    async generateRefreshToken(user, expiresIn) {
        const payload = { sub: String(user.id) };
        const token = await this.createRefreshToken(user, expiresIn);
        return await this.jwtService.signAsync(Object.assign(Object.assign({}, payload), { expiresIn, jwtId: String(token.id) }));
    }
    async resolveRefreshToken(encoded) {
        try {
            const payload = await this.jwtService.verify(encoded);
            if (!payload.sub || !payload.jwtId) {
                throw new common_1.UnprocessableEntityException('Refresh token malformed');
            }
            const token = await this.refreshTokenRepository.findOne({
                id: payload.jwtId,
            });
            if (!token) {
                throw new common_1.UnprocessableEntityException('Refresh token not found');
            }
            if (token.revoked) {
                throw new common_1.UnprocessableEntityException('Refresh token revoked');
            }
            const user = await this.usersService.findOne({ id: payload.subject });
            if (!user) {
                throw new common_1.UnprocessableEntityException('Refresh token malformed');
            }
            return { user, token };
        }
        catch (e) {
            if (e instanceof jsonwebtoken_1.TokenExpiredError) {
                throw new common_1.UnprocessableEntityException('Refresh token expired');
            }
            else {
                throw new common_1.UnprocessableEntityException('Refresh token malformed');
            }
        }
    }
    async createAccessTokenFromRefreshToken(refresh) {
        const { user } = await this.resolveRefreshToken(refresh);
        const token = await this.generateAccessToken(user);
        return { user, token };
    }
    async register(username, password) {
        let user = await this.usersService.findOne({ username });
        if (user) {
            return null;
        }
        const hashed = await bcrypt.hash(password, 10);
        user = await this.usersService.create({ username, password: hashed });
        return user;
    }
};
AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, nestjs_1.InjectRepository)(refresh_token_entity_1.RefreshToken)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        core_1.EntityRepository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map