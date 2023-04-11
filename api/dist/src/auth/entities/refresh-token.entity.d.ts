import { BaseEntity } from '@/common/entities/base-entity.entity';
import { User } from '@/users/user.entity';
export declare class RefreshToken extends BaseEntity {
    user: User;
    revoked: boolean;
    expires: Date;
}
