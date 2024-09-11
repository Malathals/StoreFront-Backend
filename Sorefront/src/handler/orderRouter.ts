import express, { Request, Response } from 'express';
import { Order, OrderTable } from '../models/order';
import { verifyToken } from '../middleware/auth';

const orderModel = new OrderTable();

const currentOrder = async (req: Request, res: Response) => {
  try {
    console.log('Request Params:', req.params);

    const user_Id = parseInt(req.params.user_id);

    const ListOfOrders = await orderModel.currentOrder(user_Id);

    res.json(ListOfOrders);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: `Error fetching orders: ${error.message}` });
    }
  }
};

export const orderRoutes = (app: express.Application) => {
  app.get('/orders/:user_id', verifyToken, currentOrder);
};
