import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });

  const token = authHeader.split(' ')[1];

  try {
    const secretKey = process.env.JWT_SECRET || 'fallback-secret';
    jwt.verify(token, secretKey);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.', error });
  }
};
