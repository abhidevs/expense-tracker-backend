"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByIdAndUpdatePassword = exports.upgradeUserToPremium = exports.findUserById = exports.checkIfUserExists = void 0;
const User_1 = __importDefault(require("../models/User"));
const sequelize_1 = require("sequelize");
const encryptPass_1 = require("../utils/encryptPass");
const checkIfUserExists = ({ email, phone, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (phone) {
            return yield User_1.default.findOne({
                where: {
                    [sequelize_1.Op.or]: [{ email }, { phone }],
                },
            });
        }
        else {
            return yield User_1.default.findOne({
                where: {
                    email,
                },
            });
        }
    }
    catch (error) {
        throw error;
    }
});
exports.checkIfUserExists = checkIfUserExists;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield User_1.default.findByPk(id);
    }
    catch (error) {
        throw error;
    }
});
exports.findUserById = findUserById;
const upgradeUserToPremium = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield User_1.default.update({ isPremiumMember: true }, { where: { id: id } });
    }
    catch (error) {
        throw error;
    }
});
exports.upgradeUserToPremium = upgradeUserToPremium;
const findUserByIdAndUpdatePassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let hashedPass = yield (0, encryptPass_1.hashPassword)(password);
        return yield User_1.default.update({ password: hashedPass }, { where: { id } });
    }
    catch (error) {
        throw error;
    }
});
exports.findUserByIdAndUpdatePassword = findUserByIdAndUpdatePassword;
