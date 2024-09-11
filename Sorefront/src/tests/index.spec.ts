import { app } from '../index';
import superTest from 'supertest';
import jwt from 'jsonwebtoken';
import { productTable } from '../models/product';

import dotenv from 'dotenv';

dotenv.config();

const productModel = new productTable();

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
      id: 28,
      name: 'MacBook',
      price: 1200,
      category: 'Electronics',
    };
    expect(response.body).toEqual(expectedResult);
  });
});

// Test the /products endpoint
describe('get all product', () => {
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

//----------------------------------------------

// Test the /users endpoint
describe(' get Users API', () => {
  it('index method should return users', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

// Test the /users/:id endpoint
describe('User API', () => {
  it('index method should return a specific user by ID', async () => {
    const response = await request
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`);

    const expectedResult = {
      id: 1,
      first_name: 'Maloo',
      last_name: 'Alsaif',
    };
    expect(response.body).toEqual(expectedResult);
  });
});

// Test /createUser
describe('create user API', () => {
  it('create method should add a user', async () => {
    const newUser = {
      first_name: 'saud',
      last_name: 'salih',
      password: '123456',
    };

    const response = await request
      .post('/createUser')
      .set('Authorization', `Bearer ${token}`)
      .send(newUser);

    expect(response.status).toBe(201);
  });
});

//----------------------------------------------
//test /order/:user_id
describe('User order API', () => {
  it('index method should return a current order fot the ID', async () => {
    const response = await request
      .get('/orders/1')
      .set('Authorization', `Bearer ${token}`);

    const expectedResult = [
      {
        id: 1,
        status: 'active',
        user_id: 1,
      },
      {
        id: 4,
        status: 'active',
        user_id: 1,
      },
    ];
    expect(response.body).toEqual(expectedResult);
  });
});
