"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const databaseConfig = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [__dirname + '/../models/*.ts'],
};
exports.default = databaseConfig;
