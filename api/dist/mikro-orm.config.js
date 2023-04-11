"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_highlighter_1 = require("@mikro-orm/sql-highlighter");
const reflection_1 = require("@mikro-orm/reflection");
const core_1 = require("@mikro-orm/core");
const config = {
    type: 'postgresql',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dbName: process.env.POSTGRES_DB,
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    debug: true,
    loadStrategy: core_1.LoadStrategy.JOINED,
    highlighter: new sql_highlighter_1.SqlHighlighter(),
    metadataProvider: reflection_1.TsMorphMetadataProvider,
    registerRequestContext: false,
    migrations: {
        path: 'dist/database/migrations',
        pathTs: 'src/database/migrations',
    },
};
exports.default = config;
//# sourceMappingURL=mikro-orm.config.js.map