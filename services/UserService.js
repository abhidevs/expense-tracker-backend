const User = require("../models/User");
const { Op } = require("sequelize");
const { hashPassword } = require("../utils/encryptPass");

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

exports.upgradeUserToPremium = async (id) => {
  try {
    return await User.update({ isPremiumMember: true }, { where: { id: id } });
  } catch (error) {
    throw error;
  }
};

exports.findUserByIdAndUpdatePassword = async (id, password) => {
  try {
    let hashedPass = await hashPassword(password);
    return await User.update({ password: hashedPass }, { where: { id } });
  } catch (error) {
    throw error;
  }
};
