"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../utils/db"));
const Expense = db_1.default.define("expense", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    amount: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    category: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    desc: { type: sequelize_1.DataTypes.STRING, allowNull: false },
});
exports.default = Expense;
