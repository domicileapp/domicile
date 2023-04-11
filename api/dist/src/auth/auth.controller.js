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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("../users/dto/user.dto");
const auth_service_1 = require("./auth.service");
const login_user_body_1 = require("./dto/login-user.body");
const login_user_response_1 = require("./dto/login-user.response");
const refresh_token_body_1 = require("./dto/refresh-token.body");
const refresh_token_response_1 = require("./dto/refresh-token.response");
const register_user_body_1 = require("./dto/register-user.body");
const register_user_response_1 = require("./dto/register-user.response");
const local_auth_guard_1 = require("./guards/local-auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req) {
        const accessToken = await this.authService.generateAccessToken(req.user);
        const refreshToken = await this.authService.generateRefreshToken(req.user, 60 * 60 * 24 * 30);
        const payload = new login_user_response_1.LoginUserResponse();
        payload.user = new user_dto_1.UserDto(req.user);
        payload.accessToken = accessToken;
        payload.refreshToken = refreshToken;
        return payload;
    }
    async refresh(refreshInput) {
        const { user, token } = await this.authService.createAccessTokenFromRefreshToken(refreshInput.refreshToken);
        const payload = new refresh_token_response_1.RefreshTokenResponse();
        payload.user = new user_dto_1.UserDto(user);
        payload.accessToken = token;
        return payload;
    }
    async register(registerInput) {
        const user = await this.authService.register(registerInput.username, registerInput.password);
        const accessToken = await this.authService.generateAccessToken(user);
        const refreshToken = await this.authService.generateRefreshToken(user, 60 * 60 * 24 * 30);
        const payload = new register_user_response_1.RegisterUserResponse();
        payload.user = new user_dto_1.UserDto(user);
        payload.accessToken = accessToken;
        payload.refreshToken = refreshToken;
        return payload;
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiBody)({ type: login_user_body_1.LoginUserBody }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User has been logged in.',
        type: login_user_response_1.LoginUserResponse,
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Generates a new access token.',
        type: refresh_token_response_1.RefreshTokenResponse,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_body_1.RefreshTokenBody]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'User has been registered.',
        type: register_user_response_1.RegisterUserResponse,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_body_1.RegisterUserBody]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map