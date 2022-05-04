"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.verifyOrder = exports.createOrder = void 0;
const PaymentService = __importStar(require("../services/PaymentService"));
const crypto_1 = __importDefault(require("crypto"));
const UserService = __importStar(require("../services/UserService"));
const OrderService = __importStar(require("../services/OrderService"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield PaymentService.createOrder(req.body);
        res.send({ order, success: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error, success: false });
    }
});
exports.createOrder = createOrder;
const verifyOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, paymentId, signature } = req.body.order;
        const temp = `${orderId}|${paymentId}`;
        const expectedSignature = crypto_1.default
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(temp.toString())
            .digest("hex");
        console.log({ signature, expectedSignature });
        if (signature === expectedSignature) {
            yield UserService.upgradeUserToPremium(req.user.id);
            const user = yield UserService.findUserById(req.user.id);
            yield OrderService.createOrder(user, orderId);
            return res
                .status(200)
                .send({ message: "Payment succesful!", success: true });
        }
        else
            res.status(500).send({ message: "Payment failed!", success: false });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error, success: false });
    }
});
exports.verifyOrder = verifyOrder;
