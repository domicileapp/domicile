import { BaseEntity } from '../common/entities/base-entity.entity';
import { User } from '../users/user.entity';
export declare class List extends BaseEntity {
    title: string;
    description?: string;
    createdBy: User;
}
