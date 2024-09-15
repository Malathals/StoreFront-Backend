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
exports.OrderTable = void 0;
const database_1 = __importDefault(require("../database"));
class OrderTable {
    currentOrder(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const DB_connect = yield database_1.default.connect();
                const sql = `SELECT * FROM ORDERS WHERE user_id = $1 AND status = 'active'`;
                const QueryResult = yield DB_connect.query(sql, [user_id]);
                DB_connect.release();
                return QueryResult.rows;
            }
            catch (error) {
                throw new Error(`Error fetching orders: ${error}`);
            }
        });
    }
}
exports.OrderTable = OrderTable;
