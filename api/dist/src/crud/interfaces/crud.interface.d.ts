import { DeepPartial, FindOneOptions, FindOptions } from '@mikro-orm/core';
import { IPagination } from './paginate.interface';
import { ITryRequest } from './try-request.interface';
export interface ICrudService<T extends object> {
    count(filter?: FindOptions<T>): Promise<number>;
    countBy(filter?: FindOptions<T>): Promise<number>;
    findAll(filter?: FindOptions<T>): Promise<IPagination<T>>;
    paginate(filter?: FindOptions<T>): Promise<IPagination<T>>;
    findOneByIdString(id: string, options?: FindOneOptions<T>): Promise<T>;
    findOneByFailByIdString(id: string, options?: FindOneOptions<T>): Promise<ITryRequest<T>>;
    findOneByOptions(options: FindOneOptions<T>): Promise<T>;
    findOneWhereOptions(options: FindOneOptions<T>): Promise<T>;
    findOneOrFailByOptions(options: FindOneOptions<T>): Promise<ITryRequest<T>>;
    findOneOrFailByWhereOptions(options: FindOneOptions<T>): Promise<ITryRequest<T>>;
    create(entity: DeepPartial<T>, ...options: any[]): Promise<T>;
    save(entity: DeepPartial<T>): Promise<T>;
    update(id: any, entity: DeepPartial<T>, ...options: any[]): Promise<T>;
    delete(id: any, ...options: any[]): Promise<T>;
}
