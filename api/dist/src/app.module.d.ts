import { MiddlewareConsumer, NestModule, OnModuleInit } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
export declare class AppModule implements NestModule, OnModuleInit {
    private readonly orm;
    constructor(orm: MikroORM);
    onModuleInit(): Promise<void>;
    configure(consumer: MiddlewareConsumer): void;
}
