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
exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const userModel_1 = __importDefault(require("../models/userModel"));
const jwt_1 = require("../constant/jwt");
const badRequest_1 = __importDefault(require("../error/badRequest"));
const SALT_ROUNDS = 10;
const signup = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(body.password, SALT_ROUNDS);
    const usernameExists = yield userModel_1.default.getByUsername(body.username);
    if (usernameExists) {
        throw new badRequest_1.default(`User with username: ${body.username} already exists`);
    }
    yield userModel_1.default.create(Object.assign(Object.assign({}, body), { password: hashedPassword }));
    return {
        message: "User signed up successfully",
    };
});
exports.signup = signup;
const login = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.getByUsername(body.username);
    if (!user) {
        throw new badRequest_1.default("Invalid username or Password");
    }
    const passwordMatch = yield bcrypt_1.default.compare(body.password, user.password);
    if (!passwordMatch) {
        throw new badRequest_1.default("Invalid username or Password");
    }
    const accessToken = jsonwebtoken_1.default.sign(user, config_1.default.jwt.accessTokenSecret, {
        expiresIn: jwt_1.ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = jsonwebtoken_1.default.sign(user, config_1.default.jwt.refreshTokenSecret, {
        expiresIn: jwt_1.REFRESH_TOKEN_EXPIRY,
    });
    return {
        accessToken,
        refreshToken,
    };
});
exports.login = login;
