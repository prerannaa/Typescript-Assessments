"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReqBody = exports.validateReqQuery = void 0;
const badRequest_1 = __importDefault(require("../error/badRequest"));
function validateReqQuery(schema) {
    return (req, _res, next) => {
        const { error, value } = schema.validate(req.query);
        if (error) {
            return next(new badRequest_1.default(error.message));
        }
        req.query = value;
        next();
    };
}
exports.validateReqQuery = validateReqQuery;
function validateReqBody(schema) {
    return (req, _res, next) => {
        const { error, value } = schema.validate(req.body);
        if (error) {
            return next(new badRequest_1.default(error.message));
        }
        req.body = value;
        next();
    };
}
exports.validateReqBody = validateReqBody;
