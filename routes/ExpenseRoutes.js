const express = require("express");

const ExpenseController = require("../controllers/ExpenseController");
const { authenticateToken } = require("../middlewares/authenticateToken");

const router = express.Router();

router.post("/", authenticateToken, ExpenseController.addExpense);

module.exports = router;
