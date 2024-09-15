const dotenv = require('dotenv');
import { Pool } from 'pg';

dotenv.config();

const { HOST, DB_NAME, USER, PASSWORD, DB_NAME_TEST, NODE_ENV } = process.env;
const database = NODE_ENV === 'test' ? DB_NAME_TEST : DB_NAME;

const pool = new Pool({
  host: HOST,
  database: database,
  user: USER,
  password: PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
