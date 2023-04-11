import { BaseEntity } from '@/common/entities/base-entity.entity';
import { User } from '@/users/user.entity';
export declare class Room extends BaseEntity {
    name: string;
    createdBy: User;
}
