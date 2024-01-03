"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.refreshAccessToken = exports.login = exports.signup = void 0;
// src/services/userService.ts
const bcrypt = __importStar(require("bcrypt"));
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
const authServices_1 = require("./authServices");
const signup = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(User_1.User);
    const hashedPassword = yield bcrypt.hash(password, 10);
    const user = userRepository.create({
        username,
        password: hashedPassword,
    });
    return userRepository.save(user);
});
exports.signup = signup;
const login = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(User_1.User);
    const user = yield userRepository.findOne({ where: { username } });
    if (!user) {
        throw new Error('Invalid username or password');
    }
    const passwordMatch = yield bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid username or password');
    }
    return (0, authServices_1.generateAccessToken)(user.id);
});
exports.login = login;
const refreshAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = (0, authServices_1.verifyToken)(refreshToken);
    return (0, authServices_1.generateAccessToken)(decodedToken.userId);
});
exports.refreshAccessToken = refreshAccessToken;
