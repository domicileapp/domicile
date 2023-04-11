import { List } from '../lists/list.entity';
import { BaseEntity } from '../common/entities/base-entity.entity';
import { User } from '../users/user.entity';
export declare class Task extends BaseEntity {
    title: string;
    description?: string;
    createdBy: User;
    list: List;
    complete: boolean;
}
