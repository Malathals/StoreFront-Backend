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
exports.userRoutes = void 0;
const users_1 = require("../models/users");
const auth_1 = require("../middleware/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const usersModel = new users_1.usersTable();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ListOfProducts = yield usersModel.index();
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
        const SpecificUser = yield usersModel.show(Number(id));
        res.json(SpecificUser);
    }
    catch (error) {
        if (error instanceof Error) {
            res
                .status(500)
                .json({ message: `Error fetching products: ${error.message}` });
        }
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, password } = req.body;
        const createUser = yield usersModel.create(first_name, last_name, password);
        const token = jsonwebtoken_1.default.sign({ first_name, last_name }, process.env.JWT_SECRET);
        res.status(201).json({
            user: createUser,
            token: token,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res
                .status(500)
                .json({ message: `Error in create user : ${error.message}` });
        }
    }
});
const userRoutes = (app) => {
    app.get('/users', auth_1.verifyToken, index);
    app.get('/users/:id', auth_1.verifyToken, show);
    app.post('/createUser', create);
};
exports.userRoutes = userRoutes;
