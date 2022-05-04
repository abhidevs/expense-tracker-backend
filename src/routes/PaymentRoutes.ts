import { Router } from "express";

import * as PaymentController from "../controllers/PaymentController";
import authenticateToken from "../middlewares/authenticateToken";

const router = Router();

router.post("/order", authenticateToken, PaymentController.createOrder);

router.post("/verify", authenticateToken, PaymentController.verifyOrder);

export default router;
