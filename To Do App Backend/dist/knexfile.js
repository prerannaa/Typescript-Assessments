"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseKnexConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pathToEnv = __dirname + "/../.env";
dotenv_1.default.config({ path: pathToEnv });
exports.baseKnexConfig = {
    client: process.env.CLIENT,
    connection: {
        database: process.env.DATABASE,
        host: process.env.HOST,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
        user: process.env.USER,
    },
};
const knexConfig = Object.assign(Object.assign({}, exports.baseKnexConfig), { migrations: {
        directory: "./migrations",
        stub: "./stubs/migration.stub",
        tableName: "migrations",
    }, seeds: {
        directory: ".seeds",
        stub: "./stubs/seed.stub",
    } });
exports.default = knexConfig;
