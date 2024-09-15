"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv');
const pg_1 = require("pg");
dotenv.config();
const { HOST, DB_NAME, USER, PASSWORD, DB_NAME_TEST, NODE_ENV } = process.env;
const database = NODE_ENV === 'test' ? DB_NAME_TEST : DB_NAME;
const pool = new pg_1.Pool({
    host: HOST,
    database: database,
    user: USER,
    password: PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    },
});
exports.default = pool;
