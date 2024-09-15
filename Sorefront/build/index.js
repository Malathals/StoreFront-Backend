"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const productRoutes_1 = require("./handler/productRoutes");
const usersRoutes_1 = require("./handler/usersRoutes");
const orderRouter_1 = require("./handler/orderRouter");
exports.app = (0, express_1.default)();
const port = process.env.PORT || 5000;
exports.app.use(body_parser_1.default.json());
(0, productRoutes_1.productRoutes)(exports.app);
(0, usersRoutes_1.userRoutes)(exports.app);
(0, orderRouter_1.orderRoutes)(exports.app);
exports.app.listen(port, () => {
    console.log('i am listen to this port', port);
});
