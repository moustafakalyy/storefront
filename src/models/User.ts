import client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  firstname: string;
  lastname: string;
  password: string;
  id?: number;
};
export class UserInfo {
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM users;";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get users ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM users WHERE id=${id};`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get user with id :${id} ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const connection = await client.connect();
      const hashPassword = bcrypt.hashSync(
        user.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      let sql = `INSERT INTO users (firstName,lastName,password) VALUES ('${user.firstname}','${user.lastname}','${hashPassword}');`;
      let result = await connection.query(sql);
      sql = `SELECT * FROM users WHERE firstName='${user.firstname}';`;
      result = await connection.query(sql);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create user: ${user.firstname}`);
    }
  }

  async authenticate(user: User): Promise<User | null> {
    try {
      const connection = await client.connect();
      const sql = `SELECT password FROM users WHERE firstName='${user.firstname}';`;
      const result = await connection.query(sql);
      if (result.rows.length>0) {
        const foundUser = result.rows[0];
        console.log(user);
        if (
          bcrypt.compareSync(
            user.password + BCRYPT_PASSWORD,
            foundUser.password
          )
        ) {
          return foundUser;
        }
      }
      return null;
    } catch (error) {
      throw new Error(
        `User could not be authenticated by server: ${user.firstname}`
      );
    }
  }
}
