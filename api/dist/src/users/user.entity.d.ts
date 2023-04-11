import { Collection } from '@mikro-orm/core';
import { RefreshToken } from '../auth/entities/refresh-token.entity';
import { BaseEntity } from '../common/entities/base-entity.entity';
import { List } from '../lists/list.entity';
export declare class User extends BaseEntity {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    lists: Collection<List, object>;
    refreshTokens: Collection<RefreshToken, object>;
}
