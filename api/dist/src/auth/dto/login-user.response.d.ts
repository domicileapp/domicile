import { UserDto } from '@/users/dto/user.dto';
export declare class LoginUserResponse {
    user: UserDto;
    accessToken: string;
    refreshToken: string;
}
