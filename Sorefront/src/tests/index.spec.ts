import { app } from '../index';
import superTest from 'supertest';
import jwt from 'jsonwebtoken';
import { productTable } from '../models/product';
import { usersTable } from '../models/users';
import { OrderTable } from '../models/order';
import pool from '../database';

import dotenv from 'dotenv';

dotenv.config();

const productModel = new productTable();
const userModel = new usersTable();
const orderModel = new OrderTable();

const request = superTest(app);

const token = jwt.sign(
  { first_name: 'malath', last_name: 'saud' },
  process.env.JWT_SECRET as string,
);

//Test the db connection

describe('Database Connection', () => {
  it('should establish a successful connection to the database', async () => {
    try {
      const client = await pool.connect();
      expect(client).toBeDefined();
      client.release();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });
});

// Test the /createProduct endpoint

describe('create product API', () => {
  it('create method should add a product', async () => {
    const newProduct = {
      name: 'phone18',
      price: 5000,
      category: 'Electronics',
    };

    const response = await request
      .post('/createProduct')
      .set('Authorization', `Bearer ${token}`)
      .send(newProduct);

    const expectedResult = {
      id: 11,
      name: 'phone18',
      price: 500,
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

it('should have a create method', () => {
  expect(productModel.create).toBeDefined();
});

it('show method should return the correct product', async () => {
  const result = await productModel.show(1);
  expect(result.name).toBe('Laptop');
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
      first_name: 'njoud',
      last_name: 'saud',
      password: '123456',
    };

    const response = await request.post('/createUser').send(newUser);

    expect(response.status).toBe(201);
  });
});

//Test the user model
describe('User Model', () => {
  // Test the index method (getting all users)
  it('index method should return a list of users', async () => {
    const result = await userModel.index();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
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

describe('Order Model', () => {
  it('currentOrder method should return the active orders for the user', async () => {
    const result = await orderModel.currentOrder(1);
    expect(result).toBeInstanceOf(Array);
    expect(result[0].status).toBe('active');
  });
});
