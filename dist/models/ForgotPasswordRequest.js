"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../utils/db"));
const ForgotPasswordRequest = db_1.default.define("forgotPasswordRequest", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    isActive: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true },
});
exports.default = ForgotPasswordRequest;
