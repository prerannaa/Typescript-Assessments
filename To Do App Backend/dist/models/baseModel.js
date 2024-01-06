"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnectionOrTransaction = void 0;
const db_1 = __importDefault(require("../db"));
function getConnectionOrTransaction(connection, trx) {
    return trx || connection;
}
exports.getConnectionOrTransaction = getConnectionOrTransaction;
/**
 * Create a new model.
 */
class BaseModel {
    static getConnection() {
        return this.connection;
    }
    static queryBuilder(trx) {
        return getConnectionOrTransaction(db_1.default, trx);
    }
    static transaction(callback) {
        return this.connection.transaction(callback);
    }
}
BaseModel.connection = db_1.default;
exports.default = BaseModel;
