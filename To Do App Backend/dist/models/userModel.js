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
const baseModel_1 = __importDefault(require("./baseModel"));
class UserModel extends baseModel_1.default {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.queryBuilder()
                .select({
                id: "id",
                fullname: "fullname",
                password: "password",
            })
                .from("users");
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.queryBuilder()
                .select({
                id: "id",
                fullname: "fullname",
                password: "password",
            })
                .from("users")
                .where({ id })
                .first();
        });
    }
    static getByUsername(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.queryBuilder()
                .select({
                id: "id",
                username: "username",
                password: "password",
            })
                .from("users");
            return user === null || user === void 0 ? void 0 : user[0];
        });
    }
    static create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.queryBuilder().insert(user).table("users");
        });
    }
    static update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.queryBuilder().update(user).table("users").where({ id });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.queryBuilder().table("users").where({ id }).del();
        });
    }
}
exports.default = UserModel;
