import { DataTypes } from "sequelize";

import sequelize from "../utils/db";

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

export default Expense;
