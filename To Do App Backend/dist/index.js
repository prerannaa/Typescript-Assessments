"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const typeorm_1 = require("typeorm");
const loggerMiddleware_1 = require("./middlewares/loggerMiddleware");
const errorHandlerMiddleware_1 = require("./middlewares/errorHandlerMiddleware");
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const database_1 = __importDefault(require("./config/database"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(loggerMiddleware_1.loggerMiddleware);
app.use('/api/todos', todoRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use(errorHandlerMiddleware_1.errorHandlerMiddleware);
const PORT = process.env.PORT || 3000;
(0, typeorm_1.createConnection)(database_1.default)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => console.error('Error connecting to the database', error));
