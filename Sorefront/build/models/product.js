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
exports.productTable = void 0;
const database_1 = __importDefault(require("../database"));
class productTable {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const DB_connect = yield database_1.default.connect();
                const sql = `SELECT * FROM PRODUCT`;
                const QueryResult = yield DB_connect.query(sql);
                DB_connect.release();
                if (QueryResult.rows.length) {
                    return QueryResult.rows;
                }
                else {
                    throw new Error(` no products there`);
                }
            }
            catch (error) {
                throw new Error(`there is error, which is: ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const DB_connect = yield database_1.default.connect();
                const sql = `SELECT * FROM PRODUCT WHERE ID = $1`;
                const QueryResult = yield DB_connect.query(sql, [id]);
                DB_connect.release();
                if (QueryResult.rows.length) {
                    return QueryResult.rows[0];
                }
                else {
                    throw new Error(`Product with ID ${id} not found`);
                }
            }
            catch (error) {
                throw new Error(`there is error, which is: ${error}`);
            }
        });
    }
    create(name, price, category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const DB_connect = yield database_1.default.connect();
                const sql = `INSERT INTO PRODUCT ( NAME, PRICE, CATEGORY) VALUES ($1, $2, $3) RETURNING *`;
                const QueryResult = yield DB_connect.query(sql, [name, price, category]);
                console.log('insert done');
                return QueryResult.rows[0];
                DB_connect.release();
            }
            catch (error) {
                throw new Error(`there is error, which is: ${error}`);
            }
        });
    }
}
exports.productTable = productTable;
