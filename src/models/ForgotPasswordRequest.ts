import { DataTypes } from "sequelize";

import sequelize from "../utils/db";

const ForgotPasswordRequest = sequelize.define("forgotPasswordRequest", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
});

export default ForgotPasswordRequest;
