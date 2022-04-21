const { DataTypes } = require("sequelize");

const sequelize = require("../utils/db");

const Expense = sequelize.define("expense", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  desc: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Expense;
