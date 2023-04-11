import { User } from '../user.entity';
export declare class UserDto {
    constructor(partial: Pick<User, 'id' | 'username' | 'firstName' | 'lastName'>);
    readonly id: string;
    readonly username: string;
    readonly firstName: string;
    readonly lastName: string;
}
