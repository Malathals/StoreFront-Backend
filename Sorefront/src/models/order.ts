import pool from '../database';

export type Order = {
  id: number;
  status: string;
  user_Id: number;
};

export class OrderTable {
  async currentOrder(user_id: number): Promise<Order[]> {
    try {
      const DB_connect = await pool.connect();
      const sql = `SELECT * FROM ORDERS WHERE user_id = $1 AND status = 'active'`;
      const QueryResult = await DB_connect.query(sql, [user_id]);
      DB_connect.release();
      return QueryResult.rows;
    } catch (error) {
      throw new Error(`Error fetching orders: ${error}`);
    }
  }
}
