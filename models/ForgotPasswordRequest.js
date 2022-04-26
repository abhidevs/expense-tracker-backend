const { DataTypes } = require("sequelize");

const sequelize = require("../utils/db");

const ForgotPasswordRequest = sequelize.define("forgotPasswordRequest", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = ForgotPasswordRequest;
