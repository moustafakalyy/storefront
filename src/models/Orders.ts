import client from "../database";

import dotenv from "dotenv";
import { Product } from "./Product";

dotenv.config();

export type Order = {
  id?: number;
  product_iD: number;
  quantity: number;
  users_iD: number;
};
export class OrderInfo {
  async getUserOrderedProducts(id: string): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM products WHERE id IN (SELECT product_iD FROM orders WHERE users_id=${id});`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get users ${error}`);
    }
  }
  async create(order:Order): Promise<Order> {
    try {
      const connection = await client.connect();
      
      let sql = ` INSERT INTO orders (product_id,quantity,users_id) VALUES ('${order.product_iD}','${order.quantity}','${order.users_iD}')`;
      let result = await connection.query(sql);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create order`);
    }
  }
}


