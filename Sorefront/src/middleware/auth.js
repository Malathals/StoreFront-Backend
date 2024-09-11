"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res
            .status(401)
            .json({ message: 'Access denied. No token provided.' });
    const token = authHeader.split(' ')[1];
    try {
        const secretKey = process.env.JWT_SECRET || 'fallback-secret';
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};
exports.verifyToken = verifyToken;
