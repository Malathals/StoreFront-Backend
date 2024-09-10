import { json } from 'body-parser';
import pool from '../database';

export type product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export class productTable {
  async index(): Promise<product[]> {
    try {
      const DB_connect = await pool.connect();
      const sql = `SELECT * FROM PRODUCT`;
      const QueryResult = await DB_connect.query(sql);
      DB_connect.release();

      if (QueryResult.rows.length) {
        return QueryResult.rows;
      } else {
        throw new Error(` no products there`);
      }
    } catch (error) {
      throw new Error(`there is error, which is: ${error}`);
    }
  }

  async show(id: number): Promise<product> {
    try {
      const DB_connect = await pool.connect();
      const sql = `SELECT * FROM PRODUCT WHERE ID = $1`;
      const QueryResult = await DB_connect.query(sql, [id]);

      DB_connect.release();

      if (QueryResult.rows.length) {
        return QueryResult.rows[0];
      } else {
        throw new Error(`Product with ID ${id} not found`);
      }
    } catch (error) {
      throw new Error(`there is error, which is: ${error}`);
    }
  }

  async create(id: number, name: string, price: number, category: string) {
    try {
      const DB_connect = await pool.connect();
      const sql = `INSERT INTO PRODUCT (ID, NAME, PRICE, CATEGORY) VALUES ($1, $2, $3, $4)`;
      const QueryResult = await DB_connect.query(sql, [
        id,
        name,
        price,
        category,
      ]);
      console.log('insert done');
      DB_connect.release();
    } catch (error) {
      throw new Error(`there is error, which is: ${error}`);
    }
  }
}
