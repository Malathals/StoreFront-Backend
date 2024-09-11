import express, { Request, Response } from 'express';
import { users, usersTable } from '../models/users';
import { verifyToken } from '../middleware/auth';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const usersModel = new usersTable();

const index = async (_req: Request, res: Response) => {
  try {
    const ListOfProducts = await usersModel.index();
    res.json(ListOfProducts);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: `Error fetching products: ${error.message}` });
    }
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const SpecificUser = await usersModel.show(Number(id));
    res.json(SpecificUser);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: `Error fetching products: ${error.message}` });
    }
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { id, first_name, last_name, password } = req.body;
    const createUser = await usersModel.create(
      id,
      first_name,
      last_name,
      password,
    );
    const token = jwt.sign(
      { first_name, last_name },
      process.env.JWT_SECRET as string,
    );
    res.status(201).json({
      user: createUser,
      token: token,
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: `Error fetching product: ${error.message}` });
    }
  }
};

export const userRoutes = (app: express.Application) => {
  app.get('/users', verifyToken, index);
  app.get('/users/:id', verifyToken, show);
  app.post('/createUser', verifyToken, create);
};
