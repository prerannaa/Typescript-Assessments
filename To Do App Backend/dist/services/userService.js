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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.update = exports.getById = exports.getAll = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const notFoundError_1 = __importDefault(require("../error/notFoundError"));
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userModel_1.default.getAll();
    return data;
});
exports.getAll = getAll;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield userModel_1.default.getById(id);
    if (!data) {
        throw new notFoundError_1.default(`User with id: ${id} not found`);
    }
    return data;
});
exports.getById = getById;
const update = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.getById(id);
    if (!user) {
        throw new notFoundError_1.default(`User with id: ${id} not found`);
    }
    yield userModel_1.default.update(id, body);
    const updatedUser = yield userModel_1.default.getById(id);
    return updatedUser;
});
exports.update = update;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.getById(id);
    if (!user) {
        throw new notFoundError_1.default(`User with id: ${id} not found`);
    }
    yield userModel_1.default.delete(id);
});
exports.deleteUser = deleteUser;
