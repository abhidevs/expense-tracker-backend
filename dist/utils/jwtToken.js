"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: "7d",
    });
};
exports.generateAccessToken = generateAccessToken;
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err)
                reject(err);
            else
                resolve(user);
        });
    });
};
exports.verifyToken = verifyToken;
