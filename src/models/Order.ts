import { DataTypes } from "sequelize";

import sequelize from "../utils/db";

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  razorpayOrderId: { type: DataTypes.STRING, allowNull: false },
});

export default Order;
