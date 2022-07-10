import express from "express";
import { OrderInfo } from "../models/Orders";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
const orders = express.Router();
dotenv.config();

orders.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as Secret);
  } catch (error) {
    res.status(400);
    res.json(error);
    return;
  }

  try {
    const orderModel = new OrderInfo();
    const response = await orderModel.getUserOrderedProducts(req.params.id);
    if (response.length>0) {
      res.json(response);
    } else {
      res.status(400);
      res.send("This user has no orders");
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

export default orders;
