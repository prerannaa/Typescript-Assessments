"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createUserSchema = joi_1.default.object({
    fullname: joi_1.default.string().required().max(255).messages({
        "required.any": "Fullname is required",
    }),
    email: joi_1.default.string().email().required().max(255).messages({
        "required.any": "Fullname is required",
    }),
    password: joi_1.default.string().required().max(255).messages({
        "required.any": "Fullname is required",
    }),
});
exports.createUserSchema = createUserSchema;
const updateUserSchema = joi_1.default.object({
    fullname: joi_1.default.string().required().max(255).messages({
        "required.any": "Fullname is required",
    }),
});
exports.updateUserSchema = updateUserSchema;
