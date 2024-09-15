"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const product_1 = require("../models/product");
const users_1 = require("../models/users");
const order_1 = require("../models/order");
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const productModel = new product_1.productTable();
const userModel = new users_1.usersTable();
const orderModel = new order_1.OrderTable();
const request = (0, supertest_1.default)(index_1.app);
const token = jsonwebtoken_1.default.sign({ first_name: 'malath', last_name: 'saud' }, process.env.JWT_SECRET);
//Test the db connection
describe('Database Connection', () => {
    it('should establish a successful connection to the database', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const client = yield database_1.default.connect();
            expect(client).toBeDefined();
            client.release();
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }));
});
// Test the /createProduct endpoint
describe('create product API', () => {
    it('create method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const newProduct = {
            name: 'phone',
            price: 134,
            category: 'Electronics',
        };
        const response = yield request
            .post('/createProduct')
            .set('Authorization', `Bearer ${token}`)
            .send(newProduct);
        const expectedResult = {
            id: 9,
            name: 'phone',
            price: 134,
            category: 'Electronics',
        };
        expect(response.body).toEqual(expectedResult);
    }));
});
// Test the /products endpoint
describe('get all product', () => {
    it('gets the API endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/products');
        expect(response.status).toBe(200);
    }));
});
// Test the /products/:id endpoint
it('gets the /products/:id endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get('/products/1');
    expect(response.status).toBe(200);
}));
it('should have a create method', () => {
    expect(productModel.create).toBeDefined();
});
it('show method should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productModel.show(1);
    expect(result.name).toBe('Laptop');
}));
//----------------------------------------------
// Test the /users endpoint
describe(' get Users API', () => {
    it('index method should return users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    }));
});
// Test the /users/:id endpoint
describe('User API', () => {
    it('index method should return a specific user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/users/1')
            .set('Authorization', `Bearer ${token}`);
        const expectedResult = {
            id: 1,
            first_name: 'Maloo',
            last_name: 'Alsaif',
        };
        expect(response.body).toEqual(expectedResult);
    }));
});
// Test /createUser
describe('create user API', () => {
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            first_name: 'bader',
            last_name: 'saud',
            password: '123456',
        };
        const response = yield request.post('/createUser').send(newUser);
        expect(response.status).toBe(201);
    }));
});
//Test the user model
describe('User Model', () => {
    // Test the index method (getting all users)
    it('index method should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userModel.index();
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
    }));
});
//----------------------------------------------
//test /order/:user_id
describe('User order API', () => {
    it('index method should return a current order fot the ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
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
    }));
});
describe('Order Model', () => {
    it('currentOrder method should return the active orders for the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield orderModel.currentOrder(1);
        expect(result).toBeInstanceOf(Array);
        expect(result[0].status).toBe('active');
    }));
});
