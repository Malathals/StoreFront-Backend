import { app } from '../index';
import superTest from 'supertest';
import jwt from 'jsonwebtoken';
import { users, usersTable } from '../models/users';
import dotenv from 'dotenv';

dotenv.config();

const usersModel = new usersTable();

const request = superTest(app);

const token = jwt.sign(
  { first_name: 'malath', last_name: 'saud' },
  process.env.JWT_SECRET as string,
);

// Test the /createProduct endpoint

describe('create product API', () => {
  it('create method should add a product', async () => {
    const newProduct = {
      name: 'MacBook',
      price: 1200,
      category: 'Electronics',
    };

    const response = await request
      .post('/createProduct')
      .set('Authorization', `Bearer ${token}`)
      .send(newProduct);

    //please note you need to increment the id one in each run
    const expectedResult = {
      id: 23,
      name: 'MacBook',
      price: 1200,
      category: 'Electronics',
    };
    expect(response.body).toEqual(expectedResult);
  });
});

// Test the /products endpoint
describe('Test endpoint responses', () => {
  it('gets the API endpoint', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });
});

// Test the /products/:id endpoint
it('gets the /products/:id endpoint', async () => {
  const response = await request.get('/products/1');
  expect(response.status).toBe(200);
});

it('should have a update method', () => {
  expect(productModel.create).toBeDefined();
});

// Test the /orders/:user_id endpoint
it('gets the /orders/:user_id endpoint', async () => {
  const response = await request.get('/products/1');
  expect(response.status).toBe(200);
});

// Test the /users endpoint
it('gets the /orders/:user_id endpoint', async () => {
  const response = await request.get('/users');
  expect(response.status).toBe(200);
});

// Test the /users/:id endpoint

it('index method should return a list of books', async () => {
  const result = await usersModel.show(1);
  expect(result).toEqual({
    id: 1,
    first_name: 'Maloo',
    last_name: 'Alsaif',
  });
});
