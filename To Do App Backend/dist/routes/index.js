"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
// import todoRoutes from "./todoRoutes";
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use("/auth", authRoutes_1.default);
router.use("/users", auth_1.auth, UserRoutes_1.default);
router.use("/todos");
exports.default = router;
