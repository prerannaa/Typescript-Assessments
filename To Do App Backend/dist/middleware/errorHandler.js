"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericErrorHandler = exports.notFoundError = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const unauthenticatedError_1 = __importDefault(require("../error/unauthenticatedError"));
const logger_1 = __importDefault(require("../util/logger"));
const badRequest_1 = __importDefault(require("../error/badRequest"));
const notFoundError_1 = __importDefault(require("../error/notFoundError"));
const logger = (0, logger_1.default)("ErrorHandler");
/**
 * Error response middleware for 404 not found. This middleware function should be at the very bottom of the stack.
 *
 */
function notFoundError(_req, res) {
    return res.status(http_status_codes_1.default.NOT_FOUND).json({
        message: http_status_codes_1.default.getStatusText(http_status_codes_1.default.NOT_FOUND),
    });
}
exports.notFoundError = notFoundError;
function genericErrorHandler(err, _req, res, _next // eslint-disable-line
) {
    if (err.stack) {
        logger.error(err.stack);
    }
    if (err instanceof badRequest_1.default) {
        return res.status(http_status_codes_1.default.BAD_REQUEST).json({ message: err.message });
    }
    if (err instanceof notFoundError_1.default) {
        return res.status(http_status_codes_1.default.BAD_REQUEST).json({ message: err.message });
    }
    if (err instanceof unauthenticatedError_1.default) {
        return res.status(http_status_codes_1.default.UNAUTHORIZED).json({ message: err.message });
    }
    return res
        .status(http_status_codes_1.default.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
}
exports.genericErrorHandler = genericErrorHandler;
