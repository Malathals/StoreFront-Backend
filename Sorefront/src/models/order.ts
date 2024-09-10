import pool from '../database';

export type Order = {
  id: number;
  status: string;
  userId: number;
};

export class OrderTable {
  async index(): Promise<Order[]> {
    try {
      const DB_connect = await pool.connect();
      const sql = `SELECT * FROM ORDERS`;
      const QueryResult = await DB_connect.query(sql);
      DB_connect.release();
      return QueryResult.rows;
    } catch (error) {
      throw new Error(`Error fetching orders: ${error}`);
    }
  }
}
