import { AuthService } from './auth.service';
import { LoginUserResponse } from './dto/login-user.response';
import { RefreshTokenBody } from './dto/refresh-token.body';
import { RefreshTokenResponse } from './dto/refresh-token.response';
import { RegisterUserBody } from './dto/register-user.body';
import { RegisterUserResponse } from './dto/register-user.response';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<LoginUserResponse>;
    refresh(refreshInput: RefreshTokenBody): Promise<RefreshTokenResponse>;
    register(registerInput: RegisterUserBody): Promise<RegisterUserResponse>;
}
