const User = require("../models/User");
const { Op } = require("sequelize");
const { hashPassword } = require("../utils/encryptPass");
const ForgotPasswordRequest = require("../models/ForgotPasswordRequest");

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

exports.createForgetPassRequest = async (user, id) => {
  try {
    await user.createForgotPasswordRequest({ id });
  } catch (error) {
    throw error;
  }
};

exports.checkForgetPassRequest = async (id) => {
  try {
    const item = await ForgotPasswordRequest.findByPk(id);
    if (!item) return false;
    else if (item.isActive) return item;
  } catch (error) {
    throw error;
  }
};

exports.deactivateForgetPassRequest = async (id) => {
  try {
    return await ForgotPasswordRequest.update(
      { isActive: false },
      { where: { id } }
    );
  } catch (error) {
    throw error;
  }
};
