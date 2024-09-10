import pool from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export type users = {
  id: Number;
  first_name: string;
  last_name: string;
  password: string;
};

export class usersTable {
  async index(): Promise<users[]> {
    try {
      const DB_connect = await pool.connect();
      const query = `SELECT * FROM USERS`;
      const QueryResult = await DB_connect.query(query);
      DB_connect.release();

      return QueryResult.rows;
    } catch (error) {
      throw new Error(`there is error, which is: ${error}`);
    }
  }

  async show(id: number): Promise<users> {
    try {
      const DB_connect = await pool.connect();
      const sql = `SELECT * FROM USERS WHERE ID = $1`;
      const QueryResult = await DB_connect.query(sql, [id]);

      DB_connect.release();

      if (QueryResult.rows.length) {
        return QueryResult.rows[0];
      } else {
        throw new Error(`USER with ID ${id} not found`);
      }
    } catch (error) {
      throw new Error(`there is error, which is: ${error}`);
    }
  }

  async create(
    id: number,
    first_name: string,
    last_name: string,
    password: string,
  ) {
    try {
      const DB_connect = await pool.connect();
      const sql = `INSERT INTO USERS (ID, first_name, last_name, password) VALUES ($1, $2, $3, $4)`;
      const saltRounds = parseInt(process.env.SALT_ROUNDS || '10');
      const salt = await bcrypt.genSalt(saltRounds);

      const passWithHashing = await bcrypt.hash(password, parseInt(salt));
      const QueryResult = await DB_connect.query(sql, [
        id,
        first_name,
        last_name,
        passWithHashing,
      ]);
      console.log('insert done');
      DB_connect.release();
    } catch (error) {
      throw new Error(`there is error, which is: ${error}`);
    }
  }
}