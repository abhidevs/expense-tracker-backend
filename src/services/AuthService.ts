import User from "../models/User";
import { Op } from "sequelize";
import { hashPassword } from "../utils/encryptPass";
import ForgotPasswordRequest from "../models/ForgotPasswordRequest";
import { UserDoc } from "../types/userdoc";

export const createUser = async ({ name, email, phone, password }: UserDoc) => {
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

export const createForgetPassRequest = async (user: any, id: string) => {
  try {
    await user.createForgotPasswordRequest({ id });
  } catch (error) {
    throw error;
  }
};

export const checkForgetPassRequest = async (id: string) => {
  try {
    const item: any = await ForgotPasswordRequest.findByPk(id);
    if (!item) return false;
    else if (item.isActive) return item;
  } catch (error) {
    throw error;
  }
};

export const deactivateForgetPassRequest = async (id: string) => {
  try {
    return await ForgotPasswordRequest.update(
      { isActive: false },
      { where: { id } }
    );
  } catch (error) {
    throw error;
  }
};
