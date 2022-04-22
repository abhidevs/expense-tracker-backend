const { DataTypes } = require("sequelize");

const sequelize = require("../utils/db");

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  razorpayOrderId: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Order;
