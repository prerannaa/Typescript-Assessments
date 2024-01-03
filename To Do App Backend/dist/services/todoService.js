"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getAllTodos = void 0;
const typeorm_1 = require("typeorm");
const Todo_1 = require("../models/Todo");
const getAllTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    const todoRepository = (0, typeorm_1.getRepository)(Todo_1.Todo);
    return todoRepository.find();
});
exports.getAllTodos = getAllTodos;
const createTodo = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const todoRepository = (0, typeorm_1.getRepository)(Todo_1.Todo);
    const newTodo = todoRepository.create({ title });
    return todoRepository.save(newTodo);
});
exports.createTodo = createTodo;
const updateTodo = (id, title, completed) => __awaiter(void 0, void 0, void 0, function* () {
    const todoRepository = (0, typeorm_1.getRepository)(Todo_1.Todo);
    try {
        const todo = yield todoRepository.findOneOrFail({ where: { id } });
        todo.title = title !== undefined ? title : todo.title;
        todo.completed = completed !== undefined ? completed : todo.completed;
        yield todoRepository.save(todo);
        return todo;
    }
    catch (error) {
        return null;
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const todoRepository = (0, typeorm_1.getRepository)(Todo_1.Todo);
    try {
        yield todoRepository.delete(id);
    }
    catch (error) {
        // Handle error if needed
    }
});
exports.deleteTodo = deleteTodo;
