const express = require("express");

const PaymentController = require("../controllers/PaymentController");
const { authenticateToken } = require("../middlewares/authenticateToken");

const router = express.Router();

router.post("/order", authenticateToken, PaymentController.createOrder);

router.post("/verify", authenticateToken, PaymentController.verifyOrder);

module.exports = router;
