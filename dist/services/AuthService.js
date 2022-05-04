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
exports.deactivateForgetPassRequest = exports.checkForgetPassRequest = exports.createForgetPassRequest = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const encryptPass_1 = require("../utils/encryptPass");
const ForgotPasswordRequest_1 = __importDefault(require("../models/ForgotPasswordRequest"));
const createUser = ({ name, email, phone, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let hashedPass = yield (0, encryptPass_1.hashPassword)(password);
        const user = yield User_1.default.create({
            name,
            email,
            phone,
            password: hashedPass,
        });
        yield user.save();
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.createUser = createUser;
const createForgetPassRequest = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user.createForgotPasswordRequest({ id });
    }
    catch (error) {
        throw error;
    }
});
exports.createForgetPassRequest = createForgetPassRequest;
const checkForgetPassRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield ForgotPasswordRequest_1.default.findByPk(id);
        if (!item)
            return false;
        else if (item.isActive)
            return item;
    }
    catch (error) {
        throw error;
    }
});
exports.checkForgetPassRequest = checkForgetPassRequest;
const deactivateForgetPassRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield ForgotPasswordRequest_1.default.update({ isActive: false }, { where: { id } });
    }
    catch (error) {
        throw error;
    }
});
exports.deactivateForgetPassRequest = deactivateForgetPassRequest;
