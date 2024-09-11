import express, { Request, Response } from 'express';
import { productTable } from '../models/product';
import { verifyToken } from '../middleware/auth';

const productModel = new productTable();

const index = async (req: Request, res: Response) => {
  try {
    const ListOfProducts = await productModel.index();
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
    const SpecificProduct = await productModel.show(Number(id));
    res.json(SpecificProduct);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: `Error fetching product: ${error.message}` });
    }
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { name, price, category } = req.body;
    const createProduct = await productModel.create(name, price, category);
    res.status(201).json(createProduct);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: `Error fetching product: ${error.message}` });
    }
  }
};

export const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/createProduct', verifyToken, create);
};
