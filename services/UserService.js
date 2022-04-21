const User = require("../models/User");
const { Op } = require("sequelize");

exports.checkIfUserExists = async ({ email, phone }) => {
  try {
    if (phone) {
      return await User.findOne({
        where: {
          [Op.or]: [{ email }, { phone }],
        },
      });
    } else {
      return await User.findOne({
        where: {
          email,
        },
      });
    }
  } catch (error) {
    throw error;
  }
};

exports.findUserById = async (id) => {
  try {
    return await User.findByPk(id);
  } catch (error) {
    throw error;
  }
};
