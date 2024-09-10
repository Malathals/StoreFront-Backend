import pool from '../database';

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
      const query = `SELECT ALL FROM USERS`;
      const QueryResult = await DB_connect.query(query);
      DB_connect.release();

      return QueryResult.rows;
    } catch (error) {
      throw new Error(`there is error, which is: ${error}`);
    }
  }
}
