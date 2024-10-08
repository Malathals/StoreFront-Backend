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
exports.orderRoutes = void 0;
const order_1 = require("../models/order");
const auth_1 = require("../middleware/auth");
const orderModel = new order_1.OrderTable();
const currentOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Request Params:', req.params);
        const user_Id = parseInt(req.params.user_id);
        const ListOfOrders = yield orderModel.currentOrder(user_Id);
        res.json(ListOfOrders);
    }
    catch (error) {
        if (error instanceof Error) {
            res
                .status(500)
                .json({ message: `Error fetching orders: ${error.message}` });
        }
    }
});
const orderRoutes = (app) => {
    app.get('/orders/:user_id', auth_1.verifyToken, currentOrder);
};
exports.orderRoutes = orderRoutes;
