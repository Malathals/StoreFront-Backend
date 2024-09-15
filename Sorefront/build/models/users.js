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
exports.usersTable = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class usersTable {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const DB_connect = yield database_1.default.connect();
                const query = `SELECT * FROM USERS`;
                const QueryResult = yield DB_connect.query(query);
                DB_connect.release();
                return QueryResult.rows;
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
                const sql = `SELECT id, first_name, last_name FROM USERS WHERE ID = $1`;
                const QueryResult = yield DB_connect.query(sql, [id]);
                DB_connect.release();
                if (QueryResult.rows.length) {
                    return QueryResult.rows[0];
                }
                else {
                    throw new Error(`USER with ID ${id} not found`);
                }
            }
            catch (error) {
                throw new Error(`there is error, which is: ${error}`);
            }
        });
    }
    create(first_name, last_name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const DB_connect = yield database_1.default.connect();
                const sql = `INSERT INTO USERS (first_name, last_name, password) VALUES ($1, $2, $3)`;
                const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');
                const hashedPass = yield bcrypt_1.default.hash(password, saltRounds);
                const QueryResult = yield DB_connect.query(sql, [
                    first_name,
                    last_name,
                    hashedPass,
                ]);
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
exports.usersTable = usersTable;
