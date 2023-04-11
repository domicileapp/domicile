import { EntityRepository } from '@mikro-orm/core';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { RefreshToken } from './entities/refresh-token.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    private refreshTokenRepository;
    private readonly logger;
    constructor(usersService: UsersService, jwtService: JwtService, refreshTokenRepository: EntityRepository<RefreshToken>);
    validateUser(username: string, plainTextPassword: string): Promise<import("@mikro-orm/core").Loaded<User, never>>;
    generateAccessToken(user: Pick<User, 'id'>): Promise<string>;
    createRefreshToken(user: Pick<User, 'id'>, ttl: number): Promise<RefreshToken>;
    generateRefreshToken(user: Pick<User, 'id'>, expiresIn: number): Promise<string>;
    resolveRefreshToken(encoded: string): Promise<{
        user: import("@mikro-orm/core").Loaded<User, never>;
        token: import("@mikro-orm/core").Loaded<RefreshToken, never>;
    }>;
    createAccessTokenFromRefreshToken(refresh: string): Promise<{
        user: import("@mikro-orm/core").Loaded<User, never>;
        token: string;
    }>;
    register(username: string, password: string): Promise<import("@mikro-orm/core").Loaded<User, never>>;
}
