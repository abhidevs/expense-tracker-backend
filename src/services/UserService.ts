import User from "../models/User";
import { Op } from "sequelize";
import { hashPassword } from "../utils/encryptPass";

export const checkIfUserExists = async ({
  email,
  phone,
}: {
  email: string;
  phone: string;
}) => {
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

export const findUserById = async (id: number) => {
  try {
    return await User.findByPk(id);
  } catch (error) {
    throw error;
  }
};

export const upgradeUserToPremium = async (id: number) => {
  try {
    return await User.update({ isPremiumMember: true }, { where: { id: id } });
  } catch (error) {
    throw error;
  }
};

export const findUserByIdAndUpdatePassword = async (
  id: number,
  password: string
) => {
  try {
    let hashedPass = await hashPassword(password);
    return await User.update({ password: hashedPass }, { where: { id } });
  } catch (error) {
    throw error;
  }
};
