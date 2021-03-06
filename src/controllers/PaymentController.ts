import * as PaymentService from "../services/PaymentService";
import crypto from "crypto";
import * as UserService from "../services/UserService";
import * as OrderService from "../services/OrderService";
import { Request, Response } from "express";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await PaymentService.createOrder(req.body);
    res.send({ order, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, success: false });
  }
};

export const verifyOrder = async (req: Request, res: Response) => {
  try {
    const { orderId, paymentId, signature } = req.body.order;
    const temp = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(temp.toString())
      .digest("hex");
    console.log({ signature, expectedSignature });

    if (signature === expectedSignature) {
      await UserService.upgradeUserToPremium(req.user.id);
      const user = await UserService.findUserById(req.user.id);
      await OrderService.createOrder(user, orderId);
      return res
        .status(200)
        .send({ message: "Payment succesful!", success: true });
    } else res.status(500).send({ message: "Payment failed!", success: false });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, success: false });
  }
};
