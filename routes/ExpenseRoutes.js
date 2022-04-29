const express = require("express");

const ExpenseController = require("../controllers/ExpenseController");
const { authenticateToken } = require("../middlewares/authenticateToken");

const router = express.Router();

router.post("/", authenticateToken, ExpenseController.addExpense);

router.get("/all", authenticateToken, ExpenseController.getAllExpenses);

router.get("/downloadfile", authenticateToken, ExpenseController.downloadFile);

module.exports = router;
