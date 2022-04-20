const User = require("../models/User");
const { Op } = require("sequelize");
const { hashPassword } = require("../utils/encryptPass");

exports.createUser = async ({ name, email, phone, password }) => {
  try {
    let hashedPass = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPass,
    });
    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
};

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
