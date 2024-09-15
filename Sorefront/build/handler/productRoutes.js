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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const product_1 = require("../models/product");
const auth_1 = require("../middleware/auth");
const productModel = new product_1.productTable();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ListOfProducts = yield productModel.index();
        res.json(ListOfProducts);
    }
    catch (error) {
        if (error instanceof Error) {
            res
                .status(500)
                .json({ message: `Error fetching products: ${error.message}` });
        }
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const SpecificProduct = yield productModel.show(Number(id));
        res.json(SpecificProduct);
    }
    catch (error) {
        if (error instanceof Error) {
            res
                .status(500)
                .json({ message: `Error fetching product: ${error.message}` });
        }
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, category } = req.body;
        const createProduct = yield productModel.create(name, price, category);
        res.status(201).json(createProduct);
    }
    catch (error) {
        if (error instanceof Error) {
            res
                .status(500)
                .json({ message: `Error fetching product: ${error.message}` });
        }
    }
});
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/createProduct', auth_1.verifyToken, create);
};
exports.productRoutes = productRoutes;
