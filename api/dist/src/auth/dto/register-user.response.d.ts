import { UserDto } from '@/users/dto/user.dto';
export declare class RegisterUserResponse {
    user: UserDto;
    accessToken: string;
    refreshToken: string;
}
