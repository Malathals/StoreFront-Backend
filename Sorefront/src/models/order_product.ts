import pool from '../database';

export type OrderProduct = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
};

export class OrderProductTable {
  async index(): Promise<OrderProduct[]> {
    try {
      const DB_connect = await pool.connect();
      const sql = `SELECT * FROM ORDER_PRODUCT`;
      const QueryResult = await DB_connect.query(sql);
      DB_connect.release();
      return QueryResult.rows;
    } catch (error) {
      throw new Error(`Error fetching order products: ${error}`);
    }
  }
}
